import { useNavigate } from 'react-router-dom';

function Inicio() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario')); // Recuperamos el nombre

  const cerrarSesion = () => {
    localStorage.clear(); // Borramos el token y el usuario
    navigate('/'); // Volvemos al login
  };

  return (
    <div className= "pridiv" style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Bienvenido, {usuario?.nombre || 'Usuario'}</h1>
      <p>Has ingresado al sistema.</p>
      <button onClick={cerrarSesion}>Cerrar Sesión</button>
    </div>
  );
}

export default Inicio;