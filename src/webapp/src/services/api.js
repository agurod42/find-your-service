import axios from 'axios';
import qs from 'querystring';

class Api {

    axios = axios.create({
        baseURL: process.env.API_URL
    })

    authToken = {
        get: () => localStorage.getItem('fys-token'),
        set: (token) => {
            if (token) localStorage.setItem('fys-token', token)
            else localStorage.removeItem('fys-token');
        }
    }

    request(method, uri, data) {
        if (method.toLowerCase() === 'get' && data && Object.keys(data).length) {
            uri += qs.stringify(data);
            data = undefined;
        }
        
        if (this.authToken.get()) {
            this.axios.defaults.headers.common['X-Auth-Token'] = this.authToken.get();
        }

        return this.axios({
            method: method,
            url: `${uri}`,
            data: data
        });
    }

}

export default new Api();