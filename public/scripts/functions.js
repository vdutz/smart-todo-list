function generateRandomString() {
  var myArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "G", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var myString = "";
  for (var i = 0; i < 6; i++) {
    myString += myArray[Math.floor(Math.random() * myArray.length)];
  }
  return myString;
}

function createItemElement(itemdata) {
  const { name, category, rating, description, picture } = itemdata;

  itemString = `<div class="box-outer col-xs-12 col-sm-6 col-md-4">
                  <div class="box-inner" style="background:url(${picture}) no-repeat; background-size: cover;)">
                    <span>
                      <div class="item-element-detail">
                        <h4>${name}</h4>
                        <p>Type: ${category}</p>
                        <p>Rating: ${rating}</p>
                        <p>${description}</p>
                        <button type=button class="remove-item">Remove from List</button>
                      </div>
                    </span>
                  </div>
                </div>`

  $item = $(itemString)
  return $item
}

function renderItems(items) {
  items.forEach(function(item){
    createItemElement(item).appendTo($(".container .row"));
  })
}

// Load filters
function loadFilters() {
  var $filtersBar = `<div class="box-outer col-xs-12 col-sm-12 col-md-12">
                      <div class="box-inner">
                        <span class="filter-button filter-list books">
                          Books
                        </span>
                        <span class="filter-button filter-list movies">
                          Movies
                        </span>
                        <span class="filter-button filter-list restaurant">
                          Restaurants
                        </span>
                        <span class="filter-button filter-list all">
                          All
                        </span>
                        <span class="filter-button filter-list books">
                          Complete
                        </span>
                        <span class="filter-button filter-list books">
                          To Do
                        </span>
                      </div>
                    </div>`
  $('body .container .row').append($filtersBar);
}


// Load nav bar
function loadNavBar() {
  var $navBar = `<nav id="nav-bar">
                  <img class="logo" src="images/todolist.png">
                  <span class="header">SmarToDo</span>
                  <span class="nav-button nav-list">
                    <i class="fa fa-list-ol" aria-hidden="true"></i>
                    My List
                  </span>
                  <span class="nav-button nav-search">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    Search
                  </span>
                  <span class="nav-button nav-login">
                    <i class="fa fa-sign-in" aria-hidden="true"></i>
                    Login
                  </span>
                  <span class="nav-button nav-register">
                    <i class="fa fa-user-plus" aria-hidden="true"></i>
                    Register
                  </span>
                  <span class="nav-button nav-logout">
                    Logout
                  </span>
                </nav>`
  $('body').empty().append($navBar);
  var $container = `<main class="container">
                      <div class="row">

                      </div>
                    </main>`
  $('body').append($container);
}

////Replace the entire container and append with register page////
function renderRegister() {
  var $registerPage = `<main class='container'>
                        <div class="row">
                          <div class="col-md-4 col-md-offset-4 col-xs-12">
                            <div class="register-box">
                              <h2>Registration</h2>
                              <img src="images/todolist.png""><br><br>
                              <form class="register-form">
                                <input type="text" name="username" placeholder="Username" /><br><br>
                                <input type="email" name="email" placeholder="Email" /><br><br>
                                <input type="password" name="password" placeholder="Password" /><br><br>
                                <input type="submit" class="submit-register" value="Register" />
                              </form><br>
                              <a class="switch-to-login">Already have an account?</a>
                            </div>
                          </div>
                        </div>
                      </main>`;
  $('body').empty().append($registerPage);
}

/////// replace the whole container and append with login page
function renderLogin() {
  var $loginPage = `<main class='container'>
                      <div class="row">
                        <div class="col-md-4 col-md-offset-4 col-xs-12">
                          <div class="login-box">
                            <h2>Log In</h2>
                            <img src="images/todolist.png"">
                            <form class="login-form"><br>
                              <input type="email" name="email" placeholder="Email" /><br><br>
                              <input type="password" name="password" placeholder="Password" /><br><br>
                              <input type="submit" class="submit-login" value="Log In" />
                            </form><br>
                            <a class="switch-to-register">Need an account?</a>
                          </div>
                        </div>
                      </div>
                    </main>`;
  $('body').empty().append($loginPage);
}

