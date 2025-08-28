import PocketBase from "pocketbase";
import { useEffect, useState } from 'react';
import '../styles/rating.css'

const RatingList = ({ location }) => {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                setLoading(true);
                const pb = new PocketBase('http://127.0.0.1:8090');
                const records = await pb.collection('ratings').getFullList({
                    filter: `location = "${location.id}"`,
                    sort: '-created',
                    expand: 'user,location'
                });
                setRatings(records);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching ratings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRatings()
    }, []);

    if (loading) return <div>load ratings...</div>;
    if (error) return <div>error: {error}</div>;
    if (ratings.length === 0) return <div>no ratings found</div>;

    return (
        <div>
            <h2>{location.name}</h2>
            <div className="single-rating">
                {ratings.map((rating) => (
                    <div key={rating.id}>
                        <div className="rating-user">
                            by: {rating.expand.user ? rating.expand.user.username : 'unknown'}
                        </div>
                        <div className="rating-number">
                            taste: {rating.taste}
                        </div>
                        <div className="rating-number">
                            ambiance: {rating.ambiance}
                        </div>
                        <div className="rating-number">
                            food coma: {rating.foodComa}
                        </div>
                        <div className="rating-number">
                            service: {rating.service}
                        </div>
                        <div className="rating-number">
                            noise level: {rating.noise}
                        </div>
                        <div className="rating-number">
                            creativity: {rating.creativity}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default RatingList;