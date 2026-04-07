import { useState } from 'react'
import axios from 'axios'


function App() {

  const [nombre, setNombre ] = useState('')
  const [contraseña, setContraseña ] = useState('')
  const [mensaje, setMensaje ] = useState('')

  const handleLogin = async (e) =>{
    e.preventDefault()

    try{
      const respuesta = await axios.post('http://localhost:5000/api/login'
        ,{
          nombre,
          contraseña
        }
      )
      
    setMensaje(respuesta.data.message);
    console.log("token recibido", respuesta.data.token)

    }catch (error) {
      setMensaje(error.response?.data?.menssage || "Error al conectar")
    }

  }


  return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Mi Sistema de Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Usuario" 
            onChange={(e) => setNombre(e.target.value)} 
          />
          <br /><br />
          <input 
            type="password" 
            placeholder="Contraseña" 
            onChange={(e) => setContraseña(e.target.value)} 
          />
          <br /><br />
          <button type="submit">Entrar</button>
        </form>

        {mensaje && <p><strong>{mensaje}</strong></p>}
      </div>
    )
}

export default App
