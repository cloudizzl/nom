import {useEffect, useState} from 'react';
import RatingsService from './RatingsService';
import '../styles/rating.css';
import StarRating from "./StarRating";
import VolumeBar from "./VolumeBar";

const RatingList = ({location}) => {
    const {ratings: allRatings, loading, error} = RatingsService();
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
                            <div className="receipt-title">RATING RECEIPT</div>
                            <div className="receipt-number">No. {rating.id.slice(-4)}</div>
                        </div>

                        <div className="receipt-date">
                            {new Date(rating.created).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                weekday: 'short'
                            })}
                        </div>

                        <div className="rating-details">
                            <div className="rating-item">
                                <span className="rating-label">Taste:</span>
                                <span className="stars-column">
                                    <StarRating rating={rating.taste}/>
                                </span>
                            </div>
                            <div className="rating-item">
                                <span className="rating-label">Ambiance:</span>
                                <span className="stars-column">
                                    <StarRating rating={rating.ambiance}/>
                                </span>
                            </div>
                            <div className="rating-item">
                                <span className="rating-label">Food Coma:</span>
                                <span className="stars-column">
                                    <StarRating rating={rating.foodComa}/>
                                </span>
                            </div>
                            <div className="rating-item">
                                <span className="rating-label">Service:</span>
                                <span className="stars-column">
                                    <StarRating rating={rating.service}/>
                                </span>
                            </div>
                            <div className="rating-item">
                                <span className="rating-label">Creativity:</span>
                                <span className="stars-column">
                                    <StarRating rating={rating.creativity}/>
                                </span>
                            </div>
                            <div className="rating-item">
                                <span className="rating-label">Noise Level:</span>
                                <VolumeBar
                                    volume={rating.noise}
                                    max={5}
                                    step={0.5}
                                />
                            </div>
                            <div className="rating-item">
                                <span className="rating-label">Comment:</span>
                                <span>{rating.comment}</span>
                            </div>
                        </div>

                        <div className="receipt-footer">
                            <div className="receipt-user">
                                by {rating.expand?.user?.username || 'unknown'}
                            </div>
                            <div className="receipt-time">
                                {new Date(rating.created).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                        </div>

                        <div className="perforation-line">・　・　・　・　・　・　・　・　・　・　・</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingList;