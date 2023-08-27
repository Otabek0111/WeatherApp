const weather = {
  fetchData: function (city, endpoint) {
    fetch(
      "https://api.openweathermap.org/data/2.5/" +
        endpoint +
        "?q=" +
        city +
        "&units=imperial&appid=c27c727042da1e145bf14c1d47031e5d"
    )
      .then((response) => response.json())
      .then((data) => this.displayData(endpoint, data))
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        const err = document.querySelector(".error");
        err.innerHTML = `Please Enter a Valid City`;
        throw error;
      });
  },

  displayWeather: function (data) {
    console.log(data);

    const name = data.name;
    const { temp, humidity } = data.main;
    const { icon, description } = data.weather[0];
    const speed = data.wind.speed;
    const date = new Date().toDateString();

    // Hide the error element if it exists
    const err = document.querySelector(".error");
    if (err) {
      err.setAttribute("class", "hidden");
    }
    const mainBox = document.querySelector(".mainBox");
    mainBox.classList.remove("hidden");
    // Updated the weather display elements
    document.querySelector(".date").innerHTML = `${date}`;
    document.querySelector(".city").innerHTML = `Weather in ${name}`;
    document.querySelector(".temp").innerHTML = `Temperature: ${temp} °F`;
    document.querySelector(
      ".description"
    ).innerHTML = `Forecast: ${description}`;
    document.querySelector(".wind").innerHTML = `Wind Speed: ${speed} mph`;
    document.querySelector(
      ".icon"
    ).src = `http://openweathermap.org/img/w/${icon}.png`;
    document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
  },

  displayForecast: function (data) {
    // console.log(data);

    const forecastDisplay = document.querySelector(".forecastDisplay");
    forecastDisplay.innerHTML = `
      <h2 class="name">5-Day Forecast for ${data.city.name}</h2>

      <div class="forecastList"></div>`;

    const forecastList = forecastDisplay.querySelector(".forecastList");

    for (let i = 0; i < data.list.length; i++) {
      let list = data.list[i].dt_txt.split(" ")[1].split(":")[0];

      if (list === "12") {
        console.log(data.list[i]);
        const dateParts = data.list[i].dt_txt.split(" ")[0].split("-");
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        const formattedDate = `${month}/${day} ${year}`;
        const item = data.list[i];
        const forecastItem = document.createElement("div");
        const icon = item.weather[0].icon;
        forecastItem.className = "forecastItem";

        forecastItem.innerHTML = `
          <div class="forecastDate">${formattedDate}</div>
          <div class="forecastTemp">Temp: ${item.main.temp} °F</div>
          <div class="forecastDescription">${item.weather[0].description}</div>
          <img class="icon" src="http://openweathermap.org/img/w/${icon}.png" alt="${item.weather[0].description}">
          <div class="humidityPer">Humidity: ${item.main.humidity} %</div>
          <div class="wind">Wind Speed: ${item.wind.speed} mph</div>
        `;

        forecastList.appendChild(forecastItem);
      }
    }
  },

  displayData: function (endpoint, data) {
    if (endpoint === "weather") {
      this.displayWeather(data);
    } else if (endpoint === "forecast") {
      this.displayForecast(data);
    }
  },

  currentWeather: function (city) {
    this.fetchData(city, "weather");
  },

  forecast: function (city) {
    this.fetchData(city, "forecast");
  },
  search: function () {
    const city = document.querySelector(".citySearch").value;
    weather.currentWeather(city);
    weather.forecast(city);
    this.saveToLocalStorage(city);
    this.forecast(city);
    this.searchCity(city);
  },
  saveToLocalStorage: function (city) {
    // Check if the city has at least 3 characters
    if (city.trim().length < 3) {
      console.log("City name must have at least 3 characters:", city);
      return; // Don't add city to localStorage
    }

    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // Check if the city is already in the search history
    if (!searchHistory.includes(city)) {
      searchHistory.push(city);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      console.log("City added to search history:", city);
    } else {
      console.log("City already exists in search history:", city);
    }
  },

  displaySearchHistory: function () {
    const searchHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    const searchHistoryList = document.querySelector(".searchHistory");
    searchHistoryList.innerHTML = "";
    console.log(searchHistory);
    searchHistory.forEach((city) => {
      const searchButton = document.createElement("button");
      searchButton.textContent = city;

      // Create a wrapper function to capture the city value
      const searchButtonClickHandler = () => {
        this.searchCity(city);
      };

      searchButton.addEventListener("click", searchButtonClickHandler);

      const listItem = document.createElement("li");
      listItem.appendChild(searchButton);
      searchHistoryList.appendChild(listItem);
    });
  },

  searchCity: function (city) {
    console.log(`Search button for ${city} clicked.`);
    this.currentWeather(city);
    this.forecast(city);
    this.saveToLocalStorage(city);
    this.displaySearchHistory();
  },
};

function handleSearch(event) {
  event.preventDefault();
  weather.search();
}
function isValidCity(city) {
  const cityRegex = /^[A-Za-z\s]+$/; // Basic pattern for city names (letters and spaces)
  return cityRegex.test(city);
}

// Add event listeners
document.querySelector(".searchButton").addEventListener("click", handleSearch);
document
  .querySelector(".citySearch")
  .addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      // Check if the pressed key is the "Enter" key
      handleSearch(event);
    }
  });
