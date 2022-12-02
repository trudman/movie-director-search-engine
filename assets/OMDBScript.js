const omdbApiKey = '2e30998b'
const omdbRoot = 'https://www.omdbapi.com/?type=movie&r=json&y=2018&s=*bum*&apikey='
const omdbRoot2 = 'https://www.omdbapi.com/?i=tt4701182&apikey='

// examples
// http://www.omdbapi.com/?y=2020
// https://www.omdbapi.com/?i=tt3896198&apikey=2e30998b
// tt4701182




function getDataCall() {
  var requestUrl = omdbRoot + omdbApiKey;


  fetch(requestUrl)
  .then(function(response){
    return response.json();
  })
  .then(function(data) {
    console.log(data);

  });
}

getDataCall();



function getIdCall() {
  var requestIdUrl = omdbRoot2 + omdbApiKey;


  fetch(requestIdUrl)
  .then(function(response){
    return response.json();
  })
  .then(function(data) {
    console.log(data);

  });
}

getIdCall();