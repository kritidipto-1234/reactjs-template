import classes from './Carousel.module.scss';   
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import React from 'react';

type CarouselProps = {
    children: React.ReactNode;
    contentWidth?: string;
    contentHeight?: string;
}

const Carousel = ({children, contentWidth, contentHeight}: CarouselProps) => {
    const images= React.Children.toArray(children);
    contentWidth = contentWidth || '200px';
    contentHeight = contentHeight || '200px';

    const [currentImage, setCurrentImage] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLSpanElement[]>([]);


    useEffect(() => {
        let scrollX = 0;
        imagesRef.current.forEach((image, index) => {
            if (index === currentImage) {
                scrollX = image.getBoundingClientRect().left-containerRef.current!.getBoundingClientRect().left + containerRef.current!.scrollLeft;
                // scrollX = image.offsetLeft;
            }
        });

        containerRef.current?.scrollTo({left: scrollX,behavior: 'smooth'});
    }, [currentImage]);

    const handleNext = () => {
        setCurrentImage(i => (i+1)%images.length);
    }

    const handlePrevious = () => {
        setCurrentImage(i => (i-1+images.length)%images.length);
    }

    return (
        <div className={classes.Carousel}>
            <div className={classes.Carousel__arrow} onClick={handlePrevious}>{'<'}</div>
            <div ref={containerRef} className={classes.Carousel__images} style={{width: contentWidth, height: contentHeight}}>
                {
                    React.Children.map(children, (child, index) => (
                        React.cloneElement(child, {
                            ref: (el:HTMLElement) => imagesRef.current[index] = el!,
                            className: classes.Carousel__image,
                            key: index
                        })
                    ))
                }
            </div>
            <div className={classes.Carousel__dots}>
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`${classes.Carousel__dot} ${index === currentImage ? classes.active : ''}`}
                    onClick={() => setCurrentImage(index)}
                />
            ))}
            </div>
            <div className={classes.Carousel__arrow} onClick={handleNext}>{'>'}</div>
        </div>
    )
}

export default Carousel;

//image loading
//css width