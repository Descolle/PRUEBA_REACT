import { useContext, useState } from "react";
import "./SignUp.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "./Context/MyContext";

const SignUp = ({ children, openFormulario, closeRegister }) => {
  const { user, setUser, password, setPassword, handleSubmitRegister } =
    useContext(MyContext);
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validacion = async (event) => {
    event.preventDefault();
    if (user === "" || password === "" || confirmpassword === "") {
      alert("Email y/o Contraseña no fueron colocados");
      return false;
    }
    if (password !== confirmpassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las Contraseñas no coinciden",
      });
      return;
    }
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tu contraseña es muy corta",
      });
      return false;
    }

    try {
      await handleSubmitRegister();
      Swal.fire({
        title: "Bien Hecho",
        text: "Tu cuenta ha sido creada",
        icon: "success",
      });
      navigate("/PRUEBA_REACT/profile");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Hubo un error al registrar la cuenta",
      });
    }
  };

  return (
    <div className={`wrapper modal ${openFormulario ? "is-open" : ""}`}>
      <form onSubmit={validacion}>
        <h1>Sign up</h1>
        <button type="button" className="modal-close" onClick={closeRegister}>
          &times;
        </button>
        <div className="input-box">
          <input
            type="email"
            placeholder="Correo"
            required
            value={user}
            onChange={(event) => setUser(event.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            required
            value={confirmpassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="registro">
          Registrarse
        </button>
        <div className="account-exist">
          <label>¿Ya tienes cuenta?</label>
          <Link to="/PRUEBA_REACT/login">Iniciar Sesión</Link>
        </div>
      </form>
      {children}
    </div>
  );
};

export default SignUp;
