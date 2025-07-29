import axios from 'axios';

const BASE_URL = 'https://open-weather13.p.rapidapi.com';
const HEADERS = {
    'x-rapidapi-key': '70dda09390msh0288530fbff4bd7p1ccf24jsn9459cb7c832a',
    'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
};

export const ApiServise = {
    async getWeatherByCity(city) {
        try {
            const response = await axios.get(`${BASE_URL}/city`, {
                params: { city, lang: 'EN' },
                headers: HEADERS,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async get5DayForecastByCoords(latitude, longitude) {
        try {
            const response = await axios.get(`${BASE_URL}/fivedaysforcast`, {
                params: {
                    latitude,
                    longitude,
                    lang: 'EN',
                },
                headers: HEADERS,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};
