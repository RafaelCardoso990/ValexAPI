import { Router } from "express";
import { purchase } from "../controllers/purchaseController.js";
import validatePurchases from "../middlewares/purchaseCardMiddleware.js";


const purchaseRouter = Router();

purchaseRouter.post("/purchase/:id", validatePurchases, purchase)

export default purchaseRouter;
