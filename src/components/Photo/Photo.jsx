import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../Api'; 
import SinglePhoto from './SinglePhoto'; 
import { css } from "aphrodite";
import Masonry from "react-responsive-masonry";
import navStyle from "../../Styles/NavbarStyle"; 

function Photo() {
  const { category } = useParams();
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [columnsCount, setColumnsCount] = useState(3); 

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

  useEffect(() => {
    
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setColumnsCount(1); 
      } else {
        setColumnsCount(3); 
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={css(navStyle.marginPhotos)}>
      <Masonry columnsCount={columnsCount} gutter="20px">
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
