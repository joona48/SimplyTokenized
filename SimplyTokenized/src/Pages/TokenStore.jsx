// src/Pages/TokenStore.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Organisms/DashboardLayout"; // Adjust path if needed

const cardData = [
  {
    title: "ERC20 Custom",
    price: "$200",
    image: "/Image/card.png",
    type: "custom",
  },
  {
    title: "Fireblocks ERC20",
    price: "$200",
    image: "/Image/card.png",
    type: "fireblocks",
  },
];

const TokenStore = () => {
  const navigate = useNavigate();

  const handleOrderClick = (type) => {
    navigate(`/tokens-store?type=${type}`);
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Choose Your Financing
      </h1>
      <div className="flex gap-6 flex-wrap">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow transition-all duration-300 transform group hover:scale-[1.05] hover:h-[370px] w-[320px] h-[310px] cursor-pointer"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-cyan-900 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col">
              <h2 className="font-bold text-lg">{card.title}</h2>
              <p className="text-sm mb-2">{card.price}</p>
              <div className="flex justify-end">
                <button
                  className="bg-white text-cyan-900 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
                  onClick={() => handleOrderClick(card.type)}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default TokenStore;

