
function createItemElement(itemdata) {
  const { name, category, rating, description, picture, complete_status } = itemdata;
  const description2 = description.slice(0,250);

  let completeHide
  let todoHide

  if (complete_status === "complete") {
    completeHide = ""
    todoHide = " hide"
  } else {
    completeHide = " hide"
    todoHide = ""
  }

  const itemString = `<div class="box-outer col-xs-12 col-sm-6 col-md-4 ${category} ${complete_status}">
                  <div class="box-inner" style="background:url(${picture}) no-repeat; background-size: cover; background-position: center;)">
                    <span>
                      <div class="item-element-detail">
                        <h4>${name}</h4>
                        <p>Type: ${category}</p>
                        <p class='${category}'>Rating: ${rating}</p>
                        <p class='${category}'>${description2}...</p>
                        <a href='${description}' class='${category}'>Click here for Amazon product link</a><br><br>
                        <i class="fa fa-trash-o remove-item fa-lg" aria-hidden="true"></i>
                        <i class="fa fa-square-o todo ${todoHide} fa-lg" aria-hidden="true">&nbsp;&nbsp; -  To do</i>
                        <i class="fa fa-check-square-o complete ${completeHide} fa-lg" aria-hidden="true">&nbsp;&nbsp; -  Complete</i>
                      </div>
                    </span>
                  </div>
                </div>`

  const $item = $(itemString)
  return $item

}

// Renders the items that the user has added to their list
function renderItems(items) {
  items.forEach(function(item){
    createItemElement(item).appendTo($(".container .row"));
  })
}

// Loads list filters
function loadFilters() {
  const $filtersBar = `<div class="box-outer col-xs-12 col-sm-12 col-md-12">
                      <div class="filter-inner">
                        <button class="filter-button book">
                          Books
                        </button>
                        <button class="filter-button movie">
                          Movies
                        </button>
                        <button class="filter-button restaurant">
                          Restaurants
                        </button>
                        <button class="filter-button product">
                          Products
                        </button>
                        <button class="filter-button all">
                          All
                        </button>
                        <button class="filter-button complete">
                          Complete
                        </button>
                        <button class="filter-button todo">
                          To Do
                        </button>
                      </div>
                    </div>`
  $('.row').append($filtersBar);
}


// Loads the nav bar
function loadNavBar(response) {
  const {username} = response['0'];
  const $navBar = `<nav id="nav-bar">
                  <span class="header">SmarToDo</span>
                  <img class="logo" src="images/todolist.png">
                  <span class="header">Hello, ${username}! </span>
                  <span class="nav-button nav-list">
                    <i class="fa fa-list-ol" aria-hidden="true"></i>
                    My List
                  </span>
                  <span class="nav-button nav-search">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    Search
                  </span>
                  <span class="nav-button nav-logout">
                    Logout
                  </span>
                  <span class="nav-button nav-profile">
                    Profile
                  </span>
                </nav>`
  $('body').empty().append($navBar);
  const $container = `<main class="container">
                      <div class="row">

                      </div>
                    </main>`
  $('body').append($container);
}

