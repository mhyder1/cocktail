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


//function to display videos and recipes
function displayResults(responseJson) {

    $('.result-box').empty();
    // const preparedData = responseJson.drinks[0].
    for (let i = 0; i < responseJson.drinks.length; i += 5) {

        //prepare ingredients
        const ingKeys = [];

        //preprare measure
        const measureKeys = [];

        //get all the object properties
        const objKeys = Object.keys(responseJson.drinks[i]);
        for (let j = 0; j < objKeys.length; j++) {
            if (objKeys[j].substring(0, 14) === 'strIngredient') {
                ingKeys.push(responseJson.drinks[i]['strIngredient' + (j + 1)])
            }
        } 



        $('#results').append(
            `<div>
                <ul class="results-list1">
                    <li><h3>Cocktail Name: </h3><p>${responseJson.drinks[i].strDrink}</p></li>
                    <li><h3>Instructions: </h3><p>${responseJson.drinks[i].strInstructions}</p></li>
                    <li><h4>Thumbnail: <img src= ${responseJson.drinks[i].strDrinkThumb}">
                    <li><h4>Ingredients: </h3><p>${responseJson.drinks[i].strIngredient1}</p></li>
                    <li><h4>Ingredients: </h3><p>${responseJson.drinks[i].strIngredient2}</p></li>
                    <li><h4>Ingredients: </h3><p>${responseJson.drinks[i].strIngredient3}</p></li>
                    <li><h4>Ingredients: </h3><p>${responseJson.drinks[i].strIngredient4}</p></li>
                    <li><h4>Ingredients: </h3><p>${responseJson.drinks[i].strMeasure1}</p></li>
                    <li><h4>Ingredients: </h3><p>${responseJson.drinks[i].strMeasure2}</p></li>
                    <li><h4>Ingredients: </h3><p>${responseJson.drinks[i].strMeasure3}</p></li>
                </ul>
            </div>`
        )
    }

    $('#results').removeClass('hidden');
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
        chart: 'mostPopular'
    };
    const queryString = formatQueryParams(params)
    const urlYoutube = videosUrl + '?' + queryString;
    console.log('youtube url', urlYoutube);

    fetch(urlYoutube)
        .then(response => response.json())
        .then(responseJson => console.log('testing', responseJson));
};



//event listener 
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        this.searchTerm = $('#js-search-term').val();
        getVideos(searchTerm);
        newsSection();
        getRecipe();
    });
}

$(watchForm);
