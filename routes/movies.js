import express from "express";
const router = express.Router();
import {
  GetMovieById,
  DeleteMovieByID,
  AddMovie,
  GetMovie,
  EditMovieByName,
} from "../helper.js";
import {auth} from "../middleware/auth.js";

router.route("/:id").get(async (request, response) => {
  const { id } = request.params;
  // const movie = movies.find((mv) => mv.id === id); //i can also write filter than [0]
  const movie = await GetMovieById(id);
  movie ? response.send(movie) : response.send({ message: "No match found" }); //find is better as it will return undefined if the id is not found
}).delete( async (request, response) => {
  const { id } = request.params;
  await DeleteMovieByID(id);
  response.send("done"); //find is better as it will return undefined if the id is not found
});

//post using postman

router.route("/").post(async (request, response) => {
  const data = request.body;
  await AddMovie(data, response);
})

.get(async (request, response) => {
  const filter = request.query;
  if (filter.rating) filter.rating = parseInt(filter.rating); //cause rating is a string,but in our data it is in int
  const movie = await GetMovie(filter);
  console.log("blaah");

  response.send(movie);
})

.put( async (request, response) => {
  const { name } = request.query;
  console.log(request.query, request.body);
  const movied = await EditMovieByName(name, request);
  response.send(movied);
});

export const movieRouter = router;
