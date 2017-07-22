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

////Replace the entire container and append with register page///
function renderRegister() {
  var $registerPage = `<main class='container'>
                        <div class="row">
                          <div class="col-md-4 col-md-offset-4 col-xs-12">
                            <div class="login-box">
                              <h2>Registration</h2>
                              <img src="images/todolist.png""><br><br>
                              <form class="login-form">
                                <input type="text" name="username" placeholder="Username" /><br><br>
                                <input type="email" name="email" placeholder="Email" /><br><br>
                                <input type="password" name="password" placeholder="Password" /><br><br>
                                <input type="submit" name="submit" class="submit-register" value="Register" />
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
                              <input type="submit" name="submit" class="submit-login" value="Log In" />
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
      console.log("Succesful request")
      console.log(response)
      // $(".container .row").empty();
      // renderItems(itemsObject);
    }
  })
}

function userRegister(user) {
  $.ajax({
    url: '/api/register',
    method: 'POST',
    data: item.serialize(),
    success: function(response) {
      console.log("Registration succesful!")
      console.log(response)
      // $(".container .row").empty();
      // renderItems(itemsObject);
    }
  })
}

function userLogin(user) {
  $.ajax({
    url: '/api/login',
    method: 'POST',
    data: item.serialize(),
    success: function(response) {
      // $(".container .row").empty();
      // renderItems(itemsObject);
      console.log("Login succesful!")
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

