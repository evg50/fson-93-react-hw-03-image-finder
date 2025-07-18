import { useEffect, useRef } from 'react';

function FetchImages({ query, page, handleArrImage }) {
  const fetchedOnce = useRef(false); // 🔒 защитимся от двойного fetch

  useEffect(() => {
    const fetchImages = async () => {
      console.log('записываем данные в массив через useEffect');
      try {
        const response = await fetch(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=23915322-b5091aa0ad0b72709b6c0de72&image_type=photo&orientation=horizontal&per_page=12`
        );
        const data = await response.json();

        handleArrImage(data.hits);
      } catch (err) {
        console.error(err);
      }
    };

    if (query && !fetchedOnce.current) {
      fetchedOnce.current = true;
      fetchImages();
    }

    // сбрасываем после обновления query/page
    return () => {
      fetchedOnce.current = false;
    };
  }, [query, page, handleArrImage]);

  return null;
}
