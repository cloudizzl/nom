import '../styles/rating.css'
import {useId, useState} from "react";

const StarRating = ({}) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div className="star-rating-container">
            <div>
                {[1, 2, 3, 4, 5].map((star) => {
                    return (
                        <button
                            className="star-rating"
                            key={star}
                            onClick={() => {
                                setRating(star)
                            }}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                        >
                            { star <= (hover || rating ) ? "★" : "☆"}
                        </button>
                    )
                })}
            </div>
        </div>
    );
}


export default StarRating;

