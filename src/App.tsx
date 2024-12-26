import './App.css'
import Carousel from './components/Carousel.tsx';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import React from 'react';
const images = [
  'https://cdn.pixabay.com/photo/2012/04/23/15/20/one-38484_1280.png',
  'https://cdn.pixabay.com/photo/2012/04/23/17/07/two-39115_1280.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdDuTY_wiWhRrC8xCOwkzxLgZn6b4FkeJFHg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBOXQ_uEkrVx6HVxTSA3q95DDXQpKJyPKk6A&s',
  'https://cdn5.vectorstock.com/i/1000x1000/83/14/five-5-number-vector-2168314.jpg',
]

const App: React.FC = () => {
  
  return (
    <>
      <Carousel contentWidth='500px' contentHeight='500px'>
        <div style={{width: '400px',height: '200px'}}>
          normal div
        </div>
        <img style={{width: '200px',height: '200px'}} src={images[0]} alt='Image 0' />
        <img src={images[1]} alt='Image 1' />
        <img src={images[2]} alt='Image 2' />
        <img style={{width: '100px',height: '100px'}} src={images[3]} alt='Image 3' />
        <img style={{width: '200px',height: '300px'}} src={images[4]} alt='Image 4' />
      </Carousel>
    </>
  )
}

 function App2() {
  const [show, setShow] = useState(false);
  const popup = useRef();
  const button = useRef();

  const startTime = performance.now();
  while (performance.now() - startTime < 1000) {
    // This loop will block for 1000ms (1 second)
  }

  useEffect(() => {
    if (popup.current == null || button.current == null) return;
    const { bottom } = button.current.getBoundingClientRect();
    popup.current.style.top = `${bottom + 25}px`;
  }, [show]);


  return (
    <>
      <button ref={button} onClick={() => setShow(prev => !prev)}>
        Click Here
      </button>
      {show && (
        <div style={{ position: "absolute" }} ref={popup}>
          This is a popup
        </div>
      )}
    </>
  );
}

export default App;


