import React, { useState } from 'react';
import Slider from "react-slick";
import Rating from 'react-rating-stars-component';
import Modal from 'react-modal';
import { Sun, Camera, Edit3, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

Modal.setAppElement('#root'); // Make sure to set this to the root element of your app

const CarouselWithDetails = ({ name, beachLocation }) => {
    const [rating, setRating] = useState(0);
    const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
    const [photoModalIsOpen, setPhotoModalIsOpen] = useState(false);
    const [carouselImages, setCarouselImages] = useState([
        'https://media.istockphoto.com/id/1369829721/photo/radhanagar-beach-swaraj-dweep.jpg?s=612x612&w=0&k=20&c=-eVyFIsr8RfCGptjDqmUKkQ16QN8Rh2AVF1u4ds1xWU=',
        'https://media.istockphoto.com/id/1223106246/photo/empty-wooden-terrace-with-tropical-beach-and-clear-sky-background.jpg?s=612x612&w=0&k=20&c=TG9od-OqoHYPw1QPVFCYEMlTNCWm3BAFHtbIiH0UZZo=',
        'https://media.istockphoto.com/id/1321697305/photo/chairs-in-tropical-beach-with-palm-trees-on-coral-island.jpg?s=612x612&w=0&k=20&c=_yuHIAdYyD0ikp3CshcvF4liJ8la9YXh3m3x1lLdl54=',
    ]);
    const [newReview, setNewReview] = useState("");
    const [newImage, setNewImage] = useState(null);

    const handleRating = (newRating) => {
        setRating(newRating);
    };

    const handleReviewSubmit = () => {
        console.log("Review Submitted:", newReview);
        setReviewModalIsOpen(false);
        setNewReview(""); // Clear the review text after submission
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(URL.createObjectURL(file));
        }
    };

    const handlePhotoUpload = () => {
        if (newImage) {
            setCarouselImages([...carouselImages, newImage]);
            setPhotoModalIsOpen(false);
            setNewImage(null);
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
                            <div className="absolute inset-0  via-transparent to-transparent"></div>
                        </div>
                    ))}
                </Slider>
                <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 text-white z-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-1 md:mb-2 tracking-wide 
   text-gray-800 drop-shadow-[0_2px_4px_rgba(100,100,100,0.6)]">
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
                        className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg text-base md:text-lg font-semibold w-full sm:w-auto"
                        onClick={() => setReviewModalIsOpen(true)}
                    >
                        <Edit3 className="mr-2" size={20} />
                        Write Review
                    </button>
                    <button
                        className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-600 text-white px-6 py-3 rounded-full hover:from-pink-600 hover:to-red-700 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg text-base md:text-lg font-semibold w-full sm:w-auto"
                        onClick={() => setPhotoModalIsOpen(true)}
                    >
                        <Camera className="mr-2" size={20} />
                        Post Photo
                    </button>
                </div>
            </div>

            <Modal
                isOpen={reviewModalIsOpen}
                onRequestClose={() => setReviewModalIsOpen(false)}
                contentLabel="Post a Review"
                style={modalStyles}
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-indigo-800">Share Your Experience</h2>
                <textarea
                    className="w-full h-40 md:h-48 p-4 md:p-6 border-2 border-purple-300 rounded-2xl focus:ring-4 focus:ring-purple-500 focus:border-transparent resize-none text-base md:text-lg"
                    placeholder="Describe your magical moments at this beach..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                ></textarea>
                <div className="flex justify-end mt-6 md:mt-8">
                    <button
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-full hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg text-lg md:text-xl font-semibold"
                        onClick={handleReviewSubmit}
                    >
                        Submit Review
                    </button>
                </div>
            </Modal>

            <Modal
                isOpen={photoModalIsOpen}
                onRequestClose={() => setPhotoModalIsOpen(false)}
                contentLabel="Upload a Photo"
                style={modalStyles}
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-teal-800">Capture the Moment</h2>
                <div className="flex items-center justify-center w-full mb-6 md:mb-8">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 md:h-80 border-3 border-teal-300 border-dashed rounded-3xl cursor-pointer bg-gradient-to-br from-teal-50 to-blue-50 hover:bg-gradient-to-br hover:from-teal-100 hover:to-blue-100 transition duration-300 ease-in-out">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Camera className="w-16 h-16 md:w-20 md:h-20 mb-4 text-teal-500" />
                            <p className="mb-2 text-lg md:text-xl text-teal-600"><span className="font-bold">Click to upload</span> or drag and drop</p>
                            <p className="text-sm text-teal-500">PNG, JPG or GIF (MAX. 1600x900px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={handlePhotoChange} accept="image/*" />
                    </label>
                </div>
                {newImage && (
                    <div className="mb-6 md:mb-8">
                        <img src={newImage} alt="Preview" className="w-full h-48 md:h-64 object-cover rounded-2xl" />
                    </div>
                )}
                <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                        className="bg-gradient-to-r from-teal-500 to-green-600 text-white px-8 py-3 rounded-full hover:from-teal-600 hover:to-green-700 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg text-lg md:text-xl font-semibold"
                        onClick={handlePhotoUpload}
                    >
                        Upload Photo
                    </button>
                    <button
                        className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-8 py-3 rounded-full hover:from-gray-500 hover:to-gray-700 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg text-lg md:text-xl font-semibold"
                        onClick={() => setPhotoModalIsOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default CarouselWithDetails;