import React from "react";
import { Routes, Route } from "react-router-dom"; // Importa enrutador
import { Login } from "./components/Login"; // Importa el componente Login
import Dashboard from "./components/Dashboard"; // Página para administradores (puedes agregarla después)
import TaskList  from "./components/TaskList"; // Página de usuarios para manejar tareas (CRUD)
import Home from "./components/Home";
import Register from "./components/Register";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} /> {/* Página del administrador */}
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<TaskList />} /> {/* Vista de tareas (CRUD) */}
      <Route path="/" element={<Home/>} /> {/* Ruta principal */}
    </Routes>
  );
};

export default App;
