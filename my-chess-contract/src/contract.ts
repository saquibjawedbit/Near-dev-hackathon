import { NearBindgen, near, call, view, initialize } from 'near-sdk-js';

@NearBindgen({})
export class ChessBettingGame {
  games: Record<string, { player1: string, player2: string, betAmount: string, winner: string | null }> = {};
  waitingPlayers: string[] = [];
  playerToGameId: Record<string, string> = {};

  @initialize({})
  init(): void {
    this.games = {};
    this.waitingPlayers = [];
    this.playerToGameId = {};
  }

  @call({})
  join_queue(): string {
    const player = near.predecessorAccountId();
    const betAmount = BigInt("1000000000000000000000000"); // 1 NEAR in yoctoNEAR

    near.log(`${player} joined matchmaking with a default bet of 1 NEAR.`);

    if (near.accountBalance() < betAmount) {
      throw new Error("Insufficient balance. You need at least 1 NEAR.");
    }

    let waitingPlayers: string[] = JSON.parse(near.storageRead("waitingPlayers") || "[]");
    let games = JSON.parse(near.storageRead("games") || "{}");
    let playerToGameId = JSON.parse(near.storageRead("playerToGameId") || "{}");

    if (waitingPlayers.length > 0) {
      let opponent = waitingPlayers.shift()!;
      let gameId = `${player}_${opponent}`;

      games[gameId] = { player1: player, player2: opponent, betAmount: betAmount.toString(), winner: null };
      playerToGameId[player] = gameId;
      playerToGameId[opponent] = gameId;

      near.storageWrite("games", JSON.stringify(games));
      near.storageWrite("playerToGameId", JSON.stringify(playerToGameId));
      near.storageWrite("waitingPlayers", JSON.stringify(waitingPlayers));

      near.log(`Match found: ${player} vs ${opponent} (Game ID: ${gameId}) with 1 NEAR bet.`);
      return gameId;
    } else {
      waitingPlayers.push(player);
      near.storageWrite("waitingPlayers", JSON.stringify(waitingPlayers));
      return "Waiting for an opponent...";
    }
  }

  @call({})
  set_winner({ gameId, winner }: { gameId: string, winner: string }): void {
    let games = JSON.parse(near.storageRead("games") || "{}");

    if (!games[gameId]) {
      near.log(`Game ID: ${gameId}`);
      near.log(`Games: ${JSON.stringify(games)}`);
      near.log("Game not found.");
      throw new Error("Game not found.");
    }
    if (![games[gameId].player1, games[gameId].player2].includes(winner)) {
      throw new Error("Winner must be a player.");
    }

    games[gameId].winner = winner;
    near.storageWrite("games", JSON.stringify(games));
    near.log(`Winner set: ${winner} for game ${gameId}`);
  }

  @call({})
  claim_winnings({ gameId }: { gameId: string }): void {
    let games = JSON.parse(near.storageRead("games") || "{}");

    if (!games[gameId]) throw new Error("Game not found.");
    if (!games[gameId].winner) throw new Error("Winner not set.");

    const sender = near.predecessorAccountId();
    if (sender !== games[gameId].winner) throw new Error("You are not the winner.");

    const prize = BigInt(games[gameId].betAmount) * BigInt(2);
    games[gameId].betAmount = "0";

    near.storageWrite("games", JSON.stringify(games));
    near.log(`${sender} is claiming winnings of ${prize} yoctoNEAR.`);

    const promise = near.promiseBatchCreate(sender);
    near.promiseBatchActionTransfer(promise, prize);
  }

  @view({})
  get_match({ player }: { player: string }): string {
    let playerToGameId = JSON.parse(near.storageRead("playerToGameId") || "{}");
    return playerToGameId[player] || "No match yet";
  }

  @view({})
  get_game({ gameId }: { gameId: string }) {
    let games = JSON.parse(near.storageRead("games") || "{}");
    if (!games[gameId]) throw new Error("Game not found.");
    return games[gameId];
  }
}
