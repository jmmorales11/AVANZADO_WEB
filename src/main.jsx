import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App.jsx";
import Registration from "./pages/Registration.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Inicio from "./pages/Inicio.jsx";
import Historial from "./pages/Historial.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ element }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
    });

    return () => {
      // Limpia el efecto al desmontar el componente
      unsubscribe();
    };
  }, []); // Array de dependencias vacío ya que no hay dependencias

  return authenticated ? element : <Navigate to="/dashboard" />;
};

const Root = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
    });

    return () => {
      // Limpia el efecto al desmontar el componente
      unsubscribe();
    };
  }, []); // Array de dependencias vacío ya que no hay dependencias

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route
            path="/"
            element={authenticated ? <Navigate to="/dashboard" /> : <App />}
          />
          <Route
            path="inicio"
            element={authenticated ? <Navigate to="/inicio" /> : <Inicio />}
          />
          <Route
            path="/registro"
            element={
              authenticated ? <Navigate to="/dashboard" /> : <Registration />
            }
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/historial/:productName/:productCode"
            element={<ProtectedRoute element={<Historial />} />}
          />
          <Route
            path="/inicio"
            element={authenticated ? <Navigate to="/inicio" /> : <Inicio />}
          />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
