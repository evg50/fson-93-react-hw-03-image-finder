export default function SearchBar({ searchInput }) {
  const handleInputSearch = e => {
    e.preventDefault();
    const query = e.target.elements.searchImg.value;
    searchInput(query);
  };
  return (
    <div>
      <form action="" onSubmit={handleInputSearch}>
        <button type="submit">Search</button>
        <input type="text" name="searchImg" id="" />
      </form>
    </div>
  );
}
