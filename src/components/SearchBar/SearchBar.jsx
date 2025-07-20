import style from './Search.module.css';
export default function SearchBar({ searchInput }) {
  const handleInputSearch = e => {
    e.preventDefault();
    const query = e.target.elements.searchImg.value;
    searchInput(query);
  };
  return (
    <div className={style.container}>
      <form className={style.form} action="" onSubmit={handleInputSearch}>
        <button type="submit">Search</button>
        <input type="text" name="searchImg" id="" />
      </form>
    </div>
  );
}
