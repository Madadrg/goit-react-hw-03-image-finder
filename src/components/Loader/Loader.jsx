// components/Loader.jsx
import React from 'react';
import LoaderSpinner from 'react-loader-spinner'; // You can replace 'react-loader-spinner' with any other spinner library you prefer

function Loader() {
  return (
    <div className="loader">
      <LoaderSpinner type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  );
}

export default Loader;
