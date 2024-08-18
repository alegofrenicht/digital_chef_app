export const getJSON = async function (url) {
    const res = await fetch(url);
    const data = await res.json();
    
    if(!res.ok) throw new Error(`${data.message}`)
}


// `${API_URL}${id}/information?apiKey=d754bd859d5c40abaf88e8715002bd21`