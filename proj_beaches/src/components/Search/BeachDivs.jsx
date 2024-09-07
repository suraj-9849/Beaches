import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // Import Supabase client
import imageData from './imageData.json'; 
import { Bookmark } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

const BeachDivs = ({ filter }) => {
  const [beaches, setBeaches] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Function to fetch beaches data from Supabase
    const fetchBeaches = async () => {
      setLoading(true); // Start loading
      try {
        // Fetch data from Supabase table
        const { data, error } = await supabase
          .from('beaches') // Replace with your actual table name
          .select('*');

        if (error) {
          console.error('Error fetching beaches:', error);
        } else {
          // Map the data to match the expected format
          const allBeaches = data.map((beach) => ({
            name: beach.beach_name, // Use the correct column names from your table
            location: beach.state,
            lat: beach.latitude,
            long: beach.longitude,
            id: beach.id,
            district: beach.district,
          }));
          setBeaches(allBeaches);
        }
      } catch (error) {
        console.error('Error fetching beaches:', error.message);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchBeaches();
  }, []);

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageData.length);
    return imageData[randomIndex].url;
  };

  const filteredBeaches = beaches.filter((beach) =>
    beach.name.toLowerCase().includes(filter.toLowerCase()) ||
    beach.location.toLowerCase().includes(filter.toLowerCase())
  );

  const handleClick = (name, location, lat, long, id, district) => {
    console.log('Navigating to Show with:', { location, lat, long, name, id, district });
    navigate(`/beach/${name}`, { state: { location, lat, long, name, id, district } });
  };
  

  const handleBookmarkClick = async (e, beach) => {
    e.stopPropagation();

    if (!user) {
      alert("You need to be logged in to bookmark beaches.");
      return;
    }

    try {
      // Insert the bookmark data into Supabase
      const { data, error } = await supabase
        .from('bookmarks') // Your Supabase table name
        .insert([
          {
            user_id: user.uid, // Firebase user ID
            beach_id: beach.id, // Beach ID from the Supabase beaches table
            created_at: new Date().toISOString(), // Add timestamp for the bookmark
          },
        ]);

      if (error) {
        console.error("Error saving bookmark:", error);
      } else {
        console.log("Bookmark saved successfully!", data);
      }
    } catch (error) {
      console.error("Error in handleBookmarkClick:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading indicator
  }

  return (
    <div className="flex-1 overflow-y-auto mb-20 bg-gradient-to-b from-blue-50 to-emerald-50">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredBeaches.map((beach, index) => (
          <li
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            onClick={() => handleClick(beach.name, beach.location, beach.lat, beach.long, beach.id, beach.district)}
          >
            <div className="h-48 bg-gradient-to-r from-blue-400 to-emerald-400 flex items-center justify-center overflow-hidden">
              <img
                src={getRandomImage()}  // Use the random image function
                className="w-full h-full object-cover"
                alt={`${beach.name}`}
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{beach.name}</h3>
                  <p className="text-sm text-gray-600">{beach.location}</p>
                </div>
                <button
                  className="text-emerald-500 hover:text-emerald-600 transition-colors duration-200"
                  onClick={(e) => handleBookmarkClick(e, beach)}
                >
                  <Bookmark size={24} />
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Discover the beauty of {beach.name} in {beach.location}. Perfect for summer getaways!
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BeachDivs;
