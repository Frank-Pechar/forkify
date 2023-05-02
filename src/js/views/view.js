/*
This view.js module is the Parent Class for all view module objects
*/

import icons from 'url:../../img/icons.svg';

// Create Class (no instances)
export default class View {
  _data;

  // Render markup from specific view module

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    // _generateMarkup executed from each view module
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    // insert markup into the DOM
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // this update function, for enhanced performance, will compare old DOM elements with new DOM elements in order to render only the changed text nodes
  update(data) {
    // format new and current DOM nodes for change comparison
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // go through nodes for new and current and compare for changes
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // replace changed text
      if (
        // compare for changes
        !newEl.isEqualNode(curEl) &&
        // check if content is a text node
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('Current - ', curEl, ' - ', curEl.textContent);
        // console.log('New -     ', newEl, ' - ', newEl.textContent);
        curEl.textContent = newEl.textContent;
      }
      // replace changed attributes (for servings counter)
      if (!newEl.isEqualNode(curEl)) {
        console.log('current attributes - ', curEl.attributes);
        console.log('new attributes     - ', newEl.attributes);
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> -->
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
