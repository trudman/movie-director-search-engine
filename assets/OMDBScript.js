// omdb API key and root urls
const omdbApiKey = '&apikey=2e30998b';
const omdbSearchRoot = 'https://www.omdbapi.com/?type=movie&r=json&s=';
const omdbIdRoot = 'https://www.omdbapi.com/?i=';

// establish variable to store user's searched movie
var searchMovie = [];
var searchMovieId = [];
var movies = [];
var directorLinks = [];
var movieData = {};
var movieDataStorage = {};
var movieDirector = [];
var wikiLinks = [];

// store the search input and search button elements
var searchButtonEl = document.getElementById('movie-search-button');
var searchBarEl = document.querySelector('#movie-search-input');
var movieCardContainerEl2 = $('#movie-container');
var movieCardContainerEl = document.getElementById('movie-container');
var movieCardEl = document.getElementById('movie-card');
var deleteMovieButton = document.getElementById('close-movie-button');
var deleteMovieButton2 = $('#close-movie-button');

// establish the wiki API
const wikiSearchRoot =
  "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=";


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

// Reads movies from local storage and returns array of movie objects.
// Returns an empty array ([]) if there aren't any movies.
function readMoviesFromStorage() {
  var movies = localStorage.getItem('movies');
  if (movies) {
    movies = JSON.parse(movies);
  } else {
    movies = [];
  }
  return movies;
}


// capture relevant information from the fetch call and display
function renderMovieData() {
  var movieTitle = movieData.Title;
  var movieReleaseDate = movieData.Released;
  var movieGenre = movieData.Genre;
  var movieBoxOffice = movieData.BoxOffice;
  movieDirector = movieData.Director;
  var movieActors = movieData.Actors;
  var rottenTomatoes = movieData.Ratings[1].Source + ' Score: ' + movieData.Ratings[1].Value;

  // store the returned movie information into an object to be placed in localStorage
  movieDataStorage = {
    movieTitle: movieTitle,
    movieReleaseDate: movieReleaseDate,
    movieGenre: movieGenre,
    movieBoxOffice: movieBoxOffice,
    movieDirector: movieDirector,
    movieActors: movieActors,
    rottenTomatoes: rottenTomatoes,
  }

  // call our second API, wikipedia, to provide links to searched director name
  wikiSearchCall();
}

// store our movie data to localStorage
function moviesToLocalStorage(movies) {
  localStorage.setItem('movies', JSON.stringify(movies));
  location.reload();
}

// dummy function to clear all localStorage for debugging
function clearLocalStorage() {
  localStorage.clear();
}
// clearLocalStorage();

// initial function call to capture data from localStorage and render on page
function init() {
  movieCardContainerEl2.empty();
  movies = JSON.parse(localStorage.getItem("movies"));   
  if (movies !== null) {
    renderMovieCard();
  }
}

// function to display the movie information along with 3 wiki links, searching for the director name
function renderMovieCard() {

  for (var i=0; i<movies.length; i++) {
    var newMovieEl = document.createElement('div');
    var closeButtonEl = document.createElement('button');
    var movieImgEl = document.createElement('img');
    var movieDivEl = document.createElement('div');
    var movieTitleEl = document.createElement('h3');
    var movieTitleEl = document.createElement('h3');
    // Create ordered list element
    var listEl = document.createElement("ul");
    // Create ordered list items
    var li1 = document.createElement("div");
    var li2 = document.createElement("div");
    var li3 = document.createElement("div");
    var li4 = document.createElement("div");

    // set the attributes of the newly created elements for styling and text input
    newMovieEl.setAttribute('class', 'card bg-dark text-black');
    newMovieEl.setAttribute('id', 'movie-card');
    closeButtonEl.setAttribute('type', 'button');
    closeButtonEl.setAttribute('class', 'btn-close');
    closeButtonEl.setAttribute('aria-label', 'close');
    closeButtonEl.setAttribute('id', 'close-movie-button');

    movieImgEl.setAttribute('src', 'assets/images/kumiko-shimizu-_PshNniKRy8-unsplash.jpg');
    movieImgEl.setAttribute('alt', 'Card image of movie theater seats');
    movieImgEl.setAttribute('class', 'card-img');
  
    movieDivEl.setAttribute('class', 'card-img-overlay');
    movieTitleEl.setAttribute('class', 'card-title');
  
    listEl.setAttribute('class', 'list-element');
    li1.setAttribute('class', 'rotten-tomato');
    li2.setAttribute('class', 'genre');
    li3.setAttribute('class', 'box-office');
    li4.setAttribute('class', 'director');
  
    // add the text content that is returned from the OMDB API
    movieTitleEl.textContent = movies[i].movieTitle;
    li1.textContent = movies[i].rottenTomatoes;
    li2.textContent = movies[i].movieGenre;
    li3.textContent = movies[i].movieBoxOffice;
    li4.textContent = movies[i].movieDirector;    
  
    // render the movie cards on the page by appending to the movie container and movie cards
    movieCardContainerEl.appendChild(newMovieEl);
    closeButtonEl.dataset.index = i;
    newMovieEl.appendChild(movieImgEl);
    newMovieEl.appendChild(closeButtonEl);
    newMovieEl.appendChild(movieDivEl);
    movieDivEl.appendChild(movieTitleEl);
    movieDivEl.appendChild(listEl);
    listEl.appendChild(li1);
    listEl.appendChild(li2);
    listEl.appendChild(li3);
    listEl.appendChild(li4);

    // create a variable to store the returned wiki urls from the searched director name
    var linksToRender = movies[i].wikiLinks;

    // return the top 3 wiki urls for the director and add them to the movie card as a clickable link
    if (linksToRender[0]) {
      var li5 = document.createElement("div");
      var a = document.createElement("a");
      a.setAttribute('target', "_blank");
      a.textContent = 'WikiLink 1';
      a.href = linksToRender[0];
      li5.appendChild(a);
      listEl.appendChild(li5);
    }

    if (linksToRender[1]) {
      var li6 = document.createElement("div");
      var a = document.createElement("a");
      a.setAttribute('target', "_blank");
      a.textContent = 'WikiLink 2';
      a.href = linksToRender[1];
      li6.appendChild(a);
      listEl.appendChild(li6);
    }

    if (linksToRender[2]) {
      var li7 = document.createElement("div");
      var a = document.createElement("a");
      a.setAttribute('target', "_blank");
      a.textContent = 'WikiLink 3';
      a.href = linksToRender[2];
      li7.appendChild(a);
      listEl.appendChild(li7);
    }

  }
}

// function to close a movie card if the user no longer wants it displayed
function closeMovieCard() {
  var movieIndex = $(this).attr('data-index');
  var movies = readMoviesFromStorage();

  movies.splice(movieIndex, 1);
  moviesToLocalStorage(movies);

  init();
}

init();
// click event to close the selected movie card
movieCardContainerEl2.on('click', '#close-movie-button', closeMovieCard);