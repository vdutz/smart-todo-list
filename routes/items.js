"use strict";

const express = require('express');
const router  = express.Router();

// function AddUserItem() {

// }

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

  router.put("/", (req, res) => {
    console.log("Req.body.newStatus: ", req.body.newStatus)
    console.log("Req.body.newName: ", req.body.newName)
    knex('users_items')
    // .select('*')
    // .join('users', 'users_items.user_id', '=', 'users.id')
    // .join('items', 'items.id', '=', 'users_items.item_id')
    .update('complete_status', req.body.newStatus)
    .where('user_id', function() {
      this.select('id')
          .from('users')
          .where('users.session_id', req.session.user_id)
    })
    .andWhere('item_id', function() {
      this.select('id')
          .from('items')
          .where('items.name', req.body.newName)
    })
    .then((results) => {
      console.log("Results: ", results)
      console.log("Succesfully updated status")
      res.status(200).send();
    })


    //   req.session.user_id)
    // .andWhere('items.name', req.body.newName)
    // .update('users_items.complete_status', req.body.newStatus)
    // .toString())
    // .then((results) => {
    //   // console.log(results)
    //   console.log("Succesfully changed status.")
    //   res.status(200).send()
    //   // if (results.length == 1) {
    //   //   console.log("Results: ", results)
    //   //   console.log("Succesfully changed status.")
    //   //   res.status(200).send()
    //   // } else {
    //   //   console.log("Could not change status.")
    //   //   res.status(404).send()
    //   // }
    // })
    .catch((err) => {
      console.log(err)
      console.log("Could not change status (2).")
      res.status(400).send()
    })
  })

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
    // knex('users_items')
    // .join('items', 'items.id', '=', 'users_items.item_id')
    // .where('name', req.body.name)
    // .andWhere('category', req.body.category)
    // .del()

      // .insert({name: req.body.name, category: req.body.category, rating: req.body.rating, description: req.body.description, picture: req.body.picture})
    knex('users_items')
    .select('*')
    .where('users_items.item_id', function() {
      this.select('items.id')
          .from('items')
          .where('items.name', req.body.name)
          .andWhere('items.category', req.body.category)
    })

    // knex('users_items')
    // .where('users_items.item_id', function() {
    //   this.select('items.id')
    //       .from('items')
    //       .where('items.name', req.body.name)
    //       .andWhere('items.category', req.body.category)
    // })
    // .del()

    //   req.body.name)
    // .andWhere('category', req.body.category)
    // .del()

    .then((results) => {
      console.log("Results: ", results)
      console.log("Length: ", results.length)
      if (results.length > 1) {
        knex('users_items')
        .where('users_items.item_id', function() {
          this.select('items.id')
              .from('items')
              .where('items.name', req.body.name)
              .andWhere('items.category', req.body.category)
          })
        .andWhere('users_items.user_id', function() {
          this.select('users.id')
              .from('users')
              .where('users.session_id', req.session.user_id)
        })
        .del()
        .then((results2) => {
          console.log("Item succesfully deleted from users_items table only")
          res.status(200).send()
        })
      } else {
        knex('users_items')
        .where('users_items.item_id', function() {
          this.select('items.id')
              .from('items')
              .where('items.name', req.body.name)
              .andWhere('items.category', req.body.category)
          })
        .andWhere('users_items.user_id', function() {
          this.select('users.id')
              .from('users')
              .where('users.session_id', req.session.user_id)
        })
        .del()
        .then((results3) => {
          knex('items')
          .where('name', req.body.name)
          .andWhere('category', req.body.category)
          .del()
          .then((results4) => {
            console.log("Item succesfully deleted from users_items table AND items table")
            res.status(200).send()
          })
        })
      }


      // res.json(results);

      // console.log("Item succesfully deleted from database")
      // res.status(200).send()
    })
    .catch((err) => {
      // res.status(404).send(err)
      res.status(404).send()
      console.log("Error deleting item from database")
    })
  })

  return router;
}
