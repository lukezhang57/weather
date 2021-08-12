const api = {
    key: 'ff973718dc927606010714c3222b889e',
    base: "https://api.openweathermap.org/data/2.5/weather?"
};

const aqiAPI = {
    key: '696fff8018a6af85b97c1087d1edf1a2',
    base: "http://api.openweathermap.org/data/2.5/air_pollution?"
}

const input = document.getElementById('input')
input.addEventListener("keypress", function(event){
    if (event.key === "Enter"){
        getWeather(input.value);
        document.querySelector('.weather').style.display = 'block';
    }
})
function getWeather(city){
    const fetchPromise = fetch(`${api.base}q=${city}&appid=${api.key}&units=imperial`);
    fetchPromise.then((details)=>{return details.json();}).then(displayWeather);
}

function displayWeather(details){
    document.querySelector('.weather').style.display = 'block';
    document.getElementById('city').innerHTML =  `${details.name}, ${details.sys.country}`;
    document.getElementById('temp').innerHTML =  `${Math.round(details.main.temp)}&deg;F`;
    document.getElementById('condition').innerHTML =  `${details.weather[0].description.charAt(0).toUpperCase() + details.weather[0].description.substring(1)}`;
    let condition = details.weather[0].description;
    let icon = document.getElementById('icon')
    let prevIcon = icon.className;
    let newIcon;
    if (condition === 'clear sky'){
        newIcon = 'far fa-sun';
    }
    else if (condition === 'overcast clouds'){
        newIcon = 'fas fa-cloud';
    }
    else if (condition === 'moderate rain' || condition === 'rain'){
        newIcon = 'fas fa-cloud-rain';
    }
    else if (condition === 'shower rain'){
        newIcon = 'fas fa-cloud-showers-heavy'
    }
    else if (condition === 'few clouds' || condition === 'broken clouds' || condition === 'scattered clouds'){
        newIcon = 'fas fa-cloud-sun';
    }
    else if (condition === 'thunderstorm'){
        newIcon = 'fas fa-bolt';
    }
    else {
        prevIcon = newIcon;
    }
    icon.className = icon.className.replace(prevIcon,newIcon);
    document.getElementById('humidity').innerHTML = `${details.main.humidity}% humidity`
    getAQI(details.coord.lat,details.coord.lon);
}

function getAQI(lat, long){
    const fetchPromise = fetch(aqiAPI.base + 'lat='+lat+'&lon='+ long+ '&appid='+aqiAPI.key)
    fetchPromise.then((data) => { return data.json()}).then(displayAQI)
}

function displayAQI(data){
    let level;
    let aqi = data.list[0].main.aqi;
    if (aqi === 1){
        level = "(Good)";
    }
    else if (aqi === 2){
        level = "(Fair)"
    }
    else if (aqi === 3){
        level = "(Moderate)"
    }
    else if (aqi === 4){
        level = "(Poor)"
    }
    else {
        level = "(Very Poor)"
    }
    document.getElementById('aqi').innerHTML = `AQI Level: ${data.list[0].main.aqi}` + " " + level;
}
