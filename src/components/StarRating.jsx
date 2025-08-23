import '../styles/rating.css'
import {useId, useState} from "react";

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(null);

    /* console.log('current rating:', rating, 'current hover:', hover); */

    return (
        <div className="star-rating-container">
            <div>
                {[1, 2, 3, 4, 5].map((star) => {
                    return (
                        <button
                            className="star-rating"
                            key={star}
                            onClick={() => {
                                /* console.log('clicked on star:', star); */
                                setRating(star);
                            }}
                            onMouseEnter={() => {
                                /* console.log('hovered over star:', star); */
                                setHover(star);
                            }}
                            onMouseLeave={() => {
                                /* console.log('left star:', hover); */
                                setHover(0);
                            }}
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