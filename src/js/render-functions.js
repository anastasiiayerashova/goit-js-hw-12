import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchData, limit } from "./pixabay-api";
import { loadBtn } from "../main";

let ul = document.querySelector(".gallery");
let page = 1;
let currentQuery = "";

export const loader = document.querySelector(".div-loader");
export const secondLoader = document.querySelector(".div-loader-2");

export function showErrorMessage(message) {
    iziToast.error({
        title: 'Error',
        message,
    });
}

export function toggleLoader(show) {
loader.style.visibility = show ? "visible" : "hidden";
}

export function toggleLoaderSec(show) {
secondLoader.style.visibility = show ? "visible" : "hidden";
}

export function renderMarkup({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
        return `<li class="image">
        <a class = "gallery-link" href = "${largeImageURL}">  
        <img src = "${webformatURL}" alt = "${tags}" class = "image" />
        </a>
        <div class = "card-body">   
          <p class="text">Likes <span class = "value">${likes}</span></p>
          <p class="text">Views <span class = "value">${views}</span></p>
          <p class="text">Comments <span class = "value">${comments}</span></p>
          <p class="text">Downloads <span class = "value">${downloads}</span></p>
          </div>
        </li>`;
}
    
export const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',        
    captionPosition: 'bottom',  
    captionDelay: 250, 
});

export async function clickOnBtn() {
    const form = document.querySelector(".container");
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
        const imagesMarkup = images.hits.map(renderMarkup).join("");
        ul.insertAdjacentHTML("beforeend", imagesMarkup);
        loadBtn.style.display = "flex";
        lightbox.refresh();
        page += 1;

        const { height: cardHeight } = document.querySelector(".image img").getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth"
        });
    }

    catch (error) {
        console.log(error)
    }

    finally {
        toggleLoaderSec(false)
    }
}


