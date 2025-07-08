import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import api from "../../services/api";

function Perfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregarDadosUsuario() {
      try {
        const res = await api.get("/usuario");
        setUsuario(res.data);
      } catch (error) {
        console.error("Erro ao carregar os dados do usuário:", error);
      }
    }

    carregarDadosUsuario();
  }, []);

  if (!usuario || !usuario.nome) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <div className="container">
      <img src={usuario.imagemPerfil} alt="Foto de perfil do usuario" />
      <h1>{usuario.nome}</h1>
      <p>
        <strong>Idade:</strong> {usuario.idade}
      </p>
      <p>
        <strong>Endereço:</strong> {usuario.rua}, {usuario.bairro},{" "}
        {usuario.estado}
      </p>
      <p>
        <strong>Biografia:</strong> {usuario.biografia}
      </p>

      <Link to="/editar">
        <button>Editar Perfil</button>
      </Link>
    </div>
  );
}

export default Perfil;
