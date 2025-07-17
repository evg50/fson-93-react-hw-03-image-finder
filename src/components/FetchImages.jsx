import React, { useEffect, useState } from 'react';

function FetchImages({ query }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // query = 'cat';
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?q=${query}&page=1&key=23915322-b5091aa0ad0b72709b6c0de72&image_type=photo&orientation=horizontal&per_page=12`
        );
        if (!response.ok) throw new Error('Ошибка загрузки');
        const data = await response.json();
        console.log('data.hits', data.hits);
        setImages(data.hits);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []); // Пустой массив — запрос сделается один раз при монтировании

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <ul>
      {images.map(image => (
        <li key={image.id}>
          <img src={image.webformatURL} alt="" />
        </li>
      ))}
    </ul>
  );
}

export default FetchImages;
