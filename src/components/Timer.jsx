import styles from  './Timer.module.scss';
import { useState, useCallback, useEffect } from 'react';
import useFormattedTime from '../hooks/useFormattedTime';
import upto2Digit from '../utils/upto2digit';
import { useRef } from 'react';

function Timer(){
    const [timeLeft,setTimeleft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const timerRef = useRef(null);

    const {minutes, seconds, centiseconds} = useFormattedTime(timeLeft);

    const handleUpdateTime = useCallback(()=>{
        setTimeleft(t=>{
            if (t<=0) {
                setIsRunning(false);
                setIsStarted(false);
                clearInterval(timerRef.current);
                timerRef.current = null;
                return 0;
            }
            return t-1;
        });
    },[]);

    function handleStart(e){
        e.preventDefault();
        if (isRunning) return;
        const time = parseInt(new FormData(e.target).get('time'));
        setTimeleft(time*100);
        setIsRunning(true);
        setIsStarted(true);
        timerRef.current = setInterval(handleUpdateTime,10);
    }

    function handlePause(){
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsRunning(false);
    }

    function handleResume(){
        setIsRunning(true);
        timerRef.current = setInterval(handleUpdateTime,10);
    }

    function handleReset(){
        setTimeleft(0);
        setIsRunning(false);
        setIsStarted(false);
    }

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    return <div className={styles.Timer}>
        <form className={isStarted ? styles.hidden : ''} onSubmit={handleStart}>
            <input type='number' name='time' placeholder='Enter seconds' ></input>
            <button  type='submit'>Start</button>
        </form>
        <div className={styles.buttonTray + ' ' + (!isStarted ? styles.hidden : '')}>
            <button className={isRunning ?  '' : styles.hidden} type='button' onClick={handlePause}>Pause</button>
            <button className={!isRunning ? '' : styles.hidden} type='button' onClick={handleResume}>Resume</button>
            <button className={isStarted ? '' : styles.hidden} type='button' onClick={handleReset}>Reset</button>
        </div>
        <div>
            <div>
                {upto2Digit(minutes)}:{upto2Digit(seconds)}: {upto2Digit(centiseconds)}
            </div>
        </div>
    </div>
}

export default Timer;