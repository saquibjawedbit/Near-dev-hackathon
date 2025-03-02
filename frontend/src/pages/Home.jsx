import { useState } from "react";
import StartNewMatch from "../components/StartNewMatch";
import WalletStats from "../components/WalletStats";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PreviousMatches from "../components/PreviousMatches";
import MatchSetup from "../components/MatchSetup"; 
import axios from "axios";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const [gameId,setGameId] = useState("");
  const backendUrl = "https://near-dev-hackathon.onrender.com/";

  const startGame = async (model, bet) => {

    try {
      const response = await axios.post(`${backendUrl}api/game/start-match`);

      if (response.data && response.data.gameId) {
        setSelectedModel(model);
        // setBetAmount(bet);
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
    <div className="bg-gradient-to-br from-[#231205] to-[#3d1a00] w-full min-h-screen relative">
      <Header />
      <div className="pt-24 flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-12">
      
        <StartNewMatch openModal={() => setIsModalOpen(true)} />
        <WalletStats />
      </div>

      <div>
        <PreviousMatches />
      </div>

      <Footer />

    
      {isModalOpen && <MatchSetup startGame={startGame} closeModal={() => setIsModalOpen(false)} />}
        
    </div>
  );
};

export default Home;
