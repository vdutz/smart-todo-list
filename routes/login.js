"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const Utils = require('../lib/utils.js')

module.exports = (knex) => {

  router.post("/", (req, res) => {
    let user_id = Utils.generateRandomString()
    req.session.user_id = user_id
    knex
    .select("password")
    .from('users')
    .where('email', req.body.email)
    .then((results) => {
      if (bcrypt.compareSync(req.body.password, results[0].password)) {
        knex('users')
        .where('email', req.body.email)
        .update('session_id', user_id)
        .then((results2) => {
          console.log("Results2: ", results2)
          if (results2 == 1) {
            res.status(200).send();
          } else {
            console.log("Update session_id failed.")
            res.status(404).send()
          }
        })
      } else {
        res.status(404).send()
      }
    })
    .catch((err) => {
      console.log("Check search failed.")
    })
  });

  router.delete("/", (req, res) => {
    let token = req.session.user_id
    req.session = null
    knex('users')
    .where('session_id', token)
    .update({session_id: ''})
    .then((results) => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(404).send()
    })
  })

  return router;
}
