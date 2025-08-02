import countriesServices from "./services/countries"
import { useEffect, useState } from "react"

import SearchBar from "./components/SearchBar/SearchBar"
import DisplayResults from "./components/DisplayResults/DisplayResults"

function App() {

  const [contries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const hook = () => {
    countriesServices
      .getAllCountries()
      .then(countriesFromServer => setCountries(countriesFromServer))
  }

  useEffect(hook, [])

  const filteredCountries = () => contries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <SearchBar setSearch={setSearch} />
      {
        search === ''
          ? <></>
          : <DisplayResults filteredCountries={filteredCountries} />
      }
    </>
  )
}

export default App
