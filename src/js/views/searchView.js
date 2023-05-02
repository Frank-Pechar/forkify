/*
This searchView.js module handles:
    - Accepting user recipe search query input and presenting results
*/

class SearchView {
  _parentEl = document.querySelector('.search');

  // get user search query input
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  // event handling for recipe search query
  addHandlerSearch(handler) {
    // handler = controller.controlSearchResults
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

// create SearchView instance
export default new SearchView();
