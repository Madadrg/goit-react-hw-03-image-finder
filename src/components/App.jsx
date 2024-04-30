import React, { useState } from 'react';
import Searchbar from 'Searchbar';
import ImageGallery from 'ImageGallery';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = query => {
    setSearchQuery(query);
  };

  return (
    <div className="app">
      <Searchbar onSearch={handleSearch} />
      <ImageGallery searchQuery={searchQuery} />
    </div>
  );
}

export default App;
