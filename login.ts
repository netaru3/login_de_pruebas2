import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app= express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true)
let usuario="netaru3"
let contraseña=process.env.contrasenia //puedes hallar la contraseña?

let intentos_ip= new Map()
function limiter(req:any,res:any,next:any){
    if(req.body.ip!==req.ip){return res.send("hubo un fallo en la conexión")}
    intentos_ip.set(req.body.ip,intentos_ip.get(req.body.ip) +1 || 1)

    if(intentos_ip.get(req.body.ip)>5){res.send("to many request error"); setTimeout(() => {
        intentos_ip.set(req.ip,0)
    }, 900000);}
    else{next()}

}

app.get("/login",function(req,res){res.sendFile("login.html",{root:import.meta.dirname})})

app.post("/login",limiter,function(req,res){
    if(req.body.usuario===usuario && req.body.contraseña===contraseña){
    res.send("acceso concedido"); console.log("acceso concedido")
}
else{res.send("error")}})

app.listen(3000,function(){console.log("conectado")})