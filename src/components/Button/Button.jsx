export default function Button({ loadMore }) {
  const handleLoadMore = () => {
    loadMore();
  };
  return (
    <div>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
}
