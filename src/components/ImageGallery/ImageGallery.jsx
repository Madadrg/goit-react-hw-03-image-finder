// components/ImageGallery.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from './Loader';

const API_KEY = 'your_pixabay_api_key';
const API_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

function ImageGallery({ searchQuery }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${API_URL}&q=${searchQuery}&page=1`
          );
          setImages(response.data.hits);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching images:', error);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [searchQuery]);

  return (
    <div className="image-gallery">
      {loading ? (
        <Loader />
      ) : (
        <div className="image-grid">
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
