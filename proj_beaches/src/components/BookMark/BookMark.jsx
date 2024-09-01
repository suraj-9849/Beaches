import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { ref, get, remove } from 'firebase/database';
import { db } from '../../firebase/firebaseConfig';
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
        const bookmarkRef = ref(db, `bookmarks/${user.uid}`);
        const snapshot = await get(bookmarkRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const bookmarkArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value
          }));
          setBookmarks(bookmarkArray);
        } else {
          setBookmarks([]);
        }
      }
    };

    fetchBookmarks();
  }, [auth]);

  const handleRemoveBookmark = async (bookmarkId) => {
    const user = auth.currentUser;
    if (user) {
      const bookmarkRef = ref(db, `bookmarks/${user.uid}/${bookmarkId}`);
      await remove(bookmarkRef);
      setBookmarks(bookmarks.filter(bookmark => bookmark.id !== bookmarkId));
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
              <div key={bookmark.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{bookmark.name}</h2>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPin className="mr-2" size={16} />
                    {bookmark.location}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Latitude:</span> {bookmark.lat}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Longitude:</span> {bookmark.long}
                  </p>
                  <p className="text-gray-600 text-sm flex items-center mb-4">
                    <Calendar className="mr-2" size={16} />
                    Saved on: {new Date(bookmark.timestamp).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleRemoveBookmark(bookmark.id)}
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
