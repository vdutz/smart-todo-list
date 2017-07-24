
$(document).ready(function() {
  $('body').on('input', '.search-bar', function(event) {
    if ($(this).val() === '') {
      $('.auto-complete').empty()
  }
    requestName = $(this).val().replace(' ', '+')
    // var requestBook = 'https://www.googleapis.com/books/v1/volumes?q=' + requestName
    // var requestPlace = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${requestName}&key=AIzaSyBzJXtH_RQSozV9UcLOwRnXycS3ktiesjQ&location=43.6532,-79.3832&radius=2000`
    // var requestPlace = `https://api.yelp.com/v3/businesses/search?term=${requestName}&latitude=43.6532&longitude=-79.3832&radius=8000`
    // var requestMovie = 'https://api.themoviedb.org/3/search/movie?api_key=6b9040e6b69a988ffe21732fb57c373f&query=' + requestName
    // var requestProduct = ''
    $.ajax({
      method: 'GET',
      url: '/api/search',
      data: {
        searchTerms: requestName
      }
    })
    // Promise.all([
    //   $.ajax({
    //     url: requestBook,
    //     method: 'GET',
    //   }),
    //   $.ajax({
    //     url: requestMovie,
    //     method: 'GET',
    //   }),
    //   $.ajax({
    //     url: requestPlace,
    //     method: 'GET',
    //     dataType: 'jsonp',
    //     // cache: true,
    //     beforeSend: function(request) {
    //       request.setRequestHeader("Authorization", authorizationToken)
    //     }
    //   })
    // ])
    .done(function (results){
      let bookResult = JSON.parse(results[0])
      let movieResult = JSON.parse(results[1])
      let placeResult = JSON.parse(results[2])
      let productResult = results[3]

      readBookList(bookResult)
      readMovieList(movieResult)
      readPlaceList(placeResult)
      readProductList(productResult)
    })
    // .catch(function (err){
    //   console.log("Error 2:", err)
    // })
  });

})

function readProductList(list) {
  // if (!list.items[0]) {
  //   return;
  // }
  let $searchCardBar = `
                       <div style="background-color:#EEDAC1">
                        <span> Top 2 items from Amazon</span>
                       </div>
                       `
  $('.auto-complete').append($searchCardBar)
  for (let i=0; i<2; i++) {
    title = list[i.toString()].ItemAttributes[0].Title[0]
    picture = list[i.toString()].LargeImage[0].URL[0]
    description = list[i.toString()].DetailPageURL[0]
    rating = "See Amazon link for rating"
    if (title.length > 40){
      shortenedName = title.slice(0,40) + '...'
      let $searchCard =  `
                      <div class='auto-complete-item'>
                        <div class='search-card'>
                          <img src="${picture}">
                          <span>${shortenedName}</span>
                        </div>
                        <div class="display-box" style="background:url(${picture}) no-repeat; background-size: cover;">
                          <span>
                          <div class="display-detail">
                            <h2>${shortenedName}</h2>
                            <h4>Category: product</h4>
                            <h4 style="display:none">Rating: ${rating}</h4>
                            <h4 style="display:none">Description: ${description}</h4>
                            <br><br>
                            <button type="button" class="add-item">Add to List</button>
                          </div>
                          </span>
                        </div>
                      </div>
                     `
      $('.auto-complete').append($searchCard)
    } else {
      let $searchCard =  `
                      <div class='auto-complete-item'>
                        <div class='search-card'>
                          <img src="${picture}">
                          <span> ${title}</span>
                        </div>
                        <div class="display-box" style="background:url(${picture}) no-repeat; background-size: cover;">
                          <span>
                          <div class="display-detail">
                            <h2>${title}</h2>
                            <h4>Category: product</h4>
                            <h4 style="display:none">Rating: ${rating}</h4>
                            <h4 style="display:none">Description: ${description}</h4>
                            <br><br>
                            <button type="button" class="add-item">Add to List</button>
                          </div>
                          </span>
                        </div>
                      </div>
                     `
      $('.auto-complete').append($searchCard)
    }
    // console.log(item.volumeInfo.title)
    // console.log(item.volumeInfo.imageLinks.smallThumbnail)
    // console.log(item.volumeInfo.description)
    // console.log(item.volumeInfo.averageRating)
  }
}

