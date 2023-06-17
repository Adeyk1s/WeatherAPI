#!/usr/bin/env node
import { getArgs } from './helper/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { TOKEN_DICTIONARY ,saveValue } from './services/storeg.service.js';

const saveToken = async (token) => {
    if(!token.length){
        printError('Не передан токен');
        return;
    }
    try {
        await saveValue(TOKEN_DICTIONARY.token, token );
        printSuccess('Токен сохранён');
    } catch(e) {
        printError(e.message);
    }
    
};

const saveCity = async (city) => {
    if(!city.length){
        printError('Не введён город');
        return;
    }
    try{
        await saveValue(TOKEN_DICTIONARY.city, city );
        printSuccess('Город сохранён');
    } catch(e) {
        printError(e.message);
    }
}

const getForCast = async () => {
    try {
        const weather = await getWeather();
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch(e) {
        if(e?.response?.status == 404){
            printError('Неверно указан город');
        } else if(e?.response?.status == 401){
            printError('Неверно указан токен');
        } else {
            printError(e.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    if(args.h){
        printHelp();
    }
    if(args.s){
        return saveCity(args.s);
    }
    if(args.t){
        return saveToken(args.t);
    }
    return getForCast();
};

initCLI();  