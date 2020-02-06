"use strict";

const searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const newsApiKey = "4c7b0c19e9d74afe982d773604074e2f";
const newsUrl =
  "https://newsapi.org/v2/everything?q=cocktails&language=en&pageSize=5";
const videosUrl = "https://www.googleapis.com/youtube/v3/search";
const videoApiKey = "AIzaSyAKGQo-ob44h9u7PIs5UCx2lgkoIFVVIdw";

//function to get news related to cocktails
function getNews() {
  const options = {
    headers: new Headers({
      "X-Api-Key": newsApiKey
    })
  };
  fetch(newsUrl, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayNews(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

// // //function to displayNews
function displayNews(responseJson) {
  $("#results2").empty();
  for (let i = 0; i < responseJson.articles.length; i++) {
    // for each video object in the articles
    //array, add a list item to the results
    //list with the article title, source, author,
    //description, and image
    $("#results2").append(
      `<div class="news Box">
        <ul class = articles-box>
      <li><h3><a href="${responseJson.articles[i].url}"target="_blank">${responseJson.articles[i].title}</a></h3>
      <p>${responseJson.articles[i].source.name}</p>
      <p>By ${responseJson.articles[i].author}</p>
      <p>${responseJson.articles[i].description}</p>
      <img src='${responseJson.articles[i].urlToImage} height ="100' width= "100">
      </li>
      </ul>
      </div>`
    );
  }
  //display the results section
  $("#results2").removeClass("hidden");
}

// //format the data
function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

// //function display recipe results
function displayResults(responseJson) {
  $("#results").empty();
  console.log("display results", responseJson.drinks.length);
  let loopLength = 0;
  if ((responseJson.drinks.length > 5, (loopLength = 5)))
    for (let i = 0; i < responseJson.drinks.length; i++) {
      //prepare ingredients
      const ingredients = [];

      //preprare measure
      const measureKeys = [];

      //get all the object properties
      const objKeys = Object.keys(responseJson.drinks[i]);

      for (let j = 0; j < objKeys.length; j++) {
        if (
          objKeys[j].includes("strIngredient") &&
          responseJson.drinks[i][objKeys[j]] != null
        ) {
          ingredients.push(responseJson.drinks[i][objKeys[j]]);
        }
      }
      console.log("ingredient list", ingredients);
      for (let j = 0; j < objKeys.length; j++) {
        if (
          objKeys[j].includes("strMeasure") &&
          responseJson.drinks[i][objKeys[j]] != null
        ) {
          measureKeys.push(responseJson.drinks[i][objKeys[j]]);
        }
      }
      console.log(measureKeys);
      $("#results").append(
        `<div>
          <ul class="results-list1">
            <li><h3>Cocktail Name: </h3><p>${responseJson.drinks[i].strDrink}</p></li>
              <h4>Instructions: </h3><p>${responseJson.drinks[i].strInstructions}</p>
              <img src="${responseJson.drinks[i].strDrinkThumb}" height="100" width="100" alt= "picture of a cocktail">
              <h4>Ingredients: </h3><p>${ingredients}</p>
              <h4><p>${measureKeys}</p>
          </ul>
        </div>`
      );
    }
  $("#results").removeClass("hidden");
}

// //function to get the recipe
function getRecipe(searchTerm) {
  const recipeSearch = searchUrl + searchTerm;
  console.log(recipeSearch);
  fetch(recipeSearch)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`1 Something went wrong: ${err.message}`);
    });
}

// // function to display the videos
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

  fetch(urlYoutube)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayVideos(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

//event listener
function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    this.searchTerm = $("#js-search-term").val();
    getVideos(this.searchTerm);
    getNews();
    getRecipe(this.searchTerm);
  });
}
$(watchForm);
