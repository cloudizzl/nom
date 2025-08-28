import PocketBase from "pocketbase";
import { useEffect, useState } from 'react';

const RatingList = () => {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                setLoading(true);
                const pb = new PocketBase('http://127.0.0.1:8090');
                const records = await pb.collection('ratings').getFullList();
                setRatings(records);
            } catch (error) {
                setError(error);
                console.error(error);
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
            <div className="single-rating">
                {ratings.map((rating) => (
                    <div key={rating.id}>
                        {rating.taste}
                        {rating.ambiance}
                        {rating.foodComa}
                        {rating.service}
                        {rating.noise}
                        {rating.creativity}
                    </div>
                ))};
            </div>
        </div>
    )
};

export default RatingList;