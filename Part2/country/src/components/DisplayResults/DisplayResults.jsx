import CountryInfo from "../CountryInfo/CountryInfo"

const DisplayResults = ({ filteredCountries }) => {

    const countriesToShow = filteredCountries().map(c => c.name.common)

    if (countriesToShow.length === 0) return <p>No results found</p>

    if (countriesToShow.length > 10) return <p>Too many matches, specify another filter</p>

    return (
        <>
            {
                countriesToShow.length !== 1
                    ? countriesToShow.map(c => <p key={c}>{c}</p>)
                    : <CountryInfo country={countriesToShow[0]} />
            }
        </>
    )
}

export default DisplayResults