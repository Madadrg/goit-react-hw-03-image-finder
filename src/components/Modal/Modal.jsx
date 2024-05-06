import React, { useEffect } from 'react';

const Modal = ({ imageUrl, alt, onClose }) => {
  const handleKeyDown = event => {
    if (event.keyCode === 27) {
      onClose();
    }
  };

  const handleClickOutside = event => {
    if (event.target.classList.contains('overlay')) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]); // Include handleKeyDown in the dependency array

  return (
    <div className="overlay" onClick={handleClickOutside}>
      <div className="modal">
        <img src={imageUrl} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
