const userSearch = document.getElementById('movieSearch')
const submit = document.getElementById("search-addon")
const selector = document.getElementById('selector');

const movieFinder = () => {
  const url = `http://www.omdbapi.com/?i=&s=${userSearch.value}&page=2&apikey=cc68ca75`

  fetch(url, {
    method: "POST",
  })
  fetch(url).then((response) =>
    response.json().then((data) => {
      selector.innerHTML = "";
      console.log(data);
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

    showMovie(selector, image, title, date);
  });
};

submit.addEventListener('click', () => {
  movieFinder();
});

const showMovie = (selector, image, title, date) => {
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
            <button class="buttonLearnMore">En savoir plus</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
}

//L'utilisateur verra les films/séries apparaître sous forme de blocs, contenant le nom du film, la date de parution et une image ainsi qu'un CTA contenant "Read More".
