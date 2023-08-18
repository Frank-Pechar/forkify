/*
This resultsView.js module handles:
    - UI presentation for search results 
*/

// import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
import View from './view.js';

// inherit View Class
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  _generateMarkup() {
    // loop through recipe search results and generate html
    return this._data
      .map((result) => previewView.render(result, false))
      .join('');
  }
}

// create ResultsView instance
export default new ResultsView();
