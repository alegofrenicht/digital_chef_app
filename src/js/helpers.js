import { TIMEOUT_SEC } from "./config";


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