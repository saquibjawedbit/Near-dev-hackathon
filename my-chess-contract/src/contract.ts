// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view } from 'near-sdk-js';

@NearBindgen({})
class ChessBettingGame {
  
  static schema = {
    games: 'object', // Stores game info
  };

  // Mapping of gameId to game state
  games: Record<string, { player1: string, player2: string, betAmount: string, winner: string | null }> = {};

  @call({}) // Place a bet (Requires NEAR tokens)
  place_bet({ gameId }: { gameId: string }): void {
    const sender = near.predecessorAccountId();
    const deposit = near.attachedDeposit();

    near.log(`${sender} is placing a bet of ${deposit} yoctoNEAR on game ${gameId}`);

    if (!this.games[gameId]) {
      this.games[gameId] = { player1: sender, player2: "", betAmount: deposit.toString(), winner: null };
    } else if (!this.games[gameId].player2) {
      this.games[gameId].player2 = sender;
      this.games[gameId].betAmount = (BigInt(this.games[gameId].betAmount) + BigInt(deposit)).toString();
    } else {
      near.log("Game already has two players.");
      throw new Error("Game already has two players.");
    }
  }

  @call({}) // Set the winner (Admin function)
  set_winner({ gameId, winner }: { gameId: string, winner: string }): void {
    if (!this.games[gameId]) {
      near.log("Game not found.");
      throw new Error("Game not found.");
    }

    if (winner !== this.games[gameId].player1 && winner !== this.games[gameId].player2) {
      near.log("Winner must be one of the players.");
      throw new Error("Winner must be one of the players.");
    }

    this.games[gameId].winner = winner;
    near.log(`Winner set: ${winner} for game ${gameId}`);
  }

  @call({}) // Claim winnings (Winner withdraws funds)
  claim_winnings({ gameId }: { gameId: string }): void {
    if (!this.games[gameId]) {
      near.log("Game not found.");
      throw new Error("Game not found.");
    }
    
    if (!this.games[gameId].winner) {
      near.log("Winner not set.");
      throw new Error("Winner not set.");
    }

    const sender = near.predecessorAccountId();
    if (sender !== this.games[gameId].winner) {
      near.log("You are not the winner.");
      throw new Error("You are not the winner.");
    }

    const prize = BigInt(this.games[gameId].betAmount);
    this.games[gameId].betAmount = "0"; // Reset the bet amount

    near.log(`${sender} is claiming winnings of ${prize} yoctoNEAR`);

    // Transfer winnings to the winner
    const promise = near.promiseBatchCreate(sender);
    near.promiseBatchActionTransfer(promise, prize);
  }

  @view({}) // Get game details
  get_game({ gameId }: { gameId: string }): Record<string, string> {
    if (!this.games[gameId]) {
      near.log("Game not found.");
      throw new Error("Game not found.");
    }
    return this.games[gameId];
  }
}
