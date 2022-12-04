// omdb API key and root urls
const omdbApiKey = '&apikey=2e30998b';
const omdbSearchRoot = 'https://www.omdbapi.com/?type=movie&r=json&s=';
const omdbIdRoot = 'https://www.omdbapi.com/?i=';

// establish variable to store user's searched movie
var searchMovie = [];
var searchMovieId = [];
var movieData = {};

// store the search input and search button elements
var searchButtonEl = document.getElementById('movie-search-button');
var searchBarEl = document.querySelector('#movie-search-input');

// capture movie search value on enter
searchBarEl.addEventListener("keypress", function(event) {
  if(event.key == 'Enter') {
    searchMovie = $("#movie-search-input").val();
    searchMovie = searchMovie.trim();
    
    if (searchMovie === ''){
      return;
    }
    getSearchCall();    
    searchBarEl.value = "";    
    event.preventDefault();
  }
})

// capture movie search value on click
searchButtonEl.addEventListener("click", function(event) {
    searchMovie = $("#movie-search-input").val();
    searchMovie = searchMovie.trim();
    
    if (searchMovie === ''){
      return;
    }
    getSearchCall();    
    searchBarEl.value = "";    
    event.preventDefault();
})

// fetch OMDB API call and return data
function getSearchCall() {
  var requestUrl = omdbSearchRoot + '*' + searchMovie + '*' + omdbApiKey;

  fetch(requestUrl)
  .then(function(response){
    return response.json();
  })
  .then(function(data) {
    searchData = data;
    searchMovieId = searchData.Search[0].imdbID;

    var requestIdUrl = omdbIdRoot + searchMovieId + omdbApiKey;
    fetch(requestIdUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(data) {
      movieData = data;

      renderMovieData();
    });    
  });
}

// capture relevant information from the fetch call and display
function renderMovieData() {
  var movieTitle = movieData.Title;
  var movieReleaseDate = movieData.Released;
  var movieGenre = movieData.Genre;
  var movieBoxOffice = movieData.BoxOffice;
  var movieDirector = movieData.Director;
  var rottenTomatoes = movieData.Ratings[1].Source + ' Score: ' + movieData.Ratings[1].Value;

  console.log('Movie Title: ' + movieTitle);
  console.log('Movie Director: ' + movieDirector);
  console.log('Movie Genre: ' + movieGenre);
  console.log('Box Office: ' + movieBoxOffice);
  console.log('Movie Release Date: ' + movieReleaseDate);
  console.log('Movie Rotten Tomatoes: ' + rottenTomatoes);
  console.log('=================');
}