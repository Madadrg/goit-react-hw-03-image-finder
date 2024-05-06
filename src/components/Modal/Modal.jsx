import React, { useEffect } from 'react';

const Modal = ({ imageUrl, alt, onClose }) => {
  const handleClickOutside = event => {
    if (event.target.classList.contains('overlay')) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="overlay" onClick={handleClickOutside}>
      <div className="modal">
        <img src={imageUrl} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
