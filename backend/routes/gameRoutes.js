import express from "express"
import { getMatchResult, startMatch } from "../controllers/gameController.js";

const gameRouter = express.Router();

gameRouter.post("/start-match", startMatch );
gameRouter.get("/match-result/:gameId",getMatchResult );

export default gameRouter;