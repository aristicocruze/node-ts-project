import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "./utils/logger";
import { connectToDatabase, disconnectFromDatabase } from "./utils/database";
import { CORS_ORIGIN } from "./constants";
import helmet from "helmet";
import routes from "./routes";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

app.use(helmet());

// routes.
app.use("/api/v1", routes);

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`Server listening on port ${PORT}`);
});

const signals = ["SIGTERM", "SIGINT"];

function gracefullShutdown(signal: string) {
  process.on(signal, async () => {
    server.close();
    // disconnect from db.
    await disconnectFromDatabase();
    logger.info(`Server received ${signal}`);
    process.exit(0);
  });
}

for (let i = 0; i < signals.length; i++) {
  gracefullShutdown(signals[i]);
}
