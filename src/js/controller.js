/*
This controller.js module handles:
    1) Defined in HTML script tag as the main module entry point to this application
    2) Performs init() function - (model.js also has an init() function)
    2) Bridging between Model and View Modules
    3) Application Logic
    4) Dispatches tasks to Model and Views
    
*/
// model performs initial state-object processing and loads bookmarks if on local storage
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// general polyfilling and polyfilling runtime support for async */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const searchResults = document.querySelector('.search-results');
const recipe = document.querySelector('.recipe');

// if the device screen is smaller size - display recipe details section only
let smallScreen = false;
if (window.matchMedia('(max-width: 500px)').matches) {
  smallScreen = true;
  searchResults.classList.add('hidden');
  recipe.style.gridColumn = '1 / 3';
}

// controlRecipes - executed from recipeView.addHandlerRender 'hashchange' and 'load' event listeners
const controlRecipes = async function () {
  try {
    // get api endpoint for base url
    const id = window.location.hash.slice(1);

    // if initial load of page then return for blank page
    if (!id) return;

    // renderSpinner is inherited from view.js
    recipeView.renderSpinner();

    // update search results

    resultsView.update(model.getSearchResultsPage());

    // update bookmarks list

    bookmarksView.update(model.state.bookmarks);

    // load recipe

    await model.loadRecipe(id);

    // render recipe
    recipeView.render(model.state.recipe);
    //* paginationView.render(model.state.search);

    // if the device screen is smaller size - display recipe details section only
    if (smallScreen) {
      searchResults.classList.add('hidden');
      recipe.classList.remove('hidden');
      recipe.style.gridColumn = '1 / 3';
    }
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

// controlSearchResults - executed from searchView.addHandlerSearch submit eventListener
const controlSearchResults = async function () {
  try {
    // renderSpinner is inherited from view.js
    resultsView.renderSpinner();

    // get search query
    const query = searchView.getQuery();
    if (!query) return;

    // load search results from query string input by user
    await model.loadSearchResults(query);
    // render search results
    resultsView.render(model.getSearchResultsPage());
    // render initial pagination buttons
    paginationView.render(model.state.search);

    // if the device screen is smaller size - display search results section only
    if (smallScreen) {
      searchResults.classList.remove('hidden');
      recipe.classList.add('hidden');
      searchResults.style.gridColumn = '1 / 3';
    }
  } catch (err) {}
};

// controlPagination - executed from paginationView.addHandlerClick click eventListeners on next and previous buttons
const controlPagination = function (goToPage) {
  // render results for given page
  resultsView.render(model.getSearchResultsPage(goToPage));
  // update pagination buttons
  paginationView.render(model.state.search);
};

// controlServings - update recipe servings executed from recipeView.addHandlerUpdateServings click eventListeners on add and subtract servings buttons
const controlServings = function (newServings) {
  model.updateServings(newServings);
  // re-render only updated parts of recipe view
  recipeView.update(model.state.recipe);
};

// controlAddBookmark - add or remove a bookmark executed from recipeView.addHandlerAddBookmark click eventListener on bookmark button
const controlAddBookmark = function () {
  // add or remove a bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // update recipe view
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

// controlBookmarks - executed from bookmarksView.addHandlerRender window 'load' eventListener
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

// controlAddRecipe - process new user created recipe executed from addRecipeView.addHandlerUpload 'submit' eventListener
const controlAddRecipe = async function (newRecipe) {
  try {
    // renderSpinner is inherited from view.js
    addRecipeView.renderSpinner();
    // upload new recipe
    await model.uploadRecipe(newRecipe);
    // render new recipe
    recipeView.render(model.state.recipe);
    // display recipe add success message
    addRecipeView.renderMessage();
    // render bookmarks
    bookmarksView.render(model.state.bookmarks);
    // update url hash endpoint with new recipe id without reloading page
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // close new recipe form
    setTimeout(function () {
      addRecipeView._toggleForm();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

// A D D   E V E N T   L I S T E N E R S
// I N I T I A L    E X E C U T I O N    S E Q U E N C E
// A F T E R   I M P O R T S   A R E   E X E C U T E D
function init() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();
