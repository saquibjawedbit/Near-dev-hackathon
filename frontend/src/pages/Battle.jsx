import { useEffect, useState } from "react";
import ChessGame from "../components/ChessGame";
import MatchSetup from "../components/MatchSetup";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { ChessContract } from "../config.js";

const Battle = () => {
  const { signedAccountId, callFunction, viewFunction } = useWalletSelector();
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const [betAmount, setBetAmount] = useState(0);
  const [gameId, setGameId] = useState("");

  async function handlePlaceBet() {
    try {
      let gameID = await callFunction({
        contractId: ChessContract,
        method: "join_queue",
      });
      
      console.log("Bet placed:", gameID);
      return gameID;
    } catch (error) {
      console.error("Bet failed:", error);
      alert("Error placing bet.");
    }
  }


  const startGame = async (model, bet) => {
    try {
      const gameId = await handlePlaceBet();
      const response = await axios.post("http://localhost:5000/api/game/start-match", {gameId});

      if (response.data && response.data.gameId) {
        setSelectedModel(model);
        setBetAmount(bet);
        setGameId(response.data.gameId);
        setGameStarted(true);
        console.log("Game ID:", response.data.gameId);

        await handlePlaceBet();
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
