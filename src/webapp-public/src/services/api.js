import axios from 'axios';
import qs from 'querystring';

class Api {

    axios = axios.create({
        baseURL: process.env.API_URL
    })

    request(method, uri, data) {
        if (method.toLowerCase() === 'get' && data && Object.keys(data).length) {
            uri += `?${qs.stringify(data)}`;
            data = undefined;
        }

        return this.axios({
            method: method,
            url: `${uri}`,
            data: data
        });
    }

}

export default new Api();