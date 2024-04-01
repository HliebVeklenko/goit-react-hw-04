import css from "./SearchBar.module.css";

function SearchBar({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    onSubmit(query);
  };

  return (
    <>
      <header className={css.head}>
        <form onSubmit={handleSubmit} className={css.form}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.btn} type="submit">
            Search
          </button>
        </form>
      </header>
    </>
  );
}

export default SearchBar;
