
// Wiki API search root url
const wikiSearchRoot = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=";


//Identify movie director
var directorSearch = [];
var directorName = movieDirector1;
console.log(directorSearch)

//Store movie driector by id
var movieDirector1 = document.getElementById('director-id-1').textContent;
console.log(movieDirector1)
var movieDirector2 = document.getElementById('director-id-2').textContent;
console.log(movieDirector2)
console.log(wikiSearchRoot + movieDirector1);
//var movieDirector3 = document.getElementById('director-id-3').textContent;
//var movieDirector4 = document.getElementById('director-id-4').textContent;
//var movieDirector5 = document.getElementById('director-id-5').textContent;
//var movieDirector6 = document.getElementById('director-id-6').textContent;


//Capture movie director value on click

movieDirector1.onclick = function(event) {
    console.log(event);
    
};



function wikiSearchCall(directorName) {
    var requestUrl = wikiSearchRoot + directorName;

    fetch(requestUrl)
        .then(function (response) {
            return (response.json());
        })
        .then(function (data) {
            var directoraResults = data;
            // https://en.wikipedia.org/wiki?curid=736

            displayResults();
            console.log(Object.keys(data.query.pages));
            for (var prop in data.query.pages){
                console.log({prop, [prop]:data.query.pages[prop]})
            }
        });



}

function displayResults() {
    var itemTitle = item.title;
    var itemSniippet = item.snippet;
    
    console.log(itemTitle);
    console.log(itemSniippet);

}
