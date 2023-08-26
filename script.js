function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const cities = cityInput.value.split(',').map(city => city.trim());

    fetch('/getWeather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cities })
    })
    .then(response => response.json())
    .then(data => {
        const weatherResults = document.getElementById('weatherResults');
        weatherResults.innerHTML = '';

        for (const city in data.weather) {
            const weatherInfo = document.createElement('p');
            weatherInfo.textContent = `${city}: ${data.weather[city]}`;
            weatherResults.appendChild(weatherInfo);
        }
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
}
