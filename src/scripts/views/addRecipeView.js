/*
This addRecipeView.js module handles:
    1) New Recipe UI Presentation 
    2) Form for User Data Input
*/

// import icons from 'url:../../img/icons.svg';
import View from './view.js';

class AddRecipeView extends View {
  // inherit View Class
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  #window = document.querySelector('.add-recipe-window');
  #overlay = document.querySelector('.overlay');
  #btnOpen = document.querySelector('.nav__btn--add-recipe');
  #btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.#addHandlerModalWindows();
  }

  #addHandlerModalWindows() {
    this.#btnOpen.addEventListener('click', () => this._toggleForm());
    this.#btnClose.addEventListener('click', () => this._toggleForm());
    this.#overlay.addEventListener('click', () => this._toggleForm());
  }

  _toggleForm = () => {
    this.#overlay.classList.toggle('hidden');
    this.#window.classList.toggle('hidden');
  };

  // event handler for adding a new recipe
  addHandlerUpload(handler) {
    // _parentElement === body > div.add-recipe-window > form.upload
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // spread FormData object into an array
      const dataArr = [...new FormData(this)];
      // reset new recipe form input values
      document.getElementById('uploadForm').reset();
      // create an object from the array
      const data = Object.fromEntries(dataArr);
      // handler = controller.controlAddRecipe()
      handler(data);
    });
  }

  _generateMarkup() {}
}

// create AddRecipeView instance
export default new AddRecipeView();
