import StarRating from "./StarRating";
import {useState} from "react";
import {useAuth} from "./AuthContext";
import {pb} from "../lib/pocketbase";
import {getOrCreateLocation} from "./RatingsService";
import VolumeBar from "./VolumeBar";

const FoodRating = ({location, onClose}) => {
    const auth = useAuth();
    const {currentUser} = auth;

    const [taste, setTaste] = useState(0);
    const [ambiance, setAmbiance] = useState(0);
    const [foodComa, setFoodComa] = useState(0);
    const [service, setService] = useState(0);
    const [noise, setNoise] = useState(0);
    const [creativity, setCreativity] = useState(0);
    const [image, setImage] = useState([]);
    const [comment, setComment] = useState('');
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
                image: image,
                comment: comment || ''
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

    const handleRemoveImage = () => {
        setImage([]);
        // Reset the file input
        const fileInput = document.getElementById('image-upload');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleReset = (attribute) => {
        const resetFunctions = {
            taste: () => setTaste(0),
            ambiance: () => setAmbiance(0),
            foodComa: () => setFoodComa(0),
            service: () => setService(0),
            noise: () => setNoise(0),
            creativity: () => setCreativity(0),
            image: handleRemoveImage
        };

        if (resetFunctions[attribute]) {
            resetFunctions[attribute]();
        }
    }

    return (
        <div className="food-rating-container">
            {error && <div className="error-message">{error}</div>}
            <h2>{getLocationName()}</h2>
            <div className="rating-instruction">
                Rate from 1-5! (Leave it 0 if you can't rate the specific attribute)
            </div>

            <div className="rating-attribute">
                <span className="rating-label">Taste</span>
                <div className="stars-container">
                    <StarRating rating={taste} setRating={setTaste}/>
                    <button
                        className="reset-button"
                        onClick={() => handleReset('taste')}
                        disabled={taste === 0}
                    >
                        clear
                    </button>
                </div>
            </div>

            <div className="rating-attribute">
                <span className="rating-label">Ambiance</span>
                <div className="stars-container">
                    <StarRating rating={ambiance} setRating={setAmbiance}/>
                    <button
                        className="reset-button"
                        onClick={() => handleReset('ambiance')}
                        disabled={ambiance === 0}
                    >
                        clear
                    </button>
                </div>
            </div>

            <div className="rating-attribute">
                <span className="rating-label">Food Coma</span>
                <div className="stars-container">
                    <StarRating rating={foodComa} setRating={setFoodComa}/>
                    <button
                        className="reset-button"
                        onClick={() => handleReset('foodComa')}
                        disabled={foodComa === 0}
                    >
                        clear
                    </button>
                </div>
            </div>

            <div className="rating-attribute">
                <span className="rating-label">Service</span>
                <div className="stars-container">
                    <StarRating rating={service} setRating={setService}/>
                    <button
                        className="reset-button"
                        onClick={() => handleReset('service')}
                        disabled={service === 0}
                    >
                        clear
                    </button>
                </div>
            </div>

            <div className="rating-attribute">
                <span className="rating-label">Creativity</span>
                <div className="stars-container">
                    <StarRating rating={creativity} setRating={setCreativity}/>
                    <button
                        className="reset-button"
                        onClick={() => handleReset('creativity')}
                        disabled={creativity === 0}
                    >
                        clear
                    </button>
                </div>
            </div>

            <div className="rating-attribute">
                <span className="rating-label">Noise Level</span>
                <div className="volume-container">
                    <VolumeBar
                        volume={noise}
                        setVolume={setNoise}
                        max={5}
                        step={0.5}
                    />
                    <button
                        className="reset-button"
                        onClick={() => handleReset('noise')}
                        disabled={noise === 0}
                    >
                        clear
                    </button>
                </div>
            </div>

            <div className="picture-section">
                <div className="picture-input">
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        id="image-upload"
                        accept="image/*"
                    />
                    <label htmlFor="image-upload" className="picture-label">
                        {image.length > 0 ? 'change photos' : 'add photos (optional)'}
                    </label>
                </div>

                {image.length > 0 && (
                    <div className="image-preview-section">
                        <div className="selected-images-info">
                            {image.length} {image.length === 1 ? 'photo' : 'photos'} selected
                        </div>
                        <button
                            className="reset-button"
                            onClick={() => handleReset('image')}
                            disabled={image.length === 0}
                        >
                            clear
                        </button>
                    </div>
                )}

                <div>
                    <textarea
                        id="comment"
                        className="comment"
                        rows="3"
                        cols="82"
                        placeholder="additional thoughts?"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}>
                    </textarea>
                </div>

            </div>

            <button className="save-rating-button" onClick={saveRatings} disabled={isLoading}>
                {isLoading ? 'saving...' : 'save ratings'}
            </button>
        </div>
    )
}

export default FoodRating;