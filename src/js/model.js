import { API_URL, API_KEY, REC_PER_PAGE } from "./config.js";
import { getJSON, sendJSON } from "./helpers.js";

export const state = {
    recipe: {},
    my_recipes: [],
    search: {
       query: '',
       results: [],
       page: 1, 
       resultsPerPage: REC_PER_PAGE,
    },
    bookmarks: [],
};

export const loadRecipe = async function(id){
    try{
        let data;
        console.log(id);
        if (isNaN(id)) {
            [data] = state.my_recipes.filter(recipe => recipe.id == id.replaceAll('%20', ' '))
        } else {
            data = await getJSON(`${API_URL}${id}/information?${API_KEY}`);
        };
        console.log(data);
        state.recipe = {
            id: data.id,
            title: data.title,
            publisher: data.creditsText,
            sourceUrl: data.sourceUrl,
            image: data.image,
            servings: data.servings,
            cookingTime: data.readyInMinutes,
            ingredients: data.extendedIngredients,
            bookmarked: false,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === +id)) state.recipe.bookmarked = true;
    } catch(err){
        console.log(err)
        throw err;
    };
};

export const loadSearchResults = async function (query) {
    try{
        state.search.query = query;
        const data = await getJSON(`${API_URL}complexSearch?query=${query}&number=100&addRecipeInformation=true&${API_KEY}`);
        state.search.results = data.results.map(rec => {
          return {
            id: rec.id,
            title: rec.title,
            image: rec.image,
            publisher: rec.sourceName,
          }  
        })
    } catch(err){
        console.log(err)
        throw err;
    };

};

export const getSearchResultsPage = function(page = state.search.page){
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);
};


export const updateServings = function(servings){
    state.recipe.ingredients.forEach(ing => {
        ing.amount = ing.amount / state.recipe.servings * servings;
    });
    state.recipe.servings = servings;
};

const persistBookmarks = function() {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function(recipe){
    state.bookmarks.push(recipe);
    state.recipe.bookmarked = true;

    persistBookmarks();
};

export const deleteBookMark = function(id) {
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);
    state.recipe.bookmarked = false;

    persistBookmarks();
};

const init = function() {
    const storage_bookmarks = localStorage.getItem('bookmarks');
    if (storage_bookmarks) state.bookmarks = JSON.parse(storage_bookmarks);

    const storage_recipes = localStorage.getItem('recipes');
    if (storage_recipes) state.my_recipes = JSON.parse(storage_recipes);
};
init();

export const uploadRecipe = async function (newRecipe) {
      const extendedIngredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
      //   const ingArr = ing[1].split(',').map(el => el.trim());
          const ingArr = ing[1].replaceAll(' ', '').split(',');
          if (ingArr.length !== 3)
          throw new Error(
              'Wrong ingredient format! Please use the correct format :)'
          );

          const [amount, unit, name] = ingArr;

          return { amount: amount ? +amount : null, unit, name };
      });

      const recipe = {
        id: newRecipe.title + newRecipe.cookingTime,
        title: newRecipe.title,
        creditsText: newRecipe.publisher,
        sourceUrl: newRecipe.sourceUrl,
        image: newRecipe.image,
        servings: +newRecipe.servings,
        readyInMinutes: +newRecipe.cookingTime,
        extendedIngredients,
      };

      state.my_recipes.push(recipe);
      localStorage.setItem('recipes', JSON.stringify(state.my_recipes));
      // sendJSON()
    };

    



