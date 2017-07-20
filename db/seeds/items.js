
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {name: "Banh Mi Boys", category: "restaurant", rating: 8.0, description: "Asian-inspired subs, sandwiches, tacos & steamed buns spiced to order in a snug & lively location", picture: "http://www.banhmiboys.com/images/banhmiboys-storefront-yonge.jpg"},
        {name: "I, Robot", category: "movie", rating: 7.3, description: "In 2035, a technophobic cop investigates a crime that may have been perpetrated by a robot, which leads to a larger threat to humanity", picture: "http://r.fod4.com/c=sq/s=w350,pd1/o=80/http://a.fod4.com/images/user_photos/1213807/1ac86f2d581e62e1d495a0babfafe29c_square_fullsize.jpg"},
        {name: "", category: "", rating: , description: "", picture: ""},
        {name: "", category: "", rating: , description: "", picture: ""},
        {name: "", category: "", rating: , description: "", picture: ""},
        {name: "", category: "", rating: , description: "", picture: ""},
        {name: "", category: "", rating: , description: "", picture: ""},
        {name: "", category: "", rating: , description: "", picture: ""}
      ]);
    });
};
