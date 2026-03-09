const cityinput = document.querySelector("form input");
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;
const city = document.querySelector("#cityname");
const temp = document.querySelector("#temper");
const humidity = document.querySelector("#humidity");
const condition = document.querySelector("#condition");
const wind = document.querySelector("#wind-speed");
const icon = document.querySelector("#weather-icon");
const form = document.querySelector("form");
const locationBtn = document.querySelector("#location-btn");
const display = document.querySelector(".display");

form.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    display.style.display = "block";
    const cityval = cityinput.value.trim();
    if (cityval === "") {
        alert("Please enter a city name");
        return;
    }

    const finalURL = `${BASE_URL}?q=${cityval}&appid=a42640b4ecdeccefaf87c430901cfc32&units=metric`;
    
    city.innerText = "Loading...";
    
    let response;

    try {
        response = await fetch(finalURL);
    } catch (err) {
        alert("Something went wrong");
        return;
    }

    const data = await response.json();

    if (data.cod == 404) {
        alert("City not found!");
        return;
    }

    icon.style.display = "block";
    display.style.display = "block";

    const weatherMain = data.weather[0].main;

    if (weatherMain === "Clear") {
        document.body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
    }
    else if (weatherMain === "Clouds") {
        document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
    }
    else if (weatherMain === "Rain" || weatherMain === "Drizzle") {
        document.body.style.background = "linear-gradient(to right, #4e54c8, #8f94fb)";
    }
    else if (weatherMain === "Snow") {
        document.body.style.background = "linear-gradient(to right, #e6dada, #274046)";
    }
    else {
        document.body.style.background = "linear-gradient(to right, #89f7fe, #66a6ff)";
    }

    const iconCode = data.weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    city.innerText = data.name;
    temp.innerText = `Temperature: ${data.main.temp} °C`;
    humidity.innerText = `Humidity: ${data.main.humidity}%`;
    condition.innerText = `Weather Condition: ${data.weather[0].description}`;
    wind.innerText = `Wind Speed: ${data.wind.speed} m/s`;

});

locationBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported");
    }
    display.style.display = "block";
    navigator.geolocation.getCurrentPosition(async (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=a42640b4ecdeccefaf87c430901cfc32&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        city.innerText = data.name;
        temp.innerText = `Temperature: ${data.main.temp} °C`;
        humidity.innerText = `Humidity: ${data.main.humidity}%`;
        condition.innerText = `Weather Condition: ${data.weather[0].description}`;
        wind.innerText = `Wind Speed: ${data.wind.speed} m/s`;
    });
});