import express from "express";
import { nanoid } from "nanoid";
import mongoose from "mongoose";

// const urlDatabase = {}; //* Deleting this -> MongoDB

// & mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/url-shortener")
  .then(() => {
    // console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  longUrl: {
    type: String,
    required: true,
  },
});

const Url = mongoose.model("Url", urlSchema);

// & express
const app = express();

app.use(express.json());

app.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "longUrl is required" });
  }
  const shortId = nanoid(6);

  await Url.create({
    shortId,
    longUrl,
  });

  res.json({
    shortId,
    shortUrl: `http://localhost:3000/${shortId}`,
  });
});

app.get("/", (req, res) => {
  res.send("URL shortner");
});

app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  const urlDoc = await Url.findOne({ shortId });

  if (!urlDoc) {
    return res.status(404).send("Short URL not found");
  }
  res.redirect(urlDoc.longUrl);
});

app.listen(3000, () => {
  console.log("Server listening on ", `http://localhost:3000/`);
});
