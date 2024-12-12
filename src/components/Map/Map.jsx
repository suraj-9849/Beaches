import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, X, Search } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Map = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [mapType, setMapType] = useState('roadmap');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [beaches, setBeaches] = useState([]);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const navigate = useNavigate();

  const handleClick = (name, location, lat, long, id, district) => {
    console.log('Navigating to Show with:', { location, lat, long, name, id, district });
    navigate(`/beach/${name}`, { state: { location, lat, long, name, id, district } });
  };

  useEffect(() => {
    if (!mapLoaded) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA64PDhaCen3VO7FVfFzwNfUQrkdWnqlpI&libraries=geometry,places&v=weekly`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    }
  }, [mapLoaded]);

  useEffect(() => {
    if (!mapLoaded) return;

    const initMap = () => {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 20.5937, lng: 78.9629 },
        zoom: 4.5,
        mapTypeId: mapType,
        styles: [
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#a3ccff' }]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#f0f0f0' }]
          }
        ],
        disableDefaultUI: true,
        gestureHandling: 'greedy'
      });
      loadBeachesData();
    };

    initMap();
  }, [mapLoaded, mapType]);

  const loadBeachesData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('beaches').select('*');
      if (error) {
        console.error('Error fetching beaches:', error);
      } else {
        const allBeaches = data.map((beach) => ({
          name: beach.beach_name,
          location: beach.state,
          lat: Number(beach.latitude),
          long: Number(beach.longitude),
          id: beach.id,
          district: beach.district
        }));
        setBeaches(allBeaches);
        addMarkers(allBeaches);
      }
    } catch (error) {
      console.error('Error fetching beaches:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const addMarkers = (beaches) => {
    beaches.forEach((beach) => {
      const lat = Number(beach.lat);
      const long = Number(beach.long);

      if (!isNaN(lat) && !isNaN(long)) {
        const marker = new window.google.maps.Marker({
          position: { lat, lng: long },
          map: mapInstance.current,
          title: beach.name,
          icon: {
            path: 'M4 24h-2v-24h2v24zm18-21.387s-1.621 1.43-3.754 1.43c-3.36 0-3.436-2.895-7.337-2.895-2.108 0-4.075.98-4.909 1.694v12.085c1.26-.819 2.862-1.374 4.464-1.374 3.9 0 3.57 2.995 7.337 2.995 2.133 0 3.754-1.385 3.754-1.385v-12.55z',
            fillColor: '#4CAF50',
            fillOpacity: 0.9,
            strokeWeight: 2,
            strokeColor: '#FFFFFF',
            scale: 1,
            anchor: new window.google.maps.Point(12, 24)
          }
        });

        marker.addListener('click', () => {
          setSelectedBeach(beach);
          animateToBeach(beach);
        });
      } else {
        console.warn('Invalid lat/long for beach:', beach);
      }
    });
  };

  const animateToBeach = (beach) => {
    const targetPosition = new google.maps.LatLng(beach.lat, beach.long);
    mapInstance.current.panTo(targetPosition);
    mapInstance.current.setZoom(14);
  };

  const toggleMapType = () => {
    setMapType((prevType) => (prevType === 'roadmap' ? 'satellite' : 'roadmap'));
  };

  const filteredBeaches = beaches.filter(
    (beach) =>
      beach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beach.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow flex flex-col md:flex-row relative">
        <div className="w-full md:w-3/4 h-[65vh] md:h-full relative" ref={mapRef}>
          {selectedBeach && (
            <div className="absolute bottom-20 left-4 right-4 bg-white p-6 rounded-lg shadow-lg border border-gray-300 max-w-md mx-auto">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-blue-800">{selectedBeach.name}</h3>
                <button
                  onClick={() => setSelectedBeach(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                <strong>Location:</strong> {selectedBeach.location}
              </p>
              <div
                onClick={() =>
                  handleClick(
                    selectedBeach.name,
                    selectedBeach.location,
                    selectedBeach.lat,
                    selectedBeach.long,
                    selectedBeach.id,
                    selectedBeach.district
                  )
                }
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold w-full text-center"
              >
                View Details
              </div>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/4 bg-white shadow-lg p-6 overflow-y-auto">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search beaches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          <div className="space-y-4">
            {filteredBeaches.map((beach) => (
              <div
                key={beach.name}
                className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedBeach(beach);
                  animateToBeach(beach);
                }}
              >
                <h4 className="text-lg font-semibold text-blue-800">{beach.name}</h4>
                <p className="text-gray-600">{beach.location}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="absolute top-20 left-4 space-y-2">
        <button
          onClick={toggleMapType}
          className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
        >
          <Layers size={24} className="text-blue-800" />
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Map;
