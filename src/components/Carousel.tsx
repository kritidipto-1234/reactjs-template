import classes from './Carousel.module.scss';   
import { useState } from 'react';

const Carousel = ({images}: {images: string[]}) => {

    const [currentImage, setCurrentImage] = useState(0);

    const handleNext = () => {
        setCurrentImage(i => (i+1)%images.length);
    }

    const handlePrevious = () => {
        setCurrentImage(i => (i-1+images.length)%images.length);
    }

    return (
        <div className={classes.Carousel}>
            <div className={classes.Carousel__arrow} onClick={handlePrevious}>{'<'}</div>
            <div className={classes.Carousel__images}>
                {images.map((image, index) => (
                    <img className={classes.Carousel__image + (index === currentImage ? ' ' + classes.Carousel__image__active : '')} src={image} alt={`Image ${index}`} key={index} />
                ))}
            </div>
            <div className={classes.Carousel__arrow} onClick={handleNext}>{'>'}</div>
        </div>
    )
}

export default Carousel;