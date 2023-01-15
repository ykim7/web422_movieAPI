const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
    res.json({ message: "API Listening" });
});

app.post("/api/movies", function (req, res) {
    db.addNewMovie(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json({ errorMessage: "Fail to add new movie" });
        });
});
app.get("/api/movies", function (req, res) {
    const page = req.query.page;
    const perPage = req.query.perPage;
    const title = req.query.title;
    let foundMovie = null;
    if (page && perPage) {
        db.getAllMovies(page, perPage, title)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500).json({
                    errorMessage: "Fail to find the movie",
                });
            });
    } else {
        res.json({ errorMessage: "Don't forget page and perPage parameters" });
    }
});
app.get("/api/movies/:id", function (req, res) {
    const queryId = req.params.id;
    db.getMovieById(queryId)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json({
                errorMessage: "Fail to find the movie",
            });
        });
});
app.put("/api/movies/:id", function (req, res) {
    const queryId = res.params.id;
    db.updateMovieById(req.body, queryId)
        .then(() => {
            res.json({ message: "Success to update the movie" });
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "Fail to update the movie" });
        });
});
app.delete("/api/movies/:id", function (req, res) {
    const queryId = res.params.id;
    db.deleteMovieById(queryId)
        .then(() => {
            res.json({ message: "success to delete the movie" });
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "Fail to delete the movie" });
        });
});

db.initialize(process.env.MONGODB_CONN_STRING)
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`server listening on: ${HTTP_PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
