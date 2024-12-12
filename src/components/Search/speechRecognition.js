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
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');

    setInput(transcript.replace('.', ''));
  });

  recognition.addEventListener('end', () => {
    setIsListening(false);
  });

  recognition.addEventListener('start', () => {
    setIsListening(true);
  });
  return recognition;
};
