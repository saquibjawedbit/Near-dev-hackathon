// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view } from 'near-sdk-js';

@NearBindgen({})
export class ChessBettingGame {
  
  static schema = {
    games: 'object',
  };

  // Stores gameId → game details
  games: Record<string, { player1: string, player2: string, betAmount: string, winner: string | null }> = {};

  // Matchmaking Queue
  waitingPlayers: string[] = [];
  playerToGameId: Record<string, string> = {};

  @call({})
  join_queue(): string {
    const player = near.predecessorAccountId();
    const betAmount = BigInt("1000000000000000000000000"); // 1 NEAR in yoctoNEAR

    near.log(`${player} joined matchmaking with a default bet of 1 NEAR.`);

    if (near.accountBalance() < betAmount) {
      near.log("Insufficient balance to place the bet.");
      throw new Error("Insufficient balance. You need at least 1 NEAR.");
    }

    if (this.waitingPlayers.length > 0) {
      let opponent = this.waitingPlayers.shift()!;
      let gameId = near.blockIndex.toString() + "_" + player + "_" + opponent;

      // Store match details
      this.games[gameId] = { player1: player, player2: opponent, betAmount: betAmount.toString(), winner: null };
      this.playerToGameId[player] = gameId;
      this.playerToGameId[opponent] = gameId;

      // Deduct 1 NEAR from each player
      const playerPromise = near.promiseBatchCreate(player);
      near.promiseBatchActionTransfer(playerPromise, betAmount);

      const opponentPromise = near.promiseBatchCreate(opponent);
      near.promiseBatchActionTransfer(opponentPromise, betAmount);

      near.log(`Match found: ${player} vs ${opponent} (Game ID: ${gameId}) with 1 NEAR bet.`);
      return gameId;
    } else {
      this.waitingPlayers.push(player);
      return "Waiting for an opponent...";
    }
  }

  @call({})
  set_winner({ gameId, winner }: { gameId: string, winner: string }): void {
    if (!this.games[gameId]) throw new Error("Game not found.");
    if (![this.games[gameId].player1, this.games[gameId].player2].includes(winner)) {
      throw new Error("Winner must be a player.");
    }

    this.games[gameId].winner = winner;
    near.log(`Winner set: ${winner} for game ${gameId}`);
  }

  @call({})
  claim_winnings({ gameId }: { gameId: string }): void {
    if (!this.games[gameId]) throw new Error("Game not found.");
    if (!this.games[gameId].winner) throw new Error("Winner not set.");

    const sender = near.predecessorAccountId();
    if (sender !== this.games[gameId].winner) throw new Error("You are not the winner.");

    const prize = BigInt(this.games[gameId].betAmount) * BigInt(2); // Winner gets the full bet amount
    this.games[gameId].betAmount = "0"; // Reset bet amount

    near.log(`${sender} is claiming winnings of ${prize} yoctoNEAR.`);

    // Transfer winnings
    const promise = near.promiseBatchCreate(sender);
    near.promiseBatchActionTransfer(promise, prize);
  }

  @view({})
  get_match({ player }: { player: string }): string {
    return this.playerToGameId[player] || "No match yet";
  }

  @view({})
  get_game({ gameId }: { gameId: string }) {
    if (!this.games[gameId]) throw new Error("Game not found.");
    return this.games[gameId];
  }
}
