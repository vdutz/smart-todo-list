const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('items').del()
    .then(function () {
      // Inserts seed item entries
      return knex('items').insert([
        {name: "Banh Mi Boys",
        category: "restaurant",
        rating: "4/5 (Yelp)",
        description: "Asian-inspired subs, sandwiches, tacos & steamed buns spiced to order in a snug & lively location",
        picture: "http://www.banhmiboys.com/images/banhmiboys-storefront-yonge.jpg"},

        {name: "I, Robot",
        category: "movie",
        rating: "7.3/10 (TMDB)",
        description: "In 2035, a technophobic cop investigates a crime that may have been perpetrated by a robot, which leads to a larger threat to humanity",
        picture: "http://r.fod4.com/c=sq/s=w350,pd1/o=80/http://a.fod4.com/images/user_photos/1213807/1ac86f2d581e62e1d495a0babfafe29c_square_fullsize.jpg"},

        {name: "The Three Body Problem",
        category: "book",
        rating: "9.2/10 (Google Books)",
        description: "Set against the backdrop of China's Cultural Revolution, a secret military project sends signals into space to establish contact with aliens",
        picture: "https://s3-us-west-2.amazonaws.com/tabs.web.media/b/h/bhsx/bhsx-square-1536.jpg"},

        {name: "Miracle-Gro AeroGarden Classic 6 with Gourmet Herb Seed Pod Kit",
        category: "product",
        rating: "N/A",
        description: "https://www.amazon.ca/Miracle-Gro-AeroGarden-Classic-Gourmet-Herb/dp/B010NBJMLI/ref=sr_1_cc_2?s=aps&ie=UTF8&qid=1500848111&sr=1-2-catcorr&keywords=aerogarden",
        picture: "https://images-na.ssl-images-amazon.com/images/I/71ni1Uf5wDL._SL1000_.jpg"},

        {name: "Swiffer Sweeper Floor Mop Starter Kit, 1 Count",
        category: "product",
        rating: "N/A",
        description: "https://www.amazon.ca/gp/product/B00ZLUOO9C/ref=s9u_simh_gw_i1?ie=UTF8&pd_rd_i=B00ZLUOO9C&pd_rd_r=38JJ8JBHJA609XA55CR1&pd_rd_w=DXwW5&pd_rd_wg=fBM2F&pf_rd_m=A3DWYIK6Y9EEQB&pf_rd_s=&pf_rd_r=970RY85REFMXM1HD3GN3&pf_rd_t=36701&pf_rd_p=04ba9dff-ad6f-4c0e-9daf-7ccc545ca71b&pf_rd_i=desktop",
        picture: "https://images-na.ssl-images-amazon.com/images/I/81-71XZR4qL._SL1500_.jpg"},

        {name: "Sapiens: A Brief History of Humankind",
        category: "book",
        rating: "9.4/10 (Google Books)",
        description: "100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens",
        picture: "https://s3-us-west-2.amazonaws.com/tabs.web.media/c/9/c9lw/c9lw-square-orig.jpg"},

        {name: "Prometheus",
        category: "movie",
        rating: "7.2/10 (TMDB)",
        description: "Following clues to the origin of mankind, a team finds a structure on a distant moon, but they soon realize they are not alone.",
        picture: "http://manilovefilms.com/wp-content/uploads/2012/06/PROMETHEUS-POSTER.jpg"},

        {name: "Me Va Me",
        category: "restaurant",
        rating: "4/5 (Yelp)",
        description: "Our dishes are prepared with only the best ingredients, using our specialty recipes",
        picture: "https://s3-media3.fl.yelpcdn.com/bphoto/HxfnLq9Hbe-zPJNxIo4tew/348s.jpg"},

        {name: "Harry Potter and the Philosopher's Stone",
        category: "movie",
        rating: "7.5/10 (TMDB)",
        description: "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard -- with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths -- and about the villain who's to blame.",
        picture: "http://image.tmdb.org/t/p/w185//dCtFvscYcXQKTNvyyaQr2g2UacJ.jpg"}
      ]);
    }),

    knex('users').del()
    .then(function () {
      // Inserts seed user entries
      return knex('users').insert([
        {username: "Mr. Test",
        email: "test@test.com",
        password: bcrypt.hashSync('test', 10),
        session_id: "abc123"
        },
        {username: "Ms. Example",
        email: "example@example.com",
        password: bcrypt.hashSync('example', 10),
        session_id: ""
        },
        {username: "Jane",
        email: "jane@doe.com",
        password: bcrypt.hashSync('jane', 10),
        session_id: "def456"
        }
      ])
    }),
  ])
  .then(function() {
    return knex('users_items').del()
    .then(function () {
      // Inserts seed user entries
      return knex('users_items').insert([
        {user_id: 2,
        item_id: 3,
        complete_status: "todo"
        },
        {user_id: 2,
        item_id: 4,
        complete_status: "complete"
        },
        {user_id: 2,
        item_id: 2,
        complete_status: "todo"
        },
        {user_id: 1,
        item_id: 3,
        complete_status: "todo"
        },
        {user_id: 1,
        item_id: 2,
        complete_status: "complete"
        },
        {user_id: 1,
        item_id: 5,
        complete_status: "todo"
        },
        {user_id: 1,
        item_id: 9,
        complete_status: "complete"
        },
        {user_id: 1,
        item_id: 1,
        complete_status: "todo"
        },
        {user_id: 3,
        item_id: 3,
        complete_status: "todo"
        },
        {user_id: 3,
        item_id: 8,
        complete_status: "todo"
        }
      ])
    })
  })

};
