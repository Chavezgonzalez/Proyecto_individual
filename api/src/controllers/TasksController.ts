import { Request, Response } from "express";
import { ActivitiModel } from "../models/Activities";

export default {
  // Crear actividad
  createActivity: async (req: Request, res: Response) => {
    try {
      const { tittle, dateEnd, description, Status, idUser } = req.body;
      if (!tittle || !dateEnd || !description || !Status || !idUser) {
        return res.status(400).json({ msg: "Faltan parámetros" });
      }

      const activity = { tittle, dateEnd, description, Status, idUser };
      await ActivitiModel.create(activity);
      res.status(200).json({ msg: "Actividad creada con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al crear actividad" });
    }
  },

  // Obtener todas las actividades
  getAllActivities: async (req: Request, res: Response) => {
    try {
      const activities = await ActivitiModel.find().populate("idUser");
      res.status(200).json({ msg: "Actividades obtenidas con éxito", activities });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al obtener actividades" });
    }
  },

  // Obtener actividad por ID
  getActivityById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const activity = await ActivitiModel.findById(id).populate("idUser");

      if (!activity) {
        return res.status(400).json({ msg: "Actividad no encontrada" });
      }

      res.status(200).json({ msg: "Actividad obtenida con éxito", activity });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al obtener actividad" });
    }
  },

  // Actualizar actividad
  updateActivity: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { tittle, dateEnd, description, Status, idUser } = req.body;

      if (!tittle || !dateEnd || !description || !Status || !idUser) {
        return res.status(400).json({ msg: "Faltan parámetros" });
      }

      const activity = await ActivitiModel.findById(id);
      if (!activity) {
        return res.status(400).json({ msg: "Actividad no encontrada para actualizar" });
      }

      await ActivitiModel.findByIdAndUpdate(id, { tittle, dateEnd, description, Status, idUser });
      res.status(200).json({ msg: "Actividad actualizada con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al actualizar actividad" });
    }
  },

  // Eliminar actividad
  deleteActivity: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const activity = await ActivitiModel.findById(id);

      if (!activity) {
        return res.status(400).json({ msg: "Actividad no encontrada para eliminar" });
      }

      await ActivitiModel.deleteOne({ _id: id });
      res.status(200).json({ msg: "Actividad eliminada con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al eliminar actividad" });
    }
  }
};
