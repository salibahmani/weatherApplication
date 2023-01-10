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
function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let days = ["Wednesday", "Thursday", "Friday", "Saturday"];
  let forecastHTML = "";
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div
    class="card border-light mb-3"
    style="max-width: 15rem; max-height: 9rem"
  >
    <div class="card-header">4°C</div>
    <div class="card-body">
      <h5 class="card-title">${day}</h5>
      <p class="card-text">🌦️</p>
    </div>
  </div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "6ebf1fd302c34c7c63a23fa2744258to";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayUnit(response) {
  let tempElement = document.querySelector("#temp-input");
  let humidityElement = document.querySelector("#humidity-input");
  let windElement = document.querySelector("#wind-input");
  let cityElement = document.querySelector("#city-input");
  let descriptionElement = document.querySelector("#description-input");
  let timeElement = document.querySelector("#time-input");
  let iconElement = document.querySelector("#currentIcon");
  celsiusTemp = response.data.temperature.current;
  tempElement.innerHTML = Math.round(celsiusTemp);
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  timeElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  getForecast(response.data.coordinates);
}
function search(city) {
  let apiKey = "6ebf1fd302c34c7c63a23fa2744258to";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
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
