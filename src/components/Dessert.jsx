import { useEffect, useState } from "react";

export default function Dessert({
  updateCart,
  itemCounts,
  setItemCounts,
  desserts,
  setDesserts,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null); // State to track hover

  const handleIncrement = (index) => {
    const dessert = desserts[index];
    setItemCounts((prevCounts) => {
      const newCount = (prevCounts[dessert.name] || 0) + 1;
      updateCart(dessert, newCount);
      return {
        ...prevCounts,
        [dessert.name]: newCount,
      };
    });
  };

  const handleDecrement = (index) => {
    const dessert = desserts[index];
    setItemCounts((prevCounts) => {
      const newCount =
        (prevCounts[dessert.name] || 0) > 0
          ? (prevCounts[dessert.name] || 0) - 1
          : 0;
      updateCart(dessert, newCount);
      return {
        ...prevCounts,
        [dessert.name]: newCount,
      };
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {desserts.map((dessert, index) => {
        const itemCount = itemCounts[dessert.name] || 0;
        const showControls = itemCount > 0 || hoveredIndex === index;

        return (
          <div
            key={dessert.name}
            className="p-5 space-y-3 group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative w-full h-64 mb-10">
              {showControls ? (
                <img
                  src={dessert.image.desktop}
                  className="w-full h-full rounded-lg object-cover outline outline-4 outline-red-600 transition-all duration-300"
                  alt={dessert.name}
                />
              ) : (
                <img
                  src={dessert.image.desktop}
                  className="w-full h-full rounded-lg object-cover group-hover:outline group-hover:outline-4 group-hover:outline-red-600 transition-all duration-300"
                  alt={dessert.name}
                />
              )}
              <button className="absolute flex flex-row space-x-2 justify-center items-center w-3/4 mx-auto bottom-0 inset-x-0 transform translate-y-1/2 outline bg-white outline-1 outline-black shadow-lg p-3 rounded-full transition-all duration-300">
                <img src="/assets/images/icon-add-to-cart.svg" alt="" />
                <p className="font-semibold">Add to cart</p>
              </button>
              {showControls && (
                <div className="absolute flex flex-row space-x-2 justify-between items-center w-3/4 mx-auto bottom-0 inset-x-0 transform translate-y-1/2 text-white bg-red-600 shadow-lg p-3 rounded-full transition-opacity duration-300">
                  <img
                    className="outline outline-3 outline-white px-2 py-3 rounded-full cursor-pointer"
                    onClick={() => handleDecrement(index)}
                    src="/assets/images/icon-decrement-quantity.svg"
                    alt=""
                  />
                  <p className="font-semibold">{itemCount}</p>
                  <img
                    className="outline outline-3 outline-white p-2 rounded-full cursor-pointer"
                    onClick={() => handleIncrement(index)}
                    src="/assets/images/icon-increment-quantity.svg"
                    alt=""
                  />
                </div>
              )}
            </div>
            <h1 className="text-gray-400 text-xl">{dessert.category}</h1>
            <h1 className="font-semibold text-xl">{dessert.name}</h1>
            <h1 className="font-bold text-green-600 text-xl">
              ${dessert.price.toFixed(2)}
            </h1>
          </div>
        );
      })}
    </div>
  );
}
