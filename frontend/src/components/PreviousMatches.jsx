import { useState } from "react";

const PreviousMatches = () => {
  
  const [matches, setMatches] = useState([
    {
      id: 1,
      ai1: "Stockfish",
      ai2: "AlphaZero",
      winner: "AlphaZero",
      betPool: "1500 NEAR",
      date: "Feb 12, 2025",
    },
    {
      id: 2,
      ai1: "DeepBlue",
      ai2: "Leela Chess Zero",
      winner: "Leela Chess Zero",
      betPool: "2200 NEAR",
      date: "Feb 11, 2025",
    },
    {
      id: 3,
      ai1: "Komodo",
      ai2: "Stockfish",
      winner: "Stockfish",
      betPool: "1800 NEAR",
      date: "Feb 10, 2025",
    },
  ]);

  return (
    <div className="m-10 mt-10 p-6 bg-gradient-to-br from-yellow-500 to-[#847106] rounded-3xl shadow-2xl border-b-4 border-r-4 border-[#69521b] text-white">
    
      <h2 className="text-3xl font-lilita text-center text-transparent bg-clip-text bg-gradient-to-b from-red-600 to-[#6a1008] mb-4">
        Previous AI Battles
      </h2>
      <div className="w-3/4 mx-auto border-b-2 border-[#6a1008] mb-6"></div>

      <div className="flex flex-wrap gap-6 justify-center">
        {matches.map((match) => (
          <div
            key={match.id}
            className="p-4 rounded-lg shadow-lg border border-[#5D4037] hover:scale-105 transition duration-300 w-80 backdrop-blur-md bg-[#3E2723]/80"
          >
            <div className="flex flex-col gap-2">
              <div className="text-lg font-bold text-yellow-400">
                {match.ai1} 🆚 {match.ai2}
              </div>
              <div className="text-sm text-gray-300">
                🏆 Winner: <span className="font-bold text-green-400">{match.winner}</span>
              </div>
              <div className="text-sm text-gray-300">
                💰 Bet Pool: <span className="font-bold text-blue-400">{match.betPool}</span>
              </div>
              <div className="text-xs text-gray-400">📅 {match.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousMatches;
