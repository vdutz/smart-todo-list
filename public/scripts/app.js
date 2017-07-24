

$(document).ready(function() {

  // Checks if user is logged and either send them to the login page or renders that user's list
  checkUser();

  // The functions below change the layout of the single-page app when certain items are clicked
  $("body").on('click', '.logo-page', function(event){
    $("body").empty();
    checkUser();
  });

  $("body").on('click', '.nav-list',function(event){
    $(".container .row").empty();
    loadList();
  });

  $("body").on('click', '.nav-login', function(event){
    renderLogin();
  });

  $("body").on('click', '.nav-register', function(event){
    renderRegister();
  });

  $("body").on('click', '.nav-logout', function(event){
    userLogout();
    renderLogin();
  });

  $("body").on('click', '.nav-profile', function(event){
    checkUserProfile();
  });

  $("body").on('click', '.switch-to-update-profile', function(event){
    renderProfileEdit();
  });

  $("body").on('click', '.switch-to-login', function(event){
    renderLogin();
  });

  $("body").on('click', '.switch-to-register', function(event){
    renderRegister();
  });

  $("body").on('click', '.nav-search', function(event){
    renderSearch();
  });

  $("body").on('click', '.filter-button.book', function(event){
    $('.box-outer.book').removeClass('hide')
    $('.box-outer.movie').addClass('hide')
    $('.box-outer.restaurant').addClass('hide')
    $('.box-outer.product').addClass('hide')
  });

  $("body").on('click', '.filter-button.movie', function(event){
    $('.box-outer.movie').removeClass('hide')
    $('.box-outer.book').addClass('hide')
    $('.box-outer.restaurant').addClass('hide')
    $('.box-outer.product').addClass('hide')
  });

  $("body").on('click', '.filter-button.restaurant', function(event){
    $('.box-outer.restaurant').removeClass('hide')
    $('.box-outer.book').addClass('hide')
    $('.box-outer.movie').addClass('hide')
    $('.box-outer.product').addClass('hide')
  });

  $("body").on('click', '.filter-button.product', function(event){
    $('.box-outer.product').removeClass('hide')
    $('.box-outer.book').addClass('hide')
    $('.box-outer.movie').addClass('hide')
    $('.box-outer.restaurant').addClass('hide')
  });

  $("body").on('click', '.filter-button.all', function(event){
    $('.box-outer.restaurant').removeClass('hide')
    $('.box-outer.book').removeClass('hide')
    $('.box-outer.movie').removeClass('hide')
    $('.box-outer.product').removeClass('hide')
    $('.box-outer.todo').removeClass('hide')
    $('.box-outer.complete').removeClass('hide')
  });

  $("body").on('click', '.filter-button.complete', function(event){
    $('.box-outer.complete').removeClass('hide')
    $('.box-outer.todo').addClass('hide')
  });

  $("body").on('click', '.filter-button.todo', function(event){
    $('.box-outer.todo').removeClass('hide')
    $('.box-outer.complete').addClass('hide')
  });

  $("body").on('click', 'i.complete', function(event){
    $(this).addClass('hide')
    $($(this).siblings()[8]).removeClass('hide')
    name = $(this).siblings()[0].innerHTML
    changeStatus({newStatus: "todo", newName: name})
  });

   $("body").on('click', 'i.todo', function(event){
    $(this).addClass('hide')
    $($(this).siblings()[8]).removeClass('hide')
    name = $(this).siblings()[0].innerHTML
    changeStatus({newStatus: "complete", newName: name})
  });

  $("body").on('submit', '.register-form', function(event){
    event.preventDefault();
    userRegister($(this));
  });

  $("body").on('submit', '.login-form', function(event){
    event.preventDefault();
    userLogin($(this));
  });

  $("body").on('submit', ".profile-list-edit", function(event){
    event.preventDefault();
    userEditProfile($(this))
  });

  $("body").on('click', ".auto-complete-item", function(event){
    event.preventDefault();
    $(this).children('.display-box').slideToggle();
  });

  $("body").on('click', ".display-box .add-item", function(event){
    event.preventDefault();
    let siblings = $(this).siblings()
    let picture = $(this).parent().parent().parent().siblings().children()[0].src
    let name = siblings[0].innerHTML
    let category = siblings[1].innerHTML.replace("Category: ", "")
    let rating = siblings[2].innerHTML.replace("Rating: ", "")
    let description = siblings[3].innerHTML.replace("Description: ", "")
    let item = {
      name: name,
      category: category,
      rating: rating,
      description: description,
      picture: picture
    }
    addItemfromButton(item)
  });

  $("body").on('click', ".remove-item", function(event){
    event.preventDefault();
    let siblings = $(this).siblings()
    let name = siblings[0].innerHTML
    let category = siblings[1].innerHTML.replace("Type: ", "")
    let item = {
      name: name,
      category: category,
    }
    deleteItem(item)
  });

})

