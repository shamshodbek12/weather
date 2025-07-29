import React, { useState } from 'react';
import { ApiServise } from '../apiservise/apiservise';
import {
    Container,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    ButtonGroup,
} from '@mui/material';
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [mode, setMode] = useState('current');

    const handleSearch = async () => {
        if (!city) return;
        try {
            const data = await ApiServise.getWeatherByCity(city);
            setWeather(data);

            if (mode === 'forecast') {
                const { lat, lon } = data.coord;
                const forecastData = await ApiServise.get5DayForecastByCoords(lat, lon);
                setForecast(forecastData);
            } else {
                setForecast(null);
            }
        } catch (err) {
            setWeather(null);
            setForecast(null);
            console.error(err);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4, color: 'white' ,backgroundColor: 'black'}}>
            <Typography variant="h4" gutterBottom>
                Ob-havo Ma'lumoti
            </Typography>
            <TextField
                label="Shahar nomi"
                variant="outlined"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                sx={{
                    mb: 2,
                    input: {
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    label: {
                        color: 'white',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white',
                        },
                    },
                }}
            />


            <ButtonGroup fullWidth sx={{ mb: 2 }}>
                <Button
                    variant={mode === 'current' ? 'contained' : 'outlined'}
                    onClick={() => setMode('current')}
                >
                    Bugungi ob-havo
                </Button>
                <Button
                    variant={mode === 'forecast' ? 'contained' : 'outlined'}
                    onClick={() => setMode('forecast')}
                >
                    5 kunlik ob-havo
                </Button>
            </ButtonGroup>

            <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
                Qidirish
            </Button>

            {mode === 'current' && weather && (
                <Card
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        mt: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <CardContent>
                        <Typography variant="h5">
                            {weather.name}, {weather.sys.country}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            Harorat: {weather.main.temp}°C <WbSunnySharpIcon />
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Shamol: {weather.main.pressure} m/s
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Namlik: {weather.main.humidity}%
                        </Typography>
                    </CardContent>
                </Card>
            )}

            {mode === 'forecast' && forecast && forecast.list && (
                <div>
                    {forecast.list
                        .filter((item) => item.dt_txt.includes("12:00:00"))
                        .map((item, index) => (
                            <Card
                                key={index}
                                sx={{
                                    backgroundColor: 'rgba(0,0,0,0.4)',
                                    color: 'white',
                                    mt: 2,
                                    borderRadius: 2,
                                    boxShadow: 2,
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6">
                                        {item.dt_txt.split(" ")[0]} - {item.main.temp}°C
                                    </Typography>
                                    <Typography>{item.weather[0].description}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                </div>
            )}

        </Container>
    );
};

export default Weather;
