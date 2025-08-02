import countriesServices from "./services/countries"
import { useEffect, useState } from "react"

import SearchBar from "./components/SearchBar/SearchBar"
import DisplayResults from "./components/DisplayResults/DisplayResults"

function App() {

  const [contries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countriesServices
      .getAllCountries()
      .then(countriesFromServer => setCountries(countriesFromServer))
  }, [])

  useEffect(
    () => {
      setFilteredCountries(contries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase())))
    }, [search])

  return (
    <>
      <SearchBar setSearch={setSearch} />
      {
        search === ''
          ? <></>
          : <DisplayResults
            filteredCountries={filteredCountries}
            setFilteredCountries={setFilteredCountries}
          />
      }
    </>
  )
}

export default App
