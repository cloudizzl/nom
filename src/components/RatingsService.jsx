import {useEffect, useState} from "react";
import {pb} from "../lib/pocketbase";

const RatingsService = () => {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRatings = async () => {
        try {
            setLoading(true);
            const records = await pb.collection('ratings').getFullList({
                sort: '-created',
                expand: 'user,location'
            });
            setRatings(records);
            setError(null);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching ratings:', error);
        } finally {
            setLoading(false);
        }
    };

    const getOrCreateLocation = async (location) => {
        try {
            return await pb.collection('locations').getFirstListItem(
                `place_id = "${location.place_id}"`
            );
        } catch (error) {
            return await pb.collection('locations').create({
                place_id: location.place_id,
                name: location.display_name.split(',')[0],
                type: location.type,
                latitude: location.lat,
                longitude: location.lon
            });
        }
    };

    useEffect(() => {
        fetchRatings();
    }, []);

    return {
        ratings,
        loading,
        error,
        getOrCreateLocation,
        refreshRatings: fetchRatings
    };
};

export default RatingsService;