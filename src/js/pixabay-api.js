export const BASE_URL = "https://pixabay.com/api/";
export const API_KEY = "46106680-1f6bf9cc8c5ebc2359fb269e0";

export function fetchData(searchQuery) {
const urlParams = new URLSearchParams({ q: searchQuery, image_type: "photo", orientation: "horizontal", safesearch: "true" });

return fetch(`${BASE_URL}?key=${API_KEY}&${urlParams}`).then(response => {
        if (!response.ok) {
            throw new Error('Sorry, there are no images matching your search query. Please try again!');
        }
        return response.json();
    })
};