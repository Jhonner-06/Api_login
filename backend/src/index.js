

const express = require('express');
const cors = require ('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require ('dotenv');
const Usuarios = require ('./data/users');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get ('/',(req,res) =>{
    res.send("Servidor funcionando")
})

app.post('/api/login', async(req,res) =>{
    const { nombre, contraseña} = req.body;

    const usuario = Usuarios.find(u => u.nombre === nombre);


    if(usuario && usuario.contraseña  === contraseña){
        const token = jwt.sign({id: usuario.id}, "Clave secreta", {expiresIn: '1h'})
        return res.json({
            message: "Login exitoso",
            token: token,
            usuario: {nombre: usuario.nombre}
        });
    }else{
        return res.status(401).json({message: "Usuario o clave incorrecta"});
    }
});


app.listen(5000, ()=> console.log("Servidor corriendo en puerto 5000"))