function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentDate = date.getDate();
  let year = date.getFullYear();
  let month = months[date.getMonth()];
  return `${day} <br> ${hours}:${minutes} <br> ${month} ${currentDate} ${year} `;
}

function displayUnit(response) {
  let tempElement = document.querySelector("#temp-input");
  let humidityElement = document.querySelector("#humidity-input");
  let windElement = document.querySelector("#wind-input");
  let cityElement = document.querySelector("#city-input");
  let descriptionElement = document.querySelector("#description-input");
  let timeElement = document.querySelector("#time-input");
  let iconElement = document.querySelector("#currentIcon");
  celsiusTemp = response.data.main.temp;
  tempElement.innerHTML = Math.round(celsiusTemp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  timeElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function search(city) {
  let apiKey = "167d3b3db5a41bc679736dbad293cba1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayUnit);
}

function hadleSubmit(event) {
  event.preventDefault();
  let cityNameElement = document.querySelector("#search-input");
  search(cityNameElement.value);
}
function displayFartemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-input");
  celLink.classList.remove("active");
  farLink.classList.add("active");
  let fartemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fartemp);
}
function displayceltemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-input");
  celLink.classList.add("active");
  farLink.classList.remove("active");
  tempElement.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;
let searchElement = document.querySelector("#city-search");
searchElement.addEventListener("submit", hadleSubmit);

let farLink = document.querySelector("#far-link");
farLink.addEventListener("click", displayFartemp);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", displayceltemp);
search("Mashhad");
