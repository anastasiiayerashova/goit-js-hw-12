import{a as L,i as g,S as w}from"./assets/vendor-Qob_5Ba8.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const S="https://pixabay.com/api/",q="46106680-1f6bf9cc8c5ebc2359fb269e0";async function b(t,s=1){const o={q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:s},l=new URLSearchParams(o);return(await L.get(`${S}?key=${q}&${l}`)).data}document.querySelector(".gallery");const P=document.querySelector(".div-loader"),x=document.querySelector(".div-loader-2");function d(t){g.error({title:"Error",message:t})}function f(t){P.style.visibility=t?"visible":"hidden"}function u(t){x.style.visibility=t?"visible":"hidden"}function v(t,s){const o=t.hits.map(e=>`<li class="image">
        <a class = "gallery-link" href = "${e.largeImageURL}">  
        <img src = "${e.webformatURL}" alt = "${e.tags}" class = "image" />
        </a>
        <div class = "card-body">   
          <p class="text">Likes <span class = "value">${e.likes}</span></p>
          <p class="text">Views <span class = "value">${e.views}</span></p>
          <p class="text">Comments <span class = "value">${e.comments}</span></p>
          <p class="text">Downloads <span class = "value">${e.downloads}</span></p>
          </div>
        </li>`).join("");s.insertAdjacentHTML("beforeend",o),new w(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()}document.head.insertAdjacentHTML("beforeend",`<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital@0;1&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;1,500&display=swap" rel="stylesheet">`);let p=document.querySelector(".gallery");const h=document.querySelector(".btn"),y=document.querySelector(".container");let a=document.querySelector(".load-btn"),n=1,i="",m=0;async function M(t){if(t.preventDefault(),p.innerHTML="",i=y.elements.query.value.trim(),n=1,!i){d("Sorry, there are no images matching your search query. Please try again!"),a.style.display="none";return}f(!0),a.style.display="none",h.disabled=!0;try{const s=await b(i,n);if(a.style.display="flex",s.hits.length===0){d("Sorry, there are no images matching your search query. Please try again!"),a.style.display="none";return}m=s.totalHits,v(s,p);const o=Math.ceil(m/s.hits.length);n<o?a.style.display="flex":a.style.display="none",y.reset()}catch(s){d(s.message)}finally{f(!1),h.disabled=!1}}async function $(){n+=1,u(!0);try{const t=await b(i,n);v(t,p);const{height:s}=document.querySelector(".image img").getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"});const o=Math.ceil(t.totalHits/t.hits.length);if(n>=o)return u(!1),a.style.display="none",g.error({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}catch(t){console.log(t)}finally{u(!1)}}y.addEventListener("submit",M);a.addEventListener("click",$);
//# sourceMappingURL=index.js.map
