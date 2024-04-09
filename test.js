const forecastApiKey = '0bd62f2d32009d6c37c47b15082707e3'; 

let city = 'austin';
//let lat = 30.27;
//let lon = -97.74;


function getCords(city) {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},US&appid=${forecastApiKey}`;

  fetch(geoUrl)
  .then((response) => response.json())
  .then((data) => {
    let lat = `${data[0].lat}`
    let lon = `${data[0].lon}`

    console.log(lat)
    console.log(lon)
    getForecast(lat,lon);
  })
  .catch((error) => alert('could not get cords'));
 
};
getCords(city);


function getForecast(lat, lon) {
  const forecastUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${forecastApiKey}&units=imperial`

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
    console.log(data)
    console.log(data.daily[0].temp.max)
    })
    .catch((error) => alert('could not receive forecast')); 
};
//getForecast(lat, lon);
