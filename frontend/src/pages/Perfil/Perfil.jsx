// src/pages/Perfil/Perfil.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function buscarUsuario() {
      try {
        const res = await api.get("/usuario");
        if (!res.data || !res.data.nome) {
          navigate("/editar");
        } else {
          setUsuario(res.data);
        }
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        navigate("/editar");
      }
    }

    buscarUsuario();
  }, []);

  if (!usuario) return <p className="carregando">Carregando perfil...</p>;

  return (
    <div className="perfil-container">
      <div className="card-perfil">
        {usuario.imagemPerfil && (
          <img
            src={`http://localhost:3000/uploads/${usuario.imagemPerfil}`}
            alt="Foto de perfil"
            className="imagem-perfil"
          />
        )}
        <h1>{usuario.nome}</h1>
        <p><strong>Idade:</strong> {usuario.idade}</p>
        <p><strong>Endereço:</strong> {usuario.rua}, {usuario.bairro}, {usuario.estado}</p>
        <p><strong>Biografia:</strong> {usuario.biografia}</p>

        <button className="btn-editar" onClick={() => navigate("/editar")}>Editar Perfil</button>
      </div>
    </div>
  );
}

export default Perfil;
