import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Calendar, Clock, MapPin } from 'lucide-react';

function Events() {
  const eventsData = [
    {
      id: 1,
      ngoName: "Street Cause",
      logo: 'https://www.streetcause.org/public/images/admin/202208191135273486.png',
      location: 'Hyderabad',
      timeFrom: '10:23',
      timeTo: '18:40',
      date: '2023-08-15',
      description: 'Join us for a beach cleaning drive to make our shores pristine again!'
    },
    {
      id: 2,
      ngoName: "Green Earth",
      logo: 'https://www.streetcause.org/public/images/admin/202208191135273486.png',
      location: 'Mumbai',
      timeFrom: '09:00',
      timeTo: '17:00',
      date: '2023-08-20',
      description: 'Tree plantation drive in the heart of the city. Let`s make Mumbai greener!'
    },
    {
      id: 3,
      ngoName: "Clean Waters",
      logo: 'https://www.streetcause.org/public/images/admin/202208191135273486.png',
      location: 'Chennai',
      timeFrom: '08:30',
      timeTo: '16:30',
      date: '2023-08-25',
      description: 'River cleanup initiative. Help us restore the beauty of our waterways!'
    }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow mt-20 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-12">
          Upcoming Events Organized by NGO's
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 mb-20 lg:grid-cols-3 gap-8">
          {eventsData.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <img className="h-12 w-12 rounded-full object-cover" src={event.logo} alt={`${event.ngoName} logo`} />
                  <h2 className="text-xl font-semibold text-gray-800">{event.ngoName}</h2>
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{event.timeFrom} - {event.timeTo}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="px-6 py-4 bg-indigo-600">
                <button className="w-full bg-white text-indigo-600 font-semibold py-2 px-4 rounded-md hover:bg-indigo-100 transition-colors duration-300 ease-in-out">
                  Join Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Events;