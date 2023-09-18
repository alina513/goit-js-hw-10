import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
const input = document.querySelector(".breed-select");
const div = document.querySelector(".cat-info");
const select = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const err = document.querySelector(".error");

input.addEventListener("change", onChange);
fetchBreeds()
.then((data) => {select.innerHTML = createName(data);
loader.classList.toggle("is-hidden");
select.classList.toggle("is-hidden")})
.catch((error) => {console.log(error);
  err.classList.toggle("is-hidden");
  loader.classList.toggle("is-hidden");})

let photo;
function onChange(event) {
  loader.classList.toggle("is-hidden");
    fetchCatByBreed(event.target.value)
    .then((data) => {photo = data[0].url
    
      fetchBreeds()
    .then(breeds => {const choose = breeds.find(breed => breed.id === event.target.value);
    div.innerHTML = `<div>
    <img src="${photo}" alt="cat" class="cat-photo"><div class="container">
    <h1 class="cat-name">${choose.name}</h1>
    <h2 class="cat-hider-temperament">Temperament:
      <p class="cat-temperament">${choose.temperament}</p>
      <p class="cat-description">${choose.description}</p>
    </h2></div>
  </div>`;
  loader.classList.toggle("is-hidden");})
  .catch(error => {console.log(error);
    err.classList.toggle("is-hidden");
    loader.classList.toggle("is-hidden");
  })
    
    })
    .catch((error) => {console.log(err);
      err.classList.toggle("is-hidden");
      loader.classList.toggle("is-hidden");
      div.classList.add("is-hidden");
    });

    
}




function createName (breeds) {
  return breeds
  .map(({id, name}) => `<option value="${id}">${name}</option>`)
  .join("");
}