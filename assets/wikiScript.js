// Identify movie director
var directorSearch = [];
var directorLinks = [];

// establish request url based on returned Director name from OMDB API
function wikiSearchCall() {
  var requestUrl = wikiSearchRoot + movieDirector;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // fetch the pageId for the searched Director in order to establish url
      var pageId = (Object.keys(data.query.pages));
      for (var i=0; i<pageId.length; i++) {
        var directorLink = "https://en.wikipedia.org/wiki?curid=" + pageId[i];
        directorLinks.push(directorLink);
      }

      // store the pageId and the link in a variable
      directorSearch.push(pageId);
      wikiLinks.push(directorLinks);
      
      // add the links to an object then if not null push to our movieDataStorage array for localStorage
      Object.assign(movieDataStorage, {wikiLinks: directorLinks})

      if (movies !== null){
        movies.push(movieDataStorage);
      } else {
        movies = [movieDataStorage];
      }

      moviesToLocalStorage(movies);
      return directorLinks;
    });
}