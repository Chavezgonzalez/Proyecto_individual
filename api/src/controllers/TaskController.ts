// TaskController.ts

import { Request, Response } from 'express';
import { TaskModel } from '../models/TaskModule';

export default {
  create: async (req: Request, res: Response) => {
    try {
      const { title, description, dateEnd, status } = req.body;

      if (!title || !description || !dateEnd || !status) {
        return res.status(400).json({ msg: "Faltan datos para crear la tarea" });
      }

      const task = await TaskModel.create({ title, description, dateEnd, status });
      res.status(201).json({ msg: "Tarea creada con éxito", task });
    } catch (error) {
      console.error("Error en create:", error);
      res.status(500).json({ msg: "Error al crear la tarea" });
    }
  },

  getAll: async (_req: Request, res: Response) => {
    try {
      const tasks = await TaskModel.find();
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error en getAll:", error);
      res.status(500).json({ msg: "Error al obtener las tareas" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, dateEnd, status } = req.body;

      const task = await TaskModel.findById(id);
      if (!task) {
        return res.status(404).json({ msg: "Tarea no encontrada" });
      }

      const updatedTask = await TaskModel.findByIdAndUpdate(
        id,
        { title, description, dateEnd, status },
        { new: true }
      );

      res.status(200).json({ msg: "Tarea actualizada con éxito", updatedTask });
    } catch (error) {
      console.error("Error en update:", error);
      res.status(500).json({ msg: "Error al actualizar la tarea" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const task = await TaskModel.findById(id);
      if (!task) {
        return res.status(404).json({ msg: "Tarea no encontrada" });
      }

      await TaskModel.findByIdAndDelete(id);
      res.status(200).json({ msg: "Tarea eliminada con éxito" });
    } catch (error) {
      console.error("Error en delete:", error);
      res.status(500).json({ msg: "Error al eliminar la tarea" });
    }
  },

  // Nueva ruta para contar las tareas
  countTasks: async (_req: Request, res: Response) => {
    try {
      const taskCount = await TaskModel.countDocuments(); // Cuenta todos los documentos de tarea
      res.status(200).json({ count: taskCount });
    } catch (error) {
      console.error("Error al contar tareas:", error);
      res.status(500).json({ msg: "Error al obtener la cantidad de tareas" });
    }
  }
};
