import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { BASE_URL, API_KEY, fetchData, limit, totalPages } from "./js/pixabay-api";
import { showErrorMessage, loader, toggleLoader, renderMarkup, lightbox, secondLoader, toggleLoaderSec } from "./js/render-functions";

document.head.insertAdjacentHTML("beforeend", `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital@0;1&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;1,500&display=swap" rel="stylesheet">`)

const ul = document.querySelector(".gallery");
const btn = document.querySelector(".btn");
const form = document.querySelector(".container");
const loadBtn = document.querySelector(".load-btn");

let page = 1;
let currentQuery = "";

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
  
    fetchData(searchQuery, page).then(data => {

       if (data.hits.length === 0) {
           showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
           return;
        }
 
        const imagesMarkup = data.hits.map(renderMarkup).join("");
        ul.insertAdjacentHTML("beforeend", imagesMarkup);
        loadBtn.style.display = "flex";
        lightbox.refresh();
        form.reset();
        page += 1;
        currentQuery = searchQuery;
        
    })
        .catch(error => {
        showErrorMessage(error.message);
        })
        
        .finally(() => {
        toggleLoader(false)
        btn.disabled = false;
    });
}

async function clickOnBtn() {
    const searchQuery = form.elements.query.value.trim();
      
    if (searchQuery !== currentQuery) {
        currentQuery = searchQuery;
        page = 1;
        ul.innerHTML = ""; 
    }

    toggleLoaderSec(true);

    const totalPages = Math.ceil(100 / limit);

     if (page > totalPages) {
        return iziToast.error({
            position: "topRight",
            message: "We're sorry, but you've reached the end of search results."
        });
    }

    try {
        const images = await fetchData(searchQuery, page);
        page += 1;
        const imagesMarkup = images.hits.map(renderMarkup).join("");
        ul.insertAdjacentHTML("beforeend", imagesMarkup);
        loadBtn.style.display = "flex";
        lightbox.refresh();
        page += 1;
    }

    catch (error) {
        console.log(error)
    }

    finally {
        toggleLoaderSec(false)
    }
}

form.addEventListener("submit", checkForm);
loadBtn.addEventListener("click", clickOnBtn);