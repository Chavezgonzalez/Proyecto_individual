import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
  _id: string;
  title: string;
  description: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Cargar las tareas del backend (supongo que tienes una ruta para obtenerlas)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Listado de Tareas</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
