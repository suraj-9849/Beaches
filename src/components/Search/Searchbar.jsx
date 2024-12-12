import React, { useState, useRef, useEffect } from 'react';
import { Search, Mic } from 'lucide-react';
import { initializeSpeechRecognition } from './speechRecognition';

const Searchbar = ({ input, setInput }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const recognition = initializeSpeechRecognition(setInput, setIsListening);
    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.removeEventListener('result', handleResult);
        recognitionRef.current.removeEventListener('end', handleEnd);
        recognitionRef.current.removeEventListener('start', handleStart);
        recognitionRef.current.removeEventListener('error', handleError);
        recognitionRef.current.stop();
      }
    };
  }, [setInput]);

  const handleResult = (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');
    setInput(transcript);
  };

  const handleEnd = () => {
    setIsListening(false);
  };

  const handleStart = () => {
    setIsListening(true);
  };

  const handleError = (e) => {
    console.error('Speech recognition error:', e);
    if (e.error === 'not-allowed') {
      alert('Microphone access is not allowed. Please enable microphone permissions.');
    } else {
      alert('An error occurred with speech recognition.');
    }
  };

  const startListening = () => {
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.start();
    }
  };

  return (
    <div className="w-full h-[20vh] bg-[#EEF5FE] px-4 flex justify-center items-center">
      <div className="max-w-3xl w-full pt-[7vh] mx-auto">
        <div className="flex items-center shadow-lg rounded-lg bg-white">
          <div className="p-3">
            <Search className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search beaches"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full py-3 text-gray-700 bg-transparent focus:outline-none"
            aria-label="Search beaches"
          />
          <button onClick={startListening} aria-label="Start speech recognition" className="p-3 ">
            <Mic
              className={`
              w-6 h-6 transition-all duration-300
              ${isListening ? 'text-red-500 scale-110' : 'text-blue-500'}
            `}
            />
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 text-white font-semibold rounded-r-lg transition-all duration-300 hover:from-blue-500 hover:via-teal-500 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
