import axios from "axios";
const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "46106680-1f6bf9cc8c5ebc2359fb269e0";




export async function fetchData(query, page=1) {
    const params = {
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: 15,
        page,
    };
    
    const urlParams = new URLSearchParams(params);
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&${urlParams}`);
    return response.data;
};

