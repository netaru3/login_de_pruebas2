import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import {rateLimit} from 'express-rate-limit'
dotenv.config()

const app= express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1)

let limiter= rateLimit({ windowMs: 15 * 60 * 1000, // ventana de 15 minutos
    limit: 5,                   // máximo 5 requests por ventana
    message: { error: 'Demasiados intentos, esperá 15 minutos' },
    standardHeaders: true,
    legacyHeaders: false,
})

let usuario="netaru3"
let contraseña=process.env.contrasenia //puedes hallar la contraseña?



app.get("/login",function(req,res){res.sendFile("login.html",{root:import.meta.dirname})})

app.post("/login",limiter,function(req,res){
    if(req.body.usuario===usuario && req.body.contraseña===contraseña){
    res.send("acceso concedido"); console.log("acceso concedido")
}
else{res.send("error")}})

app.listen(3000,function(){console.log("conectado")})
