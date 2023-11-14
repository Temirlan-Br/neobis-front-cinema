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
    showMovies(respData);
  } catch (error) {
    console.log(error);
  }
}

function showMovies(data) {
  const movies = document.querySelector('.movies');
  movies.innerHTML = '';

  const favoritesMovie =
    JSON.parse(localStorage.getItem('favoritesMovie')) || [];

  let filmsArray = data.films || data.results || data.items || data.releases;

  filmsArray.forEach((movieItem) => {
    const isFavorite = favoritesMovie.some(
      (favorite) => favorite.kinopoiskId === movieItem.kinopoiskId
    );

    const movie = document.createElement('div');
    movie.dataset.kinopoiskId = movie.kinopoiskId;
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
            <div class='heart'>
              <img class="favorite-btn" data-kinopoisk-id="${
                movie.kinopoiskId
              }" src="${
      isFavorite ? './assets/fullHeart.svg' : './assets/emptyHeart.svg'
    }" alt="heart">
            </div>
            ${
              movieItem.rating &&
              `<div class="movie__average">${movieItem.rating}</div>`
            }
          </div>
    `;

    const favoriteBtn = movie.querySelector('.favorite-btn');

    favoriteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isFavorite) {
        removeFavorite(movieItem.kinopoiskId);
      } else {
        toggleFavorite(movieItem);
      }
      showMovies(data);
    });

    movies.appendChild(movie);
  });
}

function toggleFavorite(movie) {
  const favoritesMovie =
    JSON.parse(localStorage.getItem('favoritesMovie')) || [];
  const movieIndex = favoritesMovie.findIndex(
    (favorite) => favorite.kinopoiskId === movie.kinopoiskId
  );

  if (movieIndex === -1) {
    favoritesMovie.push(movie);
  }
  localStorage.setItem('favoritesMovie', JSON.stringify(favoritesMovie));

  showMovies({ films: favoritesMovie });

  return favoritesMovie;
}

function removeFavorite(kinopoiskId) {
  const favoritesMovie =
    JSON.parse(localStorage.getItem('favoritesMovie')) || [];
  const updatedFavorites = favoritesMovie.filter(
    (movie) => movie.kinopoiskId !== kinopoiskId
  );
  localStorage.setItem('favoritesMovie', JSON.stringify(updatedFavorites));

  showMovies({ films: updatedFavorites });

  return updatedFavorites;
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

favorites.addEventListener('click', (e) => {
  e.preventDefault();
  const favoritesMovie =
    JSON.parse(localStorage.getItem('favoritesMovie')) || [];

  if (favoritesMovie.length > 0) {
    showMovies({ films: favoritesMovie });
  }
});
