import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Navbar bg="light" className="justify-content-between">
        <Navbar.Brand>Bienvenido a la Plataforma</Navbar.Brand>
        <div>
          <Button variant="primary" className="me-2" onClick={() => navigate("/login")}>
            Iniciar Sesión
          </Button>
          <Button variant="success" onClick={() => navigate("/register")}>
            Registrarme
          </Button>
        </div>
      </Navbar>
    </Container>
  );
};

export default Home;
