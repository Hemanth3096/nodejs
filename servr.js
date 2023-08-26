const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/getWeather', async (req, res) => {
    const { cities } = req.body;
    
    try {
        const weatherPromises = cities.map(async city => {
            const response = await axios.get(`YOUR_WEATHER_API_URL?q=${city}&appid=YOUR_API_KEY`);
            const temperature = response.data.main.temp;
            return { [city]: `${temperature}°C` };
        });

        const weatherResults = await Promise.all(weatherPromises);
        const weatherData = Object.assign({}, ...weatherResults);

        res.json({ weather: weatherData });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
