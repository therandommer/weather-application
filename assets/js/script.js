//---Weather API link + API Key---
const weatherAPIURL = "http://api.openweathermap.org/";
const weatherAPIKey = "e5e4490a81ab20d50831822b41ef579b";

let searchHistory = []; //array to store search history objects

//---Object References---
let searchInput = $("#search-input");
let searchForm = $("#search-form");
let searchHistoryObject = $("#history");

function renderHistory() {

    for (let i = 0; i < searchHistory.length; i++) //generating a search history based off prior results
    {
        let newButton = $("<button>"); //new button created in jquery
        newButton.attr("type", "button"); //assigning a button type to the new button
        newButton.addClass("history-button button-history"); //adding the new classes to the button
        newButton.text(searchHistory[i]); //assigning the text of the search to the new button
        newButton.attr("data-search", searchHistory[i]); //assigning the new data to each button
        searchHistoryObject.append(newButton); //adds the button as a child of the searchStorage object
    }
}

function appendSearchHistory(search) {
    if (searchHistory.indexOf(search) !== -1) //check if the search exists already
    {
        return
    }

    searchHistory.push(search);
    localStorage.setItem("search-history", JSON.stringify(searchHistory));
    searchHistoryObject.html("");
}

function getCoords(search) {
    let queryURL = `${weatherAPIURL}/geo/1.0/direct?q=${search}&limit=4&appid=${weatherAPIKey}`; //creating the API search 
    fetch(queryURL).then(function (data) {
        console.log(queryURL);
        return data.json(); //converting the data to a json object
    }).then(function (response) //calling a function based on the response of the URL generated above
    {
        console.log(response);
        if (!response[0]) {
            alert("Location is not found"); //debugging null data
        }
        else {
            appendSearchHistory(search);
            renderHistory();
        }
    })
}

//on submission of the form do the following logic
function submitForm(event) {
    console.log("Reached here");
    event.preventDefault();
    let currentSearch = searchInput.val().trim();//removes unnecessary spaces from the search form

    getCoords(currentSearch);
}

searchForm.on("submit", submitForm);
