const SearchField = ({onSearch}) => {

    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchValue = formData.get("search");
        onSearch(searchValue);
    }

    return (
        <form onSubmit={handleSearch}>
            <input
                name="search"
                type="text"
                placeholder="search..."
            />
        </form>
    );
};

export default SearchField;