import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

axios.defaults.headers.common['x-api-key'] =
  'live_orVDa3IvB5a9w66JkIgkaLVIAsDwfWdIdg0xilkcVZmm25AczpqyMBNvJubHNM0S';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

const errorMsg = error =>
  iziToast.show({
    title: 'Error',
    message: error.message,
    position: 'center',
    color: 'red',
  });

export const fetchBreeds = () =>
  axios
    .get('breeds')
    .then(res => res.data)
    .catch(errorMsg);

export const fetchCatByBreed = breedId =>
  axios
    .get(`images/search?breed_ids=${breedId}`)
    .then(res => res.data)
    .catch(errorMsg);
