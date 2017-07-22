"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // router.get("/", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("items")
  //     .then((results) => {
  //       res.json(results);
  //   });
  // });

  router.post("/", (req, res) => {
    knex('users')
      .insert({username: req.body.username, email: req.body.email, password: req.body.password})
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.status(404).send(err)
        console.log("Error adding user to database")
      })
  });

  // router.delete("/", (req, res) => {
  //   knex('items')
  //     .insert({name: req.body.name, category: req.body.category, rating: req.body.rating, description: req.body.description, picture: req.body.picture})
  //     .then((results) => {
  //       res.json(results);
  //     })
  //     .catch((err) => {
  //       res.status(404).send(err)
  //       console.log("Error adding item to database")
  //     })
  // })

  return router;
}
