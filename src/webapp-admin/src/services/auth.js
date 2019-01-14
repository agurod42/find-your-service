import api from './api'

class AuthService {
  authenticate (email, password) {
    return api.request('post', 'auth', { email: email, password: password })
      .then(res => {
        api.authToken.set(res.data.token)
        return res
      })
  }

  deauthenticate () {
    api.authToken.set(undefined)
  }

  isUserAuthenticated () {
    return api.authToken.get() !== null
  }
}

export default new AuthService()
