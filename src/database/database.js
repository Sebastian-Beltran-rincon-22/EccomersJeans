import mongoose from "mongoose";
import { config } from "dotenv";
config();

const MONGO_DB_URI = process.env.MONGO_DB_URI

const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
mongoose.set("strictQuery", false);
const COLLECTION_NAME = 'eccommerce';
// database connection
mongoose
  .connect(`${MONGO_DB_URI}/${COLLECTION_NAME}`, connectionOptions )
  .then(() => console.log("Db is connected"))
  .catch((error) => console.log(error));
