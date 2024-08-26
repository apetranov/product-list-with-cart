import { useState, useEffect } from "react";
import Dessert from "./components/Dessert";
import Cart from "./components/Cart";

function App() {
  const [desserts, setDesserts] = useState([]);
  const [cart, setCart] = useState([]);
  const [itemCounts, setItemCounts] = useState({});
  const [showPopup, setShowpopup] = useState(false);

  const handleNewOrder = () => {
    setShowpopup(false);
    window.location.reload();
  };

  useEffect(() => {
    // Fetch data from the public directory
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setDesserts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
    <div className="relative">
      {/* Overlay */}
      {showPopup && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 md:p-12 rounded shadow-lg flex flex-col justify-center items-center space-y-5 overflow-auto">
            <img
              src="/assets/images/icon-order-confirmed.svg"
              alt="Order Confirmed Icon"
              className="w-16 h-16"
            />
            <p className="text-3xl font-bold text-center">Order confirmed!</p>
            <p className="text-gray-400">We hope you enjoy your food!</p>
            {cart.map((item) => (
              <div key={item.name} className="flex flex-col w-full">
                <div className="flex flex-col justify-center items-center space-y-5">
                  <h1 className="font-semibold text-xl text-center">
                    {item.name}
                  </h1>
                  <div className="flex text-xl flex-row justify-center space-x-5 items-center">
                    <img
                      src={item.image.desktop}
                      className="w-24 h-24"
                      alt={item.name}
                    />
                    <span className="font-bold text-red-600">
                      {item.quantity}x
                    </span>
                    <span>${item.price.toFixed(2)}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-row space-x-10 justify-center items-center w-full">
              <h1 className="text-xl text-center">Order total</h1>
              <h1 className="text-3xl font-bold">
                $
                {cart
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </h1>
            </div>
            <button
              onClick={handleNewOrder}
              className="text-white p-4 font-semibold hover:text-red-600 transition-all duration-300 hover:bg-white outline outline-3 outline-red-600 mx-auto bg-red-600 rounded-full w-full max-w-xs"
            >
              Start New Order
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-10 flex md:flex-row flex-col relative z-10">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl my-10">Desserts</h1>
          <Dessert
            desserts={desserts}
            setDesserts={setDesserts}
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
          setShowpopup={setShowpopup}
        />
      </div>
    </div>
  );
}

export default App;
