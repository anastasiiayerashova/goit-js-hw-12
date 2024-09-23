import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export const loader = document.querySelector(".div-loader");

export function showErrorMessage(message) {
    iziToast.error({
        title: 'Error',
        message,
    });
}

export function toggleLoader(show) {
loader.style.visibility = show ? "visible" : "hidden";
}

export function renderMarkup({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
        return `<li class="image">
        <a class = "gallery-link" href = "${largeImageURL}">  
        <img src = "${webformatURL}" alt = "${tags}" />
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