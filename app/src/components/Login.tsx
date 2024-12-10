import axios from "axios";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

export const Login = () => {
  const [data, setData] = useState<LoginData>({ email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:4000/login", data);
      const token = res.data.token; // Obtener el token de la respuesta

      // Guardar el token en localStorage
      localStorage.setItem('authToken', token);

      if (res.data.user.rol === "administrador") {
        navigate("/dashboard");
      } else {
        navigate("/tasks");
      }
    } catch (error) {
      alert("Hubo un error al iniciar sesión");
    }
  };

  return (
    <Container>
      <Card
        style={{
          width: "25rem",
          margin: "auto",
        }}
        className="text-center mt-3"
      >
        <Card.Body>
          <Card.Title>Inicia sesión</Card.Title>
          <Form>
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
            Enviar
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};
