import { TIMEOUT_SEC, EC_IDENTITY_API_URL, TERMINAL_PRIVATE_KEY } from "./config";


const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const getJSON = async function (url) {
    try{
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    
    if(!res.ok) throw new Error(`${data.message}`)
    return data;
} catch (err){
  console.log(err);
  throw err;
};
};


export const sendJSON = async function (url, uploadData) {
  try{
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(uploadData)
    });

    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
  
  if(!res.ok) throw new Error(`${data.message}`)
  return data;
} catch (err){
console.log(err);
throw err;
};
};


export const getToken = async function () {
  const url = EC_IDENTITY_API_URL;
  
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
    console.log("WHAT HAPPPENED", response);
    if (response.ok) {
      console.log('OKKKK');
      const responseData = await response.json();
      return responseData.authorizationKey;
    } else {
      console.error("Error fetching token:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error during fetch:", error);
    return false;
  }
}