function readBookList(list) {
  if (!list.items[0]) {
    return;
  }
  $('.auto-complete').empty()
  let $searchCardBar = `<div style="background-color:#EEDAC1">
                        <span> Top 2 items from Google Books</span>
                       </div>
                       `
  $('.auto-complete').append($searchCardBar)
  for (let i=0; i<2; i++) {
    if (list.items[i].volumeInfo.title.length > 40){
      shortenedName = list.items[i].volumeInfo.title.slice(0,40) + '...'
      if (!list.items[i].volumeInfo.imageLinks) {
        let $searchCard =  `
                        <div class='auto-complete-item'>
                          <div class='search-card'>
                            <img src="http://edgelearningmedia.com/ele/img/book.png">
                            <span>${shortenedName}</span>
                          </div>
                          <div class="display-box" style="background:url(http://edgelearningmedia.com/ele/img/book.png) no-repeat; background-size: cover;">
                            <span>
                            <div class="display-detail">
                              <h2>${shortenedName}</h2>
                              <h4>Category: book</h4>
                              <h4>Rating: ${list.items[i].volumeInfo.averageRating}/5 (Google Books)</h4>
                              <h4>Description: ${list.items[i].volumeInfo.description}</h4>
                              <button type="button" class="add-item">Add to List</button>
                            </div>
                            </span>
                          </div>
                        </div>
                       `
        $('.auto-complete').append($searchCard)
      } else {
        let $searchCard =  `
                        <div class='auto-complete-item'>
                          <div class='search-card'>
                            <img src="${list.items[i].volumeInfo.imageLinks.smallThumbnail}">
                            <span>${shortenedName}</span>
                          </div>
                          <div class="display-box" style="background:url(${list.items[i].volumeInfo.imageLinks.smallThumbnail}) no-repeat; background-size: cover;">
                            <span>
                            <div class="display-detail">
                              <h2>${shortenedName}</h2>
                              <h4>Category: book</h4>
                              <h4>Rating: ${list.items[i].volumeInfo.averageRating}/5 (Google Books)</h4>
                              <h4>Description: ${list.items[i].volumeInfo.description}</h4>
                              <button type="button" class="add-item">Add to List</button>
                            </div>
                            </span>
                          </div>
                        </div>
                       `
        $('.auto-complete').append($searchCard)
      }
    } else {
      if (!list.items[i].volumeInfo.imageLinks) {
        let $searchCard =  `
                        <div class='auto-complete-item'>
                          <div class='search-card'>
                            <img src="http://edgelearningmedia.com/ele/img/book.png">
                            <span> ${list.items[i].volumeInfo.title}</span>
                          </div>
                          <div class="display-box" style="background:url(http://edgelearningmedia.com/ele/img/book.png) no-repeat; background-size: cover;">
                            <span>
                              <div class="display-detail">
                                <h2>${list.items[i].volumeInfo.title}</h2>
                                <h4>Category: book</h4>
                                <h4>Rating: ${list.items[i].volumeInfo.averageRating}/5 (Google Books)</h4>
                                <h4>Description: ${list.items[i].volumeInfo.description}</h4>
                                <button type="button" class="add-item">Add to List</button>
                              </div>
                            </span>
                          </div>
                        </div>
                       `
        $('.auto-complete').append($searchCard)
      } else {
        let $searchCard =  `
                        <div class='auto-complete-item'>
                          <div class='search-card'>
                            <img src="${list.items[i].volumeInfo.imageLinks.smallThumbnail}">
                            <span> ${list.items[i].volumeInfo.title}</span>
                          </div>
                          <div class="display-box" style="background:url(${list.items[i].volumeInfo.imageLinks.smallThumbnail}) no-repeat; background-size: cover;">
                            <span>
                            <div class="display-detail">
                              <h2>${list.items[i].volumeInfo.title}</h2>
                              <h4>Category: book</h4>
                              <h4>Rating: ${list.items[i].volumeInfo.averageRating}/5 (Google Books)</h4>
                              <h4>Description: ${list.items[i].volumeInfo.description}</h4>
                              <button type="button" class="add-item">Add to List</button>
                            </div>
                            </span>
                          </div>
                        </div>
                       `
        $('.auto-complete').append($searchCard)
      }
    }
    // console.log(item.volumeInfo.title)
    // console.log(item.volumeInfo.imageLinks.smallThumbnail)
    // console.log(item.volumeInfo.description)
    // console.log(item.volumeInfo.averageRating)
  }
}

