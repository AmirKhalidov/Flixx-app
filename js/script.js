const global = {
    currentPage: window.location.pathname,
};
console.log(window.location.pathname);


// Display 20 most popular movies
async function displayPopularMovies() {
    const { results } = await fetchAPIData('movie/popular');
    // console.log(results);

    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
            ${
                movie.poster_path
                    ? `<img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}"
                    />`
                    : `<img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt="${movie.title}"
                    />`
            }
            </a>
            <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
            </div>
        `;

        document.querySelector('#popular-movies').appendChild(div);
    });
}

// Display 20 most popular TV Shows
async function displayPopularShows() {
    const { results } = await fetchAPIData('tv/popular');
    // console.log(results);

    results.forEach((show) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <a href="tv-details.html?id=${show.id}">
            ${
                show.poster_path
                    ? `<img
                    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                    class="card-img-top"
                    alt="${show.name}"
                    />`
                    : `<img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt="${show.name}"
                    />`
            }
            </a>
            <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
                <small class="text-muted">First Air: ${show.first_air_date}</small>
            </p>
            </div>
        `;

        document.querySelector('#popular-shows').appendChild(div);
    });
}


// Fetch Data from TMDB API
async function fetchAPIData(endpoint) {
    const API_KEY = '1a39757e7e04d19a738df7a34741f322';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();

    const response = await fetch(
        `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();

    hideSpinner();

    return data;
}


function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}


// Highlight active link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');

    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}

// Init app
function init() {
    switch (global.currentPage) {
        case '/TRAVECY-JAVASCRIPT/JAVASCRIPT-SANDBOX/11-fetch-and-async-await/flixx-app/index.html':
        case '':
            displayPopularMovies();
            console.log('Home');
            break;

        case '/TRAVECY-JAVASCRIPT/JAVASCRIPT-SANDBOX/11-fetch-and-async-await/flixx-app/shows.html':
            displayPopularShows();
            console.log('Shows');
            break;

        case '/TRAVECY-JAVASCRIPT/JAVASCRIPT-SANDBOX/11-fetch-and-async-await/flixx-app/movie-details.html':
            console.log('Movie Details');
            break;

        case '/TRAVECY-JAVASCRIPT/JAVASCRIPT-SANDBOX/11-fetch-and-async-await/flixx-app/tv-details.html':
            console.log('TV Details');
            break;

        case '/TRAVECY-JAVASCRIPT/JAVASCRIPT-SANDBOX/11-fetch-and-async-await/flixx-app/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
