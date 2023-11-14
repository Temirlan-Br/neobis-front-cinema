const API_KEY = 'a643ea95-c5dd-49db-a12a-70fac5c2afc9';
const API_PREMIERES =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=NOVEMBER';
const API_EXPECTED =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=CLOSES_RELEASES&page=1';
const API_POPULAR =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1';
const API_RELEASES =
  'https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2023&month=NOVEMBER&page=1';
const API_SEARCH =
  'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

const form = document.querySelector('form');
const searchInput = document.querySelector('#search');
const premieres = document.querySelector('.premieres');
const expected = document.querySelector('.expected');
const best = document.querySelector('.best');
const releases = document.querySelector('.releases');
const favorites = document.querySelector('.favorites');

getMovies(API_PREMIERES);

async function getMovies(url) {
  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json',
      },
    });
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData);
  } catch (error) {
    console.log(error);
  }
}

function showMovies(data) {
  const movies = document.querySelector('.movies');
  movies.innerHTML = '';

  let filmsArray = data.films || data.results || data.items || data.releases;

  filmsArray.forEach((movieItem) => {
    const movie = document.createElement('div');
    movie.classList.add('movieItem');
    movie.innerHTML = `
          <img
            src="${movieItem.posterUrlPreview}"
            alt="${movieItem.nameRu}"
          />
          <div class="movieItemInfo">
            <div class="movie__title">${movieItem.nameRu}</div>
            <div class="movie__genre">${movieItem.genres.map(
              (genre) => ` ${genre.genre}`
            )}</div>
            <div class="movie__year">${movieItem.year}</div>
            ${
              movieItem.rating &&
              `<div class="movie__average">${movieItem.rating}</div>`
            }
          </div>
    `;
    movies.appendChild(movie);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const apiSearch = `${API_SEARCH}${searchInput.value}`;
  if (searchInput.value) {
    getMovies(apiSearch);
    searchInput.value = '';
  }
});

premieres.addEventListener('click', (e) => {
  e.preventDefault();
  getMovies(API_PREMIERES);
});

expected.addEventListener('click', (e) => {
  e.preventDefault();
  getMovies(API_EXPECTED);
});

best.addEventListener('click', (e) => {
  e.preventDefault();
  getMovies(API_POPULAR);
});

releases.addEventListener('click', (e) => {
  e.preventDefault();
  getMovies(API_RELEASES);
});
