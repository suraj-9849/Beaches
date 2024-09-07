import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient'; // Ensure this import is correct

const ShowReviews = ({ beachId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            // Join the reviews table with the users table to get the username
            const { data, error } = await supabase
                .from('reviews')
                .select('rating, content, user_id, users(user_name)')
                .eq('beach_id', beachId);

            if (error) {
                throw error;
            }

            // Assign profile pictures for each user (can be dynamic if you have user profile pictures)
            const reviewsWithUsernames = data.map(review => ({
                ...review,
                username: review.users.user_name || 'Anonymous', // Get the username from the users table
                profilePicture: 'https://via.placeholder.com/40?text=U' // Dummy profile picture, replace with actual if available
            }));

            setReviews(reviewsWithUsernames);
        } catch (err) {
            console.error('Error fetching reviews:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (beachId) {
            fetchReviews(); // Fetch reviews when component mounts or beachId changes
        }
    }, [beachId]);

    return (
        <div className="reviews-section mt-16 px-4 md:px-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Reviews</h2>
            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : reviews.length > 0 ? (
                <ul className="space-y-4">
                    {reviews.map((review, index) => (
                        <li key={index} className="flex items-start p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
                            <img
                                src={review.profilePicture}
                                alt={review.username}
                                className="w-10 h-10 rounded-full border-2 border-gray-300 mr-4"
                            />
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <div className="text-lg font-semibold text-gray-900 mr-4">
                                        {review.username}
                                    </div>
                                    <div className="text-yellow-500">
                                        {'★'.repeat(Math.round(review.rating))}{'☆'.repeat(5 - Math.round(review.rating))}
                                    </div>
                                </div>
                                <p className="text-gray-700">{review.content}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">No reviews yet.</p>
            )}
        </div>
    );
};

export default ShowReviews;