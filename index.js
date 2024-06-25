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
    const res = await fetch(`${URL}&s=${query}`);
    const data = await res.json();
    loadingLoader.style.display = "none";
    errorText.innerHTML = "";

    displayMovie(data.Search);
  } catch (error) {
    loadingLoader.style.display = "none";
    errorText.innerHTML = "Something went wrong please try again...";
  }
};
const displayMovie = (data) => {
  data.map(item =>{
    movieContainer.innerHTML += `
        <div>
            <div class="img">
                <img src=${!item.Poster === "" ? "https://ih1.redbubble.net/image.5098928977.2456/st,small,845x845-pad,1000x1000,f8f8f8.u2.jpg" : item.Poster } alt="img">
                <div class="genres">
                    <p>${item.Type}</p>
                </div>
            </div>
            <div class="content">
                <h5>${item?.Title}</h5>
                <p>${item?.Year}</p>
            </div>
        </div>
    `;
  })
};
