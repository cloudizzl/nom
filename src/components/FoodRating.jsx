import Scrollbar from "./Scrollbar";
import StarRating from "./StarRating";
import {useState} from "react";
import PocketBase from "pocketbase";
import starRating from "./StarRating";
import {useAuth} from "./AuthContext";import { pb } from "../lib/pocketbase";
import {getOrCreateLocation} from "./RatingsService";


const FoodRating = ( {location, onClose } ) => {
    const auth = useAuth();
    const { currentUser } = auth;

    const [taste, setTaste] = useState(0);
    const [ambiance, setAmbiance] = useState(0);
    const [foodComa, setFoodComa] = useState(0);
    const [service, setService] = useState(0);
    const [noise, setNoise] = useState(0);
    const [creativity, setCreativity] = useState(0);
    const [image, setImage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    if (!location) {
        return <div>Loading location data...</div>
    }

    if (!currentUser) {
        return <div>you need to be logged in</div>;
    }

    const getLocationName = () => {
        if (location.display_name) {
            // OSM location
            return location.display_name.split(',')[0];
        } else if (location.name) {
            // PocketBase location
            return location.name;
        }
        return "Unknown Location";
    };

    const saveRatings = async () => {
        setIsLoading(true);
        setError('');

        try {
            const locationRecord = await getOrCreateLocation(location);
            console.log('Using location:', locationRecord);

            const record = await pb.collection('ratings').create({
                location: locationRecord.id,
                user: currentUser.id,
                taste: taste || 0,
                ambiance: ambiance || 0,
                foodComa: foodComa || 0,
                service: service || 0,
                noise: noise || 0,
                creativity: creativity || 0,
                image: image
            });

            console.log('saved rating data', record);
            alert('Rating saved successfully');
            onClose();
        } catch (error) {
            console.error('error saving rating:', error);
            setError('Error saving rating: ' + (error.message || 'Unknown error'));
        }
        setIsLoading(false);
    };

    const handleImageChange = (e) => {
        setImage(Array.from(e.target.files));
    };

    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            <h2>{getLocationName()}</h2>
            <div>Rate from 1-5!</div>
            <div className="rating-attribute">
                Taste
                <StarRating rating={taste} setRating={setTaste}/>
            </div>
            <div className="rating-attribute">
                Ambiance
                <StarRating rating={ambiance} setRating={setAmbiance} />
            </div>
            <div className="rating-attribute">
                Food Coma
                <StarRating rating={foodComa} setRating={setFoodComa} />
            </div>
            <div className="rating-attribute">
                Service
                <StarRating rating={service} setRating={setService} />
            </div>
            <div className="rating-attribute">
                Noise Level
                <StarRating rating={noise}  setRating={setNoise} />
            </div>
            <div className="rating-attribute">
                Creativity
                <StarRating rating={creativity} setRating={setCreativity} />
            </div>
            <input
                className="picture"
                type="file"
                multiple
                onChange={handleImageChange}
            >

            </input>

            <button className="save-rating-button" onClick={saveRatings} disabled={isLoading}>
                {isLoading ? 'saving...' : 'save ratings'}
            </button>
         </div>
    )
}

export default FoodRating;