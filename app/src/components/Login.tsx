import axios from "axios";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";


// Define el tipo del estado
interface LoginData {
  email: string;
  password: string;
}

export const Login = () => {
  const [data, setData] = useState<LoginData>({ email: "", password: "" }); // Estado inicial tipado
  const navigate = useNavigate();

  // Manejar cambios en los inputs
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value, // Actualiza solo el campo modificado
    });
  };

  // Manejar el envío del formulario
  const onSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:4000/login", data); // Envía los datos al backend
      if (res.data.user.rol === "administrador") {
        navigate("/home");
      } else {
        navigate("/"); // Ruta para usuarios normales
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
