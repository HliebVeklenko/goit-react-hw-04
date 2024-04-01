import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modal, setModal] = useState(false);

  const accessKey = "42rW14x2YojmV8KZX4wtOqawMYO7RMqu6J7hKCGGiuU";

  useEffect(() => {
    const apiUrl = `https://api.unsplash.com/search/photos?query=${searchTerm}&page=${page}&client_id=${accessKey}`;

    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiUrl);
        setImages((prevImages) =>
          page !== 1
            ? [...prevImages, ...response.data.results]
            : response.data.results
        );
      } catch (error) {
        setError("error fetching images.");
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchImages();
    }
  }, [searchTerm, page, accessKey]);

  const handleSearch = (value) => {
    if (!value.trim() || value === searchTerm) {
      toast.error("Please enter a new search query!");
      return;
    }

    setSearchTerm(value);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <div className="container">
        <SearchBar onSubmit={handleSearch} />
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {images.length > 0 && (
          <>
            <ImageGallery images={images} onImageClick={openModal} />
            <LoadMoreBtn loadMore={handleLoadMore} />
          </>
        )}
      </div>
      {selectedImage && (
        <ImageModal isOpen={modal} image={selectedImage} onClose={closeModal} />
      )}
      <Toaster />
    </>
  );
};

export default App;
