'use strict'

const searchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php'
const newsApiKey = "4c7b0c19e9d74afe982d773604074e2f"
const newsUrl = 'https://newsapi.org/v2/everything?apiKey=4c7b0c19e9d74afe982d773604074e2f&q=cocktails&pageSize=5';
const videosUrl = 'https://www.googleapis.com/youtube/v3/videos'
const videoApiKey = "AIzaSyBMYHHhHGGo-bjKN9WUx1O1jMrTuDnrMkw"


//function to get news related to cocktails
function newsSection() {
    const options = {
        headers: new Headers({
            "X-Api-Key": newsApiKey
        })
    };

    fetch(newsUrl)
        .then(response => response.json())
        .then(responseJson => console.log(responseJson));
};


function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        //getYoutubeVideos(searchTerm);
        newsSection(searchTerm);
    });
}

$(watchForm);