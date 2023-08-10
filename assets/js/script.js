// Need Form Input  ==> HTML FORM with input (text) and it needs an id
// KNow What the value of the input is in JS (querySelector for the ID)

//How would I know in JS when the user searches? EventListener on Click for another element and it also needs an id
//Wehen they click, we need to first validate the input  (check if input is valid -- "empty string")
//If it's invalid, I don't want to fetchmyapi

//create an object weather with a getWeather method. The getWeather method will fetch weather data

let weather = {
  // appKey: "c27c727042da1e145bf14c1d47031e5d",
  getWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=c27c727042da1e145bf14c1d47031e5d&cnt=5"
    )
      .then((response) => response.json())
      .then((data) => this.showData(data))
      // data.
      .catch(function (error) {
        console.log(error);
      });
  },
  showData: function (data) {
    const date = new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    console.log(data);
    const { name } = data;
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { icon, description } = data.weather[0];
    console.log(name, temp, humidity, speed, description, icon);

    // const desc = description.charAt(0).toUpperCase()+ word.slice(1);

    document.querySelector(".city").innerHTML = `Weather in ${name} `;
    document.querySelector(".temp").innerHTML = `Temperature: ${temp} F `;
    document.querySelector(
      ".description"
    ).innerHTML = `Forecast: ${description} `;
    document.querySelector(".wind").innerHTML = `Wind Speed: ${speed} m/s`;
    document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
    document.querySelector(
      ".icon"
    ).src = `http://openweathermap.org/img/w/${icon}.png`;
    document.querySelector(".icon").alt = `${description}`;
    document.querySelector(".date").innerHTML = date;
  },
  submit: function () {
    this.getWeather(document.querySelector("#citySearch").value);
    // this.showCast(document.querySelector("#citySearch").value);
  },
};

