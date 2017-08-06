"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

const Utils = require('../lib/utils.js')

// function generateRandomString() {
//   var myArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "G", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
//   var myString = "";
//   for (var i = 0; i < 6; i++) {
//     myString += myArray[Math.floor(Math.random() * myArray.length)];
//   }
//   return myString;
// }

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
