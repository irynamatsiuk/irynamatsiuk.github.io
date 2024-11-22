import "./styles.css";
import {
  showWeatherInfo,
  hideWeatherInfo,
  showErrorMessage,
  hideErrorMessage,
  showSpinner,
  hideSpinner,
} from "./dom.js";

const form = document.querySelector("form");
const locationInput = document.querySelector(".location");

async function getWeatherInfo(location, unit) {
  try {
    hideErrorMessage();
    showSpinner();
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=8PYBF25NZHD544VQBLFYAA23Q&contentType=json`,
      { mode: "cors" },
    );
    const weatherData = await response.json();
    let obj = {
      city: weatherData.resolvedAddress,
      currentWeather: weatherData.currentConditions.conditions,
      icon: weatherData.currentConditions.icon,
      temperature: weatherData.currentConditions.temp,
      feelsLike: weatherData.currentConditions.feelslike,
      tempHigh: weatherData.days[0].tempmax,
      tempLow: weatherData.days[0].tempmin,
      description: weatherData.description,
    };
    hideSpinner();
    showWeatherInfo(obj);
  } catch (error) {
    hideWeatherInfo();
    hideSpinner();
    showErrorMessage();
  }
}

form.addEventListener("submit", (event) => {
  const selectedUnit = document.querySelector('input[name="units"]:checked');
  event.preventDefault();
  getWeatherInfo(locationInput.value, selectedUnit.value);
  locationInput.value = "";
});
