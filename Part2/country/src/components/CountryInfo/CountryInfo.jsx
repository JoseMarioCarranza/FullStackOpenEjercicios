import Weather from "../Weather/Weather"

const CountryInfo = ({ data }) => {

    const countryData = data[0]

    if (!countryData) return

    const style = {
        width: '50vw'
    }

    return (
        <>
            <h1>{countryData.name.common}</h1>
            <p>Capital {countryData.capital}</p>
            <p>Area {countryData.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(countryData.languages).map(l => <li key={l}>{l}</li>)}
            </ul>
            <img style={style} src={countryData.flags.svg} alt={`Flag of ${countryData.name.common}`} />
            <Weather lat={countryData.latlng[0]} lng={countryData.latlng[1]} country={countryData.name.common} />
        </>
    )
}

export default CountryInfo