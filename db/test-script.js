const knex = require('knex')(require('./knexfile')['development'])

knex('items')
.insert({name: "Banh Mi Boys", category: "restaurant", rating: 8.0, description: "Asian-inspired subs, sandwiches, tacos & steamed buns spiced to order in a snug & lively location", picture: "http://www.banhmiboys.com/images/banhmiboys-storefront-yonge.jpg"})
.asCallback( (err, rows) => {
  if (err) {
    return console.error(err);
  }
  console.log("Searching... ")
})

knex.destroy(() => {
  console.log("Database connection ended.")
})