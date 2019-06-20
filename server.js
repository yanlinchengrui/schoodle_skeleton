"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const eventsRoutes = require("./routes/events");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/users", usersRoutes(knex));
app.use("/events", eventsRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get('/event', (req, res) => {
  let templateVars = {
    event_name: "Party Time",
    name: "Phil",
    description: "we boutta party",
    dates: {
      date_1: "June 21",
      date_2: "June 22",
      date_3: "June 24",
      date_4: "June 25"
    },
    email: "email@email.com",
    votes_to_win: 3
  }
  templateVars.dateList = Object.values(templateVars.dates);
  res.render('event', templateVars);
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
