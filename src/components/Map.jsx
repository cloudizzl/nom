import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import SearchField from "./SearchField";
import {useEffect, useRef, useState} from "react";
import "../styles/map.css"
import Scrollbar from "./Scrollbar";
import FoodRating from "./FoodRating";
import RatingList from "./RatingList";
import {useAuth} from "./AuthContext";import { pb } from "../lib/pocketbase";

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
    const mapRef = useRef(null);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);
    const [showRatingComponent, setShowRatingComponent] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [showRatingsList, setShowRatingsList] = useState(false);

    useEffect(() => {
        if (selectedResult && mapRef.current) {
            const lat = parseFloat(selectedResult.lat);
            const lon = parseFloat(selectedResult.lon);
            mapRef.current.flyTo([lat, lon], 16, {
                duration: 2,
                easeLinearity: 1
            });
        }
    }, [selectedResult])

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
    }

    const handleRatingButtonClick = (location) => {
        setCurrentLocation(location)
        setShowRatingComponent(!showRatingComponent);
    }

    const handleShowRatings = async (location) => {
        try {
            const locationRecord = await pb.collection('locations').getFirstListItem(
                `place_id = "${location.place_id}"`
            );
            setCurrentLocation(locationRecord);
            setShowRatingsList(!showRatingsList);
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    }

    const formatLocation = (location) => {
        if (!location.display_name) return "unknown location";

        /* console.log("current location:", location); */
        const typeIcon = ICON_MAPPING[location.type] || "❓";
        const {
            road: street,
            house_number: number,
            suburb: district,
            /* borough: county, */
            city,
            postcode: zip
        } = location.address || {};

        const name = location.display_name.split(',')[0];

        return (
            <div className="location-card">
                <div className="location-header">
                    <span className="location-icon">{typeIcon}</span>
                    <span className="location-name">{name}</span>
                </div>

                <div className="location-details">
                    {street && number && (
                        <div className="location-address-line">
                            {street} {number}
                        </div>
                    )}

                    {/*                    {county && district && (
                        <div className="location-address-line">
                            {county}, {district}
                        </div>
                    )}*/}

                    {district && (
                        <div className="location-address-line">
                            {district}
                        </div>
                    )}

                    {city && zip && (
                        <div className="location-address-line">
                            {city} {zip}
                        </div>
                    )}
                </div>

                <button
                    className="location-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRatingButtonClick(location)
                        console.log("rate location:", location);
                    }}
                >
                    rate me!
                </button>

                <button
                    className="location-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleShowRatings(location)
                    }}
                >
                    show ratings!
                </button>
            </div>
        );
    };

    const createCustomIcon = (type) => {
        const icon = ICON_MAPPING[type] || "❓";

        return L.divIcon({
            html: `<div>${icon}</div>`,
            className: 'location-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
        });
    };

    return (
        <div>
            <SearchField onSearch={handleSearch}/>

            <div className="location-container">
                {searchResults.length > 0 && (
                    <div className="search-results">
                        <Scrollbar>
                            {searchResults.map((result) => (
                                <div
                                    key={result.place_id}
                                    onClick={() => handleResultClick(result)}
                                    className="result-item"
                                >
                                    {formatLocation(result)}
                                </div>
                            ))}
                        </Scrollbar>
                        {showRatingsList && (
                            <RatingList location={currentLocation} />
                        )}
                        {showRatingComponent && (
                            <FoodRating
                                location={currentLocation}
                                onClose={() => {
                                    console.log("closing component for: ", currentLocation);
                                    setShowRatingComponent(false)
                                }}
                            />)}
                    </div>
                )}
            </div>

            <MapContainer
                center={[52.5200, 13.4050]}
                zoom={13}
                style={{height: '500px', width: '100%'}}
                ref={mapRef}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {searchResults.map((result) => (
                    <Marker
                        key={result.place_id}
                        position={[parseFloat(result.lat), parseFloat(result.lon)]}
                        icon={createCustomIcon(result.type)}
                    >
                        <Popup>{formatLocation(result)}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;