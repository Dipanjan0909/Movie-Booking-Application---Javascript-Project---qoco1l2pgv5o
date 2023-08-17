// const key = "https://api.themoviedb.org/3/movie/top_rated?api_key=";
// const url = "https://api.themoviedb.org/3/movie/top_rated?api_key=1a1e52ad67348c16b4486e4bb062a3e9";

let section = document.querySelector(".movie-list");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTFlNTJhZDY3MzQ4YzE2YjQ0ODZlNGJiMDYyYTNlOSIsInN1YiI6IjY0ZDg0ZmUyYmYzMWYyMDFjYjZhYTZmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xSgnf6XNzxuCXw6yDw5nkQFZYgw6VMMvVBVg01TTxFQ",
  },
};

let movieArr;
let movieGener;

async function getData() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  );
  const json = await response.json();
  const result = json.results;
  movieArr = result;
  for (let i = 0; i < result.length; i++) {
    let div = dry(result, i);
    section.appendChild(div);
  }
}
getData();

async function getGenerData() {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    options
  );
  const json = await response.json();
  const genres = json.genres;
  movieGener = genres;
}
getGenerData();

function getMyId(name) {
  let id;
  for (let i = 0; i < movieGener.length; i++) {
    if (movieGener[i].name.toLowerCase() == name.toLowerCase()) {
      id = movieGener[i].id;
      break;
    }
  }
  return id;
}

function popup_create(e) {
  let popup = document.getElementById("popup");
  popup.querySelector("h2").innerText = movieArr[e.target.id].title;
  popup.querySelector("img").src =
    "https://image.tmdb.org/t/p/w500" + movieArr[e.target.id].backdrop_path;
  popup.querySelector("p").innerText = movieArr[e.target.id].overview;
  popup.style.transform = "translate(0, 0)";
  document.cookie = movieArr[e.target.id].title;
}

function close_popup() {
  let popup = document.getElementById("popup");
  popup.style.transform = "translate(0, -1500px)";
}
function dry(movieArr, i) {
  let item = movieArr[i];
  let div = document.createElement("div");
  div.classList.add("movie-card");
  let h3 = document.createElement("h3");
  let p = document.createElement("p");
  let img = document.createElement("img");
  let btn = document.createElement("button");
  btn.classList.add("view-btn");

  div.key = item.id;
  h3.innerText = item.title;
  p.innerText = item.overview;
  img.src = "https://image.tmdb.org/t/p/w500" + item.backdrop_path;
  btn.innerText = "View";
  btn.id = i;
  btn.onclick = function (e) {
    popup_create(e);
  };

  div.appendChild(h3);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(btn);
  return div;
}
let searchDiv = document.querySelector("#search");
let sidelist = document.querySelector("#side-options");

function search() {
  sidelist.style.display = "none";
  searchDiv.style.display = "";
  section.style.display = "none";
  searchDiv.classList.add("movie-list");
  let input = document.querySelector("#input").value;

  for (let i = 0; i < movieArr.length; i++) {
    let movieStr = movieArr[i].title.toLowerCase();
    let inputStr = input.toLowerCase();
    if (movieStr.includes(inputStr)) {
      let div = dry(movieArr, i);
      searchDiv.appendChild(div);
    }
  }
  document.querySelector("#button").disabled = true;
  document.querySelector("#remove-btn").disabled = false;
  document.querySelector("#input").value = "";
  document.querySelector("#input").disabled = true;
}

function removeSearch() {
  sidelist.style.display = "";
  section.style.display = "";
  section.classList.add("movie-list");
  searchDiv.style.display = "none";
  document.querySelector("#button").disabled = false;
  searchDiv.innerHTML = "";
  searchDiv.classList.remove("movie-list");
  document.querySelector("#input").disabled = false;
}

function regularJob(div) {
  document.querySelector("#button").disabled = true;
  section.style.display = "none";
  sidelist.style.display = "none";
  div.style.display = "";
  div.classList.add("movie-list");
}

let actionDiv = document.querySelector("#action");
function action() {
  regularJob(actionDiv);
  let ID = getMyId("action");
  for (let i = 0; i < movieArr.length; i++) {
    if (movieArr[i].genre_ids.indexOf(ID) >= 0) {
      let div = dry(movieArr, i);
      actionDiv.appendChild(div);
    }
  }
}

let adventureDiv = document.querySelector("#adventure");
function adventure() {
  regularJob(adventureDiv);
  let ID = getMyId("adventure");
  for (let i = 0; i < movieArr.length; i++) {
    if (movieArr[i].genre_ids.indexOf(ID) >= 0) {
      let div = dry(movieArr, i);
      adventureDiv.appendChild(div);
    }
  }
}

let comedyDiv = document.querySelector("#comedy");
function comedy() {
  regularJob(comedyDiv);
  let ID = getMyId("comedy");
  for (let i = 0; i < movieArr.length; i++) {
    if (movieArr[i].genre_ids.indexOf(ID) >= 0) {
      let div = dry(movieArr, i);
      comedyDiv.appendChild(div);
    }
  }
}

let dramaDiv = document.querySelector("#drama");
function drama() {
  regularJob(dramaDiv);
  let ID = getMyId("drama");
  for (let i = 0; i < movieArr.length; i++) {
    if (movieArr[i].genre_ids.indexOf(ID) >= 0) {
      let div = dry(movieArr, i);
      dramaDiv.appendChild(div);
    }
  }
}

let animationDiv = document.querySelector("#animation");
function animation() {
  regularJob(animationDiv);
  let ID = getMyId("animation");
  for (let i = 0; i < movieArr.length; i++) {
    if (movieArr[i].genre_ids.indexOf(ID) >= 0) {
      let div = dry(movieArr, i);
      animationDiv.appendChild(div);
    }
  }
}
const menuIcon = document.getElementById("menu-icon");
const sidebar = document.getElementById("movie-list");
console.log(menuIcon);
console.log(sidebar)

menuIcon.addEventListener("click", () => {
  sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
});