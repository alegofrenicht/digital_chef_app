import icons from "url:../../img/icons.svg";
import View from "./View";
import previewView from "./previewView";
import { uploadRecipe } from "../model";




class myRecipesView extends View {
    _parentElement = document.querySelector('.recipes__list');
    _errorMessage = 'No recipes yet. Try add one :)';

    addHandlerRender(handler) {
      window.addEventListener('load', handler);
    };

    addHandlerAddRecipe(handler){
      this._parentElement.addEventListener('click', function(e){
          const btn = e.target.closest('.upload__btn');
          if (!btn) return
          console.log("HELLO");
          handler();

      })
  };

    _generateMarkup() {
      console.log(this._data);
      console.log(this._parentElement)
      return this._data.map(recipe => previewView.render(recipe, false)).join('');
    };
};

export default new myRecipesView();