import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import CardPizza from "./components/CardPizza";
import Cart from "./components/Cart";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import NotFound from "./components/views/NotFound";
import Profile from "./components/views/Profile";
import Pizza01 from "./components/views/Pizza01";
import CartProvider from "./components/Context/CartContext";
import MyProvider, { MyContext } from "./components/Context/MyContext";
import { useContext } from "react";

function App() {
  const { token } = useContext(MyContext);
  return (
    <>
      <MyProvider>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path="/PRUEBA_FINAL/" element={<Home />} />
            <Route path="/PRUEBA_FINAL/pizza" element={<CardPizza />} />
            <Route path="/PRUEBA_FINAL/pizza/:id" element={<Pizza01 />} />
            <Route path="/PRUEBA_FINAL/cart" element={<Cart />} />
            <Route path="/PRUEBA_FINAL/login" element={<LogIn />} />
            <Route path="/PRUEBA_FINAL/register" element={<SignUp />} />
            <Route
              path="/PRUEBA_FINAL/profile"
              element={token ? <Profile /> : <Navigate to="/login" />}
            />
            <Route path="/PRUEBA_FINAL/*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </MyProvider>
    </>
  );
}

export default App;
