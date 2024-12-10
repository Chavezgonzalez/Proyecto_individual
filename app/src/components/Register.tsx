import React, { useState, ChangeEvent } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [data, setData] = useState<RegisterData>({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    try {
      await axios.post("http://localhost:4000/register", data);
      alert("Usuario registrado exitosamente");
      navigate("/");
    } catch (error) {
      alert("Hubo un error al registrar el usuario");
    }
  };

  return (
    <Container>
      <Card style={{ width: "25rem", margin: "auto" }} className="text-center mt-3">
        <Card.Body>
          <Card.Title>Regístrate</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Ingresa tu nombre"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Ingresa tu correo"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                onChange={onChange}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={onSubmit}>
            Registrarme
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
