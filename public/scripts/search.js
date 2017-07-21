// request = 'https://www.googleapis.com/books/v1/volumes?q=three+body+problem';

$(document).ready(function() {
/// counter
  $('.search-bar').on('input', function(event) {
    var request = 'https://www.googleapis.com/books/v1/volumes?q=' + $(this).val()
    request = request.replace(' ', '+')
    $('.auto-complete').empty()
    $.ajax({
      url: request,
      method: 'GET',
      success: function (input){
        readList(input)
      }
    })
  });
})

function readList(list) {
  for (let i=0; i<2; i++) {
    let $searchCard =  `
                        <div class='search-card'>
                        <img src=${list.items[i].volumeInfo.imageLinks.smallThumbnail}>
                        <span> ${list.items[i].volumeInfo.title}
                       `
    $('.auto-complete').append($searchCard)
    // console.log(item.volumeInfo.title)
    // console.log(item.volumeInfo.imageLinks.smallThumbnail)
    // console.log(item.volumeInfo.description)
    // console.log(item.volumeInfo.averageRating)
  }
}

