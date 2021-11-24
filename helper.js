// import { createConnection } from "./index.js";
import { client } from "./index.js";

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
    .find(filter).toArray();
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