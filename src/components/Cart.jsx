import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart({
  cart,
  removeFromCart,
  clearCart,
  setItemCounts,
  setShowpopup,
}) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleConfirmOrder = () => {
    setIsPopupVisible(true);
  };

  const handleStartNewOrder = () => {
    toast("Ordered!");
    clearCart();
    setItemCounts({});
    setIsPopupVisible(false);
  };

  return (
    <div className="mt-10">
      <ToastContainer />
      {cart.length === 0 ? (
        <div className="p-12 flex flex-col justify-center items-center shadow-lg rounded-lg space-y-10 w-full">
          <h1 className="text-3xl text-center font-bold text-red-600">
            Your cart (0)
          </h1>
          <img src="/assets/images/illustration-empty-cart.svg" alt="" />
          <p className="text-lg text-center text-gray-400">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <div className="p-12 flex flex-col justify-center items-center shadow-lg rounded-lg space-y-10 overflow-auto w-full">
          <h1 className="text-3xl font-bold mb-5 text-red-600">
            Your cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </h1>
          {cart.map((item) => (
            <div key={item.name} className="flex flex-col">
              <div className="flex flex-col justify-center items-center space-y-5">
                <h1 className="font-semibold text-xl">{item.name}</h1>
                <div className="flex text-xl flex-row justify-center space-x-5 items-center">
                  <span className="font-bold text-red-600">
                    {item.quantity}x
                  </span>
                  <span>${item.price.toFixed(2)}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="text-sm outline outline-3 hover:outline-red-600 transition-all duration-300 outline-gray-400 py-5 px-6 rounded-full text-red-600 hover:text-red-600"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-row space-x-10 justify-center items-center">
            <h1 className="text-xl text-center">Order total</h1>
            <h1 className="text-3xl font-bold">
              $
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </h1>
          </div>
          <div className="bg-gray-100 p-5 rounded-lg flex flex-row space-x-4 justify-center items-center">
            <img src="/assets/images/icon-carbon-neutral.svg" alt="" />

            <span className="text-center">
              This is a <strong>carbon-neutral</strong> delivery
            </span>
          </div>
          <button
            onClick={() => setShowpopup(true)}
            className="text-white p-4 font-semibold hover:text-red-600 transition-all duration-300 hover:bg-white outline outline-3 outline-red-600 mx-auto bg-red-600 rounded-full w-full"
          >
            Confirm order
          </button>
        </div>
      )}
    </div>
  );
}
