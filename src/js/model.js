import { API_URL, API_KEY } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
    recipe: {},
};

export const loadRecipe = async function(id){
    try{
        const data = await getJSON(`${API_URL}${id}/${API_KEY}`);
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
        throw err;
    };
};

