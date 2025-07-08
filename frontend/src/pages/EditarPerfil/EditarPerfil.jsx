import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./styles.css"

function EditarPerfil() {
  const [usuario, setUsuario] = useState({
    nome: "",
    idade: "",
    rua: "",
    bairro: "",
    estado: "",
    biografia: "",
    imagemPerfil: "", 
  });

  const [erros, setErros] = useState({});
  const navegar = useNavigate();

  useEffect(() => {
    async function carregarDados() {
      const res = await api.get("/usuario");
      if (res.data) setUsuario(res.data);
    }
    carregarDados();
  }, []);

  const atualizarDados = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const atualizarImagem = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUsuario((prev) => ({
        ...prev,
        imagemPerfil: file,
      }));
    }
  };

  const enviarDadosAtualizados = async (e) => {
    e.preventDefault();

    const novosErros = {};
    if (!usuario.nome || usuario.nome.trim().length < 2)
      novosErros.nome = "Nome deve ter pelo menos 2 letras.";
    if (!usuario.idade || isNaN(usuario.idade) || usuario.idade <= 0)
      novosErros.idade = "Idade inválida.";
    if (!usuario.rua || !usuario.bairro || !usuario.estado)
      novosErros.endereco = "Preencha todos os campos do endereço.";
    if (!usuario.biografia || usuario.biografia.trim().length < 10)
      novosErros.biografia = "Biografia muito curta.";

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }


    const formData = new FormData();
    formData.append("nome", usuario.nome);
    formData.append("idade", usuario.idade);
    formData.append("rua", usuario.rua);
    formData.append("bairro", usuario.bairro);
    formData.append("estado", usuario.estado);
    formData.append("biografia", usuario.biografia);

    if (usuario.imagemPerfil instanceof File) {
      formData.append("imagemPerfil", usuario.imagemPerfil);
    } else {
      formData.append("imagemPerfilUrl", usuario.imagemPerfil); 
    }

    try {
      await api.post("/usuario", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navegar("/perfil");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar informações.");
    }
  };

  return (
    <div className="container" >
      <h2>Editar Perfil</h2>
      <form onSubmit={enviarDadosAtualizados}>

        <div>
          <label>Foto de Perfil:</label>
          <input type="file" accept="image/*" onChange={atualizarImagem} />
        </div>

        {usuario.imagemPerfil && (
          <img
            src={
              usuario.imagemPerfil instanceof File
                ? URL.createObjectURL(usuario.imagemPerfil)
                : `http://localhost:3000/uploads/${usuario.imagemPerfil}`
            }
            alt="Prévia"
            style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", marginTop: 10 }}
          />
        )}

        <div>
          <label>Nome:</label>
          <input type="text" name="nome" value={usuario.nome} onChange={atualizarDados} />
          {erros.nome && <p style={{ color: "red" }}>{erros.nome}</p>}
        </div>

        <div>
          <label>Idade:</label>
          <input type="number" name="idade" value={usuario.idade} onChange={atualizarDados} />
          {erros.idade && <p style={{ color: "red" }}>{erros.idade}</p>}
        </div>

        <div>
          <label>Rua:</label>
          <input type="text" name="rua" value={usuario.rua} onChange={atualizarDados} />
        </div>
        <div>
          <label>Bairro:</label>
          <input type="text" name="bairro" value={usuario.bairro} onChange={atualizarDados} />
        </div>
        <div>
          <label>Estado:</label>
          <input type="text" name="estado" value={usuario.estado} onChange={atualizarDados} />
          {erros.endereco && <p style={{ color: "red" }}>{erros.endereco}</p>}
        </div>

        <div>
          <label>Biografia:</label>
          <textarea name="biografia" value={usuario.biografia} onChange={atualizarDados} rows={4} />
          {erros.biografia && <p style={{ color: "red" }}>{erros.biografia}</p>}
        </div>

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarPerfil;
