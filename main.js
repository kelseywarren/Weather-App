//api info
const apiKey = '4d76c17901d775c10628769986f03d11';
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

//variables
let city = 'austin';

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

          document.getElementById('wicon').src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

          wind.innerHTML = `${Math.floor(data.wind.speed)}mph`
      })
      .catch((error) => {
          alert('Invalid city entry');
          
      });
};

//default display
getWeatherData(city);


