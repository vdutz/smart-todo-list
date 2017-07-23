"use strict";

const express = require('express');
const router  = express.Router();

function AddUserItem() {

}

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex("users")
    .join('users_items', 'users.id', '=', 'users_items.user_id')
    .join('items', 'items.id', '=', 'users_items.item_id')
    .select('items.id', 'items.name', 'items.category', 'items.rating', 'items.description', 'items.picture', 'users_items.complete_status')
    // .from("items")
    .where('session_id', req.session.user_id)
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
          let subqueryUser = knex('users').where('session_id', req.session.user_id).select('id');
          console.log("SubqueryUser: ", subqueryUser)

          let subqueryItem = knex('items').where('name', req.body.name).andWhere('rating', req.body.rating).select('id')
          console.log("SubqueryItem: ", subqueryItem)

          knex('users_items')
          .insert({user_id: subqueryUser, item_id: subqueryItem, complete_status: "todo"})
          .then((results3) => {
            console.log("New item - Succesfully inserted new row into users_items table")
            // res.json(results3);
          })

          res.json(results2);
        })
        .catch((err) => {
          console.log("Error adding item to database")
          // res.status(404).send(err)
          res.status(404).send()
        })
      } else {
        console.log("Item already exists")

        let subqueryUser = knex('users').where('session_id', req.session.user_id).select('id');
        console.log("SubqueryUser: ", subqueryUser)

        let subqueryItem = knex('items').where('name', req.body.name).andWhere('rating', req.body.rating).select('id')
        console.log("SubqueryItem: ", subqueryItem)

        knex('users_items')
        .insert({user_id: subqueryUser, item_id: subqueryItem, complete_status: "todo"})
        .then((results3) => {
          console.log("Existing item - Succesfully inserted new row into users_items table")
        })
        res.status(200).send();
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
