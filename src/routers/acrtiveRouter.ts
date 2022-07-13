import { Router } from "express";
import { activeCard } from "../controllers/activeCardController.js";

import validateActivation from "../middlewares/activeCardMiddleware.js";



const activeRouter = Router();

activeRouter.patch("/cards/:id/active", validateActivation, activeCard)


export default activeRouter;