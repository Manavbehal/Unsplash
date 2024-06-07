// src/components/Photo/Photo.js
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../Api'; // Adjust the path as needed
import SinglePhoto from './SinglePhoto'; // Adjust the path as needed
import { css } from "aphrodite";
import Masonry from "react-responsive-masonry";
import navStyle from "../../Styles/NavbarStyle"; // Adjust the path as needed

function Photo() {
  const { category } = useParams();
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPhotos = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.photos.list({ query: category || 'Editorial', page, perPage: 20 });
      setPhotos(prevPhotos => (page === 1 ? response.data.results : [...prevPhotos, ...response.data.results]));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching photos:", error);
      setIsLoading(false);
    }
  }, [page, category]);

  useEffect(() => {
    setPage(1);
    setPhotos([]);
    fetchPhotos();
  }, [category, fetchPhotos]);

  useEffect(() => {
    if (page > 1) {
      fetchPhotos();
    }
  }, [page, fetchPhotos]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 &&
        !isLoading
      ) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <div className={css(navStyle.marginPhotos)}>
      <Masonry columnsCount={3} gutter="20px">
        {photos.length && photos.map((photo, i) => (
          <SinglePhoto
            key={i}
            photoUrl={photo.urls.small}
            likes={photo.likes}
            firstName={photo.user.first_name}
            lastName={photo.user.last_name}
            downloadUrl={photo.links.download}
            profilePhoto={photo.user.profile_image.small}
          />
        ))}
      </Masonry>
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default Photo;
