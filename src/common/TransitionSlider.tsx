import React, { useState, useEffect } from 'react';
import styles from './styles/TransitionSlider.module.scss';

interface SlideTransitionProps {
    children: React.ReactNode;
    slideKey: number ; // Unique identifier for content (like timestamp)
}

const SlideTransition: React.FC<SlideTransitionProps> = ({ children, slideKey }) => {
    const [currentSlide, setCurrentSlide] = useState<{
        key: number ;
        content: React.ReactNode;
    }>({
        key: slideKey,
        content: children
    });

    const [previousSlide, setPreviousSlide] = useState<{
        key: number ;
        content: React.ReactNode;
    }|undefined>(undefined);

    const currentSlideRef = React.useRef<HTMLDivElement>(null);
    const previousSlideRef = React.useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (slideKey !== currentSlide.key) {
            // Add new slide
            setPreviousSlide({key:currentSlide.key,content:currentSlide.content});
            setCurrentSlide({ key: slideKey, content: children });

            // Better: Use animationend event instead of setTimeout
            const handleAnimationEnd = () => {
                setPreviousSlide(undefined);
                currentRef?.removeEventListener('animationend', handleAnimationEnd);
                previousRef?.removeEventListener('animationend', handleAnimationEnd);
            };

            const currentRef = currentSlideRef.current;
            const previousRef = previousSlideRef.current;

            currentRef?.addEventListener('animationend', handleAnimationEnd);
            previousRef?.addEventListener('animationend', handleAnimationEnd);

            return () => {
                currentRef?.removeEventListener('animationend', handleAnimationEnd);
                previousRef?.removeEventListener('animationend', handleAnimationEnd);
            };
        }
        else if (currentSlide.content !== children){
            // children changed but no change in slides
            setCurrentSlide({ key: slideKey, content: children });
        }
    }, [slideKey,children,currentSlide,previousSlide]);

    const slideDirection = previousSlide ? (previousSlide.key <=currentSlide.key ?'left':'right') : 'left';
    return (
        <div className={styles.wrapper}>
            {previousSlide && <div key={previousSlide.key} ref={previousSlideRef} className={`${styles.slide} ${styles[`slide-${slideDirection}-exit`]}`}>
                {previousSlide.content}
            </div>}
            <div key={currentSlide.key} ref={currentSlideRef} className={`${previousSlide && styles.slide} ${previousSlide &&styles[`slide-${slideDirection}-enter`]}`}>
                {currentSlide.content}
            </div>
        </div>
    );
};

export default SlideTransition;