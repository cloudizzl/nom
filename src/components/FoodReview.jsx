import Scrollbar from "./Scrollbar";
import StarRating from "./StarRating";

const FoodReview = () => {

    return (
        <div>
            <div>Rate from 1-5!</div>
            <div className="rating-attribute">
                Taste
            </div>
            <div className="rating-attribute">
                Ambiance
            </div>
            <div className="rating-attribute">
                Food Coma
            </div>
            <div className="rating-attribute">
                Service
            </div>
            <div className="rating-attribute">
                Noise Level
            </div>
            <div className="rating-attribute">
                Creativity
            </div>
            <StarRating />
            <button>meow</button>
        </div>
    )
}

export default FoodReview