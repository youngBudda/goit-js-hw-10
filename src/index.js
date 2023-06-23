import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
const select = document.querySelector(`.breed-select`);
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');

const showError = () => {
  errorElement.classList.add('visible');
};

const hideError = () => {
  errorElement.classList.remove('visible');
};

const showLoader = () => {
  loader.classList.add('visible');
};

const hideLoader = () => {
  loader.classList.remove('visible');
};

const showBreedSelect = () => {
  select.classList.add('visible');
};

const hideBreedSelect = () => {
  select.classList.remove('visible');
};

const showCatInfo = () => {
  catInfoDiv.classList.add('visible');
};

const hideCatInfo = () => {
  catInfoDiv.classList.remove('visible');
};

fetchBreeds()
  .then(breeds => {
    let markup = ``;
    breeds.forEach(breed => {
      markup += `<option value="${breed.id}">${breed.name}</option>`;
    });
    select.innerHTML = markup;
    hideLoader();
    showBreedSelect();
  })
  .catch(error => {
    console.log('Error fetching cat breeds:', error);
    hideLoader();
  });

const displayCatInfo = cat => {
  if (cat) {
    const { name, description, temperament } = cat.breeds[0];
    const imageUrl = cat.url;
    const html = `
      <div class="img__wrapper">
      <img src="${imageUrl}" alt="${name}" class="animal_img" />
      </div>
      <div class="information">
      <h3>${name}</h3>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Temperament:</strong> ${temperament}</p>
      </div>
    `;
    catInfoDiv.innerHTML = html;
    hideLoader();
    showCatInfo();
  } else {
    catInfoDiv.innerHTML = '';
    hideLoader();
  }
};

const selectedOption = event => {
  const breedId = event.target.value;
  hideCatInfo();
  hideError();
  showLoader();
  fetchCatByBreed(breedId)
    .then(cat => displayCatInfo(cat))
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      displayCatInfo(null);
      showError();
    });
};

select.addEventListener('change', selectedOption);
