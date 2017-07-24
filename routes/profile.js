"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');


module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex("users")
    .select('username', 'email')
    .where('session_id', req.session.user_id)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
        console.log("Can't get user profile.")
        res.status(404).send()
      })
  });

  router.post("/", (req, res) => {
    let token = req.session.user_id;
    knex('users')
      .where('session_id', token)
      .update({username: req.body.username, password: bcrypt.hashSync(req.body.password, 10)})
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        console.log("Can't update username and password")
        res.status(404).send()
      })
  });

  return router;
}
