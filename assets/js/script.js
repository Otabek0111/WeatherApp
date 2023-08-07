// document.querySelector("#city-form").addEventListener("submit", handleFormSubmit)
// const city = document.querySelector("#city-form")

// window.addEventListener('load', () => {
//     const apiKey = '39e86af03b21747f95f671b62ce778c7'; // Replace with your actual API key
//     // Replace with the desired city
//     const weatherDiv = document.getElementById('weather');

//     // Fetch weather data from the API
//     fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
//       .then(function(response){
//         console.log(response)
//         console.log(response.status)
//         return response.json()
//       })
//       .then(data => {
//         // Get the forecast list
//         console.log(data)
//         if(data.message === "city not found"){
//             weather.innerHTML = "Please enter a valid city!"
//             return
//         }
//         const forecastList = data.list;

//         // Loop through the forecast data and display the results
//         forecastList.forEach(function(forecast) {
//           const dateTime = new Date(forecast.dt_txt);

//           const date = dateTime.toDateString();
//           const time = dateTime.toLocaleTimeString();
//           const temperature = forecast.main.temp;
//           const description = forecast.weather[0].description;

//           const forecastItem = document.createElement('div');
//           forecastItem.classList.add('forecast-item');

//           forecastItem.innerHTML = `
//             <p>Date: ${date}</p>
//             <p>Date: ${date}</p>
//             <p>Time: ${time}</p>
//             <p>Temperature: ${temperature} &#8451;</p>
//             <p>Description: ${description}</p>
//           `;

//           weatherDiv.appendChild(forecastItem);
//         });
//       })
//       .catch(error => {
//         console.log('Error fetching weather data:', error);
//         weatherDiv.innerHTML = 'Error fetching weather data';
//       });
//   });

//   function handleFormSubmit(event){
//     event.preventDefault()
//     //get my input

//     var cityInput = document.getElementById("city-search").value
//     console.log(cityInput)

//   }

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
      .then((data) => console.log(data))
      // data.
      .catch(function (error) {
        console.log(error);
      });
  },
  showData: function (data) {
    const { name } = data;
    const {  } = data;

  },
};

weather.getWeather("samarkand");
