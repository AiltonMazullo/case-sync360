import React from "react";
import "./styles.css";
import Perfil  from "../src/pages/Perfil/Perfil"
import EditarPerfil from "./pages/EditaPerfil/EditarPerfil";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/editar" element={<EditarPerfil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
