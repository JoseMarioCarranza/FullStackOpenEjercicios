import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAllCountries = () => axios.get(`${baseUrl}/all`).then(r => r.data)

const getCountryInfo = (countryname) => axios.get(`${baseUrl}/name/${countryname}`).then(r => r.data)

export default { getAllCountries, getCountryInfo }