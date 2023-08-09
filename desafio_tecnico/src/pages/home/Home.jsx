import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { createTheme } from "@mui/material/styles";
import SkillForm from "../../components/skills/SkillForm";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  CssBaseline,
  Container,
  Box,
} from "@mui/material";
import { Api } from "../../services/Api";
import { useNavigate } from "react-router-dom";
import ToastSuccess from "../../components/toasts/ToastSuccess";
import ToastError from "../../components/toasts/ToastError";
import { ToastContainer } from "react-toastify";

Modal.setAppElement("#root");

const defaultTheme = createTheme();

const skillsData = [
  
];

function Home() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState(skillsData);
  const [showModal, setShowModal] = useState(false);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [newLevel, setNewLevel] = useState(""); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleDeleteSkill = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await Api.delete(`/usuarioSkill/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      ToastSuccess({ message: "Skill deletada com sucesso!" });
      setSkills((prevSkills) =>
        prevSkills.filter((userSkill) => userSkill.id !== id)
      );
    } catch (error) {
      console.error("Erro ao excluir a skill:", error);
      ToastError({ message: "Erro ao deletar a skill!" });
    }
  };

  const handleAddSkill = () => {
    setShowModal(true);
  };

  const handleSaveSkill = async (newSkill) => {
    const { id, name, level, url, descricao } = newSkill;

    const updatedSkills = [
      ...skills,
      { skill: { id, nome: name, url, descricao }, level },
    ];

    setSkills(updatedSkills);
    setShowModal(false);
  };

  const handleCancelSkill = () => {
    setShowModal(false);
    setShowLevelModal(false);
  };


  const handleEditLevel = (skill) => {
    setSelectedSkill(skill);
    setNewLevel(skill.level.toString());
    setShowLevelModal(true);
  };

  const handleUpdateLevel = async () => {
    try {
      const token = localStorage.getItem("token");
      await Api.put(
        `/usuarioSkill/${selectedSkill.id}`,
        { novoNivel: newLevel },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedSkills = skills.map((userSkill) => {
        if (userSkill.skill.id === selectedSkill.skill.id) {
          return { ...userSkill, level: newLevel };
        }
        return userSkill;
      });
      setSkills(updatedSkills);

      setShowLevelModal(false);
      ToastSuccess({ message: "Nível da skill atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar o nível da habilidade:", error);
      ToastError({ message: "Erro ao atualizar o Nível da skill!" });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserSkills = async () => {
        try {
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("userId");
          const response = await Api.get(
            `/usuarioSkill/usuario/${userId}/skills`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSkills(response.data);
        } catch (error) {
          console.error("Erro ao obter as habilidades do usuário:", error);
        }
      };

      fetchUserSkills();
    }
  }, [isAuthenticated]);

  return isAuthenticated ? (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <CssBaseline />
      <Header showLogoutIcon={location.pathname === "/home"} onLogout={() => setIsAuthenticated(false)}/>
      <Container style={{ flex: 1 }}>
        <Box mt={5} mb={3} textAlign="center">
          <Button variant="contained" onClick={handleAddSkill}>
            Adicionar Skill
          </Button>
        </Box>
        <Grid container spacing={5}>
          {skills.map((userSkill) => (
            <Grid item xs={12} sm={6} md={4} key={userSkill.skill.id}>
              <Card style={{ backgroundColor: "#f0f0f0" }}>
                <CardContent style={{ color: "#333" }}>
                  <img
                    src={userSkill.skill.url}
                    alt="Habilidade"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                  <Typography variant="h6">{userSkill.skill.nome}</Typography>
                  <Typography>Nível {userSkill.level}</Typography>
                  <Typography>{userSkill.skill.descricao}</Typography>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => handleEditLevel(userSkill)}
                      style={{}}
                    >
                      Editar Nível
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteSkill(userSkill.id)}
                      style={{
                        backgroundColor: "#333",
                        color: "#fafafa",
                      }}
                    >
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
      <Modal
        isOpen={showModal}
        onRequestClose={handleCancelSkill}
        style={{
          content: {
            width: "30vw",
            height: "40vh",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
          overlay: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <SkillForm onSave={handleSaveSkill} onCancel={handleCancelSkill} />
      </Modal>
      <Modal
        isOpen={showLevelModal}
        onRequestClose={handleCancelSkill}
        style={{
          content: {
            width: "30vw",
            height: "40vh",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
          overlay: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <div
          style={{
            padding: "16px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ marginBottom: "16px", textAlign: "center" }}>
            Atualizar Nível da Habilidade
          </h2>
          {selectedSkill && (
            <>
              <p style={{ textAlign: "center" }}>{selectedSkill.skill.nome}</p>
              <input
                type="number"
                value={newLevel}
                onChange={(e) => setNewLevel(e.target.value)}
                placeholder="Novo nível"
                style={{
                  width: "20vw",
                  marginBottom: "16px",
                  padding: "8px",
                  textAlign: "center",
                }}
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={handleUpdateLevel}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                    marginRight: "8px",
                  }}
                >
                  Salvar
                </Button>
                <Button
                  onClick={handleCancelSkill}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
      <ToastContainer />
    </div>
  ) : null;
}

export default Home;
