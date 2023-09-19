//---Weather API link + API Key---
const weatherAPIURL = "http://api.openweathermap.org/";
const weatherAPIKey = "e5e4490a81ab20d50831822b41ef579b";

//---Object References---
let searchInput = $("#search-input");
let searchForm = $("#search-form");

function getCoords(search)
{
    let queryURL = `${weatherAPIURL}/geo/1.0/direct?q=${search}&limit=4&appid=${weatherAPIKey}`; //creating the API search 
    fetch(queryURL).then(function(data)
    {
        console.log(queryURL);
        return data.json();
    }).then(function(response)
    {
        console.log(response);
    })
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