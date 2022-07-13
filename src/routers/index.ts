import { Router } from "express";
import activeRouter from "./acrtiveRouter.js";
import blockCardRouter from "./blockCardRouter.js";

import cardRouter from "./cardsRouter.js";
import purchaseRouter from "./purchaseRouter.js";
import rechargeRouter from "./rechargeRouter.js";


const router = Router();
router.use(cardRouter)
router.use(activeRouter)
router.use(purchaseRouter)
router.use(rechargeRouter)
router.use(blockCardRouter)

export default router;