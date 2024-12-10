import axios from 'axios';
import { Button, Card, Container, Form, ListGroup, Modal } from 'react-bootstrap';
import { useState, useEffect, ChangeEvent } from 'react';

interface Task {
  _id?: string;
  title: string;
  description: string;
  dateEnd: string;
  status: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    title: '',
    description: '',
    dateEnd: '',
    status: 'pending',
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    try {
      const response = await axios.post('http://localhost:4000/tasks', newTask);
      setTasks([...tasks, response.data.task]);
      setNewTask({ title: '', description: '', dateEnd: '', status: 'pending' });
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    if (editingTask) {
      try {
        const response = await axios.put(`http://localhost:4000/tasks/${editingTask._id}`, editingTask);
        setTasks(tasks.map((t) => (t._id === editingTask._id ? response.data.updatedTask : t)));
        setEditingTask(null);
        setShowModal(false);
      } catch (error) {
        console.error('Error al actualizar la tarea:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    task: Task | null
  ) => {
    const { name, value } = e.target;
    if (task === editingTask) {
      setEditingTask({ ...editingTask, [name]: value } as Task);
    } else {
      setNewTask({ ...newTask, [name]: value });
    }
  };

  return (
    <Container>
      {/* Crear nueva tarea */}
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Crear Tarea</Card.Title>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                name="title"
                placeholder="Título"
                value={newTask.title}
                onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>, null)}
                className="mb-2"
              />
              <Form.Control
                type="text"
                name="description"
                placeholder="Descripción"
                value={newTask.description}
                onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>, null)}
                className="mb-2"
              />
              <Form.Control
                type="date"
                name="dateEnd"
                value={newTask.dateEnd}
                onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>, null)}
                className="mb-2"
              />
              <Form.Select
                name="status"
                value={newTask.status}
                onChange={(e) => handleChange(e as ChangeEvent<HTMLSelectElement>, null)}
                className="mb-2"
              >
                <option value="pending">Pendiente</option>
                <option value="completed">Completada</option>
              </Form.Select>
              <Button variant="primary" onClick={handleCreateTask}>
                Crear Tarea
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      {/* Lista de tareas */}
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Lista de Tareas</Card.Title>
          <ListGroup>
            {tasks.map((task) => (
              <ListGroup.Item key={task._id}>
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <p>
                  <strong>Fecha de Entrega:</strong> {new Date(task.dateEnd).toLocaleDateString()}
                </p>
                <p>
                  <strong>Estado:</strong> {task.status}
                </p>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEdit(task)}
                >
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(task._id!)}>
                  Eliminar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Modal para editar tarea */}
      {editingTask && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Tarea</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Título"
                  value={editingTask.title}
                  onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>, editingTask)}
                  className="mb-2"
                />
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Descripción"
                  value={editingTask.description}
                  onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>, editingTask)}
                  className="mb-2"
                />
                <Form.Control
                  type="date"
                  name="dateEnd"
                  value={editingTask.dateEnd}
                  onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>, editingTask)}
                  className="mb-2"
                />
                <Form.Select
                  name="status"
                  value={editingTask.status}
                  onChange={(e) => handleChange(e as ChangeEvent<HTMLSelectElement>, editingTask)}
                  className="mb-2"
                >
                  <option value="pending">Pendiente</option>
                  <option value="completed">Completada</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default TaskList;
