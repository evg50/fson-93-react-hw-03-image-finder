export const fetchImages = async (query, page) => {
  // console.log('fn fetchImages run', query);
  const key = '23915322-b5091aa0ad0b72709b6c0de72';
  const response = await fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
  );
  console.log('response', response);
  if (!response.ok) throw new Error('Ошибка загрузки');
  const data = await response.json();
  console.log('data', data);
  // console.log('Arr Images', data.hits);
  return data.hits;
};
