import { API_URL } from "./config.js";

export const state = {
    recipe: {},
};

export const loadRecipe = async function(id){
    try{
    
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
        alert(err);
    };
};

