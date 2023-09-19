//---Weather API link + API Key---
const weatherAPIURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=";
const weatherAPIKey = "fc1d08db9eaac3612aaa3d039b879061";

//---Object References---
let searchInput = $("#search-input");
let searchForm = $("#search-form");

function getCoords(search)
{
    let queryURL = weatherAPIURL + weatherAPIKey; //combining URL and key together to work for future API calls
    
}

//on submission of the form do the following logic
function submitForm(event)
{
    console.log("Reached here");
    event.preventDefault();
    let currentSearch = searchInput.val().trim();//removes unnecessary spaces from the search form
    
    getCoords(currentSearch);
}

searchForm.on("submit", submitForm);