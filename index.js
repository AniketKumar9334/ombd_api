const URL = "https://www.omdbapi.com/?apikey=2c920b8b";
const movieContainer = document.querySelector(".movie__content");
const inputValue = document.getElementById("search");
const searchBtn = document.getElementById("search__btn");
const loadingLoader = document.querySelector(".loading");
const errorText = document.querySelector(".error-text");

window.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    movieContainer.innerHTML = "";
    loadingLoader.style.display = "flex";
    let query = inputValue.value.trim();
    if (query) {
      getMovieData(query);
    } else {
      loadingLoader.style.display = "none";
      errorText.innerHTML = "";
      errorText.innerHTML = "please enter your movie name...";
    }
  }
});

searchBtn.addEventListener("click", () => {
  movieContainer.innerHTML = "";
  loadingLoader.style.display = "flex";
  let query = inputValue.value.trim();
  if (query) {
    getMovieData(query);
  } else {
    loadingLoader.style.display = "none";
    errorText.innerHTML = "";
    errorText.innerHTML = "please enter your movie name...";
  }
});

const getMovieData = async (query) => {
  try {
    const res = await fetch(`${URL}&t=${query}`);
    const data = await res.json();
    loadingLoader.style.display = "none";
    errorText.innerHTML = "";

    displayMovie(data);
  } catch (error) {
    loadingLoader.style.display = "none";
    errorText.innerHTML = "Something went wrong please try again...";
  }
};
const displayMovie = (data) => {
  let genre = data.Genre?.split(",");
  movieContainer.innerHTML += `
        <div>
            <div class="img">
                <img src=${data?.Poster} alt="img">
                <div class="genres">
                    <p>${genre ? genre[0] : ""}</p>
                    <p>${genre ? genre[1] : ""}</p>
                </div>
            </div>
            <div class="content">
                <h1>${data?.Title}</h1>
                <p>${data?.Released}</p>
            </div>
        </div>
    `;
};
