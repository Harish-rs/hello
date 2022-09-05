// const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
const app = express();

dotenv.config();
// console.log(process.env);
// const mongo_url = "mongodb://localhost";
const mongo_url = process.env.mongo_url;

async function createConnection() {
  const client = new MongoClient(mongo_url);
  await client.connect();
  console.log("Connected to Mongo");
  return client;
}

const client = await createConnection();
//express.json()- middleware inbuilt
//app.use- applies middlewear to all the request to convert to js objects
app.use(express.json());

const movies = [
  {
    id: "100",
    name: "Iron man 2",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
    rating: 7,
    summary:
      "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
    trailer: "https://www.youtube.com/embed/wKtcmiifycU",
  },
  {
    id: "101",
    name: "No Country for Old Men",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
    rating: 8.1,
    summary:
      "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
    trailer: "https://www.youtube.com/embed/38A__WT3-o0",
  },
  {
    id: "102",
    name: "Jai Bhim",
    poster:
      "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
    summary:
      "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
    rating: 8.8,
    trailer: "https://www.youtube.com/embed/nnXpbTFrqXA",
  },
  {
    id: "103",
    name: "The Avengers",
    rating: 8,
    summary:
      "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
    poster:
      "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
    trailer: "https://www.youtube.com/embed/eOrNdBpGMv8",
  },
  {
    id: "104",
    name: "Interstellar",
    poster: "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
    rating: 8.6,
    summary:
      "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
  },
  {
    id: "105",
    name: "Baahubali",
    poster: "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
    rating: 8,
    summary:
      "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
    trailer: "https://www.youtube.com/embed/sOEg_YZQsTI",
  },
  {
    id: "106",
    name: "Ratatouille",
    poster:
      "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
    rating: 8,
    summary:
      "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
    trailer: "https://www.youtube.com/embed/NgsQ8mVkN8w",
  },
];
const PORT = process.env.PORT;

app.get("/", function (req, res) {
  res.send("first node.....👍");
});

app.get("/movies", async function (req, res) {
  // const { rating } = req.query;
  const filter = req.query;
  if (filter.rating) {
    filter.rating = +filter.rating;
  }
  console.log(filter);

  //db.practice.practice.find()
  // find return cursor with pagination 2o document at a time
  // we need array of movies so toArray() converts cursor to Array
  const all_movies = await client
    .db("practice")
    .collection("practice")
    .find(req.query)
    .toArray();
  console.log(all_movies.length);

  all_movies.length <= 0
    ? res.status(404).send({ msg: "movies not found" })
    : res.send(all_movies);

  // rating
  //   ? res.send(movies.filter((mv) => mv.rating == rating))
  //   : res.send(movies);
});

app.get("/movies/:id", async function (req, res) {
  const { id } = req.params;
  console.log(id);
  //db.practice.findone({id: "104"});
  const movie = await client
    .db("practice")
    .collection("practice")
    .findOne({ id: id });
  console.log(movie);
  !movie ? res.status(404).send({ msg: "movie not found" }) : res.send(movie);
});

app.post("/movies", async function (req, res) {
  const new_movie = req.body;
  console.log(new_movie);
  //db.practice.practice.insertMany(new_movie);

  const result = await client
    .db("practice")
    .collection("practice")
    .insertMany(new_movie);

  res.send(result);
});

app.delete("/movies/:id", async function (req, res) {
  const { id } = req.params;
  console.log(id);
  //db.practice.practice.deleteone({id: "104"});
  const result = await client
    .db("practice")
    .collection("practice")
    .deleteOne({ id: id });
  console.log(result);
  !result ? res.status(404).send({ msg: "movie not found" }) : res.send(result);
});

app.put("/movies/:id", async function (req, res) {
  const { id } = req.params;
  const update_data = req.body;
  console.log(update_data);
  console.log(id);
  //db.practice.update({id: "104"},{$set: update_data});
  const result = await client
    .db("practice")
    .collection("practice")
    .updateOne({ id: id }, { $set: update_data });

  console.log(result);
  res.send(result);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

// markapur road
// 9901844387
