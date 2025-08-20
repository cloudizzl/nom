import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import SearchField from "./SearchField";
import {useState} from "react";

const Map = () => {

    const [map, setMap] = useState(null);

    const handleSearch = (searchValue) => {
        console.log("search value:", searchValue);

        
    }

    return (
        <>
            <SearchField onSearch={handleSearch} />

            <MapContainer
                center={[52.5200, 13.4050]}
                // center={[51.050407, 13.737262]} dd
                zoom={13}
                style={{height:'500px', width:'100%'}}
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