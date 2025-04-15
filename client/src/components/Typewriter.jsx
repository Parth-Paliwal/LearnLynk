import { useState, useEffect } from 'react';

function Typewriter({ text, speed = 50, pause = 2000 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    let timeout;
    
    if (index < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, pause);
    }
    
    return () => clearTimeout(timeout);
  }, [index, text, speed, pause]);

  return (
    <p className="text-xl">
      {displayedText}
    </p>
  );
}

export default Typewriter;
