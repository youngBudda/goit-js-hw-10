import axios from 'axios';

const API_KEY = (axios.defaults.headers.common['x-api-key'] =
  'live_c1L3XzBI1OEW2669hkwRuTXLkcpJETIEDNZU0bgI2hsbBYWnAFsbmiUU6FOLV60W');

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios
    .get(`${BASE_URL}/breeds`)
    .then(response => response.data)
    .catch(
      console.error(error => {
        console.log('Error fetching cat breeds:', error);
        return [];
      })
    );
}
export function fetchCatByBreed(breedId) {
  const url = `${BASE_URL}/images/search?breed_ids=${breedId}`;

  return axios
    .get(url)
    .then(response => response.data[0])
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      return null;
    });
}
