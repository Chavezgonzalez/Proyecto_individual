// UsersController.ts

import jwt from 'jsonwebtoken';
import { UserModel } from '../models/Users';
import { Request, Response } from 'express';

export default {
  signUp: async (req: Request, res: Response) => {
    try {
      const { name, password, email } = req.body;
      const rol = "usuario"; // Rol predeterminado

      if (!name || !password || !email) {
        return res.status(400).json({ msg: "Faltan datos para crear un usuario" });
      }

      const newUser = await UserModel.create({ name, password, email, rol });
      res.status(200).json({ msg: "Usuario creado con éxito", user: newUser });
    } catch (error) {
      console.error("Error en signUp:", error);
      res.status(500).json({ msg: "Error al registrar el usuario" });
    }
  },

  signIn: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email, password });

      if (!user) {
        return res.status(400).json({ msg: "Credenciales incorrectas" });
      }

      const token = jwt.sign({ id: user._id, email: user.email }, "mi_secreto", { expiresIn: "1h" });

      res.status(200).json({
        msg: "Inicio de sesión exitoso",
        user,
        token,
      });
    } catch (error) {
      console.error("Error en signIn:", error);
      res.status(500).json({ msg: "Error al iniciar sesión" });
    }
  },

  // Nueva ruta para contar los usuarios
  countUsers: async (_req: Request, res: Response) => {
    try {
      const userCount = await UserModel.countDocuments(); // Cuenta todos los documentos de usuarios
      res.status(200).json({ count: userCount });
    } catch (error) {
      console.error("Error al contar usuarios:", error);
      res.status(500).json({ msg: "Error al obtener la cantidad de usuarios" });
    }
  }
};
