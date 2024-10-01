import { useContext, useState } from "react";
import "./SignUp.css";
import Swal from "sweetalert2";
import { MyContext } from "./Context/MyContext";
import { useNavigate } from "react-router-dom";

const LogIn = ({ abierto, CloseLog }) => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const { handleSubmitLogin, loading, error, setUser, setPassword, token } =
    useContext(MyContext);
  const navigate = useNavigate();

  const inicio = async (e) => {
    e.preventDefault();

    try {
      setUser(usuario);
      setPassword(contraseña);

      // Call handleSubmitLogin from context
      await handleSubmitLogin();

      Swal.fire({
        title: "Bienvenido",
        text: "Disfruta de nuestras pizzas hechas con amor",
        imageUrl:
          "https://img.freepik.com/vector-gratis/flying-slice-of-pizza-cartoon-vector-illustration-concepto-comida-rapida-vector-aislado-estilo-dibujos-animados-plana_138676-1934.jpg",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });

      navigate("/profile");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Email y/o Contraseña no corresponde",
        icon: "error",
      });
    }
  };

  return (
    <div className={`wrapper modal ${abierto ? "is-open" : ""}`}>
      <form onSubmit={inicio}>
        {" "}
        {/* Ensure `inicio` is passed here */}
        <h1>Log In</h1>
        <button type="button" className="modal-close" onClick={CloseLog}>
          &times;
        </button>
        <div className="input-box">
          <input
            type="email"
            placeholder="Correo"
            required
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Contraseña"
            required
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>
        <button type="submit" className="registro" disabled={loading}>
          {loading ? "Iniciando..." : "Iniciar Sesion"}
        </button>
        <div className="account-exist">
          <a href="#">¿Olvidaste tu Contraseña?</a>
        </div>
        {error && (
          <div className="error-message" aria-live="assertive">
            {error}
          </div>
        )}{" "}
      </form>
    </div>
  );
};

export default LogIn;
