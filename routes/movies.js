import express from "express";
import {
  getMovieByFilter,
  getMovieById,
  createMovies,
  deleteMovieById,
  updateMovieById,
} from "./helper.js";
const router = express.Router();

router.get("/", async function (req, res) {
  // const { rating } = req.query;
  const filter = req.query;
  if (filter.rating) {
    filter.rating = +filter.rating;
  }
  console.log(filter);

  //db.practice.practice.find()
  // find return cursor with pagination 2o document at a time
  // we need array of movies so toArray() converts cursor to Array
  const all_movies = await getMovieByFilter(req);
  console.log(all_movies.length);

  all_movies.length <= 0
    ? res.status(404).send({ msg: "movies not found" })
    : res.send(all_movies);

  // rating
  //   ? res.send(movies.filter((mv) => mv.rating == rating))
  //   : res.send(movies);
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  console.log(id);
  //db.practice.findone({id: "104"});
  const movie = await getMovieById(id);
  console.log(movie);
  !movie ? res.status(404).send({ msg: "movie not found" }) : res.send(movie);
});

router.post("/", async function (req, res) {
  const new_movie = req.body;
  console.log(new_movie);
  //db.practice.practice.insertMany(new_movie);

  const result = await createMovies(new_movie);

  res.send(result);
});

router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  console.log(id);
  //db.practice.practice.deleteone({id: "104"});
  const result = await deleteMovieById(id);
  console.log(result);
  !result ? res.status(404).send({ msg: "movie not found" }) : res.send(result);
});

router.put("/:id", async function (req, res) {
  const { id } = req.params;
  const update_data = req.body;
  console.log(update_data);
  console.log(id);
  //db.practice.update({id: "104"},{$set: update_data});
  const result = await updateMovieById(id, update_data);

  console.log(result);
  res.send(result);
});

export const moviesRouter = router;
