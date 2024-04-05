/*const cars = ['WRX', 'MX-5', 'Cooper']
console.log(cars)

const myCars = cars.map((car)=> {
   return car[0];
} );
console.log(myCars)*/

const apiKey = '4d76c17901d775c10628769986f03d11';
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

let city = 'austin';

function getWeatherData(city) {
    const urlToFetch = `${apiBaseUrl}?q=${city},US&appid=${apiKey}&units=imperial`;//----- added ,US after ${city}. Fixed Manor temp being wrong -----// 
    
    fetch(urlToFetch)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
};

getWeatherData(city);
