import React from "react";
import Perfil  from "../src/pages/Perfil/Perfil"
import EditarPerfil from "./pages/EditarPerfil/EditarPerfil";
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
