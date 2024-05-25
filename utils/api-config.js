require('dotenv').config();

let data = '';
function getConfig(){
    const config = {
        maxBodyLength: Infinity,
        url : process.env.API_,
        headers: 
        {
            'Content-Type': 'application/json',
        },
        data: data
    }
    return config;
}

module.exports = getConfig;