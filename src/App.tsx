import './App.css'
import Carousel from './components/Carousel.tsx';


const images = [
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
]

const App: React.FC = () => {
  const today = new Date();
  
  return (
    <>
      <Carousel images={images} />
    </>
  )
}

export default App;
