"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex("users")
    .join('users_items', 'users.id', '=', 'users_items.user_id')
    .join('items', 'items.id', '=', 'users_items.item_id')
    .select('items.id', 'items.name', 'items.category', 'items.rating', 'items.description', 'items.picture', 'users_items.complete_status')
    .where('session_id', req.session.user_id)
    .then((results) => {
      res.json(results);
    });
  });

  router.put("/", (req, res) => {
    knex('users_items')
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
      res.status(200).send();
    })
    .catch((err) => {
      res.status(400).send()
    })
  })

  router.post("/", (req, res) => {
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
          let subqueryItem = knex('items').where('name', req.body.name).andWhere('rating', req.body.rating).select('id')
          knex('users_items')
          .insert({user_id: subqueryUser, item_id: subqueryItem, complete_status: "todo"})
          .then((results3) => {
            console.log("New item - Succesfully inserted new row into users_items table")
          })
        })
        .catch((err) => {
          res.status(405).send()
        })
      } else {
          knex.select('*')
          .from('users_items')
          .where('item_id',function() {
            this.select('id')
                .from('items')
                .where('name', req.body.name)
                .andWhere('category', req.body.category)
          })
          .andWhere('user_id', function() {
            this.select('id')
                .from('users')
                .where('session_id', req.session.user_id)
          })
          .then((results3) => {
            if (results3.length === 0){
              let subqueryUser = knex('users').where('session_id', req.session.user_id).select('id');
              let subqueryItem = knex('items').where('name', req.body.name).andWhere('rating', req.body.rating).select('id')
              knex('users_items')
              .insert({user_id: subqueryUser, item_id: subqueryItem, complete_status: "todo"})
              .then((results4) => {
                console.log("Existing it")
                res.status(200).send();
              })
            } else {
              console.log('Record already exists')
              res.status(401).send();
            }
          })
          .catch((err) => {
            res.status(402).send()
          })
        }
    })
    .catch((err) => {
      res.status(403).send()
    })
  })


  router.delete("/", (req, res) => {
    knex('users_items')
    .select('*')
    .where('users_items.item_id', function() {
      this.select('items.id')
          .from('items')
          .where('items.name', req.body.name)
          .andWhere('items.category', req.body.category)
    })
    .then((results) => {
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
            res.status(200).send()
          })
        })
      }
    })
    .catch((err) => {
      res.status(404).send()
    })
  })

  return router;
}
