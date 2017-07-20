function createItemElement(itemdata) {
  const { name, category, rating, description, picture } = itemdata;

  itemString = `<div class="box-outer col-xs-12 col-sm-6 col-md-4">
                  <div class="box-inner">
                    <h4>${name}</h4>
                    Type: ${category}<br>
                    Rating: ${rating}<br><br>
                    <img src="${picture}"><br><br>
                    <p>${description}</p>
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
  var $registerPage = `<div class="row">
                        <div class="col-md-4 col-md-offset-4 col-xs-12">
                          <div class="login-box">
                            <img src="images/todolist.png"">
                            <form class="login-form">
                              <input type="text" name="name" placeholder="Nickname" /><br><br>
                              <input type="email" name="email" placeholder="Email" /><br><br>
                              <input type="password" name="password" placeholder="Password" /><br><br>
                              <input type="submit" name="submit" class="submit" value="Register" />
                            </form><br>
                            <a class='switch-to-login'>Aleardy have an account?</a>
                          </div>
                        </div>
                      </div>`;
  $('.container').empty().prepend($registerPage);
}

/////// replace the whole container and append with login page
function renderLogin() {
  var $loginPage = `<div class="row">
                        <div class="col-md-4 col-md-offset-4 col-xs-12">
                          <div class="login-box">
                            <img src="images/todolist.png"">
                            <form class="login-form">
                              <input type="email" name="email" placeholder="Email" /><br><br>
                              <input type="password" name="password" placeholder="Password" /><br><br>
                              <input type="submit" name="submit" class="submit" value="Login" />
                            </form><br>
                            <a class='switch-to-register'>Need an account?</a>
                          </div>
                        </div>
                      </div>`;
  $('.container').empty().prepend($loginPage);
}

