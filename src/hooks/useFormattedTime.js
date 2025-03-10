function useFormattedTime(millisecs){
    const minutes = Math.floor(millisecs / 60000);
    millisecs = millisecs % 60000;
    const seconds = Math.floor(millisecs / 1000);
    millisecs = millisecs % 1000;
    const centiseconds = Math.floor(millisecs / 10);

    return {minutes, seconds, centiseconds};
}

export default useFormattedTime;