const apiKey = "Replace your api key hereoks";
const input = document.querySelector('#cityInput');
const searchButton = document.querySelector('.search-button');

console.log("welcome to weather app");
console.log(input);
console.log(searchButton);

searchButton.addEventListener('click', ()=>{
    console.log("search button clicked");
    const city = input.value.trim();
    if(city){
        console.log(city);
        getWeather(city);
    }
})


async function getWeather(city){
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try{
        const response = await fetch(url);
        const data = await response.json();

        if(data.error){
            alert("city not found");
            return;
        }
        console.log(data);
        updateWeatherUI(data);
    
    } catch(error){
        console.error("Error fetching weather:", error);
        alert("Something went wrong");
    }
}


function updateWeatherUI(data){
    const cityName = data.location.name;
    const temp = data.current.temp_c;
    const humidity = data.current.humidity;
    const wind = data.current.wind_kph;
    const iconUrl = `https:${data.current.condition.icon}`;

    document.querySelector('.temperature').textContent = `${temp}°C`;
    document.querySelector('.city-name').textContent= cityName;
    document.querySelector('.weather-icon').innerHTML = `<img src="${iconUrl}" alt="icon" style="width:60px;">`;
    document.querySelector('.weather-details').innerHTML = `
    <div class="detail">
      <i class="fa-solid fa-droplet"></i>
      <span>Humidity: <strong>${humidity}%</strong></span>
    </div>
    <div class="detail">
      <i class="fa-solid fa-wind"></i>
      <span>Wind: <strong>${wind} km/h</strong></span>
    </div>
  `;
}