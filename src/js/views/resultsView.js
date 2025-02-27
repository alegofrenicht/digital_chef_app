import icons from "url:../../img/icons.svg";
import View from "./View";
import previewView from "./previewView";




class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found! Please try again :(';

    _generateMarkup() {
      return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
    };
};

export default new ResultsView();