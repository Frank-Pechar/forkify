/*
This addRecipeView.js module handles:
    1) New Recipe UI Presentation 
    2) Form for Inputing User Data
*/

import icons from 'url:../../img/icons.svg';
import View from './view.js';

class AddRecipeView extends View {
  // inherit View Class
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerModalWindows();
  }

  _addHandlerModalWindows() {
    this._btnOpen.addEventListener('click', () => this._toggleForm());
    this._btnClose.addEventListener('click', () => this._toggleForm());
    this._overlay.addEventListener('click', () => this._toggleForm());
  }

  _toggleForm = () => {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  };

  // event handler for adding a new recipe
  addHandlerUpload(handler) {
    // handler = controller.controlAddRecipe()
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // spread FormData object into an array
      const dataArr = [...new FormData(this)];
      // create an object from the array
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

// create AddRecipeView instance
export default new AddRecipeView();
