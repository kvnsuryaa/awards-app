require("dotenv").config();
const { Pool } = require("pg");

const host = process.env.DB_HOST || "localhost";
const user = process.env.DB_USER || "postgres";
const pass = process.env.DB_PASS || "garry1234";
const port = process.env.DB_PORT || "5432";
const name = process.env.DB_NAME || "awards_db";
const ssl = process.env.DB_SSL || "false";

const config = {
  host: host,
  user: user,
  password: pass,
  port: port,
  database: name,
};

if (ssl === "true") config.ssl = { rejectUnauthorized: false };
const client = new Pool(config);
client.connect().catch((err) => console.log("Error while connecting DB", err));

module.exports = client;
