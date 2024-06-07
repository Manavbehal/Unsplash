import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../Api.js';
import SinglePhoto from './SinglePhoto.jsx';
import { css } from "aphrodite";
import Masonry from "react-responsive-masonry";
import navStyle from "../../Styles/NavbarStyle.js";

function Photo() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPhotos = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.photos.list({ page, perPage: 20 });
      setPhotos(prevPhotos => [...prevPhotos, ...response.data]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching photos:", error);
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 &&
        !isLoading
      ) {
        setPage(prevPage => prevPage + 1);
        fetchPhotos();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (<>
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
    </div>
    {isLoading && <p>Loading...</p>}
    </>
  );
}

export default Photo;