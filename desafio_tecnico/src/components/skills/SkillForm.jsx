import React, { useState, useEffect } from "react";
import ToastError from "../toasts/ToastError";
import "./SkillForm.css";
import { Api } from "../../services/Api";

const SkillForm = ({ onSave, onCancel, selectedSkillId }) => {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [level, setLevel] = useState("");
  const [skills, setSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await Api.get("/skills", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSkills(response.data);
      } catch (error) {
        console.error("Erro ao buscar skills:", error);
      }
    };

    const fetchUserSkills = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      try {
        const response = await Api.get(
          `/usuarioSkill/usuario/${userId}/skills`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserSkills(response.data);
      } catch (error) {
        console.error("Erro ao buscar as habilidades do usuário:", error);
      }
    };

    fetchSkills();
    fetchUserSkills();
  }, []);

  const handleSave = async () => {
    const selectedSkillData = skills.find(
      (skill) => skill.nome === selectedSkill
    );

    const userId = localStorage.getItem("userId");

    try {
      let newUserSkillId;
      if (selectedSkillId) {
        await associateSkillToUser(userId, selectedSkillId, level);
        newUserSkillId = selectedSkillId;
      } else {
        const response = await associateSkillToUser(
          userId,
          selectedSkillData.id,
          level
        );
        newUserSkillId = response.id;
      }

      const newSkill = {
        id: newUserSkillId,
        name: selectedSkillData.nome,
        level: level,
        url: selectedSkillData.url,
        descricao: selectedSkillData.descricao,
      };

      onSave(newSkill);

      window.location.reload();
    } catch (error) {
      ToastError({ message: "Selecione uma skill para adicionar!" });
      console.error("Erro ao associar skill ao usuário:", error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const associateSkillToUser = async (userId, skillId, level) => {
    const token = localStorage.getItem("token");
    try {
      const response = await Api.post(
        "/usuarioSkill/associar",
        {
          usuarioId: userId,
          skillId: skillId,
          level: level,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao associar skill ao usuário:", error);
      throw error;
    }
  };

  return (
    <div className="skill-form-container">
      <h2>Adicionar Skill</h2>
      <select
        className="select-skill"
        onChange={(e) => setSelectedSkill(e.target.value)}
      >
        <option value="">Selecione uma skill</option>
        {skills
          .filter(
            (skill) =>
              !userSkills.some(
                (userSkill) => userSkill.skill.nome === skill.nome
              )
          )
          .map((skill) => (
            <option key={skill.nome} value={skill.nome}>
              {skill.nome}
            </option>
          ))}
      </select>
      <input
        type="text"
        className="input-level"
        placeholder="Insira o level da skill"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      />
      <div className="button-container">
        <button className="btn-save" onClick={handleSave}>
          Salvar
        </button>
        <button className="btn-cancel" onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default SkillForm;
