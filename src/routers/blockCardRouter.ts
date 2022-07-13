import { Router } from "express";
import { blockCard } from "../controllers/blockCardController.js";
import { unlockCard } from "../controllers/unlockCardController.js";
import validateCardLock from "../middlewares/lockCardMiddleware.js"

const blockCardRouter = Router();

blockCardRouter.patch("/cards/:id/block", validateCardLock, blockCard );
blockCardRouter.patch("/cards/:id/unlock", validateCardLock, unlockCard)

export default blockCardRouter;
