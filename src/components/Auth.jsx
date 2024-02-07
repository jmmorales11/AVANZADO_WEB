import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut , signInWithEmailAndPassword} from "firebase/auth";
import { useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 1000,
      });
      navigate('/dashboard');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Inicio de Sesión',
        text: err.message,
      });
    }
  };

  function handleLogin(e){
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log("Datos", email, password);
    signInWithEmailAndPassword(auth, email,password)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 1000,
      });
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error de Inicio de Sesión',
        text: err.message,
      });
    });
  }

  return (
    <div className="container mt-5 conteiner1">
      <a href="/inicio"><div className="salir">
          <button className="btn btn-primary" >
            Home
          </button>
        </div></a>
      <h1>Bienvenido</h1><br />
      <div className="mb-3">

      <label>Correo electrónico:</label>
        <input id="email" className="form-control" placeholder="Email.." onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
      <label>Password:</label>
        <input id="password"
          className="form-control"
          type="password"
          placeholder="Contraseña..."
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-success mb-2" onClick={handleLogin}>Ingresar</button>
      <br></br>
      <button className="btn btn-primary mb-2" onClick={signInWithGoogle}>
        Ingresar con Google
      </button>
      <p><a className="text-black"href="/registro">¿No tiene cuenta? Registrate </a>
      </p>
    </div>
  );
};
