const userSearch = document.getElementById('movieSearch')
const submit = document.getElementById("search-addon")

const movieFinder = () => {
  const url = `http://www.omdbapi.com/?i=&s=${userSearch.value}&page=2&apikey=cc68ca75`

  fetch(url, {
    method: "POST",
  })
  fetch(url).then((response) =>
    response.json().then((data) => {
      movieInfo(data)
    ;}))
    .catch((error) => console.error('error:', error));
};

const movieInfo = (data) => {
  const dataArray = data.Search;
  const selector = document.getElementById('selector');
  dataArray.forEach( (item) => {
    const title = item.Title;
    const date = item.Year;

    showMovie(selector, title, date);
  });
};

submit.addEventListener('click', () => {
  movieFinder();
});

const showMovie = (selector, title, date) => {
  selector.innerHTML += `
    <div class="card">
      <h2>${title}</h2>
      <p>${date}</p>
      <button class="buttonLearnMore">En savoir plus</button>
    </div>
  `
}