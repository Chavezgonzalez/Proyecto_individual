import express, {Application, Request, Response} from "express"
import cors from "cors"
import UsersController from "./controllers/UsersControllers";
import ActivityController from "./controllers/TasksController";

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(_req:Request,res:Response)=>{
    res.send("Hola desde mi servidor con TS")
})

//Rutas de usuario
app.post("/user/create", UsersController.signUp);
app.post("/user/sign-in", UsersController.signIn);
app.post("/login", UsersController.signIn);
app.post("/register", UsersController.signUp);

/* app.post("/activities", ActivityController.createActivity);
app.get("/activities", ActivityController.getAllActivities);
app.get("/activities/:id", ActivityController.getActivityById);
app.put("/activities/:id", ActivityController.updateActivity);
app.delete("/activities/:id", ActivityController.deleteActivity); */


export default app;