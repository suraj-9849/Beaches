import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import Rating from 'react-rating-stars-component';
import Modal from 'react-modal';
import { Sun, Camera, Edit3, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { supabase } from '../../supabaseClient';  // Ensure this is correctly imported

Modal.setAppElement('#root');

const CarouselWithDetails = ({ name, beachLocation, beachId }) => {
    const [rating, setRating] = useState(0);
    const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
    const [photoModalIsOpen, setPhotoModalIsOpen] = useState(false);
    const [carouselImages, setCarouselImages] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [newImage, setNewImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // Function to fetch images for the specific beach ID
    const fetchImages = async () => {
        try {
            const { data, error } = await supabase
                .from('photos')
                .select('image_url')
                .eq('beach_id', beachId);

            if (error) throw error;

            // Update the state with fetched images
            setCarouselImages(data.map((photo) => photo.image_url));
        } catch (err) {
            console.error("Error fetching images:", err.message);
        }
    };

    useEffect(() => {
        fetchImages(); // Fetch images when component mounts or beachId changes
    }, [beachId]);

    const handleRating = (newRating) => {
        setRating(newRating);
    };

    const handleReviewSubmit = () => {
        console.log("Review Submitted:", newReview);
        setReviewModalIsOpen(false);
        setNewReview("");
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
        }
    };

    const handlePhotoUpload = async () => {
        if (!newImage) return;
    
        try {
            setIsUploading(true);
    
            // Sanitize the file name to remove spaces and special characters
            const sanitizedFileName = newImage.name
                .replace(/\s+/g, '-')          // Replace spaces with hyphens
                .replace(/[^a-zA-Z0-9.-]/g, ''); // Remove any characters that are not alphanumeric, dot, or hyphen
    
            // Encode the sanitized file name
            const encodedFileName = encodeURIComponent(sanitizedFileName);
    
            // Upload the image to Supabase
            const { data, error } = await supabase.storage
                .from('beach-images')
                .upload(`photos/${encodedFileName}`, newImage, {
                    cacheControl: '3600',
                    upsert: false,
                });
    
            if (error) throw error;
    
            // Get the public URL of the uploaded image
            const { data: { publicUrl }, error: urlError } = supabase
                .storage
                .from('beach-images')
                .getPublicUrl(`photos/${encodedFileName}`);
    
            if (urlError) throw urlError;
    
            // Insert the image URL and beach ID into the photos table
            const { error: insertError } = await supabase
                .from('photos')
                .insert([
                    { image_url: publicUrl, beach_id: beachId }
                ]);
    
            if (insertError) throw insertError;
    
            // Refresh images after upload
            fetchImages();
            setPhotoModalIsOpen(false);
            setNewImage(null);
    
        } catch (err) {
            console.error("Error uploading photo:", err.message);
        } finally {
            setIsUploading(false);
        }
    };
    

    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 md:p-2 transition-all duration-300"
                onClick={onClick}
            >
                <ChevronLeft size={20} className="text-blue-800" />
            </button>
        );
    };

    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 md:p-2 transition-all duration-300"
                onClick={onClick}
            >
                <ChevronRight size={20} className="text-blue-800" />
            </button>
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '2rem',
            maxWidth: '90%',
            width: '500px',
            borderRadius: '1rem',
            background: 'linear-gradient(to bottom right, #e0f2fe, #e0e7ff)',
        },
    };

    return (
        <div className="w-full mx-auto p-4 md:p-8 rounded-3xl shadow-2xl">
            <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl mb-6 md:mb-12">
                <Slider {...settings}>
                    {carouselImages.map((image, index) => (
                        <div key={index} className="carousel-item relative">
                            <img src={image} alt={`Slide ${index}`} className="w-full h-[300px] md:h-[500px] object-cover" />
                            <div className="absolute inset-0 via-transparent to-transparent"></div>
                        </div>
                    ))}
                </Slider>
                <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 text-white z-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-1 md:mb-2 tracking-wide text-gray-800 drop-shadow-[0_2px_4px_rgba(100,100,100,0.6)]">
                        {name}
                    </h1>
                    <div className="flex items-center space-x-2 text-sm md:text-xl">
                        <MapPin className="text-red-400" size={16} />
                        <h2 className="font-semibold text-gray-800 drop-shadow-[0_2px_4px_rgba(100,100,100,0.6)]">
                            {beachLocation}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center mb-6 md:mb-12">
                <div className="flex items-center space-x-4 mb-4">
                    <Sun className="text-yellow-400" size={36} />
                    <Rating
                        count={5}
                        onChange={handleRating}
                        size={36}
                        activeColor="#ffd700"
                        value={rating}
                        isHalf={true}
                    />
                    <div className="text-2xl md:text-3xl font-bold text-white text-shadow-sm">
                        {rating.toFixed(1)} / 5
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                        className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                        onClick={() => setReviewModalIsOpen(true)}
                    >
                        <Edit3 className="mr-2" size={20} />
                        Leave a Review
                    </button>
                    <button
                        className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={() => setPhotoModalIsOpen(true)}
                    >
                        <Camera className="mr-2" size={20} />
                        Upload Photo
                    </button>
                </div>
            </div>

            <Modal
                isOpen={reviewModalIsOpen}
                onRequestClose={() => setReviewModalIsOpen(false)}
                style={modalStyles}
                contentLabel="Leave a Review"
            >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Leave a Review</h2>
                <textarea
                    className="w-full h-32 border rounded-lg p-2 mb-4"
                    placeholder="Write your review..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 ease-in-out"
                    onClick={handleReviewSubmit}
                >
                    Submit
                </button>
            </Modal>

            <Modal
                isOpen={photoModalIsOpen}
                onRequestClose={() => setPhotoModalIsOpen(false)}
                style={modalStyles}
                contentLabel="Upload Photo"
            >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Upload Photo</h2>
                <input
                    type="file"
                    onChange={handlePhotoChange}
                    accept="image/*"
                />
                <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 ease-in-out mt-4"
                    onClick={handlePhotoUpload}
                    disabled={isUploading}
                >
                    {isUploading ? 'Uploading...' : 'Upload'}
                </button>
            </Modal>
        </div>
    );
};

export default CarouselWithDetails;
