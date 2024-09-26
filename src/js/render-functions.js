import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchData } from "./pixabay-api";

let ul = document.querySelector(".gallery");

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

export function renderMarkup(data, imgGallery) {
    const markup = data.hits.map(image => `<li class="image">
        <a class = "gallery-link" href = "${image.largeImageURL}">  
        <img src = "${image.webformatURL}" alt = "${image.tags}" class = "image" />
        </a>
        <div class = "card-body">   
          <p class="text">Likes <span class = "value">${image.likes}</span></p>
          <p class="text">Views <span class = "value">${image.views}</span></p>
          <p class="text">Comments <span class = "value">${image.comments}</span></p>
          <p class="text">Downloads <span class = "value">${image.downloads}</span></p>
          </div>
        </li>`).join("");
    
    imgGallery.insertAdjacentHTML("beforeend", markup);

    let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',        
    captionPosition: 'bottom',  
    captionDelay: 250, 
    });
    
    lightbox.refresh();
    
}