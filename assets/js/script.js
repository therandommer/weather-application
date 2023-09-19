//---Weather API link + API Key---
const weatherAPIURL = "http://api.openweathermap.org/";
const weatherAPIKey = "e5e4490a81ab20d50831822b41ef579b";

let searchHistory = []; //array to store search history objects

//---Object References---
let searchInput = $("#search-input");
let searchForm = $("#search-form");
let searchHistoryObject = $("#history");

//will draw buttons based on the data in the searchHistory array
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

//will append valid buttons to the end of the searchHistory array
function appendSearchHistory(search) {
    if (searchHistory.indexOf(search) !== -1) //check if the search exists already
    {
        return
    }

    searchHistory.push(search);
    localStorage.setItem("search-history", JSON.stringify(searchHistory));
    searchHistoryObject.html("");
    renderHistory(); //will update the buttons to contain the new data
}
//getting the weather from the API
function fetchWeather(location)
{
    //setting location variables  
    let lattitude = location.lattitude;
    let longitude = location.longitude;
    let city = location.name;
    
    let weatherURL = `${weatherAPIURL}/data/2.5/forecast?lat=${lattitude}&lon=${longitude}&units=metric&appid=${weatherAPIKey}`;//generating new api url to get data
    console.log(weatherURL);
}
//functionality to get the basic coordinate data and initial search from the API. The data gathered here will be gathered by other functions.
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
            appendSearchHistory(search); //appends the new search to the end of the array
            //for(let i = 0; i < response.length; i++)
            //{
                fetchWeather(response[0]); //sending the response to the fetchweather function
            //}
            
        }
    })
}

//will load from stored data generated from earlier sessions
function loadHistory()
{
    let storedHistory = localStorage.getItem("search-history");

    if(storedHistory)
    {
        searchHistory = JSON.parse(storedHistory); //converts the valid storedHistory array into a JSON oject for use throughout the code
    }
    renderHistory(); //draws the buttons with the new information.
}

//on submission of the form do the following logic
function submitForm(event) {
    console.log("Reached here");
    event.preventDefault();
    let currentSearch = searchInput.val().trim();//removes unnecessary spaces from the search form

    
    getCoords(currentSearch);
}

loadHistory();
searchForm.on("submit", submitForm);
