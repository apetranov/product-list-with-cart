import { useState } from "react";
import Dessert from "./components/Dessert";
import Cart from "./components/Cart";

function App() {
  const [cart, setCart] = useState([]);
  const [itemCounts, setItemCounts] = useState({});

  const updateCart = (dessert, count) => {
    setCart((prevCart) => {
      if (count === 0) {
        // Remove the item from the cart if count is 0
        return prevCart.filter((item) => item.name !== dessert.name);
      } else {
        // Check if the item is already in the cart
        const itemIndex = prevCart.findIndex(
          (item) => item.name === dessert.name
        );
        if (itemIndex > -1) {
          // Update the quantity if the item is already in the cart
          const updatedCart = [...prevCart];
          updatedCart[itemIndex].quantity = count;
          return updatedCart;
        } else {
          // Add the item to the cart if it's not already there
          return [...prevCart, { ...dessert, quantity: count }];
        }
      }
    });
  };

  const removeFromCart = (itemName) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== itemName));
    // Reset item count to 0
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemName]: 0,
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="p-10 flex md:flex-row flex-col">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl my-10">Desserts</h1>
        <Dessert
          updateCart={updateCart}
          itemCounts={itemCounts}
          setItemCounts={setItemCounts}
        />
      </div>
      <Cart
        cart={cart}
        setItemCounts={setItemCounts}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </div>
  );
}

export default App;
