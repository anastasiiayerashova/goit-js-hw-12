import axios from "axios";
export const BASE_URL = "https://pixabay.com/api/";
export const API_KEY = "46106680-1f6bf9cc8c5ebc2359fb269e0";

export let limit = 15;
export let page = 1;
export let totalPages = Math.ceil(100 / limit);

export async function fetchData(searchQuery, page) {
    const params = {
        q: searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: limit,
        _page: page
    };
    
    const urlParams = new URLSearchParams(params);
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&${urlParams}`);
    return response.data;
};

