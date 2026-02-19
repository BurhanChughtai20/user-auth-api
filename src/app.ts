import express from "express";
import routes from "./routes";
import { ENV } from "./config/env";
import errorMiddleware from "./middleware/error.middleware";

const app = express();

app.use(express.json());

app.use(ENV.API_BASE, routes);

app.use(errorMiddleware);

export default app;
