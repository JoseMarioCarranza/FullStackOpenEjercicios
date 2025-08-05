import axios from "axios";

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => axios.get(baseUrl).then(r => r.data)

const create = (object) => axios.post(baseUrl, object).then(r => r.data)

const trash = (id) => axios.delete(`${baseUrl}/${id}`).then(r => r.data)

const update = (id, object) => axios.put(`${baseUrl}/${id}`, object).then(r => r.data)

export default { getAll, create, trash, update }