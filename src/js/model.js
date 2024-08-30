import { API_URL, API_KEY, REC_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
    recipe: {},
    search: {
       query: '',
       results: [],
       page: 1, 
       resultsPerPage: REC_PER_PAGE,
    }
};

export const loadRecipe = async function(id){
    try{
        const data = await getJSON(`${API_URL}${id}/information?${API_KEY}`);
        state.recipe = {
            id: data.id,
            title: data.title,
            publisher: data.creditsText,
            sourceUrl: data.sourceUrl,
            image: data.image,
            servings: data.servings,
            cookingTime: data.readyInMinutes,
            ingredients: data.extendedIngredients,
    };
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
}



