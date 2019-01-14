import api from './api'

class ServiceService { // hehe :D
  index (q) {
    return api.request('get', 'services', q)
  }

  show (id) {
    return api.request('get', `services/${id}`)
  }

  create (data) {
    return api.request('post', 'services', data)
  }

  update (id, data) {
    return api.request('put', `services/${id}`, data)
  }

  delete (id) {
    return api.request('delete', `services/${id}`)
  }
}

export default new ServiceService()
