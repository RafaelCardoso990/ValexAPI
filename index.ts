import express from "express"
import 'express-async-errors';
import cors from "cors"
import router from "./src/routers/index.js";
import dotenv from "dotenv"
import errorHandle from "./src/middlewares/errorHandlerMiddleware.js";

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())
app.use(router)
app.use(errorHandle)

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running on port " + port );
});