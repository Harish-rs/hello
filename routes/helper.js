import { client } from "../index.js";
import bcrypt from "bcrypt";

export async function updateMovieById(id, update_data) {
  return await client
    .db("practice")
    .collection("practice")
    .updateOne({ id: id }, { $set: update_data });
}
export async function deleteMovieById(id) {
  return await client
    .db("practice")
    .collection("practice")
    .deleteOne({ id: id });
}
export async function createMovies(new_movie) {
  return await client
    .db("practice")
    .collection("practice")
    .insertMany(new_movie);
}
export async function getMovieById(id) {
  return await client.db("practice").collection("practice").findOne({ id: id });
}
export async function getMovieByFilter(req) {
  return await client
    .db("practice")
    .collection("practice")
    .find(req.query)
    .toArray();
}

export async function genPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}

export async function createUser(new_user) {
  return await client.db("practice").collection("users").insertOne(new_user);
}

export async function checkUserExist(userName) {
  return await client
    .db("practice")
    .collection("users")
    .findOne({ user_name: userName });
}
