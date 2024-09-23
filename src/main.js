import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { BASE_URL, API_KEY, fetchData } from "./js/pixabay-api";
import { showErrorMessage, loader, toggleLoader, renderMarkup, lightbox } from "./js/render-functions";

document.head.insertAdjacentHTML("beforeend", `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital@0;1&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;1,500&display=swap" rel="stylesheet">`)

const ul = document.querySelector(".gallery");
const btn = document.querySelector(".btn");
const form = document.querySelector(".container");

function checkForm(event) {

    event.preventDefault();
    const form = event.currentTarget;
    const searchQuery = form.elements.query.value.trim();

    if ( !searchQuery) {
        showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
        return;
    }

    ul.innerHTML = "";
    toggleLoader(true);
    btn.disabled = true;
  
    fetchData(searchQuery).then(data => {

       if (data.hits.length === 0) {
           showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
           return;
        }
 
        const images = data.hits;
        const imagesMarkup = images.map(renderMarkup).join("");
        ul.insertAdjacentHTML("beforeend", imagesMarkup);
        lightbox.refresh();
        form.reset();
        
    })
        .catch(error => {
        showErrorMessage(error.message);
        })
        
        .finally(() => {
        toggleLoader(false)
        btn.disabled = false;
    });
}

form.addEventListener("submit", checkForm);