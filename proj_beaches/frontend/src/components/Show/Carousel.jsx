import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Rating from "react-rating-stars-component";
import Modal from "react-modal";
import {
  Sun,
  Camera,
  Edit3,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { supabase } from "../../supabaseClient";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Capture from "./Capture";

Modal.setAppElement("#root");

const CarouselWithDetails = ({ name, beachLocation, beachId }) => {
  const [rating, setRating] = useState(0);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [photoModalIsOpen, setPhotoModalIsOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [carouselImages, setCarouselImages] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [user, setUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from("photos")
        .select("image_url")
        .eq("beach_id", beachId);

      if (error) throw error;

      setCarouselImages(data.map((photo) => photo.image_url));
    } catch (err) {
      console.error("Error fetching images:", err.message);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [beachId]);

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const handleReviewSubmit = async () => {
    if (!user) {
      setLoginModalIsOpen(true);
      return;
    }

    try {
      const numericRating = parseFloat(rating).toFixed(1);
      const { error } = await supabase.from("reviews").insert([
        {
          rating: numericRating,
          content: newReview,
          beach_id: beachId,
          user_id: user.uid,
        },
      ]);

      if (error) throw error;

      setReviewModalIsOpen(false);
      setNewReview("");
    } catch (err) {
      console.error("Error submitting review:", err.message);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };


  const handlePhotoUpload = async () => {
    if (!user) {
      setLoginModalIsOpen(true);
      return;
    }
  
    if (!newImage) return;
  
    try {
      setIsUploading(true);
  
      const base64Image = newImage.base64Image || await convertFileToBase64(newImage); 
      try {
        const visionResponse = await fetch(`https://beaches-backend.vercel.app/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            base64Image: base64Image,
          }),
        });
  
        const visionResult = await visionResponse.json();
  
        if (!visionResult.isBeachRelated) {
          setErrorMessage("The image is not relevant to beach-related content.");
          setIsUploading(false);
          return;
        }
  
        const sanitizedFileName = newImage.name
          .replace(/\s+/g, '-')
          .replace(/[^a-zA-Z0-9.-]/g, '');
  
        const encodedFileName = encodeURIComponent(sanitizedFileName);
  
        const { data, error } = await supabase.storage
          .from('beach-images')
          .upload(`photos/${encodedFileName}`, dataURLtoFile(base64Image, sanitizedFileName), {
            cacheControl: '3600',
            upsert: false,
          });
  
        if (error) throw error;
  
        const { data: { publicUrl }, error: urlError } = supabase
          .storage
          .from('beach-images')
          .getPublicUrl(`photos/${encodedFileName}`);
  
        if (urlError) throw urlError;
  
        const { error: insertError } = await supabase
          .from('photos')
          .insert([{ image_url: publicUrl, beach_id: beachId, user_id: user.uid }]);
  
        if (insertError) throw insertError;
  
        fetchImages();
        setPhotoModalIsOpen(false);
        setNewImage(null);
      } catch (err) {
        console.error("Error analyzing or uploading photo:", err.message);
        setErrorMessage("An error occurred while processing the image.");
        setIsUploading(false);
      }
    } catch (err) {
      console.error("Error processing image:", err.message);
      setErrorMessage("An error occurred while uploading the image.");
      setIsUploading(false);
    }
  };
  
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };
  

  const navigateToLogin = () => {
    window.location.href = "/login";
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
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "2rem",
      maxWidth: "90%",
      width: "500px",
      borderRadius: "1rem",
      background: "linear-gradient(to bottom right, #e0f2fe, #e0e7ff)",
    },
  };

  return (
    <div className="w-full mx-auto p-4 md:p-8 rounded-3xl shadow-2xl">
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl mb-6 md:mb-12">
        <Slider {...settings}>
          {carouselImages.map((image, index) => (
            <div key={index} className="carousel-item relative">
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-[300px] md:h-[500px] object-cover"
              />
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
            <h2 className="font-semibold text-gray-800 drop-shadow-[0_2px_4px_rgba(100,100,100,0.4)]">
              {beachLocation}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <button
          className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-amber-500 text-white font-bold rounded-lg shadow-lg hover:bg-amber-600 transition-all duration-300"
          onClick={() => setReviewModalIsOpen(true)}
        >
          <Edit3 className="mr-2" /> Review
        </button>
        <button
          className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
          onClick={() => setPhotoModalIsOpen(true)}
        >
          <Camera className="mr-2" /> Post Photo
        </button>
      </div>

      <Modal
        isOpen={reviewModalIsOpen}
        onRequestClose={() => setReviewModalIsOpen(false)}
        style={modalStyles}
      >
        <h2 className="text-2xl font-semibold mb-4">Post a Review</h2>
        <div className="mb-4">
          <Rating
            count={5}
            size={24}
            value={rating}
            onChange={handleRating}
            className="mb-2"
          />
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
            className="w-full h-32 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={handleReviewSubmit}
          >
            Submit Review
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={photoModalIsOpen}
        onRequestClose={() => setPhotoModalIsOpen(false)}
        style={modalStyles}
      >
        <h2 className="text-2xl font-semibold mb-4">Post a Photo</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="mb-4"
        />
        <Capture
          onPhotoCaptured={(photo) => {
            setNewImage(photo); 
          }}
        />
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={handlePhotoUpload}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Photo"}
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={loginModalIsOpen}
        onRequestClose={() => setLoginModalIsOpen(false)}
        style={modalStyles}
      >
        <h2 className="text-2xl font-semibold mb-4">Login Required</h2>
        <p>Please log in to post a photo.</p>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={navigateToLogin}
          >
            Go to Login
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CarouselWithDetails;
