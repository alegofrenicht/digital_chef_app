import icons from "url:../../img/icons.svg";
import View from "./View";




class PreviewView extends View {
    _parentElement = '';

    _generateMarkup() {
      const id = window.location.hash.slice(1);

      return `
      <li class="preview">
        <a class="preview__link ${this._data.id == +id || this._data.id == id.replaceAll('%20', ' ') ? 'preview__link--active' : ''}" href="#${this._data.id}">
          <figure class="preview__fig">
          <img src="${this._data.image.startsWith('http') == false || this._data.image.length < 30 ? "https://static.vecteezy.com/system/resources/previews/016/122/047/non_2x/hand-drawn-question-mark-in-doodle-style-vector.jpg" : this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}${this._data.title.length > 26 ? '...' : ''}</h4>
            <p class="preview__publisher">${this._data.publisher || this._data.creditsText}</p>
            <svg class="preview__myrecipe-icon ${isNaN(this._data.id) ? '' : 'hidden'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
            </div>
          </div>
        </a>
      </li>
      `
    }

    
};

export default new PreviewView();
