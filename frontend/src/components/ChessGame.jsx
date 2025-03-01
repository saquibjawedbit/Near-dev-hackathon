import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

const ChessGame = ({ aiModel }) => {
  const [game, setGame] = useState(new Chess());
  const [capturedWhite, setCapturedWhite] = useState([]);
  const [capturedBlack, setCapturedBlack] = useState([]);
  const [turn, setTurn] = useState("white");
  const [boardSize, setBoardSize] = useState(400);

  
  useEffect(() => {
    const updateBoardSize = () => {
      setBoardSize(window.innerWidth < 640 ? 280 : window.innerWidth < 1024 ? 380 : 480);
    };
    updateBoardSize();
    window.addEventListener("resize", updateBoardSize);
    return () => window.removeEventListener("resize", updateBoardSize);
  }, []);

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

  return (
    <div className="mt-20 min-h-screen flex flex-col items-center justify-center px-4 text-white">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
        Chess AI Battle: You vs {aiModel}
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
            onPieceDrop={onDrop}
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
    </div>
  );
};

export default ChessGame;
