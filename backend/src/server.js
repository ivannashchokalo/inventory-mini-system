import express from "express";
import "dotenv/config";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";
import productsRouts from "./routes/productsRoutes.js";
import { errors } from "celebrate";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(express.json());
app.use(cors());

app.use("/products", productsRouts);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
