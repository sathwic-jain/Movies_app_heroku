// import { createConnection } from "./index.js";
import { client } from "./index.js";
import bcrypt from "bcrypt";
import { response } from "express";
import jwt from "jsonwebtoken";


export async function GetMovieById(id) {
  // const client = await createConnection();
  const movie = await client
    .db("second")
    .collection("movies")
    .findOne({ id: +id });
  return movie;
}
export async function DeleteMovieByID(id) {
  // const client = await createConnection();
  const movie = await client
    .db("second")
    .collection("movies")
    .deleteOne({ id: +id });
  return movie;
}
export async function AddMovie(data, response) {
  // const client = await createConnection();
  const result = await client
    .db("second")
    .collection("movies")
    .insertMany(data);
  response.send(result);
}
export async function GetMovie(filter) {
  // const client = await createConnection();
  const movie = await client
    .db("second")
    .collection("movies")
    .find(filter)
    .toArray();
  return movie;
}

export async function EditMovieByName(name, request) {
  // const client = await createConnection();
  const result = await client
    .db("second")
    .collection("movies")
    // .findOne({name:name})
    .updateOne({ name: name }, { $set: { rating: request.body } }); //check using fineOne if you got the correct collection or not

  const movie = await client
    .db("second")
    .collection("movies")
    .findOne({ name: name });
  return movie;
}

export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  // console.log(salt);
  // console.log(hashedpassword);
  return hashedpassword;
}
export async function Getusers() {
  // const client = await createConnection();
  const UserList = await client
    .db("accounts")
    .collection("signup")
    .find({})
    .toArray();
  return UserList;
}
export async function Addusers({ username, password }) {
  // const client = await createConnection();
  const existing = await client
    .db("accounts")
    .collection("signup")
    .findOne({ username: username });
  if (existing) return "Username exists!!Try logging in🙌";
  else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,}$/g.test(
      password
    )
  )
    return "Password pattern not met";
  else {
    
    const hpassword = await genPassword(password);
    const Users = await client
      .db("accounts")
      .collection("signup")
      .insertOne({ username: username, password: hpassword });
    return Users;
  }
}

export async function Login({ username, password }) {
  const userLOGIN = await client
    .db("accounts")
    .collection("signup")
    .findOne({ username: username });
    
  if ((userLOGIN)) {
    const token=jwt.sign({id:userLOGIN._id}, process.env.SECRET_KEY)
    console.log(token);
    const pass = await bcrypt.compare(password, userLOGIN.password);
    if (pass) return "true";
    else return null;
  }
  else {
    console.log("fked up");
    return null;
  }
}
