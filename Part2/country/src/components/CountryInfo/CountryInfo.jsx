import { useState } from "react"
import countriesServices from "../../services/countries"

const CountryInfo = ({ country }) => {

    const [countryData, setCountryData] = useState(null)

    countriesServices
        .getCountryInfo(country)
        .then(CountryInfo => setCountryData(CountryInfo))


    if (!countryData) return

    return (
        <>
            <h1>{countryData.name.common}</h1>
            <p>Capital {countryData.capital}</p>
            <p>Area {countryData.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(countryData.languages).map(l => <li key={l}>{l}</li>)}
            </ul>
            <img src={countryData.flags.svg} alt={`Flag of ${countryData.name.common}`} />
        </>
    )
}

export default CountryInfo