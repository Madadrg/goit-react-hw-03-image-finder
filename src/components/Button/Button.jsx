// components/Button.jsx
import React from 'react';

function Button({ onClick }) {
  return (
    <button className="button" onClick={onClick}>
      Load More
    </button>
  );
}

export default Button;
