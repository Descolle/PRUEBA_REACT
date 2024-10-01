import { createContext, useState } from "react"

export const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [countPizzas, setCountPizzas] = useState(0);
    const [total, setTotal] = useState(0);

    const catchPizza = (pizza) => {
      const existingPizza = cart.find((item) => item.id === pizza.id);

      if (existingPizza) {
        const updatedCart = cart.map((item) =>
          item.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...pizza, quantity: 1 }]);
      }

      setTotal(total + pizza.price);
      setCountPizzas(countPizzas + 1);
    };

    const removePizza = (pizza) => {
      const existingPizza = cart.find((item) => item.id === pizza.id);

      if (existingPizza) {
        if (existingPizza.quantity > 1) {
          const updatedCart = cart.map((item) =>
            item.id === pizza.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          setCart(updatedCart);
        } else {
          setCart(cart.filter((item) => item.id !== pizza.id));
        }

        setTotal(total - pizza.price);
        setCountPizzas(countPizzas - 1);
      }
    };

    const clearCart = () => {
      setCart([]);
      setTotal(0);
      setCountPizzas(0);
    };

  return (
    <CartContext.Provider value={{cart, setCart,countPizzas, setCountPizzas, total, setTotal,catchPizza,removePizza, clearCart}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider;