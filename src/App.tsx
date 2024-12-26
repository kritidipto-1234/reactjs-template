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
  'https://plus.unsplash.com/premium_photo-1673264933048-3bd3f5b86f9d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]

const App: React.FC = () => {
  
  // debugger;
  return (
    <>
      <Carousel contentWidth='500px' contentHeight='500px'>
        <div style={{width: '100px',height: '200px'}}>
          normal div
        </div>
        <div style={{width: '300px',height: '100px'}}>
          normal div 2
        </div>
        <img style={{width: '200px',height: '200px'}} src={images[0]} alt='Image 0' />
        <img src={images[1]} alt='Image 1' />
        <img src={images[2]} alt='Image 2' />
        <img style={{width: '100px',height: '100px'}} src={images[3]} alt='Image 3' />
        <img style={{width: '200px',height: '300px'}} src={images[4]} alt='Image 4' />
        <img style={{width: '200px',height: '300px'}} src={images[5]} alt='Image 5' />
      </Carousel>
    </>
  )
}



export default App;


