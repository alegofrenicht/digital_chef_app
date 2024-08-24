import { API_URL, API_KEY } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
    recipe: {},
};

export const loadRecipe = async function(id){
    try{
        const data = await getJSON(`${API_URL}${id}/${API_KEY}`);
        // const data = await getJSON(`https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2&apiKey=d754bd859d5c40abaf88e8715002bd21`);
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
    };
    } catch(err){
        console.log(err)
        throw err;
    };
};

export const loadSearchResults = async function (query) {
    try{

    } catch(err){
        console.log(err)
        throw err;
    };

}


