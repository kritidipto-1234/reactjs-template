import './App.css'
import Carousel from './components/Carousel.tsx';


const images = [
  'https://cdn.pixabay.com/photo/2012/04/23/15/20/one-38484_1280.png',
  'https://cdn.pixabay.com/photo/2012/04/23/17/07/two-39115_1280.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdDuTY_wiWhRrC8xCOwkzxLgZn6b4FkeJFHg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBOXQ_uEkrVx6HVxTSA3q95DDXQpKJyPKk6A&s',
  'https://cdn5.vectorstock.com/i/1000x1000/83/14/five-5-number-vector-2168314.jpg',
]

const App: React.FC = () => {
  const today = new Date();
  
  return (
    <>
      <Carousel >
        {images.map((image, index) => (
          <img src={image} alt={`Image ${index}`} key={index} />
        ))}
      </Carousel>
    </>
  )
}

export default App;
