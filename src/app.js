let now = new Date();
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

let h = addZero(now.getHours());
let m = addZero(now.getMinutes());
let s = addZero(now.getSeconds());
let time = h + ":" + m + ":" + s;
document.querySelector("#time-input").innerHTML = time;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let currentday = document.querySelector("#day-input");
currentday.innerHTML = `${day}`;

let currentdate = document.querySelector("#date-input");
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
let date = now.getDate();
let year = now.getFullYear();
let month = months[now.getMonth()];
currentdate.innerHTML = `${month} ${date} ${year}`;
function showCity(response) {
  response.preventDefault();
  let cityName = document.querySelector("#city-input");
  let text = document.querySelector(`#text-input`);
  cityName.innerHTML = `${text.value}`;
  let apiKey = "167d3b3db5a41bc679736dbad293cba1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${text.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(changeunit);
}

function changeunit(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp-input");
  temp.innerHTML = `${temperature}`;
  let humidity = response.data.main.humidity;
  let humi = document.querySelector("#humi-input");
  humi.innerHTML = `${humidity}`;
  let wind = Math.round(response.data.wind.speed);
  let windData = document.querySelector("#wind-input");
  windData.innerHTML = `${wind}`;
  let currentCity = document.querySelector("#city-input");
  currentCity.innerHTML = `${response.data.name}`;
}
function retrievePosition(position) {
  let apiKey = "167d3b3db5a41bc679736dbad293cba1";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(changeunit);
}
function geolocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
navigator.geolocation.getCurrentPosition(retrievePosition);
let current = document.querySelector("#current-input");
current.addEventListener("click", geolocation);

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", showCity);
