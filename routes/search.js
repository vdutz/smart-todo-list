"use strict";

const express = require('express');
const router  = express.Router();
const rp = require('request-promise')
const amazon = require('amazon-product-api')

const client = amazon.createClient({
  awsId: process.env.AWSID,
  awsSecret: process.env.AWSSECRET,
  awsTag: process.env.AWSTAG
})



module.exports = (knex) => {

  router.get("/", (req, res) => {
    var authorizationToken = 'Bearer m6a_E2PEcwkACaWUggWcwu67URvZKqV6F_D_MqdZcmE1pxK8QyFGXyZaOcLKvvYTraQhc9redOiW_73frergq-Kjd--yvb6cP_iK5P9hxa47K6AQiDrdU5_yHEVyWXYx'
    var requestName = req.query.searchTerms
    var requestBook = 'https://www.googleapis.com/books/v1/volumes?q=' + requestName
    // var requestPlace = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${requestName}&key=AIzaSyBzJXtH_RQSozV9UcLOwRnXycS3ktiesjQ&location=43.6532,-79.3832&radius=2000`
    var requestMovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEKEY}&query=` + requestName
    var requestPlace = `https://api.yelp.com/v3/businesses/search?term=${requestName}&latitude=43.6532&longitude=-79.3832&radius=8000&categories=restaurants,food`
    var requestNameUnderscore = req.query.searchTerms.replace("+", "_")

    Promise.all([
      rp({uri: requestBook,
          method: 'GET'}),
      rp({uri: requestMovie,
          method: 'GET'}),
      rp({uri: requestPlace,
          method: 'GET',
          headers: {'Authorization': process.env.PLACEKEY}})
      // client.itemSearch({
      //   Keywords: requestNameUnderscore
      //   // Timestamp: "2017-07-23T13:07:34.770Z"
      // })
    ])
    .then(function (results) {
      // console.log(results[2])
      res.send(results)
    })
    .catch(function (err) {
      console.log("Error on request to server:", err)
      console.log(err.Error[0].Code)
      console.log(err.Error[0].Message)
    })

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
