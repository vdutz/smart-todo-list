"use strict";

const express = require('express');
const router  = express.Router();
const rp = require('request-promise')

module.exports = (knex) => {

  router.get("/", (req, res) => {
    var authorizationToken = 'Bearer m6a_E2PEcwkACaWUggWcwu67URvZKqV6F_D_MqdZcmE1pxK8QyFGXyZaOcLKvvYTraQhc9redOiW_73frergq-Kjd--yvb6cP_iK5P9hxa47K6AQiDrdU5_yHEVyWXYx'
    var requestName = req.query.searchTerms
    var requestBook = 'https://www.googleapis.com/books/v1/volumes?q=' + requestName
    // var requestPlace = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${requestName}&key=AIzaSyBzJXtH_RQSozV9UcLOwRnXycS3ktiesjQ&location=43.6532,-79.3832&radius=2000`
    var requestMovie = 'https://api.themoviedb.org/3/search/movie?api_key=6b9040e6b69a988ffe21732fb57c373f&query=' + requestName
    var requestPlace = `https://api.yelp.com/v3/businesses/search?term=${requestName}&latitude=43.6532&longitude=-79.3832&radius=1000&categories=food`

    Promise.all([
      rp({uri: requestBook,
          method: 'GET'}),
      rp({uri: requestMovie,
          method: 'GET'}),
      rp({uri: requestPlace,
          method: 'GET',
          headers: {'Authorization': authorizationToken}})
    ])
    .then(function (results) {
      res.send(results)
    })
    // .catch(function (err) {
    //   console.log("Error on request to server:", err)
    // })

    // knex
    //   .select("*")
    //   .from("items")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

  // router.post("/", (req, res) => {
  //   knex('items')
  //     .insert({name: req.body.name, category: req.body.category, rating: req.body.rating, description: req.body.description, picture: req.body.picture})
  //     .then((results) => {
  //       res.json(results);
  //     })
  //     .catch((err) => {
  //       res.status(404).send(err)
  //       console.log("Error adding item to database")
  //     })
  // })

  return router;
}
