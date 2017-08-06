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
      console.log("Unable to logout.")
    }
  })
}