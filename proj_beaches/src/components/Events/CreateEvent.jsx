import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../Navbar";
import Footer from "../Footer";
import {  MapPin } from 'lucide-react';
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  const onSubmit = (data) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Logo = reader.result;
      const finalData = { ...data, logo: base64Logo };
      setFormData(finalData);
      console.log(finalData); 
      setTimeout(() => {
        navigate("/events");
      }, 1000);
    };
    reader.readAsDataURL(data.logo[0]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Create Beach Cleaning Event
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Fill in the details to organize your event
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="ngo-name" className="block text-sm font-medium text-gray-700 mb-1">
                  NGO Name
                </label>
                <input
                  id="ngo-name"
                  {...register("ngoName", { required: "NGO Name is required" })}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="NGO Name"
                />
                {errors.ngoName && <p className="mt-1 text-xs text-red-500">{errors.ngoName.message}</p>}
              </div>


              <div className="mb-4">
                <label htmlFor="ngo-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  id="ngo-name"
                  {...register("description", { required: "Description is required" })}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Description"
                />
                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <div className="relative">
                  <input
                    id="date"
                    type="date"
                    {...register("date", { required: "Date is required" })}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
               
                </div>
                {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>}
              </div>
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <label htmlFor="time-from" className="block text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <div className="relative">
                    <input
                      id="time-from"
                      type="time"
                      {...register("timeFrom", { required: "Start time is required" })}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                  </div>
                  {errors.timeFrom && <p className="mt-1 text-xs text-red-500">{errors.timeFrom.message}</p>}
                </div>
                <div className="flex-1">
                  <label htmlFor="time-to" className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <div className="relative">
                    <input
                      id="time-to"
                      type="time"
                      {...register("timeTo", { required: "End time is required" })}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                  </div>
                  {errors.timeTo && <p className="mt-1 text-xs text-red-500">{errors.timeTo.message}</p>}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="relative">
                  <input
                    id="location"
                    type="text"
                    {...register("location", { required: "Location is required" })}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter the location"
                  />
                  <MapPin className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                </div>
                {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                 <h1 className="text-sm mt-4" >NGO Logo</h1>
                </label>
                <div className="relative">
                  <input
                    id="logo"
                    type="file"
                    accept="image/*"
                    {...register("logo", { required: "Logo is required" })}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                 
                </div>
                {errors.logo && <p className="mt-1 text-xs text-red-500">{errors.logo.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
               
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                Create Event
              </button>
            </div>
          </form>
          {formData && (
            <div className="mt-4 p-4 bg-green-100 rounded-md">
              <h3 className="text-lg font-medium text-green-800">Form Submitted Successfully!</h3>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateEvent;