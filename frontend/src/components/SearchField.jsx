import "../styles/map.css"

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
                className="search"
                type="text"
                placeholder="search..."
                name="search"
            />
        </form>
    );
};

export default SearchField;