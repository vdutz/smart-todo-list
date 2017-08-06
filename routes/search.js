"use strict";

const express = require('express');
const router  = express.Router();
const rp = require('request-promise')
const amazon = require('amazon-product-api')

const client = amazon.createClient({
  awsId: process.env.AWSID,
  awsSecret: process.env.AWSSECRET
})

module.exports = (knex) => {

  router.get("/", (req, res) => {
    var requestName = req.query.searchTerms
    var requestBook = 'https://www.googleapis.com/books/v1/volumes?q=' + requestName
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
          headers: {'Authorization': process.env.PLACEKEY}}),
      client.itemSearch({
        Keywords: requestNameUnderscore,
        ResponseGroup: "Images,ItemAttributes,Reviews"
      })
    ])
    .then(function (results) {
      res.send(results)
    })
    .catch(function (err) {
      console.log("Error on request to server.")
    })
  });

  return router;
}
