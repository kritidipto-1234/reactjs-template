import styles from  './Timer.module.scss';
import { useState, useCallback, useEffect } from 'react';
import useFormattedTime from '../hooks/useFormattedTime';
import upto2Digit from '../utils/upto2digit';
import { useRef } from 'react';

function Timer({countDown}){
    const [CurrentTime,setCurrentTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const timerRef = useRef(null);
    const lastTickTime = useRef(null);

    const {minutes, seconds, centiseconds} = useFormattedTime(CurrentTime);

    function startTimer() {
        setIsRunning(true);
        timerRef.current = setInterval(()=>{
            setCurrentTime(t=>{
                if (countDown && t<=0) {
                    setIsRunning(false);
                    setIsStarted(false);
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                    return 0;
                }
                return countDown?t-1:t+1;
            });
        },1);
    }

    function handleStart(e){
        e.preventDefault();
        if (isRunning) return;
        if (countDown) {
             const time = parseInt(new FormData(e.target).get('time'));
            setCurrentTime(time*100);
        }
        setIsRunning(true);
        setIsStarted(true);
        startTimer();
    }

    function handlePause(){
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsRunning(false);
    }

    function handleResume(){
        startTimer();
    }

    function handleReset(){
        setCurrentTime(0);
        clearInterval(timerRef.current);
        timerRef.current = null;
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
        {countDown==true?'Count Down':'Normal Timer'}
        {countDown && <form className={isStarted ? styles.hidden : ''} onSubmit={handleStart}>
            <input type='number' name='time' placeholder='Enter seconds' ></input>
            <button  type='submit'>Start</button>
        </form>}
        <div className={styles.buttonTray + ' ' + (countDown && !isStarted ? styles.hidden : '')}>
            <button className={!isStarted && !countDown ?  '' : styles.hidden} type='button' onClick={handleStart}>Start</button>
            <button className={isRunning ?  '' : styles.hidden} type='button' onClick={handlePause}>Pause</button>
            <button className={ (isStarted && !isRunning) ? '' : styles.hidden} type='button' onClick={handleResume}>Resume</button>
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