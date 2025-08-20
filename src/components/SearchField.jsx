const SearchField = ({ onSearch }) => {

    const handleSearch = (event) => {
        const text = event.target.value;
        onSearch(text)
    }

    return (
        <>
            <input onChange={handleSearch}
                   type="text"
                   placeholder="search..."
            />
        </>
    )


};

export default SearchField;