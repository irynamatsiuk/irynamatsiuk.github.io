export function showWeatherInfo(weatherObj) {
  document.querySelector("#city").textContent = weatherObj.city;
  document.querySelector("#current").textContent = weatherObj.currentWeather;
  document.querySelector(
    "#icon"
  ).src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/4th%20Set%20-%20Color/${weatherObj.icon}.svg`;
  document.querySelector("#temp-span").textContent = weatherObj.temperature;
  document.querySelector("#feel-span").textContent = weatherObj.feelsLike;
  document.querySelector("#max-span").textContent = weatherObj.tempHigh;
  document.querySelector("#min-span").textContent = weatherObj.tempLow;
  document.querySelector("#description").textContent = weatherObj.description;
  document.querySelector(".info").classList.remove("hidden");
}

export function hideWeatherInfo() {
  document.querySelector(".info").classList.add("hidden");
}

export function showSpinner() {
  document.querySelector("#loading").classList.remove("hidden");
}

export function hideSpinner() {
  document.querySelector("#loading").classList.add("hidden");
}

export function showErrorMessage() {
  document.querySelector(".error").classList.remove("hidden");
}

export function hideErrorMessage() {
  document.querySelector(".error").classList.add("hidden");
}
