const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


// https://forkify-api.herokuapp.com/v2

const showRecipe = async function () {
  try {
    const res = await fetch('https://api.spoonacular.com/recipes/716429/information?apiKey=d754bd859d5c40abaf88e8715002bd21&includeNutrition=false');
    const data = await res.json();
    console.log(data)
  } catch (err) {
    console.log(err)
  }
  
}

showRecipe();


