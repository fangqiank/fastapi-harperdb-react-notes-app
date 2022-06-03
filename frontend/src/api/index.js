import axios from 'axios'

export const ENDPOINTS = {
  NOTES: 'notes',
  // singleNote: 'notes',
  // noteUpdate: 'note-update',
  // noteDelete: 'note-delete',
  // noteCreate: 'note-create',
}

export const createAPIEndpoint = (endpoint) => {
  let url = `/${endpoint}/`

  const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'JWT...'
  }

  return {
    fetch: () => axios.get(url),
    fetchById: (id) => axios.get(`${url}${id}`),
    create: (data) => axios.post(url, data, { headers }),
    update: (id, data) => axios.put(`${url}${id}/`, data, { headers }),
    delete: (id) => axios.delete(`${url}${id}/`),
  }
}
