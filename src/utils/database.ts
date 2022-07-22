import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING ||
  "mongodb+srv://aristides:YvZoU90TmD3SMPfC@festejos-blog.jjv2t.mongodb.net/?retryWrites=true&w=majority";

export async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info("Connected to database");
  } catch (error) {
    logger.error(error, "Error connecting to database");
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  try {
    await mongoose.connection.close();
    logger.info("Disconnected from database");
  } catch (error) {
    logger.error(error, "Error disconnecting from database");
    process.exit(1);
  }
}
