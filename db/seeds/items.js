
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {name: "Banh Mi Boys",
        category: "restaurant",
        rating: 8.0,
        description: "Asian-inspired subs, sandwiches, tacos & steamed buns spiced to order in a snug & lively location",
        picture: "http://www.banhmiboys.com/images/banhmiboys-storefront-yonge.jpg"},

        {name: "I, Robot",
        category: "movie",
        rating: 7.3,
        description: "In 2035, a technophobic cop investigates a crime that may have been perpetrated by a robot, which leads to a larger threat to humanity",
        picture: "http://r.fod4.com/c=sq/s=w350,pd1/o=80/http://a.fod4.com/images/user_photos/1213807/1ac86f2d581e62e1d495a0babfafe29c_square_fullsize.jpg"},

        {name: "The Three Body Problem",
        category: "book",
        rating: 9.2,
        description: "Set against the backdrop of China's Cultural Revolution, a secret military project sends signals into space to establish contact with aliens",
        picture: "https://s3-us-west-2.amazonaws.com/tabs.web.media/b/h/bhsx/bhsx-square-1536.jpg"},

        {name: "Miracle-Gro AeroGarden Classic 6 with Gourmet Herb Seed Pod Kit",
        category: "product",
        rating: 8.2,
        description: "Set against the backdrop of China's Cultural Revolution, a secret military project sends signals into space to establish contact with aliens",
        picture: "https://s3-us-west-2.amazonaws.com/tabs.web.media/b/h/bhsx/bhsx-square-1536.jpg"},

        {name: "Swiffer Sweeper Floor Mop Starter Kit, 1 Count",
        category: "product",
        rating: 8.6,
        description: "With a one-two cleaning punch, Swiffer Sweeper is designed to sweep and mop your floors.",
        picture: "https://images-na.ssl-images-amazon.com/images/I/81-71XZR4qL._SL1500_.jpg"},

        {name: "Sapiens: A Brief History of Humankind",
        category: "book",
        rating: 9.4,
        description: "100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens",
        picture: "https://s3-us-west-2.amazonaws.com/tabs.web.media/c/9/c9lw/c9lw-square-orig.jpg"},

        {name: "Prometheus",
        category: "7",
        rating: 7.2,
        description: "Following clues to the origin of mankind, a team finds a structure on a distant moon, but they soon realize they are not alone.",
        picture: "http://manilovefilms.com/wp-content/uploads/2012/06/PROMETHEUS-POSTER.jpg"},

        {name: "Me Va Me",
        category: "restaurant",
        rating: 8.6,
        description: "Our dishes are prepared with only the best ingredients, using our specialty recipes",
        picture: "https://s3-media3.fl.yelpcdn.com/bphoto/HxfnLq9Hbe-zPJNxIo4tew/348s.jpg"}
      ]);
    });
};
