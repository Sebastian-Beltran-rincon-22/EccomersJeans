import mongoose from "mongoose";
import { config } from "dotenv";
config();

const MONGO_DB_URI = process.env.MONGO_DB_URI

const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
mongoose.set("strictQuery", false);

// database connection
mongoose
  .connect(MONGO_DB_URI, connectionOptions )
  .then((db) => console.log("Db is connected"))
  .catch((error) => console.log(error));
