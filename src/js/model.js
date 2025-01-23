import { API_URL, API_KEY, REC_PER_PAGE, EC_API_TOKEN_URL, TERMINAL_PRIVATE_KEY, EC_API_PAYMENT_URL } from "./config.js";
import { getJSON } from "./helpers.js";

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
    api: {
        token: '',
    }
};

export const getToken = async function () {
  const url = EC_API_TOKEN_URL;
  
  const data = new URLSearchParams();
  data.append("client_id", "terminal");
  data.append("grant_type", "terminal_rest_api");
  data.append("authorizationKey", TERMINAL_PRIVATE_KEY);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const responseData = await response.json();
      console.log("response", responseData);
    //   state.api.token = responseData.access_token;
      return responseData.access_token;
    } else {
      console.error("Error fetching token:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error during fetch:", error);
    return false;
  }
}


export const creatingLink = async function(token){
    const url = EC_API_PAYMENT_URL;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({

            // "terminalID": "8fbbd3ef-d3a8-476b-ade2-b1450093bc3c",

        
            "allowCredit": false,
        
            "allowInstallments": true,
        
            "allowImmediate": true,
        
            "currency": "ILS",
        
            "invoiceType": null,
        
            "paymentRequestAmount": 120,
        
            "dueDate": null,
        
            "isRefund": false,
        
            "donation": null,
        
            "hidePhone": false,
        
            "hideEmail": false,
        
            "hideNationalID": false,
        
            "consumerDataReadonly": null,
        
            "showClock": null,
        
            "addressRequired": null,
        
            "dealDetails": {
        
                // "consumerAddress": {
        
                //     "city": null,
        
                //     "street": null,
        
                //     "house": null,
        
                //     "apartment": null,
        
                //     "zip": null
        
                // },
        
                // "dealReference": null,
        
                // "consumerEmail": null,
        
                // "consumerPhone": null,
        
                // "consumerID": null,
        
                // "dealDescription": null,
        
                "items": [
        
                    {
        
                        "price": 20,
        
                        "discount": 0,
        
                        "amount": 20,
        
                        "itemName": "Привет дашулькин, оплати мне протеинчик"
                        ,
        
                        "currency": "ILS",
        
                        "quantity": 1,
        
                        "externalReference": null,
        
                        "default": true,
        
                        "vat": 2.91,
        
                        "netAmount": 17.09,
        
                        "vatRate": 0.17,
        
                        "withoutVat": false
        
                    }
        
                ],
        
                // "consumerNationalID": null
        
            },
        
            "invoiceDetails": null,
        
            // "installmentDetails": {
        
            //     "minInstallments": 2,
        
            //     "maxInstallments": 12,
        
            //     "minCreditInstallments": 3,
        
            //     "maxCreditInstallments": 12,
        
            //     "totalAmount": 20,
        
            //     "numberOfPayments": 1,
        
            //     "initialPaymentAmount": 20,
        
            //     "installmentPaymentAmount": 20
        
            // },
        
            // "minInstallments": null,
        
            // "maxInstallments": null,
        
            // "minCreditInstallments": null,
        
            // "maxCreditInstallments": null,
        
            "customCssReference": null,
        
            "redirectUrls": [],
        
            "legacyRedirectResponse": false,
        
            "continueInCaseOf3DSecureError": null,
        
            "defaultLanguage": "he-IL",
        
            "hideConsumerName": false,
        
            "allowSaveCreditCard": null,
        
            "consumerNationalIDReadonly": null,
        
            "consumerPhoneReadonly": null,
        
            "consumerNameReadonly": null,
        
            "countdownTime": 180,
        
            "saveCreditCardByDefault": null,
        
            "disableCancelPayment": null,
        
            "phoneRequired": null,
        
            "emailRequired": null,
        
            "hideDealDescription": null,
        
            "noteEnabled": null,
        
            "alternativeMerchantName": null,
        
            "allowOnlyILS": null,
        
            "hideAddress": true,
        
            "transactionSucceedUrl": null,
        
            "transactionFailedUrl": null,
        
            // "netTotal": 17.09,
        
            // "vatTotal": 2.91,
        
            // "vatRate": 0.17,
        
            // "totalAmount": 20,
        
            // "amount": 20,
        
            // "transactionAmount": 20,
        
            "transactionType": "regularDeal",
        
            "consumerSpecified": false,
        
            "consumerNationalIdSpecified": false,
        
            "consumerEmailSpecified": false,
        
            "allowRegular": true,
        
            "additionalFields": {},
        
            "paymentIntent": true
        
        })
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
        const responseData = await response.json();
        return responseData.additionalData.url;
        } else {
        console.error("Error fetching token:", response.statusText);
        return false;
        }
    } catch (error) {
        console.error("Error during fetch:", error);
        return false;
    }

};



export const loadRecipe = async function(id){
    try{
        let data;
        if (isNaN(id)) {
            [data] = state.my_recipes.filter(recipe => recipe.id == id.replaceAll('%20', ' '))
        } else {
            data = await getJSON(`${API_URL}${id}/information?${API_KEY}`);
        };
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

    if (state.bookmarks.some(bookmark => bookmark.id == id)) 
        state.recipe.bookmarked = true;
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
          const ingArr = ing[1].split(',');
          if (ingArr.length !== 3)
          throw new Error(
              'Wrong ingredient format! Please use the correct format :)'
          );

          const [amount, unit, name] = ingArr;

          return { amount: amount ? amount : null, unit, name };
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
    };

    



