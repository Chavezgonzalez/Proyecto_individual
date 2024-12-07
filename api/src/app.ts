import express, {Application, Request, Response} from "express"
import cors from "cors"
import UsersController from "./controllers/UsersControllers";

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


export default app;