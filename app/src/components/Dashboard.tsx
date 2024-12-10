import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [taskCount, setTaskCount] = useState<number>(0);

  // Cargar datos sobre los usuarios y las tareas
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:4000/users/count');
        const taskResponse = await axios.get('http://localhost:4000/tasks/count');
        
        setUserCount(userResponse.data.count);
        setTaskCount(taskResponse.data.count);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div>
      <h2>Administrador</h2>
      <p>Usuarios registrados: {userCount}</p>
      <p>Tareas creadas: {taskCount}</p>
    </div>
  );
};

export default Dashboard;
