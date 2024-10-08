import * as model from './model.js';
import recipeView from './views/recipeView.js';




// https://forkify-api.herokuapp.com/v2

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err)
  }
  
}

Array(['hashchange']).forEach(ev => window.addEventListener(ev, showRecipe()));