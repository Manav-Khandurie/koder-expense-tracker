require('dotenv').config();

let data = '';
function getConfig(){
    const config = {
        maxBodyLength: Infinity,
        url : process.env.API_ENDPOINT,
        headers: 
        {
            'Content-Type': 'application/json',
        },
        data: ''
    }
    return config;
}

module.exports = getConfig;