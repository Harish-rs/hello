import express from "express";
import { genPassword, createUser, checkUserExist } from "./helper.js";
const router = express.Router();

router.post("/signup", async function (req, res) {
  const { userName, password } = req.body;

  const isUserExist = await checkUserExist(userName);
  console.log(isUserExist);
  const hashed_pwd = await genPassword(password);
  console.log(`hashed password= ${hashed_pwd}`);
  const new_user = { user_name: userName, password: hashed_pwd };
  console.log(new_user);
  var result = "";
  !isUserExist
    ? (result = await createUser(new_user))
    : (result = res.status(404).send({ msg: "user already exists" }));

  console.log(result);
  res.send(result);
});

export const usersRouter = router;
