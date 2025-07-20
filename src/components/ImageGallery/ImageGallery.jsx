import { useState, useEffect } from 'react';
import css from './ImageGallery.module.css';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../Button/Button';
import { fetchImages } from '../../api/fetchImages';
import Modal from 'components/Modal/Modal';

export default function ImageGallery() {
  const [largeImgUrl, setLargeImgUrl] = useState();
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

  function handleModalWindow(e) {
    const largeImgUrl = e.target.id;
    // const lrgImg = e.target.li;
    // console.log(lrgImg);
    console.log('url large img', largeImgUrl);
    setLargeImgUrl(largeImgUrl);
    setIsOpen(true);
  }
  const handleClose = () => {
    console.log('close Modal window');
    setIsOpen(false);
  };

  return (
    <div className={css.container}>
      <SearchBar searchInput={searchInp} />

      {arrImages.length > 0 && (
        <>
          <ul className={css.galleryList} onClick={handleModalWindow}>
            {arrImages.map(image => (
              <li className={css.galleryItem} key={image.id}>
                <img
                  className={css.galleryImage}
                  src={image.webformatURL}
                  alt={image.tags}
                  li={image.largeImageURL}
                  id={image.largeImageURL}
                />
              </li>
            ))}
          </ul>
          <Modal isOpen={isOpen} imageUrl={largeImgUrl} onClose={handleClose} />
          <Button loadMore={loadMore} />
        </>
      )}
      {/* {query && arrImages.length === 0 && !isFirstSearch.current && (
        <p>Ничего не найдено.</p>
      )} */}
    </div>
  );
}
