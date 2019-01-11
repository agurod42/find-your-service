import api from './api';

class AuthService {

    authenticate(email, password) {
        return  api.request('post', 'auth', { email: email, password: password })
                    .then(res => {
                        localStorage.setItem('token', res.data.token);
                        return res;
                    });
    }

    isUserAuthenticated() {
        localStorage.getItem('token') !== undefined;
    }

}

export default new AuthService();