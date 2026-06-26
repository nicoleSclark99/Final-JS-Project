const input = document.querySelector(".submit__input");
const button = document.querySelector(".submit__input--button");
const movieList = document.querySelector(".movie__list");

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
  movieList.innerHTML = ""; // clear old results

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

// Press Enter to search
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchMovies();
  }
});

// Click icon to search
button.addEventListener("click", searchMovies);
