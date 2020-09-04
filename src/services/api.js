import axios from 'axios';

let api = axios.create({
    baseURL: 'https://48f367f1e8f1.ngrok.io/api',
});


export default api;