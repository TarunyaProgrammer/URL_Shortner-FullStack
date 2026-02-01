import express from "express";
const app = express();
import { nanoid } from "nanoid";
import dotenv from "dotenv";
dotenv.config("./.env");
import fielcabinet from "./src/config/mongo.config.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/create", (req, res) => {
  const url = req.body.url;
  console.log(url);
  res.send(nanoid(7));
});

app.listen(3000, () => {
  fielcabinet();
  console.log("Server is running!! on ", `http://localhost:3000/`);
});
