import icons from "url:../../img/icons.svg";
import View from "./View";




class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
      this._parentElement.addEventListener('click', function(e){
        const btn = e.target.closest('.btn--inline');
        if(!btn) return;

        const goToPage = +btn.dataset.goto;
        handler(goToPage);
      });
    }

    _generateMarkup() {

      const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage); 
      const currPage = this._data.page;

      const nextPageBut = function(){
        return `
        <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
              <span>Page ${currPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>
        `
      }
      
      const prevPageBut = function(){
        return `
        <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>
        `
      }

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
