import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import SearchField from "./SearchField";
import {useRef, useState} from "react";
import "../styles/map.css"

const Map = () => {

    const [map, setMap] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);

    const handleSearch = async (searchValue) => {
        console.log("search value:", searchValue);
        const query = `${searchValue}`;

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=
                ${encodeURIComponent(query)}&limit=5&viewbox=13.0,52.6,13.8,52.3&bounded=1`
            );

            const data = await response.json();
            setSearchResults(data);

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
        if (!location.display_name) {
            return "unknown location";
        }

        const formattedLocation = location.display_name.replace(/, Germany$/, '').trim()
        const parts = formattedLocation
            .split(',')
            .map(part => part.trim());

        const name = parts[0];
        const street = parts[1];
        const district = parts[2];
        const county = parts[3];
        const city = parts[4];
        const zip = parts[5];

        return (
            <div className="location-parts">
                <div className="location-part name">{name}</div>
                <div className="location-part street">{street}</div>
                <div className="location-part district">{district}</div>
                <div className="location-part county">{county}</div>
                <div className="location-part city">{city}</div>
                <div className="location-part zip">{zip}</div>
            </div>
        );
    }

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