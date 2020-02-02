'use strict'

const searchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php'
const newsApiKey = "4c7b0c19e9d74afe982d773604074e2f"
const newsUrl = 'https://newsapi.org/v2/everything?apiKey=4c7b0c19e9d74afe982d773604074e2f&q=cocktails';
const videosUrl = 'https://www.googleapis.com/youtube/v3/videos'
const videoApiKey = "AIzaSyBMYHHhHGGo-bjKN9WUx1O1jMrTuDnrMkw"


//function to get news related to cocktails
function newsSection(maxResults=5) {
    const options = {
        headers: new Headers({
            "X-Api-Key": newsApiKey
        })
    };
    fetch(newsUrl)
        .then(response => response.json())
        .then(responseJson => console.log('test', responseJson));
};

//format the data
// function formatQueryParams(params) {
//     const queryItems = Object.keys(params)
//         .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//     return queryItems.join('&');
// }

// function displayResults(responseJson) {
//     // if there are previous results, remove them
//     // console.log(responseJson);
//     $('#results-list').empty();
//     // iterate through the items array
//     for (let i = 0; i < responseJson.items.length; i++) {
//         // for each video object in the items 
//         //array, add a list item to the results 
//         //list with the video title, description,
//         //and thumbnail
//         $('#results-list').append(
//             `<li><h3>${responseJson.items[i].snippet.title}</h3>
//       <p>${responseJson.items[i].snippet.description}</p>
//       <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
//       </li>`
//         )
//     };
//     //display the results section  
//     $('#results').removeClass('hidden');
//  };


//function to get youtube videos 
// function getYoutubeVideos(argument) {
//     const params = {
//         key: videoApiKey,
//         part: 'snippet',
//         maxResults: 5,
//     };
//     const queryString = formatQueryParams(params)
//     const urlYoutube = videosUrl + '?' + queryString;
//     console.log(urlYoutube);

//     fetch(urlYoutube)
//     .then(response => response.json())
//     .then(responseJson => console.log(responseJson));
// };



//     fetch(searchUrl)

//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//             //throw new Error(response.statusText);
//         })
//         // .then(responseJson => displayResults(responseJson))
//         .catch(err => {
//             $('#js-error-message').text(`Something went wrong: ${err.message}`);
//         });
// }

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        //         //getYoutubeVideos(searchTerm);
        newsSection(searchTerm);
    });
}

$(watchForm);