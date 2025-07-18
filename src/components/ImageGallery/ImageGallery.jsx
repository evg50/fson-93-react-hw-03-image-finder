import css from './ImageGallery.module.css';
import { useState, useRef, useEffect } from 'react';
import FetchImages from '../FetchImages';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../Button/Button';

export default function ImageGallery() {
  const [query, setQuery] = useState('');
  const [arrImages, setArrImages] = useState([]);
  const [page, setPage] = useState(1);

  const arrImagesRef = useRef([]);

  useEffect(() => {
    arrImagesRef.current = arrImages;
  }, [arrImages]);

  const searchInp = newQuery => {
    setQuery(newQuery);
    setArrImages([]);
    setPage(1);
  };

  const handleArrImage = newImages => {
    setArrImages(prev => {
      const existingIds = new Set(arrImagesRef.current.map(img => img.id));
      const filtered = newImages.filter(img => !existingIds.has(img.id));
      return [...prev, ...filtered];
    });
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className={css.container}>
      ImageGallery, page {page}
      <SearchBar searchInput={searchInp} />
      {arrImages.length > 0 && <Button loadMore={loadMore} />}
      {query && (
        <FetchImages
          query={query}
          page={page}
          handleArrImage={handleArrImage}
        />
      )}
      {arrImages.length > 0 && (
        <ul className={css.galleryList}>
          {arrImages.map(image => (
            <li key={image.id} className={css.galleryItem}>
              <img
                src={image.webformatURL}
                alt={image.tags}
                className={css.galleryImage}
              />
            </li>
          ))}
        </ul>
      )}
      {arrImages.length > 0 && <Button loadMore={loadMore} />}
    </div>
  );
}
