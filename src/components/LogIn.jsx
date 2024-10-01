import { useContext, useState } from "react";
import "./SignUp.css";
import Swal from "sweetalert2";
import { MyContext } from "./Context/MyContext";

const LogIn = ({ abierto, CloseLog }) => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const { user, password, token, setToken, handleSubmit } = useContext(MyContext);

  const inicio = async  (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    await handleSubmit(event);

    if (contraseña === password && usuario === user) {
      Swal.fire({
        title: "Bienvenido",
        text: "Disfruta de nuestras pizzas hechas con amor",
        imageUrl:
          "https://img.freepik.com/vector-gratis/flying-slice-of-pizza-cartoon-vector-illustration-concepto-comida-rapida-vector-aislado-estilo-dibujos-animados-plana_138676-1934.jpg",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
      setToken(true);
    } else {
      Swal.fire({
        title: "Error",
        text: "Email y/o Contraseña no corresponde",
        icon: "error",
      });
    }
  };

  return (
    <div className={`wrapper modal ${abierto ? "is-open" : ""}`}>
      <form onSubmit={inicio}>
        <h1>Log In</h1>
        <button type="button" className="modal-close" onClick={CloseLog}>
          &times;
        </button>
        <div className="input-box">
          <input
            type="email"
            placeholder="Correo"
            required
            onChange={(event) => setUsuario(event.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Contraseña"
            required
            onChange={(event) => setContraseña(event.target.value)}
          />
        </div>
        <button type="submit" className="registro">
          Iniciar Sesion
        </button>
        <div className="account-exist">
          <a href="#">¿Olvidaste tu Contraseña?</a>
        </div>
      </form>
    </div>
  );
};
export default LogIn;