// Empties the entire container and appends the register page to it
function renderRegister() {
  const $registerPage = `<main class='container'>
                        <div class="row">
                          <div class="col-md-4 col-md-offset-4 col-xs-12">
                            <div class="register-box">
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

// Empties the entire container and appends the profile page to it
function renderProfile(response) {
  const { username, email } = response[0];
  const $profilePage = `<main class='container'>
                        <div class="row">
                          <div class="col-md-4 col-md-offset-4 col-xs-12">
                            <div class="profile-box">
                              <h2 style="color:white;">User Profile</h2>
                              <img class="logo-page" src="images/todolist.png""><br><br>
                                <span style="color:white;"> Email: ${email} </span><br><br>
                                <span style="color:white;"> Username: ${username} </span><br><br><br>
                              <a class="switch-to-update-profile">Change username and password?</a>
                            </div>
                          </div>
                        </div>
                      </main>`;
  $('body').empty().append($profilePage);
}
// Renders the page to allow users to edit their profile
function renderProfileEdit() {
  const $profileForm = `<h2 style="color:white;">Edit User Profile</h2>
                      <img  class="logo-page" src="images/todolist.png""><br><br>
                      <form class="profile-list-edit">
                        <input type="text" name="username" placeholder="New username" /><br><br>
                        <input type="password" name="password" placeholder="New password" /><br><br>
                        <input type="submit" class="submit-update-profile" value="Update" />
                      </form><br>
                     `;
  $('.profile-box').empty().append($profileForm);
}

// Empties the whole container and appends the login page to it
function renderLogin() {
  const $loginPage = `<main class='container'>
                      <div class="row">
                        <div class="col-md-4 col-md-offset-4 col-xs-12">
                          <div class="login-box">
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

// Empties the whole container and appends with a form to test adding data
// function renderAddItemForm() {
//   var $formPage = `<main class='container'>
//                       <div class="row">
//                         <div class="col-md-8 col-md-offset-2 col-xs-12">
//                           <div class="login-box">
//                             <img src="images/todolist.png"">
//                             <form class="add-item-form">
//                               <input type="text" name="name" placeholder="Name" /><br><br>
//                               <input type="text" name="category" placeholder="Category" /><br><br>
//                               <input type="text" name="rating" placeholder="Rating" /><br><br>
//                               <input type="text" name="description" placeholder="Description" /><br><br>
//                               <input type="text" name="picture" placeholder="Picture" /><br><br>
//                               <input type="submit" class="add-item-submit" value="Add Item" />
//                             </form><br>
//                           </div>
//                         </div>
//                       </div>
//                     </main>`;
//   $('body').empty().append($formPage);
// }

// Loads all of a user's items
function loadList(){
  $.ajax({
    url: '/api/items',
    method: 'GET',
    success: function(itemsObject) {
      loadFilters()
      renderItems(itemsObject);
    }
  })
}

// Toggles the status of an item from "complete" to "to do" or vice versa
function changeStatus(statusObject){
  $.ajax({
    url: '/api/items',
    method: 'PUT',
    data: statusObject,
    success: function(itemsObject) {
      checkUser()
    }
  })
}

// Adds an item to a user's list
// function addItem(item) {
//   $.ajax({
//     url: '/api/items',
//     method: 'POST',
//     data: item.serialize(),
//     success: function(itemsObject) {
//       console.log("POST succesful.")
//     }
//   })
// }

// Adds an item to a user's list
function addItemfromButton(item) {
  $.ajax({
    url: '/api/items',
    method: 'POST',
    data: item,
    success: function(itemsObject) {
      console.log("POST succesful.")
    }
  })
}

// Removes an item from a user's list
function deleteItem(item) {
  $.ajax({
    url: '/api/items',
    method: 'DELETE',
    data: item,
    success: function(itemsObject) {
      checkUser()
    }
  })
}

// Checks whether use is logged in.  If logged in, it renders that user's item list.  If not logged in, it renders the login page.
function checkUser() {
  $.ajax({
    url: '/api/checkuser',
    method: 'GET',
    success: function(response) {
      loadNavBar(response);
      loadList()
    },
    error: function (err) {
      renderLogin();
    }
  })
}

// Registers a new user with the form information provided.
function userRegister(user) {
  console.log(user)
  $.ajax({
    url: '/api/register',
    method: 'POST',
    data: user.serialize(),
    success: function(response) {
      checkUser()
    },
    error: function(err) {
      alert("This email has already been taken.")
    }
  })
}

// Logs a user in
function userLogin(user) {
  $.ajax({
    url: '/api/login',
    method: 'POST',
    data: user.serialize(),
    success: function(response) {
      checkUser()
    },
    error: function(err) {
      alert("Incorrect email or password.")
    }
  })
}

// Checks user's information to render their profile page.
function checkUserProfile() {
  $.ajax({
    url: '/api/profile',
    method: 'GET',
    success: function(response) {
      renderProfile(response);
    },
    error: function (err) {
      console.log("Error.")
    }
  })
}

// Edits the user's information in the database with the form information provided.
function userEditProfile(user) {
  $.ajax({
    url: '/api/profile',
    method: 'POST',
    data: user.serialize(),
    success: function(response) {
      checkUser()
    },
    error: function(err) {
      console.log("Incorrect email or password.")
    }
  })
}

// Logs user out
function userLogout() {
  $.ajax({
    url: '/api/login',
    method: 'DELETE',
    success: function(response) {
      console.log("Logout succesful.")
    },
    error: function(err) {
      console.log("Unable to logout".)
    }
  })
}

// Renders the search bar
function renderSearch(item) {
  var $search = `<div class="row">
                  <div class="col-md-10 col-md-offset-1 col-xs-12">
                    <div class="search-container">
                      <input class="search-bar" placeholder="Search for your item">
                      <div class='auto-complete'>
                      </div>
                    </div>
                  </div>
                </div>`
  $('.container').empty().append($search);
}

