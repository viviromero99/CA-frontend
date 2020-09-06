import axios from 'axios';

let api = axios.create({
    baseURL: 'https://conectividade-academica.herokuapp.com/api',
});


export default api;