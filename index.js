"use strict";

const searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const newsApiKey = "4c7b0c19e9d74afe982d773604074e2f";
const newsUrl =
  "https://newsapi.org/v2/everything?q=cocktails&language=en&pageSize=5";
const videosUrl = "https://www.googleapis.com/youtube/v3/search";
const videoApiKey = "AIzaSyAKGQo-ob44h9u7PIs5UCx2lgkoIFVVIdw";

// //function to get news related to cocktails
// function newsSection() {
//   const options = {
//     headers: new Headers({
//       "X-Api-Key": newsApiKey
//     })
//   };
//   fetch(newsUrl, options)
//     .then(response => response.json())
//     .then(responseJson => displayNews(responseJson));
// }

// //function to displayNews
// function displayNews(responseJson) {
//   $("#results3").empty();
//   for (let i = 0; i < responseJson.articles.length; i++) {
//     // for each video object in the articles
//     //array, add a list item to the results
//     //list with the article title, source, author,
//     //description, and image
//     $("#results3").append(
//       `<div class="news Box">
//         <ul class = articles-box>
//       <li><h3><a href="${responseJson.articles[i].url}"target="_blank">${responseJson.articles[i].title}</a></h3>
//       <p>${responseJson.articles[i].source.name}</p>
//       <p>By ${responseJson.articles[i].author}</p>
//       <p>${responseJson.articles[i].description}</p>
//       <img src='${responseJson.articles[i].urlToImage} height ="100' width= "100">
//       </li>
//       </ul>
//       </div>`
//     );
//   }

//   //display the results section
//   $("#results3").removeClass("hidden");
// }

//format the data
function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

// //function display
// function displayResults(responseJson) {
//   $("#results").empty();
//   console.log(responseJson);
//   for (let i = 0; i < 5; i++) {
//     //prepare ingredients
//     const ingredients = [];

//     //preprare measure
//     const measureKeys = [];

//     //get all the object properties
//     const objKeys = Object.keys(responseJson.drinks[i]);

//     for (let j = 0; j < objKeys.length; j++) {
//       if (
//         objKeys[j].includes("strIngredient") &&
//         responseJson.drinks[i][objKeys[j]] != null
//       ) {
//         ingredients.push(responseJson.drinks[i][objKeys[j]]);
//       }
//     }
//     console.log(ingredients);
//     for (let j = 0; j < objKeys.length; j++) {
//       if (
//         objKeys[j].includes("strMeasure") &&
//         responseJson.drinks[i][objKeys[j]] != null
//       ) {
//         measureKeys.push(responseJson.drinks[i][objKeys[j]]);
//       }
//     }
//     console.log(measureKeys);
//     $("#results").append(
//       `<div>
//           <ul class="results-list1">
//             <li><h3>Cocktail Name: </h3><p>${responseJson.drinks[i].strDrink}</p></li>
//               <h4>Instructions: </h3><p>${responseJson.drinks[i].strInstructions}</p>
//               <img src="${responseJson.drinks[i].strDrinkThumb}" height="100" width="100" alt= "picture of a cocktail">
//               <h4>Ingredients: </h3><p>${ingredients}</p>
//               <h4><p>${measureKeys}</p>
//           </ul>
//         </div>`
//     );
//   }
//   $("#results").removeClass("hidden");
// }

// //function to get the recipe
// function getRecipe(searchTerm) {
//   const recipeSearch = searchUrl + searchTerm;
//   console.log(recipeSearch);
//   fetch(recipeSearch)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error(response.statusText);
//     })
//     .then(responseJson => displayResults(responseJson))
//     .catch(err => {
//       $("#js-error-message").text(`Something went wrong: ${err.message}`);
//     });
// }

// function displayVideos(responseJson) {
//   $("#results2").empty();

//   // //const videoKeys = responseJson.items
//   // for (let i = 0; i < responseJson.items.length; i++) {
//   //   $("#results2").append(
//   //     `<div class ="video Box>
//   //               <ul class="result-list2">
//   //                   <li><p class="result-header2">${responseJson.items[i].snippet.description}</p></li>
//   //                   <li><p>${responseJson.items[i].snippet.title}</p></li>

//   //               </ul>
//   //           </div>`
//   //   );
//   // }
//    $("#results2").removeClass("hidden");
// }

function displayVideos(responseJson) {
  $("#results3").empty();
  for (let item in responseJson.items) {
    let videoLink = "";
    let videoTitle = responseJson.items[item].snippet.title;

    //handles videoId returning undefined
    if (responseJson.items[item].id.videoId) {
      videoLink = `https://www.youtube.com/watch?v=${responseJson.items[item].id.videoId}`;
    } else {
      videoLink = `https://www.youtube.com/channel/${responseJson.items[item].snippet.channelId}`;
    }
    $("#results3").append(
      `<div class = "videobox"> 
         <ul class = "results3"> 
           <li class="youtube-result-item"><figure>
           <a href="${videoLink}" target="_blank"><img src="${
        responseJson.items[item].snippet.thumbnails.high.url
      }" alt="${responseJson.items[item].snippet.title}" /></a>
           <figcaption>${videoTitle.toLowerCase()}</figcaption>
           </figure></li>
        </ul>
      </div>`
    );
  }
  $("#results3").removeClass("hidden");
}

//function to get youtube videos
function getVideos(searchTerm) {
  const params = {
    part: "snippet",
    maxResults: 5,
    q: `${"How to Make"}` + searchTerm,
    relevanceLanguage: "en",
    key: videoApiKey
  };
  const queryString = formatQueryParams(params);
  const urlYoutube = videosUrl + "?" + queryString;
  //console.log('delete', urlYoutube);

  fetch(urlYoutube)
    .then(response => response.json())
    .then(responseJson => displayVideos(responseJson));
}

//event listener
function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    this.searchTerm = $("#js-search-term").val();
    getVideos(this.searchTerm);
    //newsSection();
    //getRecipe(this.searchTerm);
  });
}
$(watchForm);
