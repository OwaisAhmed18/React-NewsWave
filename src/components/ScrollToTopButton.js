import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import '../App.css'; // Import your CSS file

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div>
      {visible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
