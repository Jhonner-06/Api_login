import { useState } from 'react'
import axios from 'axios'
import { Routes, Route, useNavigate } from 'react-router-dom' 
import Inicio from './Inicio'
import './App.css'


function Login({ setMensaje, mensaje }) {

  const [nombre, setNombre ] = useState('')
  const [contraseña, setContraseña ] = useState('')
  const conexion = "http://localhost:5000/api/login"
  const navigate = useNavigate()

  const handleLogin = async (e) =>{
    e.preventDefault()

    try{
      const respuesta = await axios.post(conexion
        ,{
          nombre,
          contraseña
        }
      )
      
      localStorage.setItem('token', respuesta.data.token);
      localStorage.setItem('usuario', JSON.stringify(respuesta.data.usuario));

      
      navigate('/inicio');

    }catch (error) {
      setMensaje(error.response?.data?.menssage || "Error al conectar")
    }

  }


  return (
      <div  className="segdiv" style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Mi Sistema de Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Usuario" onChange={(e) => setNombre(e.target.value)} /><br /><br />
          <input type="password" placeholder="Contraseña" onChange={(e) => setContraseña(e.target.value)} /><br /><br />
          <button type="submit">Entrar</button>
        </form>
        {mensaje && <p><strong>{mensaje}</strong></p>}
      </div>
    )
  }

  function App() {
    const [mensaje, setMensaje] = useState('')

    return (
      <Routes>
        <Route path="/" element={<Login setMensaje={setMensaje} mensaje={mensaje} />} />
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    )
}

export default App
