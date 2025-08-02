import CountryInfo from "../CountryInfo/CountryInfo"

const DisplayResults = ({ filteredCountries, setFilteredCountries }) => {

    const countriesToShow = filteredCountries.map(c => c.name.common)

    const handleClick = (country) => setFilteredCountries([filteredCountries.find(c => {
        return (c.name.common.toLowerCase() === country.toLowerCase())
    })])

    if (countriesToShow.length === 0) return <p>No results found</p>

    if (countriesToShow.length > 10) return <p>Too many matches, specify another filter</p>

    return (
        <>
            {
                countriesToShow.length !== 1
                    ? countriesToShow.map(c => <p key={c}>{c} <button onClick={() => handleClick(c)}>Show</button> </p>)
                    : <CountryInfo country={countriesToShow[0]} />
            }
        </>
    )
}

export default DisplayResults