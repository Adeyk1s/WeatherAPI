import { getValue, TOKEN_DICTIONARY } from './storeg.service.js';
import axios from 'axios';

const getIcon = (icon) => {
    switch (icon.slice(0, -1)){
        case '01':
            return '☀️';
        case '02': 
            return '⛅️';
        case '03':
            return '☁️';
        case '04':
            return '☁';
        case '09':
            return '🌧️';
        case '10':
            return '🌨️';
        case '11':
            return '🌩';
        case '13':
            return '❄️';
        case '50':
            return '🌫';
    };
};

const getWeather = async () => {
    const token = await getValue(TOKEN_DICTIONARY.token);
    const citys = await getValue(TOKEN_DICTIONARY.city);
    if(!token){
        throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
    }
    if(!citys){
        throw new Error('Не записан город, напишите его через команду -s [city]');
    }
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: citys,
            appid: token,
            lang: 'ru',
            units: 'metric',
        }
    });
    return data;
};

export {getWeather,getIcon};