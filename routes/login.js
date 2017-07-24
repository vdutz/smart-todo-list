"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

function generateRandomString() {
  var myArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "G", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var myString = "";
  for (var i = 0; i < 6; i++) {
    myString += myArray[Math.floor(Math.random() * myArray.length)];
  }
  return myString;
}

module.exports = (knex) => {

  router.post("/", (req, res) => {
    let user_id = generateRandomString()
    console.log("user_id: ", user_id)
    req.session.user_id = user_id
    console.log("req.body.email: ", req.body.email)
    knex
    .select("password")
    .from('users')
    .where('email', req.body.email)
    // .andWhere('password', req.body.password)
    .then((results) => {
      console.log("Results: ", results)
      console.
      compare
      if (bcrypt.compareSync(req.body.password, results[0].password)) {
        // console.log("Results: ", results)
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
        console.log("Could not find email/password match.")
        res.status(404).send()
      // if (results.length === 0) {
      //   console.log("Could not find email/password match.")
      //   res.status(404).send()
      // } else {

        // .catch((err) => {
        //   console.log("Update session_id failed.")
        //   res.status(404).send(err)
        // })
      }

      // res.status(200).send(results);
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
      console.log("Logout results: ", results)
      res.status(200).send();
    })
    .catch((err) => {
      console.log("Could not logout.")
      res.status(404).send()
    })
  })

  return router;
}