/////replace the whole container and append with a form to test adding data
function renderAddItemForm() {
  var $formPage = `<main class='container'>
                      <div class="row">
                        <div class="col-md-8 col-md-offset-2 col-xs-12">
                          <div class="login-box">
                            <img src="images/todolist.png"">
                            <form class="add-item-form">
                              <input type="text" name="name" placeholder="Name" /><br><br>
                              <input type="text" name="category" placeholder="Category" /><br><br>
                              <input type="text" name="rating" placeholder="Rating" /><br><br>
                              <input type="text" name="description" placeholder="Description" /><br><br>
                              <input type="text" name="picture" placeholder="Picture" /><br><br>
                              <input type="submit" class="add-item-submit" value="Add Item" />
                            </form><br>
                          </div>
                        </div>
                      </div>
                    </main>`;
  $('body').empty().append($formPage);
}

function loadList(){
  $.ajax({
    url: '/api/items',
    method: 'GET',
    success: function(itemsObject) {
      $(".container .row").empty();
      renderItems(itemsObject);
    }
  })
}

function addItem(item) {
  $.ajax({
    url: '/api/items',
    method: 'POST',
    data: item.serialize(),
    success: function(itemsObject) {
      // $(".container .row").empty();
      // renderItems(itemsObject);
      console.log("POST succesful.")
    }
  })
}

function addItemfromButton(item) {
  $.ajax({
    url: '/api/items',
    method: 'POST',
    data: item,
    success: function(itemsObject) {
      // $(".container .row").empty();
      // renderItems(itemsObject);
      console.log("POST succesful.")
    }
  })
}

function deleteItem(item) {
  $.ajax({
    url: '/api/items',
    method: 'DELETE',
    data: item,
    success: function(itemsObject) {
      // $(".container .row").empty();
      // renderItems(itemsObject);
      console.log("POST succesful.")
    }
  })
}


function checkUser() {
  $.ajax({
    url: '/api/checkuser',
    method: 'GET',
    success: function(response) {
      console.log("Match found. User is logged in.", response)
      // $(".container .row").empty();
      // renderItems(itemsObject);
    },
    error: function (err) {
      console.log("No entry found.  User is not logged in.")
    }
  })
}

function userRegister(user) {
  console.log(user)
  $.ajax({
    url: '/api/register',
    method: 'POST',
    data: user.serialize(),
    success: function(response) {
      console.log("Registration succesful!")
      console.log("Respone: ", response)
      loadNavBar()
      loadFilters()
      loadList()
    }
  })
}

function userLogin(user) {
  $.ajax({
    url: '/api/login',
    method: 'POST',
    data: user.serialize(),
    success: function(response) {
      // $(".container .row").empty();
      // renderItems(itemsObject);
      console.log("Login succesful!")
      loadNavBar()
      loadFilters()
      loadList()
    },
    error: function(err) {
      console.log("Incorrect email or password")
    }
  })
}

function userLogout() {
  $.ajax({
    url: '/api/login',
    method: 'DELETE',
    success: function(response) {
      // $(".container .row").empty();
      // renderItems(itemsObject);
      console.log("Logout succesful!")
    },
    error: function(err) {
      console.log("Unable to logout")
    }
  })
}

// function displayItem(item) {
//   let { name, category, rating, description, picture } = item

//   let $bigItem = `<main class='container'>
//                       <div class="row">
//                         <div class="col-md-8 col-md-offset-2 col-xs-12">
//                           <div class="display-box">
//                             <img src="${picture}">
//                             <div>
//                               <h2>${name}</h2>
//                               <h4>Category: ${category}</h4>
//                               <h4>Rating: ${rating}</h4>
//                               <h4>Description: ${description}</h4>
//                               <button type="button" class="add-item">Add to List</button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </main>`;
//   $('body').empty().append($bigItem);
// }

function renderSearch(item) {
  var $search = `<div class="row">
                  <div class="col-md-10 col-md-offset-1 col-xs-12">
                    <div class="search-container">
                      <input class="search-bar" placeholder="Search your book">
                      <div class='auto-complete'>
                      </div>
                    </div>
                  </div>
                </div>`
  $('.container').empty().append($search);
}

