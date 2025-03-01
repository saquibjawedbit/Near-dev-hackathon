import { useState } from "react";
import ChessGame from "../components/ChessGame";
import MatchSetup from "../components/MatchSetup";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { initNear, getContract } from "../blockchain/authentication";

const Battle = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const [betAmount, setBetAmount] = useState(0);
  const [gameId, setGameId] = useState("");
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);
  const [accountId, setAccountId] = useState("");

  async function handlePlaceBet(gameId) {
    if (!contract) return alert("Connect wallet first!");
    try {
      await contract.place_bet(
        { gameId: gameId }, // Change gameId dynamically
        "30000000000000", // Gas (Optional: ~30 TGas)
        "1000000000000000000000000" // Bet Amount in YoctoNEAR (1 NEAR)
      );
      alert("Bet placed successfully!");
    } catch (error) {
      console.error("Bet failed:", error);
      alert("Error placing bet.");
    }
  }


  const startGame = async (model, bet) => {

    try {
      handlePlaceBet();
      const response = await axios.post("http://localhost:5000/api/game/start-match");

      if (response.data && response.data.gameId) {
        setSelectedModel(model);
        setBetAmount(bet);
        setGameId(response.data.gameId);
        console.log("Game ID:", response.data.gameId);

        await handlePlaceBet(gameId);
        setGameStarted(true);
      } else {
        console.error("Game ID not received from the server");
      }
    } catch (error) {
      console.error("Error starting the game:", error);
    }
  };

  useEffect(() => {
    async function setup() {
      const { wallet } = await initNear();
      setWallet(wallet);
      setAccountId(wallet.getAccountId());
      if (wallet.isSignedIn()) {
        setContract(await getContract(wallet));
      }
    }
    setup();
  }, []);

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
