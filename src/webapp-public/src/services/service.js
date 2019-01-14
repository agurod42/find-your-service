import api from './api'

class ServiceService { // hehe :D
  index (q) {
    return api.request('get', 'services', q)
  }
}

export default new ServiceService()
