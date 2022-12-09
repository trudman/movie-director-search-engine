// Wiki API search root url
// const wikiSearchRoot =
//   "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=";

// Identify movie director
var directorSearch = [];
var directorLinks = [];
// movieDirector = "Albert Einstein";


function wikiSearchCall() {
  var requestUrl = wikiSearchRoot + movieDirector;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      var pageId = (Object.keys(data.query.pages));
      for (var i=0; i<pageId.length; i++) {
        var directorLink = "https://en.wikipedia.org/wiki?curid=" + pageId[i];
        directorLinks.push(directorLink);
      }

      directorSearch.push(pageId);
      // console.log(directorSearch);
      console.log(directorLinks);
      wikiLinks.push(directorLinks);
      console.log(wikiLinks);
      
      Object.assign(movieDataStorage, {wikiLinks: directorLinks})
      console.log(movieDataStorage);

      if (movies !== null){
        movies.push(movieDataStorage);
      } else {
        movies = [movieDataStorage];
      }

      moviesToLocalStorage(movies);
      return directorLinks;
    });
}