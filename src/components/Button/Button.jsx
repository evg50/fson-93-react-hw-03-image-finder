import style from './Button.module.css';
export default function Button({ loadMore }) {
  const handleLoadMore = () => {
    loadMore();
  };
  return (
    <div className={style.container}>
      <button className={style.button} onClick={handleLoadMore}>
        Load More
      </button>
    </div>
  );
}
