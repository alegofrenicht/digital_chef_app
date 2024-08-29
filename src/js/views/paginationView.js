import icons from "url:../../img/icons.svg";
import View from "./View";




class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    _generateMarkup() {

      const currPage = this._data.page;

      const nextPageBut = function(){
        return `
        <button class="btn--inline pagination__btn--next">
              <span>Page ${currPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>
        `
      }
      
      const prevPageBut = function(){
        return `
        <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>
        `
      }
      const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage); 
      console.log("numPages", numPages);

      if (currPage === 1 && numPages > 1){
          return `${nextPageBut()}
          `
      };

      if (currPage ===  numPages && numPages > 1){
          return `${prevPageBut()}
          `
      };

      if(currPage < numPages) {
          return `
          ${nextPageBut()}
          ${prevPageBut()}
          `
      };

      return '';
        
    }
};


export default new PaginationView();
