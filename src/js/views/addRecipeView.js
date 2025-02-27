import icons from "url:../../img/icons.svg";
import View from "./View";
import { state } from "../model";




class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _successMessage = '';
    _errormessage = '';
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');
     
    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow() {
        // if (this._errormessage.length > 0 || this._successMessage.length > 0) window.location.reload();
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    };

    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    };

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = Object.fromEntries([...new FormData(this._parentElement)]);
            handler(data);
        })
    };
};


export default new AddRecipeView();
