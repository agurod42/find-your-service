import axios from 'axios';

class Api {

    request(method, uri, data) {
        return axios({
            method: method,
            url: `${process.env.API_URL}/${uri}`,
            data: data
        });
    }

}

export default new Api();