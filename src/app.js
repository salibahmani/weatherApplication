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
  let dayElement = document.querySelector("#day-input");

  tempElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  timeElement.innerHTML = formatDate(response.data.dt * 1000);
}
let apiKey = "167d3b3db5a41bc679736dbad293cba1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=mashhad&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayUnit);
