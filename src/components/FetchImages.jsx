import React, { useEffect, useState } from 'react';

function FetchImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        if (!response.ok) throw new Error('Ошибка загрузки');
        const data = await response.json();
        setImages(data);
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
      {images.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default FetchImages;
