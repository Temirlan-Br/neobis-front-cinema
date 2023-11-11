const API_KEY = 'a643ea95-c5dd-49db-a12a-70fac5c2afc9';
const API_URL_PREMIERES =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2022&month=NOVEMBER';

const form = document.querySelector('form');
const searchInput = document.querySelector('#search');
const premieres = document.querySelector('.premieres');
const expected = document.querySelector('.expected');
const best = document.querySelector('.best');
const releases = document.querySelector('.releases');
const favorites = document.querySelector('.favorites');

getMovies(API_URL_PREMIERES);

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
    showMovies(respData);
  } catch (error) {
    console.log(error);
  }
}

function showMovies(data) {
  const movies = document.querySelector('.movies');

  data.items.forEach((movieItem) => {
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
            <div class="movie__average">6.6</div>
          </div>
    `;
    movies.appendChild(movie);
  });
}
