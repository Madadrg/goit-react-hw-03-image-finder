import React, { useState, useEffect } from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';
import SearchBar from './components/Searchbar/Searchbar';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1); // For pagination

  const fetchImagesFromPixabay = async (searchQuery, page) => {
    const apiKey = '42335893-81a0738270e344fb8d80a811a'; // Replace 'YOUR_API_KEY' with your actual Pixabay API key
    const perPage = 12; // Number of images per page
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
      searchQuery
    )}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      return data.hits.map(image => ({
        id: image.id,
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  };

  const handleSearch = searchQuery => {
    setQuery(searchQuery);
    setPage(1); // Reset page to 1 when new search query is entered
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1); // Increment page for pagination
  };

  useEffect(() => {
    if (query === '') return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const newImages = await fetchImagesFromPixabay(query, page);
        setImages(prevImages => [...prevImages, ...newImages]); // Append new images to existing images
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleImageClick = imageUrl => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app">
      <SearchBar onSubmit={handleSearch} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <ImageGallery>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                imageUrl={image.webformatURL}
                alt={image.id}
                onClick={() => handleImageClick(image.largeImageURL)}
              />
            ))}
          </ImageGallery>
          {images.length > 0 && (
            <Button onClick={handleLoadMore}>Load More</Button>
          )}
        </>
      )}
      {selectedImage && (
        <Modal
          imageUrl={selectedImage}
          alt="Selected Image"
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;
