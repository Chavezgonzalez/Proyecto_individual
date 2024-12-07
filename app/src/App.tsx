import React from "react";
import { Routes, Route } from "react-router-dom"; // Importa enrutador
import { Login } from "./components/Login"; // Importa el componente Login
import Dashboard from "./components/Dashboard"; // Página para administradores (puedes agregarla después)
import TaskList  from "./components/TaskList"; // Página de usuarios para manejar tareas (CRUD)

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} /> {/* Página del administrador */}
      <Route path="/tasks" element={<TaskList />} /> {/* Vista de tareas (CRUD) */}
      <Route path="/" element={<h1>Bienvenido a la plataforma</h1>} /> {/* Ruta principal */}
    </Routes>
  );
};

export default App;
