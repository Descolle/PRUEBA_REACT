import { useContext, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Pizzas from "../json/pizzas";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

const Pizza01 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pizza = Pizzas.find((p) => p.id === id); //el id es string, si fuese numerico es parseInt
  const { catchPizza } = useContext(CartContext);
  useEffect(() => {
    if (!pizza) {
      navigate("/HITO7_REACT/*");
    }
  }, [pizza, navigate]);

  return (
    <div className="pizzacontainer d-flex justify-content-center align-items-center">
      <Card style={{ width: "60vh" }} className="pizza" key={pizza.id}>
        <Card.Img variant="top" src={pizza.img} alt="imagen pizza" />
        <Card.Body>
          <Card.Title className="pizza_name">{pizza.name}</Card.Title>
          <div className="ingredientes">
            <h5 className="ingrediente">Ingredientes:</h5>
            {pizza.ingredients.map((ingredient, i) => (
              <p key={i}>🍕{ingredient}</p>
            ))}
          </div>
          <div>{pizza.desc}</div>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <strong>Valor: ${pizza.price}</strong>
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Button variant="success" onClick={() => catchPizza(pizza)}>
            🛒 Añadir
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Pizza01;
