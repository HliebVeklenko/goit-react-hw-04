import toast, { Toaster } from "react-hot-toast";

function SearchBar({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    if (!query.trim()) {
      toast.error("Please enter a search query!");
    }
    onSubmit(query);
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <Toaster position="top-center" />
    </>
  );
}

export default SearchBar;
