import { useState, useEffect } from 'react';
import css from './ImageGallery.module.css';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../Button/Button';
import { fetchImages } from '../../api/fetchImages';
import Modal from 'components/Modal/Modal';

export default function ImageGallery() {
  const [query, setQuery] = useState('cat');
  const [page, setPage] = useState(1);
  const [arrImages, setArrImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const searchInp = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setArrImages([]);
    // isFirstSearch.current = false;
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      try {
        const newImages = await fetchImages(query, page);

        setArrImages(prev => {
          const existingIds = new Set(prev.map(img => img.id));
          const filtered = newImages.filter(img => !existingIds.has(img.id));
          return [...prev, ...filtered];
        });
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      }
    };

    getImages();
  }, [query, page]);
  let id = 3;
  function handleModalWindow(e) {
    console.log(e.target.id);
    setIsOpen(true);
    id = e.target.id;
    console.log('id', arrImages[id], id);
  }

  return (
    <div className={css.container}>
      <SearchBar searchInput={searchInp} />
      Page {page}
      {arrImages.length > 0 && (
        <>
          <ul className={css.galleryList} onClick={handleModalWindow}>
            {arrImages.map(image => (
              <li className={css.galleryItem} key={image.id}>
                <img
                  className={css.galleryImage}
                  src={image.webformatURL}
                  alt={image.tags}
                  id={image.id}
                />
              </li>
            ))}
          </ul>
          <Modal isOpen={isOpen} imageUrl={arrImages[id].largeImageURL} />
          <Button loadMore={loadMore} />
        </>
      )}
      {/* {query && arrImages.length === 0 && !isFirstSearch.current && (
        <p>Ничего не найдено.</p>
      )} */}
    </div>
  );
}
