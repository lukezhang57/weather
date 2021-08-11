const api = {
    key: 'ff973718dc927606010714c3222b889e',
    base: "https://api.openweathermap.org/data/2.5/weather?"
};

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
    document.getElementById('condition').innerHTML =  `${details.weather[0].main}`;
    let condition = details.weather[0].main;
    let icon = document.getElementById('icon')
    let prevIcon = icon.className;
    let newIcon;
    if (condition === 'Clear'){
        newIcon = 'far fa-sun';
    }
    else if (condition == 'Rain'){
        newIcon = 'fas fa-cloud-rain';
    }
    else if (condition == 'Clouds'){
        newIcon = 'fas fa-cloud-sun';
    }
    else if (condition == 'Thunderstorm'){
        newIcon = 'fas fa-bolt';
    }
    else {
        prevIcon = newIcon;
    }
    icon.className = icon.className.replace(prevIcon,newIcon);
    document.getElementById('humidity').innerHTML = `${details.main.humidity}% humidity`
}
