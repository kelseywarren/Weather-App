//api info
const apiKey = '4d76c17901d775c10628769986f03d11';
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const forecastApiKey = '0bd62f2d32009d6c37c47b15082707e3'; 

//default variables
let city = 'austin';
let lat = 30.27;
let lon = -97.74; 

//dom variables
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temp');
const condition = document.getElementById('conditionData');
const humidity = document.getElementById('humidData');
const wind = document.getElementById('windData'); 

//event for weather data
searchButton.addEventListener('click', (e) => {
  let city = searchInput.value;
  if(city.length > 0){
    e.preventDefault();
    getWeatherData(city);
    getCords(city);
  } else {
    e.preventDefault();
    alert('please enter city')
  }
  searchInput.value = '';

});

//function for getting weather data 
function getWeatherData(city) {
  const urlToFetch = `${apiBaseUrl}?q=${city},US&appid=${apiKey}&units=imperial`;
  
  fetch(urlToFetch)
      .then((response) => response.json())
      .then((data) => {
          cityName.innerHTML = `${data.name}`;
          temperature.innerHTML = `${Math.round(data.main.temp)}&deg`; 

          condition.innerHTML = `${data.weather[0].description}`;

          humidity.innerHTML = `${data.main.humidity}%`

          document.getElementById('wicon').src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

          wind.innerHTML = `${Math.floor(data.wind.speed)}mph`
      })
      .catch((error) => {
          alert('Invalid city entry');
          
      });
};
getWeatherData(city);

//function for getting coordinates
function getCords(city) {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},US&appid=${forecastApiKey}`;

  fetch(geoUrl)
  .then((response) => response.json())
  .then((data) => {
    let lat = `${data[0].lat}`
    let lon = `${data[0].lon}`
    //console.log(lat)
    //console.log(lon)
    getForecast(lat,lon);
  })
  .catch((error) => alert('could not get cords'));
 
};
getCords(city);

//function for getting forecast
function getForecast(lat, lon) {
  const forecastUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${forecastApiKey}&units=imperial`;

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      //loop to iterate the max temp for next 5 days
      for(i = 0; i < 5; i++){
        document.getElementById("day" + (i+1) + "Temp").innerHTML = `${data.daily[i].temp.max}`
      };
      //loop to iterate the weather icon for next 5 days
      for(i = 0; i < 5; i++){
        document.getElementById("day" + (i+1) + "Img").src = `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;
        };
  
    })
    .catch((error) => alert('could not receive forecast')); 

};

//variables for day
let d = new Date();
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

//function to check day
function checkDay(day){
  if(day + d.getDay() > 6){
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

//loop to iterate through the next 5 days
for(i = 0; i < 5; i++){
  document.getElementById("day" + (i+1)).innerHTML = days[checkDay(i)];
}
