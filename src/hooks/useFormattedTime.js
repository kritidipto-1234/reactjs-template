function useFormattedTime(centisecs){
    const minutes = Math.floor(centisecs / 6000);
    centisecs = centisecs % 6000;
    const seconds  = Math.floor(centisecs / 100);
    centisecs = centisecs % 100;
    const centiseconds = centisecs;

    return {minutes, seconds, centiseconds};

}

export default useFormattedTime;