import express from "express";
import { Addusers,Login } from "../helper.js";
const router = express.Router();
import { genPassword, Getusers } from "../helper.js";
router.route("/signup").post(async (request, response) => {
  const { username, password } = request.body;

  const currentUser = await Addusers({ username, password });
  response.send(currentUser);
});
router.route("/signup/user").get(async (request, response) => {
  const users = await Getusers();
  response.send(users);
});
router.route("/login").post(async (request, response) => {
  const { username, password } = request.body;
  
  const userCredentials = await Login({username, password});
  if (userCredentials) response.send("Signed in");
  else response.status(401).send("invalid credentials");
});
export const userRouter = router;
