/*
This bookmarksView.js module handles:
    - UI presentation for bookmarks
*/

// import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
import View from './view.js';

// inherit View Class
class BookMarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _message = '';

  // on page load render bookmarks if available
  addHandlerRender(handler) {
    // handler = controller.controlBookmarks
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // loop through all search results and generate html
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join('');
  }
}

// create ResultsView instance
export default new BookMarksView();
