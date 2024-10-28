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
            <h4 class="preview__title">${this._data.title}...</h4>
            <p class="preview__publisher">${this._data.publisher || this._data.creditsText}</p>
            </div>
          </div>
        </a>
      </li>
      `
    }

    
};

export default new PreviewView();
