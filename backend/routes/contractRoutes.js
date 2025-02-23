import express from "express"
import { declareWinner, depositMoney } from "../controllers/contractController.js";


const contractRouter = express.Router();

contractRouter.post("/deposit", depositMoney );
contractRouter.post("/declare-winner",declareWinner );

export default gameRouter;