import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Importa el componente raíz
import "bootstrap/dist/css/bootstrap.min.css"; // Estilos de Bootstrap
import { BrowserRouter } from "react-router-dom"; // Habilita el enrutamiento

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
