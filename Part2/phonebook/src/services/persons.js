import axios from "axios";

const baseUrl = 'http://localhost:3002/persons'

const getAll = () => axios.get(baseUrl).then(r => r.data)

const create = (object) => axios.post(baseUrl, object).then(r => r.data)

export default { getAll, create }