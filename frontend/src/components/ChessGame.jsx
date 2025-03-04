import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChessGame = ({ aiModel , gameID }) => {
  const [game, setGame] = useState(new Chess());
  const [capturedWhite, setCapturedWhite] = useState([]);
  const [capturedBlack, setCapturedBlack] = useState([]);
  const [turn, setTurn] = useState("white");
  const [boardSize, setBoardSize] = useState(400);
  const [moves, setMoves] = useState([]);
  const [winner,setWinner] = useState(null);
  const backendUrl = "https://near-dev-hackathon.onrender.com/";

  const navigate = useNavigate();

  
  useEffect(() => {
    const updateBoardSize = () => {
      setBoardSize(window.innerWidth < 640 ? 280 : window.innerWidth < 1024 ? 380 : 480);
    };
    updateBoardSize();
    window.addEventListener("resize", updateBoardSize);
    return () => window.removeEventListener("resize", updateBoardSize);
  }, []);

  useEffect(() => {
    if (!gameID) return;

    const fetchMoves = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/game/match-result/${gameID}`);
        if (response.data && response.data.moves) {
          setMoves(response.data.moves);
          if (response.data.winner) {
            setWinner(response.data.winner);
            clearInterval(interval);
            console.log("Game Over! Winner:", response.data.winner);
          }
        }
      } catch (error) {
        console.error("Error fetching game moves:", error);
      }
    };

    fetchMoves();
    
    const interval = setInterval(fetchMoves, 1000); 

    return () => clearInterval(interval);
  }, [gameID]);

  useEffect(() => {
    if (moves.length === 0) return;

    let newGame = new Chess();
    let newCapturedWhite = [];
    let newCapturedBlack = [];

    console.log(moves)

    moves.forEach((move) => {
      let moveResult = newGame.move(move);
      if (moveResult && moveResult.captured) {
        if (moveResult.color === "w") {
          newCapturedWhite.push(moveResult.captured.toUpperCase());
        } else {
          newCapturedBlack.push(moveResult.captured.toUpperCase());
        }
      }
    });

    setGame(newGame);
    setCapturedWhite(newCapturedWhite);
    setCapturedBlack(newCapturedBlack);
    setTurn(newGame.turn() === "w" ? "white" : "black");
  }, [moves]);

  const onDrop = (source, target) => {
    let move = game.move({ from: source, to: target, promotion: "q" });

    if (move === null) return false;


    if (move.captured) {
      if (move.color === "w") {
        setCapturedWhite([...capturedWhite, move.captured.toUpperCase()]);
      } else {
        setCapturedBlack([...capturedBlack, move.captured.toUpperCase()]);
      }
    }

    
    setGame(new Chess(game.fen()));
    setTurn(game.turn() === "w" ? "white" : "black");
    return true;
  };

  const handlePlayAgain = () => {
    navigate("/battle");
  };

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div className="mt-20 min-h-screen flex flex-col items-center justify-center px-4 text-white">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
        Chess AI Battle: {aiModel} vs {aiModel}
      </h2>

    
      <p className="text-lg md:text-xl font-semibold mb-3">
        Turn: <span className={turn === "white" ? "text-yellow-300" : "text-red-400"}>{turn.toUpperCase()}</span>
      </p>

      <div className="flex flex-col lg:flex-row gap-6 items-center w-full max-w-5xl">
      
        <div className="bg-red-500/20 p-4 rounded-lg w-full lg:w-1/5">
          <h3 className="text-lg font-semibold text-red-400 mb-2 text-center">Your Captured Pieces</h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            {capturedBlack.map((piece, index) => (
              <span key={index} className="text-black">{piece}</span>
            ))}
          </div>
        </div>

       
        <div className="p-6 bg-white bg-opacity-10 backdrop-blur-md shadow-xl rounded-2xl border border-white/20">
          <Chessboard
            position={game.fen()}
            boardWidth={boardSize}
            customBoardStyle={{
              borderRadius: "12px",
              boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.3)",
            }}
          />
        </div>

     
        <div className="bg-yellow-300/20 p-4 rounded-lg w-full lg:w-1/5">
          <h3 className="text-lg font-semibold text-yellow-300 mb-2 text-center">{aiModel}'s Captured Pieces</h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            {capturedWhite.map((piece, index) => (
              <span key={index} className="text-white">{piece}</span>
            ))}
          </div>
        </div>
      </div>

      {winner && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
    <div className="bg-red-950/90 text-yellow-300 p-10 rounded-xl shadow-2xl text-center w-96 md:w-[500px] lg:w-[600px] h-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Game Over!</h2>
      <p className="text-xl md:text-2xl font-semibold">
        Winner: <span className="text-green-400">{winner}</span>
      </p>
      <div className="mt-6 flex justify-center gap-6">
        <button
          onClick={handlePlayAgain}
          className="px-6 py-3 bg-yellow-500 text-black text-lg rounded-lg hover:bg-yellow-600 transition"
        >
          Play Again
        </button>
        <button
          onClick={handleGoHome}
          className="px-6 py-3 bg-yellow-500 text-black text-lg rounded-lg hover:bg-yellow-600 transition"
        >
          Home
        </button>
        
      </div>
      <p className="text-sm md:text-sm font-semibold text-gray-500 mt-6">
        The winning amount tansfered to the winner's account
      </p>
    </div>
  </div>
)}

    </div>
  );
};

export default ChessGame;
