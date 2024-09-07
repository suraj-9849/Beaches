// speechRecognition.js

export const initializeSpeechRecognition = (setInput, setIsListening) => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      console.error('Speech recognition not supported in this browser.');
      alert('Your browser does not support speech recognition.');
      return null;
    }
  
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
  
    recognition.addEventListener('result', (e) => {
      console.log('Speech recognition result event:', e);
      const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
  
      console.log('Transcript:', transcript);
    setInput(transcript.replace('.', ''));
    });
  
    recognition.addEventListener('end', () => {
      console.log('Speech recognition ended.');
      setIsListening(false);
    });
  
    recognition.addEventListener('start', () => {
      console.log('Speech recognition started.');
      setIsListening(true);
    });
  
    recognition.addEventListener('error', (e) => {
      console.error('Speech recognition error:', e);
    });
  
    recognition.addEventListener('speechstart', () => {
      console.log('Speech has been detected.');
    });
  
    recognition.addEventListener('speechend', () => {
      console.log('Speech has ended.');
    });
  
    return recognition;
  };
