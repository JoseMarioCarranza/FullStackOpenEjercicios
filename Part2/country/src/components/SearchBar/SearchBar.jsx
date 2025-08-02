const SearchBar = ({ setSearch }) => {

    const handleSearch = event => setSearch(event.target.value)

    return (
        <div>
            find countries <input onChange={handleSearch} />
        </div >
    )
}

export default SearchBar