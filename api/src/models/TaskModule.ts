import { Schema, model } from 'mongoose';

// Definir el esquema de las tareas
const taskSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  dateEnd: { 
    type: Date, 
    required: true 
  },
  status: { 
    type: String, 
    required: true 
  }, // Puede ser 'pending', 'completed', etc.
});

// Crear el modelo basado en el esquema
const TaskModel = model("Task", taskSchema);

export { TaskModel };
