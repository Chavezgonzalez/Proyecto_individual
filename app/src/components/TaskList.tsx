import axios from 'axios';
import { Button, Card, Container, ListGroup } from 'react-bootstrap';
import { useState, useEffect, ChangeEvent } from 'react';

// Interfaz para una tarea
interface Task {
  _id: string;
  title: string;
  description: string;
  dateEnd: string;
  status: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dateEnd: '',
    status: 'pending', // Estado por defecto
  });

  // Obtener todas las tareas al cargar el componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/tasks'); // Ruta corregida
        setTasks(response.data); // Se asume que el servidor devuelve un array de tareas
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };
    fetchTasks();
  }, []);

  // Crear una nueva tarea
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:4000/tasks', newTask); // Ruta corregida
      setTasks([...tasks, response.data.task]); // Agrega la nueva tarea al array existente
      setNewTask({ title: '', description: '', dateEnd: '', status: 'pending' }); // Resetea el formulario
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Eliminar una tarea
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/tasks/${id}`); // Ruta corregida
      setTasks(tasks.filter((task) => task._id !== id)); // Actualiza el estado filtrando la tarea eliminada
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  return (
    <Container>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Lista de Tareas</Card.Title>
          <ListGroup>
            {tasks.map((task) => (
              <ListGroup.Item key={task._id}>
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <p><strong>Fecha de Entrega:</strong> {new Date(task.dateEnd).toLocaleDateString()}</p>
                <p><strong>Estado:</strong> {task.status}</p>
                <Button variant="danger" onClick={() => handleDelete(task._id)}>
                  Eliminar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Crear Tarea</Card.Title>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={newTask.title}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="description"
            placeholder="Descripción"
            value={newTask.description}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <input
            type="date"
            name="dateEnd"
            value={newTask.dateEnd}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <Button variant="primary" onClick={handleCreate}>
            Crear Tarea
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TaskList;
