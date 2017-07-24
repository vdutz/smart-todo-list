"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
    .select("username")
    .from('users')
    .where('session_id', req.session.user_id)
    .then((results) => {
        res.status(200).send(results);
    })
    .catch((err) => {
        res.status(400).send()
    })
  });

  return router;
}
