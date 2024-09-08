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
          .select('id, beach_name, state')
          .in('id', beachIds);

        if (beachError) {
          console.error('Error fetching beaches:', beachError);
          return;
        }

        const combinedData = bookmarkData.map((bookmark) => ({
          ...bookmark,
          ...beachData.find((beach) => beach.id === bookmark.beach_id),
        }));

        setBookmarks(combinedData);
      } else {
        setBookmarks([]);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
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
                    Discover the beauty of {bookmark.beach_name} in {bookmark.state}. Perfect for summer getaways!
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
