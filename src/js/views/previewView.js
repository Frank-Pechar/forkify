/*
This previewView.js module handles:
    - html markup for search results and bookmarks
*/

import icons from 'url:../../img/icons.svg';
import View from './view.js';

// inherit View Class
class PreviewView extends View {
  _parentElement = '';

  // callback function for map method from resultsView.js module for all recipe search results
  _generateMarkup() {
    const id = window.location.hash.slice(1);

    // markup for search results and bookmarks
    return `
			<li class="preview">
				<a class="preview__link ${
          this._data.id === id ? 'preview__link--active' : ''
        }" href="#${this._data.id}">
					<figure class="preview__fig">
						<img src="${this._data.image}"${this._data.title} />
					</figure>
					<div class="preview__data">
						<h4 class="preview__title">${this._data.title}</h4>
						<p class="preview__publisher">${this._data.publisher}</p>
						<div class="preview__user-generated ${this._data.key ? '' : 'hidden'}">
							<svg>
							<use href="${icons}#icon-user"></use>
							</svg>
						</div>
          </div>
				</a>
			</li>
    `;
  }
}

// creaate ResultsView instance
export default new PreviewView();
