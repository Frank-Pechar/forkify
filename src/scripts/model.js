/*
This model.js module handles:
    1) State Data for the application
    2) HTTP Requests
    3) Business Logic
    4) init() function for loading bookmarks if available in local storage

Exports are:
  state object - main state object for application
  loadRecipe - fetches recipe
  loadSearchResults - fetches search results
  getSearchResultsPage - retrieves range of search results from array
  updateServings - updates number of servings for recipe
  addBookmark - adds bookmark
  deleteBookmark - deletes bookmark
  uploadRecipe - uploads new user recipe
*/

// commented out for webpack
// import { async } from 'regenerator-runtime';

import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { AJAX } from './helper.js';
//* import { getJSON, sendJSON } from './helper.js';

/*********
 * state object (main state object for application)
 * @typedef {object} state
 *     @property {object} recipe - Current recipe details
 *     @property {object} search - Current search information
 *         @property {Array<*>} results - Recipe search results array
 *         @property {number} page - Page number for displaying results
 *         @property {number} RES_PER_PAGE - Results per page to be displayed
 *     @property {Array<*>} bookmarks - All bookmarks for the user
 */
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};
/********
 */

// create recipe detail object
const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

// fetch the recipe
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    // determine if recipe is bookmarked
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.error(`${err} 💥💥💥💥💥`);
    throw err;
  }
};

// fetch search results
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    // create array of recipe objects from the search results
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 💥💥💥💥💥`);
    throw err;
  }
};

// get search results range from results array for the specified page
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  // return range of results for rendering
  return state.search.results.slice(start, end);
};

// update servings and ingredient quantities
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

// bookmarks - add to local storage
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

// bookmarks - add recipe to bookmarks array
export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

// bookmarks - delete recipe from bookmarks array
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

// upload new user created recipe
export const uploadRecipe = async function (newRecipe) {
  try {
    // retrieve, validate and format ingredients into array
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient-') && entry[1].trim())
      .map(ing => {
        const ingArr = ing[1].split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format :)'
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    // create new recipe object
    const recipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      ingredients,
    };
    // upload the new recipe
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    // add new recipe to state object
    state.recipe = createRecipeObject(data);
    // add user created recipe to bookmarks array
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

// get bookmarks from local storage
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  // if there are bookmarks then copy to state bookmarks array
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

/* clears local storage from within app
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
clearBookmarks(); 
*/
