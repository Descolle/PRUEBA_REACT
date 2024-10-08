import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import lockopen from "../assets/img/lockOpen.png";
import lock from "../assets/img/lock.png";
import { useSign } from "./hooks/useSign";
import { useLogIn } from "./hooks/useLogIn";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CartContext } from "./Context/CartContext";
import { MyContext } from "./Context/MyContext";

function NavBar() {
  const { token, setToken } = useContext(MyContext);
  const [openFormulario, register, closeRegister] = useSign(false);
  const [abierto, OpenLog, closeLog] = useLogIn();
  const { total } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("PRUEBA_REACT/");
  };

  useEffect(() => {
    if (token) {
      console.log("User logged in. Token:", token);
    } else {
      console.log("User logged out. Token cleared.");
    }
  }, [token]);

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="d-flex">
      <Container>
        <Navbar.Brand>Pizzeria Mamma Mia!</Navbar.Brand>
        <Nav className="me-auto">
          <Button variant="outline-light" className="text-white">
            <Link to="PRUEBA_REACT/" className="zelda">
              🍕Home
            </Link>
          </Button>

          <Button variant="outline-light" className="text-white">
            <Link
              to={token ? "/PRUEBA_REACT/profile" : "/PRUEBA_REACT/register"}
              className="zelda"
            >
              <img src={token ? lockopen : lock} alt="lock status" />
              {token ? "Profile" : "Register"}
            </Link>
          </Button>

          {token ? (
            <Button
              variant="outline-light"
              className="text-white"
              onClick={handleLogOut}
            >
              <img src={lockopen} alt="lock status" />
              LogOut
            </Button>
          ) : (
            <Button variant="outline-light" className="text-white">
              <Link to="PRUEBA_REACT/login" className="zelda">
                <img src={lock} alt="lock status" />
                Login
              </Link>
            </Button>
          )}
        </Nav>

        <Nav className="ms-auto">
          <Link to="PRUEBA_REACT/cart" className="zelda valor">
            <Button variant="outline-light" className="text-white">
              🛒Total: ${total.toLocaleString()}
            </Button>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
