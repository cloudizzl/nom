import { useEffect, useState } from 'react';
import RatingsService from './RatingsService';
import '../styles/rating.css';

const RatingList = ({ location }) => {
    const { ratings: allRatings, loading, error } = RatingsService();
    const locationRatings = allRatings.filter(rating =>
        rating.location === location.id || rating.expand?.location?.id === location.id
    );

    if (loading) return <div>Loading ratings...</div>;
    if (error) return <div>Error: {error}</div>;
    if (locationRatings.length === 0) return <div>No ratings found</div>;

    return (
        <div className="ratings-container">
            <h2>{location.name}</h2>
            <div className="ratings-list">
                {locationRatings.map((rating) => (
                    <div key={rating.id} className="rating-card">
                        <div className="rating-header">
                            <div className="rating-user">
                                by {rating.expand?.user?.username || 'unknown'}
                            </div>
                            <div className="rating-date">
                                {new Date(rating.created).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="rating-details">
                            <div className="rating-item">
                                <span className="rating-label">Taste:</span>
                                <span className="rating-value">{rating.taste || 'N/A'}</span>
                            </div>
                            <div className="rating-item">
                                <span className="rating-label">Ambiance:</span>
                                <span className="rating-value">{rating.ambiance || 'N/A'}</span>
                            </div>
                            <div className="rating-item">
                                <span className="rating-label">Food Coma:</span>
                                <span className="rating-value">{rating.foodComa || 'N/A'}</span>
                            </div>
                            <div className="rating-item">
                                <span className="rating-label">Service:</span>
                                <span className="rating-value">{rating.service || 'N/A'}</span>
                            </div>
                            <div className="rating-item">
                                <span className="rating-label">Noise Level:</span>
                                <span className="rating-value">{rating.noise || 'N/A'}</span>
                            </div>
                            <div className="rating-item">
                                <span className="rating-label">Creativity:</span>
                                <span className="rating-value">{rating.creativity || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingList;