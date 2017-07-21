// var authorizationToken = 'Bearer m6a_E2PEcwkACaWUggWcwu67URvZKqV6F_D_MqdZcmE1pxK8QyFGXyZaOcLKvvYTraQhc9redOiW_73frergq-Kjd--yvb6cP_iK5P9hxa47K6AQiDrdU5_yHEVyWXYx'



$(document).ready(function() {
  $('.search-bar').on('input', function(event) {
    requestName = $(this).val().replace(' ', '+')
    var requestBook = 'https://www.googleapis.com/books/v1/volumes?q=' + requestName
    // var requestPlace = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${requestName}&key=AIzaSyBzJXtH_RQSozV9UcLOwRnXycS3ktiesjQ&location=43.6532,-79.3832&radius=2000`
    var requestPlace = `https://api.yelp.com/v3/businesses/search?term=${requestName}&latitude=43.6532&longitude=-79.3832&radius=1000`
    var requestMovie = 'https://api.themoviedb.org/3/search/movie?api_key=6b9040e6b69a988ffe21732fb57c373f&query=' + requestName
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
      readBookList(bookResult)
      readMovieList(movieResult)
      readPlaceList(placeResult)
    })
    // .catch(function (err){
    //   console.log("Error 2:", err)
    // })
  });

})

function readBookList(list) {
  $('.auto-complete').empty()
  let $searchCardBar = `
                       <span> Top 3 items from Google Books</span>
                       `
  $('.auto-complete').append($searchCardBar)
  for (let i=0; i<3; i++) {
    let $searchCard =  `
                        <div class='search-card'>
                        <img src="${list.items[i].volumeInfo.imageLinks.smallThumbnail}">
                        <span> ${list.items[i].volumeInfo.title}</span>
                       `
    $('.auto-complete').append($searchCard)
    // console.log(item.volumeInfo.title)
    // console.log(item.volumeInfo.imageLinks.smallThumbnail)
    // console.log(item.volumeInfo.description)
    // console.log(item.volumeInfo.averageRating)
  }
}

function readMovieList(list){
  let $searchCardBar = `
                       <span> Top 3 items from TMDB</span>
                       `
  $('.auto-complete').append($searchCardBar)
  for (let i=0; i<3; i++) {
    imageURL = 'http://image.tmdb.org/t/p/w185/' + list.results[i].poster_path
    let $searchCard =  `
                        <div class='search-card'>
                        <img src=${imageURL}>
                        <span> ${list.results[i].title}</span>
                       `
    $('.auto-complete').append($searchCard)
    // console.log(list.results[i].poster_path)
    // console.log(list.results[i].vote_average)
    // console.log(list.results[i].overview)
    // console.log(list.results[i].title)
  }
}

function readPlaceList(list) {
  let $searchCardBar = `
                       <span> Top 3 items from Yelp</span>
                       `
  $('.auto-complete').append($searchCardBar)
  for (let i=0; i<3; i++) {
    let $searchCard =  `
                        <div class='search-card'>
                        <img src="${list.businesses[i].image_url}">
                        <span> ${list.businesses[i].name}</span>
                       `
    $('.auto-complete').append($searchCard)
    // console.log(list.businesses[i].image_URL)
    // console.log(list.businesses[i].rating)
    // console.log(list.businesses[i].name)
  }
}

