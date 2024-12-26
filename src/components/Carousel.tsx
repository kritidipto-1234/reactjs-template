import classes from './Carousel.module.scss';   
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import React from 'react';

type CarouselProps = {
    children: React.ReactNode;
    contentWidth?: string;
    contentHeight?: string;
}

const Carousel = ({children, contentWidth, contentHeight}: CarouselProps) => {
    const images=  React.useMemo(() => React.Children.toArray(children), [children]);
    contentWidth = contentWidth || '200px';
    contentHeight = contentHeight || '200px';

    const [currentImage, setCurrentImage] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLSpanElement[]>([]);

    const [loadState, setLoadState] = useState<'notStarted'|'loading'|'loaded'>('notStarted');


    useEffect(() => {
        let scrollX = 0;
        imagesRef.current.forEach((image, index) => {
            if (index === currentImage) {
                scrollX = image.getBoundingClientRect().left-containerRef.current!.getBoundingClientRect().left + containerRef.current!.scrollLeft;
                // scrollX = image.offsetLeft;
                const leftMargin = (containerRef.current!.getBoundingClientRect().width - image.getBoundingClientRect().width)/2;
               scrollX = scrollX  - leftMargin; // images of different size
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

    useEffect(() => {
        //every time images change, trigger refetch
        setLoadState('notStarted');
    }, [images]);

    useEffect(() => {
        if (loadState!=='notStarted') return;
        setLoadState('loading');
        function calculateMargins() {
            const firstImageLeftMargin = (containerRef.current!.getBoundingClientRect().width - imagesRef.current[0].getBoundingClientRect().width)/2;
            const lastImageRightMargin = (containerRef.current!.getBoundingClientRect().width - imagesRef.current[images.length-1].getBoundingClientRect().width)/2;
            imagesRef.current[0].style.marginLeft = firstImageLeftMargin + 'px';
            imagesRef.current[images.length-1].style.marginRight = lastImageRightMargin + 'px';
        }
        
        const imagePromises =Promise.all(images.map(image => {
            if (image instanceof HTMLImageElement) {
                return image.complete?true:new Promise(resolve => image.onload = () => {
                    resolve(true);
                });
            }
            return true;
        }))

        let shouldUpdate = true;
        let didUpdate = false;

        imagePromises.then(() => {
            if (!shouldUpdate) return;
            calculateMargins();
            setLoadState('loaded');
            didUpdate = true;
        });

        return () => {
            if (!didUpdate) setLoadState('notStarted');
            shouldUpdate = false;
            images.forEach(image => {
                if (image instanceof HTMLImageElement) {
                    image.onload = null;
                }
            });
        }
    }, [images,loadState]);

    return (
        <div className={classes.Carousel}>
            <div className={classes.Carousel__arrow} onClick={handlePrevious}>{'<'}</div>
            <div ref={containerRef} className={classes.Carousel__images} style={{width: contentWidth, height: contentHeight}}>
                {
                    React.Children.map(children, (child, index) => (
                        React.cloneElement(child, {
                            ref: (el:HTMLElement) => imagesRef.current[index] = el!,
                            className: classes.Carousel__image + (index === currentImage ? ' ' + classes.Carousel__image__active : ''),
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
            {loadState!=='loaded' && <div className={classes.Carousel__loading}>Loading...</div>}
            <div className={classes.Carousel__arrow} onClick={handleNext}>{'>'}</div>
        </div>
    )
}

export default Carousel;


//abortontroller 
//resizeobserver
//uselayoutEffect
//resizeObserver