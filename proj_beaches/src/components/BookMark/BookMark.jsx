import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { supabase } from '../../supabaseClient';
import { Bookmark, Trash2 } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import imageData from './imageData.json';

function BookMark() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        fetchBookmarks(user.uid);
      } else {
        setBookmarks([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const fetchBookmarks = async (userId) => {
    setLoading(true);
    try {
      const { data: bookmarkData, error } = await supabase
        .from('bookmarks')
        .select('beach_id')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching bookmarks:', error);
        return;
      }

      if (bookmarkData.length > 0) {
        const beachIds = bookmarkData.map((bookmark) => bookmark.beach_id);

        const { data: beachData, error: beachError } = await supabase
          .from('beaches')
          .select('id, beach_name, state, district')
          .in('id', beachIds);

        if (beachError) {
          console.error('Error fetching beaches:', beachError);
          return;
        }

        const districts = beachData.map((beach) => beach.district.toLowerCase());

        const { data: highwaveData, error: highwaveError } = await supabase
          .from('highwave')
          .select('district, hw_message');

        const { data: swellsurgeData, error: swellsurgeError } = await supabase
          .from('swellsurge')
          .select('district, ss_message');

        const { data: oceancurrentData, error: oceancurrentError } = await supabase
          .from('oceancurrent')
          .select('district, oc_message');

        if (highwaveError || swellsurgeError || oceancurrentError) {
          console.error('Error fetching messages:', highwaveError || swellsurgeError || oceancurrentError);
          return;
        }

        const highwaveMap = highwaveData.reduce((map, item) => {
          map[item.district.toLowerCase()] = item.hw_message;
          return map;
        }, {});

        const swellsurgeMap = swellsurgeData.reduce((map, item) => {
          map[item.district.toLowerCase()] = item.ss_message;
          return map;
        }, {});

        const oceancurrentMap = oceancurrentData.reduce((map, item) => {
          map[item.district.toLowerCase()] = item.oc_message;
          return map;
        }, {});

        const updatedBookmarks = await Promise.all(bookmarkData.map(async (bookmark) => {
          const beach = beachData.find((b) => b.id === bookmark.beach_id);
          const districtLower = beach.district.toLowerCase();

          const fullHwMessage = highwaveMap[districtLower] || 'No alert';
          const fullSsMessage = swellsurgeMap[districtLower] || 'No alert';
          const fullOcMessage = oceancurrentMap[districtLower] || 'No alert';

          await supabase
            .from('bookmarks')
            .update({ hw_message: fullHwMessage, ss_message: fullSsMessage, oc_message: fullOcMessage })
            .eq('user_id', userId)
            .eq('beach_id', bookmark.beach_id);

          return {
            ...bookmark,
            ...beach,
            hw_message: fullHwMessage,
            ss_message: fullSsMessage,
            oc_message: fullOcMessage,
          };
        }));

        setBookmarks(updatedBookmarks);
      } else {
        setBookmarks([]);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to extract and grammatically correct the advice message starting from "it advised"
  const extractAdvice = (message) => {
    const lowercasedMessage = message.toLowerCase();
    const adviceIndex = lowercasedMessage.indexOf('it advised');
    
    if (adviceIndex === -1) {
      return message;
    }

    let extractedMessage = message.substring(adviceIndex);
    
    // Capitalize the first letter after "it advised"
    extractedMessage = extractedMessage.charAt(0).toUpperCase() + extractedMessage.slice(1);
    
    return extractedMessage;
  };

  const handleRemoveBookmark = async (bookmarkId) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.uid)
        .eq('beach_id', bookmarkId);

      if (error) {
        console.error('Error removing bookmark:', error);
        return;
      }

      setBookmarks(bookmarks.filter((bookmark) => bookmark.beach_id !== bookmarkId));
    } catch (error) {
      console.error('Error in handleRemoveBookmark:', error);
    }
  };

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageData.length);
    return imageData[randomIndex].url;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-emerald-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-8 flex items-center">
          <Bookmark className="mr-2" size={32} />
          Bookmarked Beaches
        </h1>
        {bookmarks.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {bookmarks.map((bookmark) => (
              <li
                key={bookmark.beach_id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-r from-blue-400 to-emerald-400 flex items-center justify-center overflow-hidden">
                  <img
                    src={getRandomImage()}
                    className="w-full h-full object-cover"
                    alt={`${bookmark.beach_name}`}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{bookmark.beach_name}</h3>
                      <p className="text-sm text-gray-600">{bookmark.state}</p>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-600 transition-colors duration-200"
                      onClick={() => handleRemoveBookmark(bookmark.beach_id)}
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    High Wave Alert: {extractAdvice(bookmark.hw_message)}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Swell Surge Alert: {extractAdvice(bookmark.ss_message)}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Ocean Current Alert: {extractAdvice(bookmark.oc_message)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Bookmark className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-xl text-gray-600">You have no bookmarks saved.</p>
            <p className="mt-2 text-gray-500">Start exploring beaches and save your favorites!</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default BookMark;
