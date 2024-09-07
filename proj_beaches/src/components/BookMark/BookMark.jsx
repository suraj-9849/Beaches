import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { supabase } from '../../supabaseClient';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Bookmark, Trash2, MapPin, Calendar } from 'lucide-react';

function BookMark() {
  const [bookmarks, setBookmarks] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const fetchBookmarks = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
        
          const { data: bookmarkData, error } = await supabase
            .from('bookmarks') 
            .select('beach_id, created_at') 
            .eq('user_id', user.uid);

          if (error) {
            console.error('Error fetching bookmarks:', error);
            return;
          }

          if (bookmarkData.length > 0) {
          
            const beachIds = bookmarkData.map((bookmark) => bookmark.beach_id);
            const { data: beachData, error: beachError } = await supabase
              .from('beaches')
              .select('*')
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
        }
      }
    };

    fetchBookmarks();
  }, [auth]);

  const handleRemoveBookmark = async (bookmarkId) => {
    const user = auth.currentUser;
    if (user) {
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
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-8 flex items-center">
          <Bookmark className="mr-2" size={32} />
          Bookmarked Beaches
        </h1>
        {bookmarks.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.beach_id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{bookmark.beach_name}</h2>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPin className="mr-2" size={16} />
                    {bookmark.state}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Latitude:</span> {bookmark.latitude}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Longitude:</span> {bookmark.longitude}
                  </p>
                  <p className="text-gray-600 text-sm flex items-center mb-4">
                    <Calendar className="mr-2" size={16} />
                    Saved on: {new Date(bookmark.created_at).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleRemoveBookmark(bookmark.beach_id)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-300"
                    aria-label="Remove bookmark"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
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