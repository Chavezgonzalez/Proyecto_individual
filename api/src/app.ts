// app.ts

import express, { Application, Request, Response } from "express";
import cors from "cors";
import UsersController from "./controllers/UsersControllers";
import TaskController from "./controllers/TaskController";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get("/", (_req: Request, res: Response) => {
  res.send("Hola desde mi servidor con TS");
});

// Rutas de usuarios
app.post("/user/create", UsersController.signUp);
app.post("/user/sign-in", UsersController.signIn);
app.post("/login", UsersController.signIn);
app.post("/register", UsersController.signUp);

// Ruta para contar usuarios
app.get("/users/count", UsersController.countUsers);

// Rutas de tareas (Tasks)
app.post("/tasks", TaskController.create);  // Crear tarea
app.get("/tasks", TaskController.getAll);   // Obtener todas las tareas
app.put("/tasks/:id", TaskController.update);  // Actualizar tarea
app.delete("/tasks/:id", TaskController.delete);  // Eliminar tarea

// Ruta para contar tareas
app.get("/tasks/count", TaskController.countTasks);

export default app;
