import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";

const PhotoCapture = ({ onPhotoCaptured }) => {
  const webcamRef = useRef(null);

  const handlePhotoCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      onPhotoCaptured({
        name: `captured_image_${Date.now()}.jpg`,
        file: imageSrc,
      });
    }
  }, [onPhotoCaptured]);

  return (
    <div>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={handlePhotoCapture}>Capture Photo</button>
    </div>
  );
};

export default PhotoCapture;