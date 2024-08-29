import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Map as MapIcon,
  Info,
  X,
  Layers,
  Flag
} from "lucide-react";
import beachesData from "../locations.json";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { motion, AnimatePresence } from "framer-motion";

const Map = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [mapType, setMapType] = useState("roadmap");
  const mapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA64PDhaCen3VO7FVfFzwNfUQrkdWnqlpI&libraries=geometry,places&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;

    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 20.5937, lng: 78.9629 },
        zoom: 4.5,
        mapTypeId: mapType,
        styles: [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#a3ccff" }],
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f0f0f0" }],
          },
          {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "road",
            stylers: [{ visibility: "off" }],
          },
        ],
        disableDefaultUI: true,
        gestureHandling: "greedy",
      });

      Object.keys(beachesData).forEach((state) => {
        const beaches = beachesData[state];
        Object.keys(beaches).forEach((beachName) => {
          const beach = beaches[beachName];
          const marker = new window.google.maps.Marker({
            position: { lat: beach.latitude, lng: beach.longitude },
            map,
            title: beachName,
             icon: {
              path: 'M4 24h-2v-24h2v24zm18-21.387s-1.621 1.43-3.754 1.43c-3.36 0-3.436-2.895-7.337-2.895-2.108 0-4.075.98-4.909 1.694v12.085c1.26-.819 2.862-1.374 4.464-1.374 3.900 0 3.57 2.995 7.337 2.995 2.133 0 3.754-1.385 3.754-1.385v-12.55z',
              fillColor: '#4CAF50',
              fillOpacity: 0.9,
              strokeWeight: 2,
              strokeColor: '#FFFFFF',
              scale: 1,
              anchor: new google.maps.Point(12, 24),
            },
          });

          marker.addListener("click", () => {
            setSelectedBeach({ name: beachName, ...beach });
            animateToBeach(map, beach);
          });
        });
      });
    };

    initMap();
  }, [mapLoaded, navigate, mapType]);

  const animateToBeach = (map, beach) => {
    const targetPosition = new google.maps.LatLng(
      beach.latitude,
      beach.longitude
    );
    const targetZoom = 14;
    const duration = 2300;
    const startZoom = map.getZoom();
    const startCenter = map.getCenter();
    const startTime = Date.now();

    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      const currentZoom = startZoom + (targetZoom - startZoom) * easedProgress;

      const currentLat =
        startCenter.lat() +
        (beach.latitude - startCenter.lat()) * easedProgress;
      const currentLng =
        startCenter.lng() +
        (beach.longitude - startCenter.lng()) * easedProgress;

      if (
        Math.abs(currentZoom - map.getZoom()) > 0.1 ||
        Math.abs(currentLat - map.getCenter().lat()) > 0.0001 ||
        Math.abs(currentLng - map.getCenter().lng()) > 0.0001
      ) {
        map.setZoom(currentZoom);
        map.setCenter(new google.maps.LatLng(currentLat, currentLng));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        map.setZoom(targetZoom);
        map.setCenter(targetPosition);
      }
    };

    requestAnimationFrame(animate);
  };
  const toggleMapType = () => {
    setMapType((prevType) =>
      prevType === "roadmap" ? "satellite" : "roadmap"
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow flex flex-col md:flex-row">
        <div
          className="w-full md:w-3/4 h-[75vh] md:h-full relative"
          ref={mapRef}
        >
          <AnimatePresence>
            {selectedBeach && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">
                    {selectedBeach.name}
                  </h3>
                  <button
                    onClick={() => setSelectedBeach(null)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <Link
                  to={`/show/${selectedBeach.name}`}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  View Details
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-full md:w-1/4 bg-white p-4 overflow-y-auto shadow-lg"
        >
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-blue-100 p-4 rounded-lg mb-4"
              >
                <h3 className="font-bold mb-2">How to use this map:</h3>
                <ul className="list-disc pl-5">
                  <li>Click on a marker to see beach details</li>
                  <li>Use zoom buttons to adjust view</li>
                  <li>Drag the map to explore</li>
                  <li>Toggle between map types</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
          {!selectedBeach && (
            <p className="text-gray-600">
              Select a beach marker to view details.
            </p>
          )}
        </motion.div>
      </main>
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMapType}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <Layers size={24} className="text-blue-500" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowInfo(!showInfo)}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <Info size={24} className="text-blue-500" />
        </motion.button>
      </div>
      <Footer />
    </div>
  );
};

export default Map;
