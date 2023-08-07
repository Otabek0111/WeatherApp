
// Need FOrm INputs  ==> HTML FORM with input (text) and it needs an id
// KNow What the value of the input is in JS (querySelector for the ID)

//How would I know in JS when the user searches? EventListener on Click for another element and it also needs an id
//Wehen they click, we need to first validate the input  (check if input is valid -- "empty string")
//If it's invalid, I don't want to fetchmyapi

//create an object weather with a getWeather method. The getWeather method will fetch weather data

let weather = {
  appKey: "c27c727042da1e145bf14c1d47031e5d",
  getWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=c27c727042da1e145bf14c1d47031e5d"
    )
      .then((response) => response.json())
      .then((data) => this.showData(data))
      // data.
      .catch(function (error) {
        console.log(error);
      });
  },
  showData: function (data) {
    const date = new Date();
    console.log(date);
    const { name } = data;
    const { temp, humidity } = data.main;
    const { speed } = data.wind; 
    const { icon, description } =data.weather[0];
    console.log(name, temp, humidity,speed,description,icon);
    console.log(data);

    // const desc = description.charAt(0).toUpperCase()+ word.slice(1);

    document.querySelector(".city").innerHTML = `Weather in ${name} `; 
    document.querySelector(".temp").innerHTML = `Temperature: ${temp} C `;
    document.querySelector(".description").innerHTML = `${description} `;
    document.querySelector(".wind").innerHTML = `Wind Speed: ${speed} m/s`;
    document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
    document.querySelector(".icon").src = `http://openweathermap.org/img/w/${icon}.png`;
    document.querySelector(".icon").alt = `${description}`
    document.querySelector(".date").innerHTML = date;
  },
  submit : function () {
    this.getWeather(document.querySelector("#citySearch").value);
  }
};
document.querySelector(".search").addEventListener("click", function(){
  weather.submit();
})



