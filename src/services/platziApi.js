const axios = require('axios');

const platziApi = axios.create({
    baseURL: process.env.PLATZI_API_URL,
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json',
    },
});

module.exports = platziApi;