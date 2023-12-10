import { fetchBreeds, fetchCatByBreed } from './api/cat-api';

const select = document.querySelector('.breed-select');

const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

function showElement(element) {
  element.style.display = 'block';
}

function hideElement(element) {
  element.style.display = 'none';
}

showElement(loader);
hideElement(catInfo);
hideElement(select);

fetchBreeds()
  .then(data => {
    data?.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.id;
      option.text = cat.name;
      select.appendChild(option);
      showElement(select);
    });
  })
  .catch(hideElement(select))
  .finally(hideElement(loader));

select.addEventListener('change', () => {
  showElement(loader);
  hideElement(catInfo);

  fetchCatByBreed(select.value)
    .then(data => {
      showElement(catInfo);
      const catMarkup = `
        <h3>${data[0].breeds[0].name}</h3>
        <h4>${data[0].breeds[0].temperament}</h4>
        <p>${data[0].breeds[0].description}</p>
        <img src=${data[0].url} alt=${data[0].breeds[0].name} width=400 />`;

      catInfo.insertAdjacentHTML('afterbegin', catMarkup);
    })
    .catch(() => hideElement(catInfo))
    .finally(() => hideElement(loader));
});
