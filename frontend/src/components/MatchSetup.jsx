import { useState } from "react";

const MatchSetup = ({ closeModal, startGame }) => {
  const [bet, setBet] = useState(0);
  const [aiModel, setAiModel] = useState("Stockfish");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="max-w-6xl mx-auto bg-[#3E2723] bg-opacity-40 backdrop-blur-md shadow-2xl rounded-2xl p-8 text-center border-b-4 border-r-4 border-amber-700">
        
        <button
          onClick={closeModal}
          className="absolute top-4 right-6 font-extrabold text-red-700 text-2xl hover:text-yellow-500"
        >
          X
        </button>

        <h2 className="text-4xl font-lilita mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#CFAF50]">
          Match Setup
        </h2>

        <label className="text-lg text-[#D7CCC8] mb-2 block">Choose AI Model:</label>
        <select
          value={aiModel}
          onChange={(e) => setAiModel(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#3E2723] bg-opacity-50 border border-[#8D6E63] text-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#CFAF50]"
        >
          <option value="Stockfish">Stockfish</option>
          <option value="RL-Agent">RL-Based AI</option>
        </select>

        <label className="text-lg text-[#D7CCC8] mt-4 mb-2 block">Enter Bet Amount:</label>
        <input
          type="number"
          className="w-full p-3 rounded-lg bg-[#3E2723] bg-opacity-50 border border-[#8D6E63] text-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#CFAF50]"
          value={bet}
          onChange={(e) => setBet(e.target.value)}
          min="1"
        />

        <button
          onClick={() => {
            startGame(aiModel, bet); 
            closeModal(); 
          }}
          className="mt-6 w-full py-3 rounded-full font-lilita bg-gradient-to-r from-[#FFD54F] to-[#FFB300] text-black shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
        >
          Start Game ♟️
        </button>
      </div>
    </div>
  );
};

export default MatchSetup;
