"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("items")
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/", (req, res) => {
    console.log("Req.body.name: ", req.body.name)
    console.log("Req.body.rating: ", req.body.rating)
    knex
    .select("*")
    .from('items')
    .where('name', req.body.name)
    .andWhere('rating', req.body.rating)
    .then((results) => {
      if (results.length === 0) {
          knex('items')
        .insert({name: req.body.name, category: req.body.category, rating: req.body.rating, description: req.body.description, picture: req.body.picture})
        .then((results2) => {
          res.json(results2);
        })
        .catch((err) => {
          console.log("Error adding item to database")
          // res.status(404).send(err)
          res.status(404).send()
        })
      } else {
        console.log("Item already exists")
        res.status(400).send();
      }
      // console.log("Results: ", results)

    })
    .catch((err) => {
      console.log("Item check failed.")
      res.status(400).send()

    })

  });

  router.delete("/", (req, res) => {
    knex('items')
      .insert({name: req.body.name, category: req.body.category, rating: req.body.rating, description: req.body.description, picture: req.body.picture})
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        // res.status(404).send(err)
        res.status(404).send()
        console.log("Error deleting item from database")
      })
  })

  return router;
}
