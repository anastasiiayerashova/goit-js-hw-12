import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchData } from "./js/pixabay-api";
import { showErrorMessage, toggleLoader, renderMarkup } from "./js/render-functions";

document.head.insertAdjacentHTML("beforeend", `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital@0;1&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;1,500&display=swap" rel="stylesheet">`)

let ul = document.querySelector(".gallery");
const btn = document.querySelector(".btn");
const form = document.querySelector(".container");
let loadBtn = document.querySelector(".load-btn");

let currentPage = 1;
let currentQuery = "";
let totalHits = 0;

async function checkForm(event) {

    event.preventDefault();
    ul.innerHTML = "";
    loadBtn.classList.add("visually-hidden");
    currentQuery = form.elements.query.value.trim();
    currentPage = 1;
   
    if (!currentQuery) {
        toggleLoader(false);
        showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
        return;
    }
    
    btn.disabled = true;
    toggleLoader(true);
    
    try {
        const data = await fetchData(currentQuery, currentPage);
        toggleLoader(false);
        if (data.hits.length === 0) {
            showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
            return;
        }

        totalHits = data.totalHits;
        renderMarkup(data, ul);

        const totalPages = Math.ceil(totalHits / data.hits.length);
       
        if (currentPage < totalPages) {
            toggleLoader(true);
             loadBtn.classList.remove("visually-hidden");
        }

        else {
             loadBtn.classList.add("visually-hidden");
        }
       
        form.reset();
    }

    catch (error) {
        showErrorMessage(error.message);
    }
        
    finally {
        toggleLoader(false)
        btn.disabled = false;
    };
}

async function clickOnBtn() {

    currentPage += 1;
    toggleLoader(true);

    try {
        const data = await fetchData(currentQuery, currentPage);

        toggleLoader(false);
        renderMarkup(data, ul);
        
        const { height: cardHeight } = document.querySelector(".image img").getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth"
        });

        const totalPages = Math.ceil(data.totalHits / data.hits.length);

        if (currentPage >= totalPages) {
            toggleLoader(false);
             loadBtn.classList.add("visually-hidden");
            
            return iziToast.error({
            position: "topRight",
            message: "We're sorry, but you've reached the end of search results."
        });
    }
    }
    
    catch (error) {
        console.log(error)
    }

    finally {
        toggleLoader(false)
    }
}

form.addEventListener("submit", checkForm);
loadBtn.addEventListener("click", clickOnBtn);