import { Router } from "express";
import { rechargeCard } from "../controllers/rechargeCardController.js";


import validateCardRecharge from "../middlewares/rechargeCardMiddleware.js";

const rechargeRouter = Router();

rechargeRouter.post("/cards/:id/recharge", validateCardRecharge, rechargeCard)

export default rechargeRouter;
