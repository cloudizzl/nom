import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import SearchField from "./SearchField";
import {useRef, useState} from "react";
import "../styles/map.css"

const VALID_TYPES = ['cafe', 'restaurant', 'fast_food', 'ice_cream', 'bar', 'biergarten', 'food_court', 'pub'];
const ICON_MAPPING = {
    cafe: '🍵',
    restaurant: '🍷',
    fast_food: '🍟',
    ice_cream: '🍦',
    bar: '🥃',
    biergarten: '🍺',
    food_court: '🍱',
    pub: '🥃'
};

const Map = () => {
    const [map, setMap] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);

    const handleSearch = async (searchValue) => {
        console.log("search value:", searchValue);
        const query = `${searchValue}`;

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=jsonv2&q=
                ${encodeURIComponent(query)}&viewbox=13.0,52.6,13.8,52.3&bounded=1&addressdetails=1`
            );

            const data = await response.json();
            const filteredData = data
                .filter(location => VALID_TYPES
                    .includes(location.type));

            setSearchResults(filteredData);
            console.log("api-response:", JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("error searching for spots", error);
        }
    }

    const handleResultClick = (result) => {
        setSelectedResult(result);
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);
        map.flyTo([lat, lon], 15);
    }

    const formatLocation = (location) => {
        if (!location.display_name) return "unknown location";

        const typeIcon = ICON_MAPPING[location.type] || "❓";
        const { road: street, house_number: number, suburb: district, borough: county, city, postcode: zip } = location.address || {};

        return (
            <div className="location-parts">
                <div className="location-icon">{typeIcon}</div>
                <div className="location-part name">{location.display_name.split(',')[0]}</div>
                <div className="location-part street">{street}</div>
                <div className="location-part number">{number}</div>
                <div className="location-part district">{district}</div>
                <div className="location-part county">{county}</div>
                <div className="location-part city">{city}</div>
                <div className="location-part zip">{zip}</div>
            </div>
        );
    };

    return (
        <>
            <SearchField onSearch={handleSearch}/>

            {searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((result) => (
                        <div
                            key={result.place_id}
                            onClick={() => handleResultClick(result)}
                            className="result-item"
                        >
                            {formatLocation(result)}
                        </div>
                    ))}
                </div>
            )}

            <MapContainer
                center={[52.5200, 13.4050]}
                // center={[51.050407, 13.737262]} dd
                zoom={13}
                style={{height: '500px', width: '100%'}}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[52.5200, 13.4050]}>
                    <Popup>Berlin!</Popup>
                </Marker>

            </MapContainer>
        </>
    );
};

export default Map;