const weatherCast = {
  forecast: function (city) {
    fetch(
      // "https://api.openweathermap.org/data/2.5/forecast?q=brooklyn&units=metric&appid=c27c727042da1e145bf14c1d47031e5d&cnt=40"
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial&appid=c27c727042da1e145bf14c1d47031e5d&cnt=30"
    )
      .then((response) => response.json())
      .then((data) => this.showCast(data))

      // .then((data) => console.log(data))
      .catch(function (error) {
        console.log(error);
      });
  },
  showCast: function (data) {
    console.log(data);

    const { dt_txt: day2 } = data.list[5];
    const { dt_txt: day3 } = data.list[13];
    const { dt_txt: day4 } = data.list[21];
    const { dt_txt: day5 } = data.list[29];

    const { temp: temp2 } = data.list[5].main;
    const { temp: temp3 } = data.list[13].main;
    const { temp: temp4 } = data.list[21].main;
    const { temp: temp5 } = data.list[29].main;

    const { humidity: humidity2 } = data.list[5].main;
    const { humidity: humidity3 } = data.list[13].main;
    const { humidity: humidity4 } = data.list[21].main;
    const { humidity: humidity5 } = data.list[29].main;

    const { speed: wind2 } = data.list[5].wind;
    const { speed: wind3 } = data.list[13].wind;
    const { speed: wind4 } = data.list[21].wind;
    const { speed: wind5 } = data.list[29].wind;

    const { description: description2, icon: icon2 } = data.list[5].weather[0];
    const { description: description3, icon: icon3 } = data.list[13].weather[0];
    const { description: description4, icon: icon4 } = data.list[21].weather[0];
    const { description: description5, icon: icon5 } = data.list[29].weather[0];

    console.log(day2, day3, day4, day5);

    console.log(temp2, temp3, temp4, temp5);

    console.log(
      description2,
      description3,
      description4,
      description5,
      icon2,
      icon3,
      icon4,
      icon5
    );

    console.log(wind2, wind3, wind4, wind5);

    console.log(humidity2, humidity3, humidity4, humidity5);

    document.querySelector(".forecastCity2").innerHTML = `${day2}`;
    document.querySelector(".forecastCity3").innerHTML = `${day3}`;
    document.querySelector(".forecastCity4").innerHTML = `${day4}`;
    document.querySelector(".forecastCity5").innerHTML = `${day5}`;

    document.querySelector(
      ".forecastTemp2"
    ).innerHTML = `Temperature: ${temp2} F `;
    document.querySelector(
      ".forecastTemp3"
    ).innerHTML = `Temperature: ${temp3} F `;
    document.querySelector(
      ".forecastTemp4"
    ).innerHTML = `Temperature: ${temp4} F `;
    document.querySelector(
      ".forecastTemp5"
    ).innerHTML = `Temperature: ${temp5} F `;

    document.querySelector(
      ".forecastDescription2"
    ).innerHTML = `Forecast: ${description2}`;
    document.querySelector(
      ".forecastDescription3"
    ).innerHTML = `Forecast: ${description3}`;
    document.querySelector(
      ".forecastDescription4"
    ).innerHTML = `Forecast: ${description4}`;
    document.querySelector(
      ".forecastDescription5"
    ).innerHTML = `Forecast: ${description5}`;

    document.querySelector(
      ".forecastIcon2"
    ).src = `http://openweathermap.org/img/w/${icon2}.png`;
    document.querySelector(
      ".forecastIcon3"
    ).src = `http://openweathermap.org/img/w/${icon3}.png`;
    document.querySelector(
      ".forecastIcon4"
    ).src = `http://openweathermap.org/img/w/${icon4}.png`;
    document.querySelector(
      ".forecastIcon5"
    ).src = `http://openweathermap.org/img/w/${icon5}.png`;

    document.querySelector(
      ".forecastWind2"
    ).innerHTML = `Wind Speed: ${wind2} m/h`;
    document.querySelector(
      ".forecastWind3"
    ).innerHTML = `Wind Speed: ${wind3} m/h`;
    document.querySelector(
      ".forecastWind4"
    ).innerHTML = `Wind Speed: ${wind4} m/h`;
    document.querySelector(
      ".forecastWind5"
    ).innerHTML = `Wind Speed: ${wind5} m/h`;

    document.querySelector(
      ".forecastHumidity2"
    ).innerHTML = `Humidity ${humidity2}%`;
    document.querySelector(
      ".forecastHumidity3"
    ).innerHTML = `Humidity ${humidity3}%`;
    document.querySelector(
      ".forecastHumidity4"
    ).innerHTML = `Humidity ${humidity4}%`;
    document.querySelector(
      ".forecastHumidity5"
    ).innerHTML = `Humidity ${humidity5}%`;
  },
  submit: function () {
    this.forecast(document.querySelector("#citySearch").value);

    const city = document.querySelector("#citySearch").value;

    const value = JSON.parse(localStorage.getItem("lastCity")) || [];
    value.push(city);
    localStorage.setItem("lastCity", JSON.stringify(value));

  
    console.log(value[0]);
    document.querySelector(".cityList1").innerHTML = `${value[0]}`;
    document.querySelector(".cityList2").innerHTML = `${value[2]}`;
    document.querySelector(".cityList3").innerHTML = `${value[3]}`;
    document.querySelector(".cityList4").innerHTML = `${value[4]}`;
    document.querySelector(".cityList5").innerHTML = `${value[5]}`;

    //   localStorage.setItem("lastCity", JSON.stringify(value));
    // const value = localStorage.getItem("lastCity");
  },
};

document.querySelector(".search").addEventListener("click", function (event) {
  event.preventDefault();
  const display = document.querySelector(".hide");
  display.style.display = "block";
  weatherCast.submit();
});

document.querySelector(".search").addEventListener("click", function (event) {
  event.preventDefault();
  const display = document.querySelector(".hide");
  display.style.display = "inline-flex";
  weather.submit();
});
