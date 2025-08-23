import Scrollbar from "./Scrollbar";
import StarRating from "./StarRating";
import {useState} from "react";
import PocketBase from "pocketbase";
import starRating from "./StarRating";

const FoodRating = () => {
    const [taste, setTaste] = useState(0);
    const [ambiance, setAmbiance] = useState(0);
    const [foodComa, setFoodComa] = useState(0);
    const [service, setService] = useState(0);
    const [noise, setNoise] = useState(0);
    const [creativity, setCreativity] = useState(0);
    const [image, setImage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const saveRatings = async () => {
        setIsLoading(true);
        
        try {
            const pb = new PocketBase('http://127.0.0.1:8090');
            
            const record = await pb.collection('ratings').create({
                taste: taste || null,
                ambiance: ambiance || null,
                foodComa: foodComa || null,
                service: service || null,
                noise: noise || null,
                creativity: creativity || null,
                image: image || null,
            });

            console.log('saved rating data', record);
            alert('Rating saved successfully');
            
            setTaste(0);
            setAmbiance(0);
            setFoodComa(0);
            setService(0);
            setNoise(0);
            setCreativity(0);
            setImage([]);
        } catch (error) {
            console.error('error saving rating:', error);
            alert('Error saving rating');
        }
        setIsLoading(false);
    };

    const handleImageChange = (e) => {
        setImage(Array.from(e.target.files));
    }


    return (
        <div>
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