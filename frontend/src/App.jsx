import React from "react";
import "./styles.css";

function App() {
  return (
    <main className="container">
      <div className="container-perfil">
        <h2>Perfil de Usuário</h2>
        <img src="../public/user.png" alt="usuario" />
        <h3>Ailton Neto</h3>
        <h4>20 Anos</h4>
        <h5>Rua José Maria de Miranda</h5>
        <p>
          Desenvolvedor Front-End apaixonado por criar soluções eficazes e
          eficientes. Adoro trabalhar em projetos desafiadores.
        </p>
        <button>Editar Perfil</button>
      </div>

      <div className="container-editar">
        <h2>Editar Perfil</h2>
        <h5>Foto</h5>
        <input type="file" />
        <h5>Nome Completo</h5>
        <input type="text" placeholder="Digite Seu Nome"/>
        <h5>Idade</h5>
        <input type="number" placeholder="Digite Sua idade"/>
      </div>
    </main>
  );
}

export default App;
