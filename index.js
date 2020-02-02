'use strict'
const searchTerm = ''
const searchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const newsApiKey = "4c7b0c19e9d74afe982d773604074e2f"
const newsUrl = 'https://newsapi.org/v2/everything?apiKey=4c7b0c19e9d74afe982d773604074e2f&q=cocktails&pageSize=5';
const videosUrl = 'https://www.googleapis.com/youtube/v3/videos'
const videoApiKey = "AIzaSyBMYHHhHGGo-bjKN9WUx1O1jMrTuDnrMkw"

const allUrls = [

];

//function to get news related to cocktails
function newsSection() {
    const options = {
        headers: new Headers({
            "X-Api-Key": newsApiKey
        })
    };

    fetch(newsUrl, options)
        .then(response => response.json())
        .then(responseJson => console.log(responseJson));
};


//format the data
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


//function to get the recipe
function getRecipe() {
const recipeSearch = searchUrl + searchTerm
    fetch(recipeSearch)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
};


//function to get youtube videos 
function getVideos(argument) {
    const params = {
        key: videoApiKey,
        part: 'snippet',
        maxResults: 5,
    };
    const queryString = formatQueryParams(params)
    const urlYoutube = videosUrl + '?' + queryString;
    console.log(urlYoutube);

    fetch(urlYoutube)
        .then(response => response.json())
        .then(responseJson => console.log(responseJson));
};

//event listener 
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        this.searchTerm = $('#js-search-term').val();
        //getVideos(searchTerm);
        newsSection();
        getRecipe();
    });
}

$(watchForm);
