import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function EditarPerfil() {

  const [erros, setErros] = useState()  
  
  const [usuario, setUsuario] = useState({
    nome: "",
    idade: "",
    rua: "",
    bairro: "",
    estado: "",
    biografia: "",
    imagemPerfil: "",
  });

  const navegar = useNavigate();

  useEffect(() => {
    async function carregarDados() {
      const res = await api.get("/usuario");
      if (res.data) setUsuario(res.data);
    }
    carregarDados();
  }, []);

  const atualizarDados = (evento) => {
    const { name, value } = evento.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const enviarDadosAtualizados = async (evento) => {
    evento.preventDefault();

    const novosErros = {};

    if (!usuario.nome || usuario.nome.trim().length < 2) {
      novosErros.nome = "Nome é obrigatório e deve ter pelo menos 2 letras.";
    }

    if (!usuario.idade || isNaN(usuario.idade) || usuario.idade <= 0) {
      novosErros.idade = "Idade deve ser um número válido maior que zero.";
    }

    if (!usuario.rua || !usuario.bairro || !usuario.estado) {
      novosErros.endereco = "Rua, bairro e estado são obrigatórios.";
    }

    if (!usuario.biografia || usuario.biografia.trim().length < 10) {
      novosErros.biografia = "Biografia deve ter pelo menos 10 caracteres.";
    }

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return; 
    }
    setErros({});

    try {
      await api.post("/usuario", usuario);
      navegar("/perfil");
    } catch (error) {
      alert("Erro ao salvar informações.", error);
    }
  };

  return(
    <div className="container">
    <h2>Editar Perfil</h2>
    <form onSubmit={enviarDadosAtualizados}>
      <div>
        <label>Foto de Perfil (URL):</label>
        <input
          type="text"
          name="imagemPerfil"
          value={usuario.imagemPerfil}
          onChange={atualizarDados}
        />
      </div>

      <div>
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          value={usuario.nome}
          onChange={atualizarDados}
        />
        {erros?.nome && <p style={{ color: "red" }}>{erros.nome}</p>}
      </div>

      <div>
        <label>Idade:</label>
        <input
          type="number"
          name="idade"
          value={usuario.idade}
          onChange={atualizarDados}
        />
        {erros?.idade && <p style={{ color: "red" }}>{erros.idade}</p>}
      </div>

      <div>
        <label>Rua:</label>
        <input
          type="text"
          name="rua"
          value={usuario.rua}
          onChange={atualizarDados}
        />
      </div>

      <div>
        <label>Bairro:</label>
        <input
          type="text"
          name="bairro"
          value={usuario.bairro}
          onChange={atualizarDados}
        />
      </div>

      <div>
        <label>Estado:</label>
        <input
          type="text"
          name="estado"
          value={usuario.estado}
          onChange={atualizarDados}
        />
        {erros?.endereco && <p style={{ color: "red" }}>{erros.endereco}</p>}
      </div>

      <div>
        <label>Biografia:</label>
        <textarea
          name="biografia"
          value={usuario.biografia}
          onChange={atualizarDados}
          rows={4}
        />
        {erros?.biografia && <p style={{ color: "red" }}>{erros.biografia}</p>}
      </div>

      <button type="submit">Salvar Alterações</button>
    </form>
  </div>
  );
}

export default EditarPerfil;
