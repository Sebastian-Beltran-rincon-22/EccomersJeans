import { config } from "dotenv";
config();

export const MONGO_DB_URI =
  process.env.MONGO_DB_URI || "mongodb://localhost/api";
export const PORT = process.env.PORT || 4000;
export const SECRET = process.env.SECRET;

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const ADMIN_ROLES = process.env.ADMIN_ROLES
