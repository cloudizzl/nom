import { useEffect, useState } from "react";
import RatingsService from "./RatingsService";

const RatingTimeline = () => {
    const { ratings, loading, error } = RatingsService();

    if (loading) return <div>Loading timeline...</div>;
    if (error) return <div>Error: {error}</div>;
    if (ratings.length === 0) return <div>No ratings found</div>;

    const groupedRatings = ratings.reduce((groups, rating) => {
        const date = new Date(rating.created);
        const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });

        if (!groups[monthYear]) {
            groups[monthYear] = [];
        }
        groups[monthYear].push(rating);
        return groups;
    }, {});

    return (
        <div className="timeline">
            {Object.entries(groupedRatings).map(([monthYear, monthRatings]) => (
                <div key={monthYear} className="timeline-month">
                    <h2>{monthYear}</h2>
                    {monthRatings.map((rating) => (
                        <div key={rating.id} className="timeline-item">
                            <div className="timeline-header">
                                <span>{rating.expand?.location?.name || 'Unknown Location'}</span>
                                <span>{new Date(rating.created).toLocaleDateString()}</span>
                                <span>by {rating.expand?.user?.username || 'unknown'}</span>
                            </div>
                            <div className="rating-details">
                                <div>Taste: {rating.taste || 'N/A'}</div>
                                <div>Ambiance: {rating.ambiance || 'N/A'}</div>
                                <div>Food Coma: {rating.foodComa || 'N/A'}</div>
                                <div>Service: {rating.service || 'N/A'}</div>
                                <div>Noise: {rating.noise || 'N/A'}</div>
                                <div>Creativity: {rating.creativity || 'N/A'}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default RatingTimeline;