const userSearch = document.getElementById('movieSearch')
const submit = document.getElementById("search-addon")
const selector = document.getElementById('movieSelector');

const movieFinder = () => {
  const url = `http://www.omdbapi.com/?s=${userSearch.value}&page=2&apikey=${KEY}`

  fetch(url, {
    method: "POST",
  })
  fetch(url).then((response) =>
    response.json().then((data) => {
      selector.innerHTML = "";
      movieInfo(data);
    ;}))
    .catch((error) => console.error('error:', error));
  };

//L'utilisateur peut chercher une liste de films/séries grâce à des mots clefs
const movieInfo = (data) => {
  const dataArray = data.Search;
  dataArray.forEach( (item) => {
    const image = item.Poster;
    const title = item.Title;
    const date = item.Year;
    const id = item.imdbID;

    showMovie(selector, image, title, date, id);
  });
};

submit.addEventListener('click', () => {
  movieFinder();
});

const showMovie = (selector, image, title, date, id) => {
  selector.innerHTML += `
  <div class="container text-center">
    <div class="card mb-3 text-left" style="width: 500px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${image}" class="card-img" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${date}</p>
            <button class="buttonLearnMore btn btn-primary" onclick="showLearnMore('${id}')">Plus d'infos</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
}

const showLearnMore =  async function (id) {
  const urlById = await fetch(`http://www.omdbapi.com/?i=${id}&page=2&apikey=${KEY}`)
  const popUpSelector = document.getElementById('myPopup');
  const popUpDetails = await urlById.json();
  const image = popUpDetails.Poster;
  const title = popUpDetails.Title;
  const date = popUpDetails.Year;
  const plot = popUpDetails.Plot;
  
  try {
    popUpSelector.innerHTML = "";
    modal(popUpSelector, image, title, date, plot);
  } catch (error) {
    console.error("error : ", error)
  }
};

const modal = (selector, image, title, date, plot) => {
  selector.innerHTML += `
  <div class="container popup__container popupShit text-center">
    <div class="card text-left" style="width: 500px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${image}" class="card-img" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${date}</p>
            <p>${plot}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
}