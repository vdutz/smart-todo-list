var authorizationToken = '320c5babc9ec80ba3ceea0f5280190e3'



$(document).ready(function() {
  $('.search-bar').on('input', function(event) {
    requestName = $(this).val().replace(' ', '+')
    var requestBook = 'https://www.googleapis.com/books/v1/volumes?q=' + requestName
    // var requestPlace = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${requestName}&key=AIzaSyBzJXtH_RQSozV9UcLOwRnXycS3ktiesjQ&location=43.6532,-79.3832&radius=2000`
    var requestPlace = 'https://developers.zomato.com/api/v2.1/search?q=pizza&lat=43.6532&lon=-79.3832&radius=10000'
    var requestMovie = 'https://api.themoviedb.org/3/search/movie?api_key=6b9040e6b69a988ffe21732fb57c373f&query=' + requestName
    // var requestProduct = ''
    Promise.all([
      $.ajax({
        url: requestBook,
        method: 'GET',
      }),
      $.ajax({
        url: requestMovie,
        method: 'GET',
      })
      // $.ajax({
      //   url: requestPlace,
      //   method: 'GET',
      //   beforeSend: function(request) {
      //     request.setRequestHeader("user-key", authorizationToken)
      //   }
      // })
    ])
    .then(function (results){
        readBookList(results[0])
        readMovieList(results[1])
        // console.log(results[2])
    }).catch(function (err){
      console.log("error:", err)
    })
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
                        <img src=${list.items[i].volumeInfo.imageLinks.smallThumbnail}>
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

