import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import s from './App.module.css';

const API_KEY = '24768000-69e119d8d67a6997f84a85579';
const BASE_URL = 'https://pixabay.com/api/';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setLoading(true);
    setIsVisible(false);

    fetch(
      `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (!response.ok) {
          throw Error('Oops, there is no image with your search query');
        }
        return response.json();
      })
      .then(response => {
        if (response.totalHits - page * 12 < 12) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        if (response.hits.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setLoading(false);
          return;
        }
        setData(prevState => [...prevState, ...response.hits]);
        setLoading(false);
      })
      .catch(error => toast.error(`${error}`));
  }, [searchQuery, page]);
 
  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setData([]);
    setPage(1);
  };

  const handleButtonClick = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setShowModal(prevState => !prevState);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {data.length !== 0 && <ImageGallery data={data} onClick={toggleModal} />}
      <div className={s.centeredBox}>
        {loading && <Loader />}
        {isVisible && <Button onClick={handleButtonClick} />}
      </div>
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          alt={searchQuery}
          onClose={toggleModal}
        />
      )}
      <ToastContainer autoClose={1500} position="top-center" />
    </div>
  );
}

export default App;
