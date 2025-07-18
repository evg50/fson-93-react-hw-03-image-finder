import FetchImages from '../FetchImages';
import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../Button/Button';

export default function ImageGallery() {
  const [query, setQuery] = useState('');
  const [arrImages, setArrImages] = useState([]);
  const [page, setPage] = useState(1);

  const searchInp = query => {
    setQuery(query);
    setPage(1);
    console.log(query, 'запрос в Арр');
  };

  const handleArrImage = newImages => {
    // console.log(arr, 'arr');
    setArrImages(prev => {
      const ids = new Set(prev.map(img => img.id));
      const filtered = newImages.filter(img => !ids.has(img.id));
      return [...prev, ...filtered];
    });
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (arrImages.length > 0) {
      console.log('arrImages', arrImages);
    }
  }, [arrImages]);
  return (
    <div>
      ImageGallery
      <SearchBar searchInput={searchInp} />
      {query && (
        <FetchImages
          query={query}
          page={page}
          handleArrImage={handleArrImage}
        />
      )}
      {
        arrImages.length > 0 && <p>array images</p>
        // <ul>
        //   {arrImages.map(image => (

        //     <li key={image.id}>
        //       <img src={image.webformatURL} alt="" />
        //     </li>
        //   ))}
        // </ul>
      }
      {arrImages.length > 0 && <Button loadMore={loadMore} />}
    </div>
  );
}
