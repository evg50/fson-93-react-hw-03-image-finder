import { useEffect } from 'react';

function FetchImages({ query, page, handleArrImage }) {
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=23915322-b5091aa0ad0b72709b6c0de72&image_type=photo&orientation=horizontal&per_page=12`
        );
        if (!response.ok) throw new Error('Ошибка загрузки');

        const data = await response.json();

        console.log('записываем данные в массив через useEffect');

        handleArrImage(data.hits);
      } catch (error) {
        console.error('Ошибка загрузки изображений:', error);
      }
    };

    if (query) {
      fetchImages();
    }
  }, [query, page, handleArrImage]);

  return null; // 🔸 ничего не рендерим
}

export default FetchImages;
