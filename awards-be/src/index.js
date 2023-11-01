require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 7070;
const NODE_ENV = process.env.NODE_ENV || "dev";

if (NODE_ENV !== "prod") {
  const cors = require("cors");
  app.use(cors());
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

// Routing
const router = require("./router");
app.use("/api/v1", router);

app.listen(PORT, () => console.log(`Listen at port :${PORT}`));
