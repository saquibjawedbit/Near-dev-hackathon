import { useState } from "react";
import ChessGame from "../components/ChessGame";
import MatchSetup from "../components/MatchSetup";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const Battle = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const [betAmount, setBetAmount] = useState(0);
  const [gameId,setGameId] = useState("");
  

  const startGame = async (model, bet) => {

    try {
      const response = await axios.post("http://localhost:5000/api/game/start-match");

      if (response.data && response.data.gameId) {
        setSelectedModel(model);
        setBetAmount(bet);
        setGameId(response.data.gameId);
        console.log("Game ID:", response.data.gameId);
        setGameStarted(true);
      } else {
        console.error("Game ID not received from the server");
      }
    } catch (error) {
      console.error("Error starting the game:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black to-amber-950 text-white">
      <Header />

      <div className="flex-1 flex items-center justify-center">
        {!gameStarted ? (
          <MatchSetup startGame={startGame} />
        ) : (
          <ChessGame aiModel={selectedModel} gameID={gameId} />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Battle;
