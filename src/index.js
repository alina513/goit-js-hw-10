import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import Notiflix from 'notiflix';


const div = document.querySelector(".cat-info");
const select = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const err = document.querySelector(".error");

select.addEventListener("change", onChange);


fetchBreeds()
.then((data) => {select.innerHTML = createName(data);

loader.classList.toggle("is-hidden");
select.classList.toggle("is-hidden")})
.catch((error) => {console.log(error);
  err.classList.toggle("is-hidden");
  loader.classList.toggle("is-hidden");})

let photo;
function onChange(event) {
  div.innerHTML = '';
  loader.classList.toggle("is-hidden");
  err.classList.add("is-hidden");
    fetchCatByBreed(event.target.value)
    .then((data) => {loader.classList.toggle("is-hidden");
      photo = data[0].url;
    
      fetchBreeds()
    .then(breeds => {const choose = breeds.find(breed => breed.id === event.target.value);
    div.innerHTML = `<div class="container">
    <img src="${photo}" alt="cat" class="cat-photo"><div>
    <h1 class="cat-name">${choose.name}</h1>
    <p class="cat-description">${choose.description}</p>
    <h2 class="cat-hider-temperament">Temperament:
      <p class="cat-temperament">${choose.temperament}</p>
      </h2></div>
  </div>`;
  
  
  })
  .catch(error => {console.log(error);
  })
    
    })
    .catch((error) => {console.log(err);
      
      err.classList.remove("is-hidden");
      loader.classList.toggle("is-hidden");
    });

    
}




function createName (breeds) {
  return breeds
  .map(({id, name}) => `<option value="${id}">${name}</option>`)
  .join("");
};