import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall?'
const appid = import.meta.env.VITE_OPENWEATHERMAP

const getWeatherInfo = (lat, lng) => axios.get(`${baseUrl}lat=${lat}&lon=${lng}&appid=${appid}&units=metric`).then(r => r.data)

export default { getWeatherInfo }