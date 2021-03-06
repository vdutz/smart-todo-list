"use strict";

// require('dotenv').config();
require('dotenv').config({ silent: process.env.NODE_ENV === 'production' })

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const cookieSession = require('cookie-session');
const bcrypt      = require('bcrypt');
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperates Routes for each resource
const itemsRoutes = require("./routes/items.js");
const searchRoutes = require("./routes/search.js");
const checkUserRoutes = require("./routes/checkuser.js");
const registerRoutes = require("./routes/register.js");
const loginRoutes = require("./routes/login.js");
const profileRoutes = require("./routes/profile.js");

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// Loads the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Logs knex SQL queries to STDOUT as well
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

// Mounts all resource routes
app.use("/api/items", itemsRoutes(knex));
app.use("/api/search", searchRoutes(knex));
app.use("/api/checkuser", checkUserRoutes(knex));
app.use("/api/register", registerRoutes(knex));
app.use("/api/login", loginRoutes(knex));
app.use("/api/profile", profileRoutes(knex));

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
