require('dotenv').config();

function getConfig(){
    const config = {
        maxBodyLength: Infinity,
        baseURL: process.env.API_ENDPOINT,
        headers: {
          'Content-Type': 'application/json'
        }
    }
    return config;
}

module.exports = getConfig;