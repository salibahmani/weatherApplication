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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
  ];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastday, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `<div
  class="card border-light mb-3"
  style="max-width: 15rem; max-height: 8rem"
  id="forecast-weather"
>
  <div class="card-header">
    <span id="forecast-weather-max-temp">${Math.round(
      forecastday.temperature.maximum
    )}°</span>
        <span id="forecast-weather-min-temp">${Math.round(
          forecastday.temperature.minimum
        )}°</span>
  </div>
  <div class="card-body">
    <h5 class="card-title" id="weekDays">${formatDay(forecastday.time)}</h5>
    <p class="card-text" id="weekdaye-icon" ><img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
      forecastday.condition.icon
    }.png" width=50></p>
  </div>
</div>
`;
    }
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

let searchElement = document.querySelector("#city-search");
searchElement.addEventListener("submit", hadleSubmit);

search("Mashhad");
