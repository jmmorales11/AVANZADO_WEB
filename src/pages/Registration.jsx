// RegistrationForm.jsx
import { useState } from 'react';
import Swal from 'sweetalert2'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { auth} from "../config/firebase";

const Registration = () => {
  const [error, setError] = useState(null);

  function handleRegistration(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log("Datos", email, password);
    registrarUsuario(email,password); 
  }
  async function registrarUsuario(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Swal.fire({
        icon: 'success',
        title: 'Registro realizado con éxito',
        text: 'En unos segundos será redirigido al inicio de sesión!',
        timer: 3000,
        didClose: () => {
          navigate('/');
        },
      });
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Registro fallido',
        text: error.message,
      });
    }
  }

  return (

    <div className='mt-5 conteiner1 reg'>
      <h1>Registro</h1>

      <form>
        <label>Correo electronico:</label>
        <input  className="form-control" placeholder="Correo electrónico "type="email" id="email" />
        <br/>
        <label>Password:</label>
        <input  className="form-control" placeholder="Password.." type="password" id="password" />
        <br/><br/>
        <button className="btn btn-success mb-2" onClick={handleRegistration}>Registrarse</button><br/>
      </form>
      <a href="/"><button className="btn btn-primary mb-2">Regresar al Inicio</button></a>
    </div>
  );
};

export default Registration;
