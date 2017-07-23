"use strict";

const express = require('express');
const router  = express.Router();


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
      knex.from('users')
      .select("*")
      .where('email', req.body.email)
      .then((results) => {
        if (results.length === 0){
          console.log("This email has not been used")
          req.session.user_id = user_id
          knex('users')
            .insert({username: req.body.username, email: req.body.email, password: req.body.password, session_id: user_id})
            .then((results) => {
              res.json(results);
            })
            .catch((err) => {
              console.log("Error adding user to database")
              res.status(405).send()
            })
        } else {
          console.log("This email has been used")
          res.status(404).send()
        }
      })
    })

  // router.post("/", (req, res) => {
  //   console.log("Body Username: ", req.body.username)
  //   let user_id = generateRandomString()
  //   req.session.user_id = user_id
  //   knex('users')
  //     .insert({username: req.body.username, email: req.body.email, password: req.body.password, session_id: user_id})
  //     .then((results) => {
  //       res.json(results);
  //     })
  //     .catch((err) => {
  //       console.log("Error adding user to database")
  //       res.status(404).send()
  //     })
  // });

  return router;
}
