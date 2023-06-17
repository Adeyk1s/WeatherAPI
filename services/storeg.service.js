import { homedir } from 'os';
import { join} from 'path';
import { promises } from 'fs'

const filepath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
}
const saveValue = async ( type , value ) => {
    let data = {};    
    if(await isExist(filepath)){
        const file = await promises.readFile(filepath);
        data = JSON.parse(file);
    }
    data[type] = value;
    promises.writeFile(filepath, JSON.stringify(data));
}
const getValue = async (type) => {
    if(await isExist(filepath)){
        const file = await promises.readFile(filepath);
        const data = JSON.parse(file);
        return data[type];
    } 
    return undefined;
}


const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch(e) {
        return false;
    }
};

export { TOKEN_DICTIONARY, getValue, saveValue};