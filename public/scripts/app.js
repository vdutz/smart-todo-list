const initial_items = [
  {
    "id": 1,
    "category": "restaurant",
    "name": "Banh Mi Boys",
    "rating": 8.0,
    "description": "Asian-inspired subs, sandwiches, tacos & steamed buns spiced to order in a snug & lively location",
    "picture": "http://www.banhmiboys.com/images/banhmiboys-storefront-yonge.jpg"
  },
  {
    "id": 2,
    "category": "movie",
    "name": "I, Robot",
    "rating": 7.3,
    "description": "In 2035, a technophobic cop investigates a crime that may have been perpetrated by a robot, which leads to a larger threat to humanity",
    "picture": "http://r.fod4.com/c=sq/s=w350,pd1/o=80/http://a.fod4.com/images/user_photos/1213807/1ac86f2d581e62e1d495a0babfafe29c_square_fullsize.jpg"
  },
  {
    "id": 3,
    "category": "book",
    "name": "The Three Body Problem",
    "rating": 9.2,
    "description": "Set against the backdrop of China's Cultural Revolution, a secret military project sends signals into space to establish contact with aliens",
    "picture": "https://s3-us-west-2.amazonaws.com/tabs.web.media/b/h/bhsx/bhsx-square-1536.jpg"
  },
  {
    "id": 4,
    "category": "product",
    "name": "Miracle-Gro AeroGarden Classic 6 with Gourmet Herb Seed Pod Kit",
    "rating": 8.2,
    "description": "Imagine fresh herbs and vegetables grown in your home, year-round. With the Miracle-Gro AeroGarden Classic 6 you can grow fresh herbs, vegetables, salad greens, flowers and more!",
    "picture": "https://images-na.ssl-images-amazon.com/images/I/71ni1Uf5wDL._SL1000_.jpg"
  },
  {
    "id": 5,
    "category": "product",
    "name": "Swiffer Sweeper Floor Mop Starter Kit, 1 Count",
    "rating": 8.6,
    "description": "With a one-two cleaning punch, Swiffer Sweeper is designed to sweep and mop your floors.",
    "picture": "https://images-na.ssl-images-amazon.com/images/I/81-71XZR4qL._SL1500_.jpg"
  },
  {
    "id": 6,
    "category": "book",
    "name": "Sapiens: A Brief History of Humankind",
    "rating": 9.4,
    "description": "100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens.",
    "picture": "https://s3-us-west-2.amazonaws.com/tabs.web.media/c/9/c9lw/c9lw-square-orig.jpg"
  },
  {
    "id": 7,
    "category": "movie",
    "name": "Prometheus",
    "rating": 7.2,
    "description": "Following clues to the origin of mankind, a team finds a structure on a distant moon, but they soon realize they are not alone.",
    "picture": "http://manilovefilms.com/wp-content/uploads/2012/06/PROMETHEUS-POSTER.jpg"
  },
  {
    "id": 8,
    "category": "restaurant",
    "name": "Me Va Me",
    "rating": 8.6,
    "description": "Our dishes are prepared with only the best ingredients, using our specialty recipes.",
    "picture": "https://s3-media3.fl.yelpcdn.com/bphoto/HxfnLq9Hbe-zPJNxIo4tew/348s.jpg"
  }
]

// function createItemElement(itemdata) {
//   const { name, category, rating, description, picture } = itemdata;

//   itemString = `<div class="box-outer col-xs-12 col-sm-6 col-md-4">
//                   <div class="box-inner">
//                     <h4>${name}</h4>
//                     Type: ${category}<br>
//                     Rating: ${rating}<br><br>
//                     <img src="${picture}"><br><br>
//                     <p>${description}</p>
//                   </div>
//                 </div>`

//   $item = $(itemString)
//   return $item
// }

// function renderItems(items) {
//   items.forEach(function(item){
//     createItemElement(item).appendTo($(".container .row"));
//   })
// }

$(document).ready(function() {
  renderItems(initial_items);

  $(".nav-login").on('click', function(event){
    renderLogin();
  });

  $("body").on('click', '.switch-to-login', function(event){
    renderLogin();
  });

  $("body").on('click', '.switch-to-register', function(event){
    renderRegister();
  });

})

