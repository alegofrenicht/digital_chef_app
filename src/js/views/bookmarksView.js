import icons from "url:../../img/icons.svg";
import View from "./View";
import previewView from "./previewView";
import { addBookmark } from "../model";




class BookmarkView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it';

    addHandlerRender(handler) {
      window.addEventListener('load', handler);
    };

    _generateMarkup() {
      return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
    };
};

export default new BookmarkView();