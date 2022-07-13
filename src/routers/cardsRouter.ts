import { Router } from "express";
import { createCard } from "../controllers/cardController.js";
import { getBalance } from "../controllers/transactionController.js";

import validateNewCard from "../middlewares/createCardMiddleware.js";



const cardRouter = Router();

cardRouter.post("/cards", validateNewCard, createCard );
cardRouter.get("/cards/:id", getBalance)

export default cardRouter;