function readMovieList(list){
  if (!list.results[0]) {
    return;
  }
  let $searchCardBar = `<div style="background-color:#EEDAC1">
                        <span> Top 2 items from TMDB</span>
                       </div>
                       `
  $('.auto-complete').append($searchCardBar)
  for (let i=0; i<2; i++) {
    if (!list.results[i].poster_path) {
      imageURL = 'https://www.themoviedb.org/assets/static_cache/23e473036b28a59bd5dcfde9c671b1c5/images/v4/logos/312x276-primary-green.png'
      let $searchCard =  `
                        <div class='auto-complete-item'>
                          <div class='search-card'>
                            <img src=${imageURL}>
                            <span> ${list.results[i].title}</span>
                          </div>
                          <div class="display-box" style="background:url(${imageURL}) no-repeat; background-size: cover;">
                            <span>
                            <div class="display-detail">
                              <h2>${list.results[i].title}</h2>
                              <h4>Category: movie</h4>
                              <h4>Rating: ${list.results[i].vote_average}/10 (TMDB)</h4>
                              <h4>Description: ${list.results[i].overview}</h4>
                              <button type="button" class="add-item">Add to List</button>
                            </div>
                            </span>
                          </div>
                        </div>
                       `
    $('.auto-complete').append($searchCard)
    } else {
      imageURL = 'http://image.tmdb.org/t/p/w185/' + list.results[i].poster_path
    let $searchCard =  `
                        <div class='auto-complete-item'>
                          <div class='search-card'>
                            <img src=${imageURL}>
                            <span> ${list.results[i].title}</span>
                          </div>
                          <div class="display-box" style="background:url(${imageURL}) no-repeat; background-size: cover;">
                            <span>
                            <div class="display-detail">
                              <h2>${list.results[i].title}</h2>
                              <h4>Category: movie</h4>
                              <h4>Rating: ${list.results[i].vote_average}/10 (TMDB)</h4>
                              <h4>Description: ${list.results[i].overview}</h4>
                              <button type="button" class="add-item">Add to List</button>
                            </div>
                            </span>
                          </div>
                        </div>
                       `
    $('.auto-complete').append($searchCard)
    }
    // console.log(list.results[i].poster_path)
    // console.log(list.results[i].vote_average)
    // console.log(list.results[i].overview)
    // console.log(list.results[i].title)
  }
}

function readPlaceList(list) {
  if (!list.businesses[0]) {
    return;
  }
  let $searchCardBar = `<div style="background-color:#EEDAC1">
                        <span> Top 2 items from Yelp</span>
                        </div>
                       `
  $('.auto-complete').append($searchCardBar)
  for (let i=0; i<2; i++) {
    if (!list.businesses[i].image_url) {
      let $searchCard =  `
                        <div class='auto-complete-item'>
                          <div class='search-card'>
                            <img src="http://www.rockymountainfoodtours.com/wp-content/uploads/2015/08/yelp.png">
                            <span> ${list.businesses[i].name}</span>
                          </div>
                          <div class="display-box" style="background:url(http://www.rockymountainfoodtours.com/wp-content/uploads/2015/08/yelp.png) no-repeat; background-size: cover;">
                            <span>
                            <div class="display-detail">
                              <h2>${list.businesses[i].name}</h2>
                              <h4>Category: restaurant</h4>
                              <h4>Rating: ${list.businesses[i].rating}/5 (Yelp)</h4>
                              <h4>Description: </h4>
                              <button type="button" class="add-item">Add to List</button>
                            </div>
                            </span>
                          </div>
                        </div>
                       `
      $('.auto-complete').append($searchCard)
    } else {
      let $searchCard =  `
                        <div class='auto-complete-item'>
                          <div class='search-card'>
                            <img src="${list.businesses[i].image_url}">
                            <span> ${list.businesses[i].name}</span>
                          </div>
                          <div class="display-box" style="background:url(${list.businesses[i].image_url}) no-repeat; background-size: cover;">
                            <span>
                            <div class="display-detail">
                              <h2>${list.businesses[i].name}</h2>
                              <h4>Category: restaurant</h4>
                              <h4>Rating: ${list.businesses[i].rating}/5 (Yelp)</h4>
                              <h4>Description: </h4>
                              <button type="button" class="add-item">Add to List</button>
                            </div>
                            </span>
                          </div>
                        </div>
                       `
      $('.auto-complete').append($searchCard)
    // console.log(list.businesses[i].image_URL)
    // console.log(list.businesses[i].rating)
    // console.log(list.businesses[i].name)
    }
  }
}

