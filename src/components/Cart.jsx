import { useContext } from "react";
import CardPizza from "./CardPizza";
import Button from "react-bootstrap/Button";
import { CartContext } from "./Context/CartContext";
import { MyContext } from "./Context/MyContext";

function payment() {
  Swal.fire({
    title: "Custom width, padding, color, background.",
    width: 600,
    padding: "3em",
    color: "#716add",
    background: "#fff url(/images/trees.png)",
    backdrop: `
      rgba(0,0,123,0.4)
      url("/images/nyan-cat.gif")
      left top
      no-repeat
    `,
  });
}
function Cart() {
  const { cart, total, removePizza, clearCart } = useContext(CartContext);
  const { token } = useContext(MyContext);

  return (
    <div>
      <h2>Carrito</h2>
      <ul>
        {cart.map((pizza) => (
          <li key={pizza.id} className="text-cart">
            <img
              src={pizza.img}
              style={{ width: "150px", border: "2px solid #000000" }}
            />{" "}
            - {pizza.name} - ${pizza.price} x {pizza.quantity}{" "}
            <Button
              variant="danger"
              size="sm"
              onClick={() => removePizza(pizza)}
            >
              X
            </Button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Total:</h3>
        <span className="total-pagar">${total.toFixed(2)}</span>
      </div>
      <Button variant="danger" onClick={clearCart} className="clear-all">
        Vaciar Carrito
      </Button>
      {token && (
        <button onClick={payment} className="btn btn-primary">
          Pagar
        </button>
      )}
    </div>
  );
}

export default Cart;
