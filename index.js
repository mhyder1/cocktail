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

//function to display news
function displayNews(responseJson) {
  $("#results3").empty();
  for (let i = 0; i < responseJson.articles.length; i++) {
    $("#results3").append(
      `<div class="newsBox">
         <ul class = nResults>
             <li><h4><a href="${responseJson.articles[i].url}"target="_blank">${responseJson.articles[i].title}</a></h4>
                <p class = "lineh">${responseJson.articles[i].source.name}</p>
                <p class= "lineh">By ${responseJson.articles[i].author}</p>
                <p>${responseJson.articles[i].description}</p>
             <img src='${responseJson.articles[i].urlToImage} height ="100' width= "100">
           </li>
        </ul>
      </div>`
    );
  }
  //display the results section
  //$("#results2").removeClass("hidden");
}

//format the data
function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

//function display recipe results
function displayResults(responseJson) {
  $("#results").empty();
  console.log("display results", responseJson.drinks.length);
  const ingredientMeasures = {};
  for (let i = 0; i < responseJson.drinks.length && i < 5; i++) {
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
      ingredientMeasures[ingredients[i]] = [measureKeys[i]];
    }
    console.log(measureKeys);
    $("#results").append(
      `<div class="recipeBox">
          <ul class="rResults">
            <li><h3>${responseJson.drinks[i].strDrink}</h3></li>
              <img src="${responseJson.drinks[i].strDrinkThumb}" height="100" width="100" alt= "picture of a cocktail">
              <div class = "ingredientContainer"></div>
              <h4>Instructions: </h3><p>${responseJson.drinks[i].strInstructions}</p>
          </ul>
        </div>`
    );
    for (let i = 0; i < ingredients.length; i++) {
      $(".ingredientContainer").append(
        `<p><span>${ingredients[i]}</span> : <span>${measureKeys[i]}</span></p>`
      );
    }
  }
}

//function to get the recipe
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

// function to display the videos
function displayVideos(responseJson) {
  $("#results2").empty();
  for (let item in responseJson.items) {
    let videoLink = "";
    let videoTitle = responseJson.items[item].snippet.title;

    //handles videoId returning undefined
    if (responseJson.items[item].id.videoId) {
      videoLink = `https://www.youtube.com/watch?v=${responseJson.items[item].id.videoId}`;
    } else {
      videoLink = `https://www.youtube.com/channel/${responseJson.items[item].snippet.channelId}`;
    }

    $("#results2").append(
      `<div class = "videoBox" id= "gradient1">
         <ul class = "vResults">
           <li class="video-result">
           <figure>
           <a href="${videoLink}" target="_blank"><img src="${
        responseJson.items[item].snippet.thumbnails.high.url
      }" id= "pic" alt="${responseJson.items[item].snippet.title}" /></a>
           <figcaption>${videoTitle.toLowerCase()}</figcaption>
           </figure></li>
        </ul>
      </div>`
    );
  }
}

//function to get youtube videos
function getVideos(searchTerm) {
  const params = {
    part: "snippet",
    maxResults: 5,
    q: `${"How to make a cocktail"}` + searchTerm,
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
      $("#js-error-message").text(`2 Something went wrong: ${err.message}`);
    });
}

//function to back to home
$(document).on("click", ".text-center", function() {
  event.preventDefault();
  $(".welcome").show();
  $("#show-results").hide();
});

//event listener
function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    this.searchTerm = $("#js-search-term").val();
    $("#show-results").show();
    $(".welcome").hide();
    getVideos(this.searchTerm);
    getNews();
    getRecipe(this.searchTerm);
    $("#js-form")[0].reset();
  });
}
$(watchForm);
