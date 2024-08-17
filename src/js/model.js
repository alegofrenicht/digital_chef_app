export const state = {
    recipe: {},
};

export const loadRecipe = async function(id){
    try{
    const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=d754bd859d5c40abaf88e8715002bd21`);
    const data = await res.json();
    
    if(!res.ok) throw new Error(`${data.message}`)
    
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

