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
    document.querySelector('.temp').innerHTML =  `${Math.round(details.main.temp)}&deg;F`;
}
