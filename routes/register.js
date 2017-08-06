"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const Utils = require('../lib/utils.js')

module.exports = (knex) => {

    router.post("/", (req, res) => {
      let user_id = Utils.generateRandomString()
      knex.from('users')
      .select("*")
      .where('email', req.body.email)
      .then((results) => {
        if (results.length === 0){
          req.session.user_id = user_id
          knex('users')
            .insert({username: req.body.username, email: req.body.email, password: bcrypt.hashSync(req.body.password, 10), session_id: user_id})
            .then((results) => {
              res.json(results);
            })
            .catch((err) => {
              res.status(405).send()
            })
        } else {
          res.status(404).send()
        }
      })
    })

  return router;
}
