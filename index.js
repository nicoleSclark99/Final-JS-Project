const input = document.querySelector("#submit__input");
const button = document.querySelector(".submit__input--button");
const movieList = document.querySelector(".movie__list");

document.addEventListener("DOMContentLoaded", () => {
  loadDefaultMovies();
});

async function loadDefaultMovies() {
  const defaultSearch = "avengers";

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=5c69f0b2&s=${defaultSearch}`
);


    const data = await response.json();

    if (data.Search) {
      const sorted = data.Search.sort((a, b) =>
        a.Title.localeCompare(b.Title)
      );

      const firstSix = sorted.slice(0, 6);

      displayMovies(firstSix);
    }
    console.log("API response:", data);
  } 
  
  catch (error) {
    console.error("Error loading default movies:", error);
  }
}

async function searchMovies() {
  const query = input.value.trim();
  if (!query) return;

   try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=5c69f0b2&s=${query}`);
    const data = await response.json();

    if (data.Response === "False") {
      movieList.innerHTML = `<p>No results found.</p>`;
      return;
    }

    displayMovies(data.Search);
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayMovies(movies) {
  movieList.innerHTML = "";

  const firstSix = movies.slice(0, 6)

  firstSix.forEach(movie => {
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


