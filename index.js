// const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { moviesRouter } from "./routes/movies.js";
import { usersRouter } from "./routes/user.js";
import { genPassword } from "./routes/helper.js";
const app = express();

dotenv.config();
console.log(process.env);
// const mongo_url = "mongodb://localhost";
const mongo_url = process.env.mongo_url;

async function createConnection() {
  const client = new MongoClient(mongo_url);
  await client.connect();
  console.log("Connected to Mongo");
  return client;
}

export const client = await createConnection();
//express.json()- middleware inbuilt
//app.use- applies middlewear to all the request to convert to js objects
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.get("/", function (req, res) {
  res.send("first node.....👍");
});

app.use("/movies", moviesRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

// markapur road
// 9901844387

console.log(await genPassword("password@123"));
