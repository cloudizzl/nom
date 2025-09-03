import '../styles/rating.css'
import {useState} from "react";

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(null);
    const isInteractive = !!setRating;

    return (
        <div className="star-rating-container">
            <div>
                {[1, 2, 3, 4, 5].map((star) => {
                    // Determine if this star should be filled
                    const isFilled = star <= (hover || rating || 0);

                    return (
                        <button
                            type="button"
                            className="star-rating"
                            key={star}
                            data-selected={isFilled}
                            onClick={() => {
                                if (isInteractive) {
                                    /* console.log('clicked on star:', star); */
                                    setRating(star);
                                }
                            }}
                            onMouseEnter={() => {
                                if (isInteractive) {
                                    /* console.log('hovered over star:', star); */
                                    setHover(star);
                                }
                            }}
                            onMouseLeave={() => {
                                if (isInteractive) {
                                    /* console.log('left star:', hover); */
                                    setHover(null);
                                }
                            }}
                            disabled={!isInteractive}
                        >
                            {isFilled ? "★" : "☆"}
                        </button>
                    )
                })}
            </div>
        </div>
    );
}

export default StarRating;