import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import lockopen from "../assets/img/lockOpen.png";
import lock from "../assets/img/lock.png";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { useSign } from "./hooks/useSign";
import { useLogIn } from "./hooks/useLogIn";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./Context/CartContext";
import { MyContext } from "./Context/MyContext";

function NavBar() {
  const { token, setToken } = useContext(MyContext);
  const [openFormulario, register, closeRegister] = useSign(false);
  const [abierto, OpenLog, closeLog] = useLogIn();
  const { total } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setToken(false);
    navigate("/HITO7_REACT/");
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="d-flex">
      <Container>
        <Navbar.Brand>Pizzeria Mamma Mia!</Navbar.Brand>
        <Nav className="me-auto">
          <Button variant="outline-light" className="text-white">
            <Link to="/HITO7_REACT/" className="zelda">
              🍕Home
            </Link>
          </Button>
          <Button variant="outline-light" className="text-white">
            <Link
              to={token ? "/HITO7_REACT/profile" : "/HITO7_REACT/register"}
              className="zelda"
            >
              <img src={token ? lockopen : lock} alt="lock status" />
              {token ? "Profile" : "Register"}
            </Link>
          </Button>
          <Button
            variant="outline-light"
            className="text-white"
            onClick={token ? handleLogOut : null}
          >
            <Link to={token ? "#" : "/HITO7_REACT/login"} className="zelda">
              <img src={token ? lockopen : lock} alt="lock status" />
              {token ? "LogOut" : "Login"}
            </Link>
          </Button>
        </Nav>

        <Nav className="ms-auto">
          <Link to="/HITO7_REACT/cart" className="zelda valor">
            <Button variant="outline-light" className="text-white">
              🛒Total: ${total.toLocaleString()}
            </Button>
          </Link>
        </Nav>
      </Container>

      {/* <SignUp openFormulario={openFormulario} closeRegister={closeRegister} />
      <LogIn abierto={abierto} CloseLog={closeLog}/> */}
    </Navbar>
  );
}

export default NavBar;
