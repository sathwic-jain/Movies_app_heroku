import { MongoClient } from "mongodb";
// const express = require("express");
import express from "express";
const app = express();
const PORT = 9000;
app.use(express.json());//converting all the post data into json parse
app.get("/", (request, response) => {
  response.send("hello 👍😒🙌🙌😒😒");
});

app.listen(PORT, () => console.log("the server is running in", PORT));

const MONGO_URL = "mongodb://localhost";
// const MONGO_URL = "mongodb+srv://sathwic:welcome123@cluster0.qflaz.mongodb.net";
// mongodb+srv://sathwic:<password>@cluster0.qflaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("mongo connected");
 
  return client;
}
createConnection();

const movies = [
  {
    id: 1,
    name: "Vetaikkaran",
    language: "Tamil",
    "Song writer": "Vennelakanthi",
    rating: 8,
  },
  {
    id: 2,
    name: "VIP",
    language: "Tamil",
    "Song writer": "Dhanush",
    rating: 7,
  },
  {
    id: 3,
    name: "Master",
    language: "Tamil",
    "Song writer": "Vimal Kashyap",
    rating: 8.2,
  },
  {
    id: 4,
    name: "Tenet",
    language: "English",
    rating: 7.8,
  },
  {
    id: 5,
    name: "Intersteller",
    language: "English",
    rating: 9.4,
  },
  {
    id: 6,
    name: "Bahubali",
    language: "Telugu",
    "Song writer": "Shiva Shakti Datta",
    rating: 8.9,
  },
];
// movies.map((each)=>{
// app.get(`/movies/`+each.id, (request, response) => {
//     response.send(each);
//   });
// })
//similar way:

//not from db
// app.get("/movies/:id", (request, response) => {
//   const { id } = request.params;
//   const movie = movies.find((mv) => mv.id === id); //i can also write filter than [0]
//   movie ? response.send(movie) : response.send({ message: "No match found" }); //find is better as it will return undefined if the id is not found
// });

//from db
app.get("/movies/:id", async (request, response) => {
  const { id } = request.params;
  // const movie = movies.find((mv) => mv.id === id); //i can also write filter than [0]
  const client =await createConnection();
  const movie = await client
    .db("second")
    .collection("movies") 
    .findOne({ id: +id });
  movie ? response.send(movie) : response.send({ message: "No match found" }); //find is better as it will return undefined if the id is not found
});

//post using postman

app.post("/movies", async (request, response) => {
  const data=request.body;
  const client =await createConnection();
  const result = await client
    .db("second")
    .collection("movies") 
    .insertMany(data);
    response.send(result);
});

// app.get("/movies", (request, response) => {
//   const {language,rating}=request.query;
//   console.log(request.query);
//    const movie=movies.filter((mv)=>mv.language===language);
//     const movieratingonly=movies.filter((mv)=>mv.rating===rating);
//    const movierating=movie.filter((mv)=>mv.rating===+(rating));
//    rating?response.send(movierating):(language ?response.send(movie):response.send(movies));
// });

//check notebook for a simpler code


//for rating and language using normal array synta

// app.get("/movies", (request, response) => {
//   const { language, rating } = request.query;
//   console.log(request.query);
//   let filteredMovies = movies;
//   if (language) {
//     filteredMovies = filteredMovies.filter((mv) => mv.language === language);
//   }
//   if (rating) {
//     filteredMovies = filteredMovies.filter((mv) => mv.rating === +rating);
//   }
//   response.send(filteredMovies);
// });

//using mongodb

app.get("/movies", async (request, response) => {
  const filter = request.query;
  if(filter.rating)filter.rating=parseInt(filter.rating); //cause rating is a string,but in our data it is in int
  const client =await createConnection();
  const movie = await client
    .db("second")
    .collection("movies") 
    .find(filter).toArray();

    response.send(movie);
});