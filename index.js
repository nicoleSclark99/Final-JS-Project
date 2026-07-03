let currentMovies = [];
const input = document.querySelector("#submit__input");
const button = document.querySelector(".submit__input--button");
const movieList = document.querySelector(".movie__list");

document.addEventListener("DOMContentLoaded", () => {
  loadDefaultMovies();
});


document.getElementById("sortSelect").addEventListener("change", (e) => {
  const sortType = e.target.value;

  const sorted = sortMovies([...currentMovies], sortType);

  displayMovies(sorted);
});

function sortMovies(movieArray, order) {
  if (order === "oldest") {
    movieArray.sort((a, b) => a.Year - b.Year);
  } 
  else if (order === "newest") {
    movieArray.sort((a, b) => b.Year - a.Year);
  }
  else if (order === "az") {
    movieArray.sort((a, b) => a.Title.localeCompare(b.Title));
  }
  else if (order === "za") {
    movieArray.sort((a, b) => b.Title.localeCompare(a.Title));
  }

  return movieArray;
}



async function loadDefaultMovies() {
  const defaultSearch = "avengers";

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=5c69f0b2&s=${defaultSearch}`
);


    const data = await response.json();

    if (data.Search) {
      currentMovies = data.Search;
      displayMovies(currentMovies);
    }
  } 
  
  catch (error) {
    console.error("Error loading default movies:", error);
  }
}

const loader = document.getElementById("loading-screen");
const searchInput = document.getElementById("submit__input"); 
const searchButton = document.getElementsByClassName("submit__input--button")[0]; 


function showLoader() {
  loader.style.display = "flex";   
  loader.style.opacity = "1";      
}

function hideLoader() {
  loader.style.opacity = "0";      
  setTimeout(() => {
    loader.style.display = "none";
  }, 300);
}


async function searchMovies() {
  const query = input.value.trim();
  if (!query) return;

  showLoader(); 

   try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=5c69f0b2&s=${query}`);
    const data = await response.json();

    if (data.Response === "False") {
      movieList.innerHTML = `<p>No results found.</p>`;
      hideLoader(); 
    
      return;
    }

    currentMovies = data.Search;
    displayMovies(currentMovies);
  } 
  
  catch (error) {
    console.error("Error:", error);
  }

  setTimeout(() => {
  hideLoader();
}, 400); 
}

function displayMovies(movies) {
  movieList.innerHTML = "";

  movies.slice(0, 6).forEach(movie => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie");

    movieItem.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    movieList.appendChild(movieItem);
  });
}


input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchMovies();
  }
});


button.addEventListener("click", searchMovies);

