import { useState } from "react";
import bgImage from "../assets/AI.png"; 

const WalletStats = () => {
  const [totalWon, setTotalWon] = useState("3200 NEAR");
  const [walletBalance, setWalletBalance] = useState("5000 NEAR");

  return (
    <div
      className="w-full md:w-1/2 max-w-lg p-6 text-white rounded-xl shadow-lg  border-[#432511] bg-cover bg-center border-b-4 border-r-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
   
      <h2 className="text-2xl font-lilita text-center text-yellow-400 mb-4 pb-2 border-b-2 border-yellow-400 w-3/4 mx-auto">
        Wallet Overview
      </h2>

      <div className="space-y-4">
      
        <div className="p-4 font-lilita rounded-lg shadow-md border border-[#5D4037] backdrop-blur-md bg-[#4E342E]/5">
          <p className="text-lg  text-yellow-400">💰 Total Money Won</p>
          <p className="text-xl ">{totalWon}</p>
          <button className="mt-2 w-full py-2 rounded-full bg-gradient-to-r  from-yellow-800 to-yellow-400 text-black  shadow-lg transition-all duration-300 hover:scale-105">
            Redeem Winnings
          </button>
        </div>

      
        <div className="p-4 rounded-lg shadow-md border font-lilita border-[#5D4037] backdrop-blur-md bg-[#4E342E]/5">
          <p className="text-lg  text-green-400">🏦 Wallet Balance</p>
          <p className="text-xl ">{walletBalance}</p>
          <button className="mt-2 w-full py-2 rounded-full bg-gradient-to-r from-[#6B8E23] to-[#59820d] text-white  shadow-lg transition-all duration-300 hover:scale-105">
            Add Money
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletStats;
