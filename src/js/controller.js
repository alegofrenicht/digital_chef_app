import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import myRecipesView from './views/myRecipesView.js';

// if (module.hot) {
//   module.hot.accept();
// }


// https://forkify-api.herokuapp.com/v2

const controlSearchPagination = function(pagenum = 1){
  resultsView.render(model.getSearchResultsPage(pagenum));
  paginationView.render(model.state.search);
};

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());
    myRecipesView.update(model.state.my_recipes);
    bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
  
};

const controlSearchResults = async function(){
  try{

    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    controlSearchPagination();
  } catch(err){
    console.log(err);
  }
};

const controlServings = function(servings) {
  model.updateServings(servings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function() {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe) 
  else (model.deleteBookMark(model.state.recipe.id));

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
};


const controlAddRecipe = async function (newRecipe) {
  try {
    if (newRecipe.title == undefined) return;
    if (model.state.my_recipes.some(recipe => recipe.title.toLowerCase() == newRecipe.title.toLowerCase()))
      throw new Error(
          'Such recipe already exists, please try another name :)'
      )
    
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    addRecipeView._successMessage = 'Recipe was successfully uploaded :)';
    addRecipeView.renderMessage();
    myRecipesView.render(model.state.my_recipes);
    const id = model.state.my_recipes.filter(recipe => recipe.title.toLowerCase() == newRecipe.title.toLowerCase())
    window.location.href = `${window.location.hostname}#${id[0].id}`

    setTimeout(function() {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000);

  } catch (err) {
    addRecipeView._errormessage = err.message;
    addRecipeView.renderError(err.message);
  }
};

const controlMyRecipes = function() {
  myRecipesView.render(model.state.my_recipes);
  myRecipesView.update(model.state.my_recipes);
};

const controlLogoBtn = function() {
  const logo = document.querySelector('.header__logo');
  const url = window.location.hash
  logo.addEventListener('click', function(){
    console.log("hostname", window.location.hostname);
    window.location.href = window.location.hostname;
  })
}

const init = function(){
  myRecipesView.addHandlerRender(controlMyRecipes);
  myRecipesView.addHandlerRender(controlAddRecipe);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlSearchPagination);
  controlLogoBtn();
};

init()