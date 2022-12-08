// Wiki API search root url
const wikiSearchRoot =
  "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=";

//Identify movie director
var directorSearch = [];

// //Store movie driector by id
// var  = document.querySelector(".director").textContent;
// console.log(movieDirector1);

//Capture movie director value on click

// movieDirector1.onclick = function (event) {
//   console.log(event);
// };

var directorName = "Albert Einstein";

function wikiSearchCall() {
  var requestUrl = wikiSearchRoot + directorName;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var directorResults = data;
      //   https://en.wikipedia.org/wiki?curid=736
      //   displayResults();
      console.log(Object.keys(data.query.pages));
      for (var prop in data.query.pages) {
        console.log({ prop, [prop]: data.query.pages[prop] });
      }
    });
}

function displayResults() {
  var itemTitle = item.title;
  var itemSniippet = item.snippet;

  console.log(itemTitle);
  console.log(itemSniippet);
}
wikiSearchCall();

