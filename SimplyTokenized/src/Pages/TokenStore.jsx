// src/Pages/TokenStore.jsx
import React from "react";
import TokenStoreLayout from "@/Templates/TokenStoreLayout";

const cardData = [
  {
    title: "ERC20 Custom",
    price: "$200",
    image: "/Image/card.png",
  },
  {
    title: "Fireblocks ERC20",
    price: "$200",
    image: "/Image/card.png",
  },
];

const TokenStore = () => {
  return (
    <TokenStoreLayout>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 ml-4">
        Choose Your Financing
      </h1>
      <div className="flex gap-4 ml-4">
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
          <button className="bg-white text-cyan-900 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition">
            Order Now
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

    </TokenStoreLayout>
  );
};

export default TokenStore;
