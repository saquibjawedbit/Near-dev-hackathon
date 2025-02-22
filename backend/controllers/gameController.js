import axios from "axios";
import { Server } from "socket.io";
import { Chess } from "chess.js";

const io = new Server({
  cors: { origin: "*" },
});

let liveMatches = {};

async function getBestMove(fen) {
  try {
    const response = await axios.get(
      `https://stockfish.online/api/s/v2.php?fen=${encodeURIComponent(fen)}&depth=15`
    );

    if (!response.data.success || !response.data.bestmove) {
      console.error("Invalid move response:", response.data);
      return null;
    }

    return response.data.bestmove.split(" ")[1];
  } catch (error) {
    console.error("Error fetching move:", error);
    return null;
  }
}

function getRandomMove(chess) {
  const legalMoves = chess.moves({ verbose: true });
  if (legalMoves.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * legalMoves.length);
  return legalMoves[randomIndex].san; 
}

async function playAIvsAI(gameId) {
  let chess = new Chess();
  let moves = [];

  while (!chess.isGameOver()) {
    let move;
    
    if (moves.length === 0) {
      move = "e2e4"; 
    } else {
      const useBestMove = Math.random() > 0.5;
      move = useBestMove ? await getBestMove(chess.fen()) : getRandomMove(chess);
    }

    if (!move || !chess.move(move)) break;

    console.log(`Move ${moves.length + 1}:`, move);
    moves.push(move);

    liveMatches[gameId] = { moves, winner: null };

    // Emit move to frontend
    io.emit(`match-update-${gameId}`, { moves });

    await new Promise((resolve) => setTimeout(resolve, 3000)); // Delay for 3s

    if (chess.isGameOver()) break;
  }

  // Determine winner
  let winner;
  if (chess.isCheckmate()) {
    winner = chess.turn() === "w" ? "AI 2" : "AI 1";
  } else if (chess.isStalemate()) {
    winner = "Draw (Stalemate)";
  } else if (chess.isInsufficientMaterial()) {
    winner = "Draw (Insufficient Material)";
  } else if (chess.isThreefoldRepetition()) {
    winner = "Draw (Threefold Repetition)";
  } else {
    winner = "Draw (50-move rule)";
  }

  console.log("Game Over! Winner:", winner);
  liveMatches[gameId] = { moves, winner };

  // Emit game result
  io.emit(`match-end-${gameId}`, { winner, moves });
}

// Start a match
export const startMatch = (req, res) => {
  const gameId = `game-${Date.now()}`;
  liveMatches[gameId] = { moves: [], winner: null };

  playAIvsAI(gameId);
  res.json({ gameId, message: "Match started" });
};

// Get match result
export const getMatchResult = (req, res) => {
  const { gameId } = req.params;
  if (liveMatches[gameId]) {
    res.json(liveMatches[gameId]);
  } else {
    res.status(404).json({ error: "Match not found" });
  }
};
