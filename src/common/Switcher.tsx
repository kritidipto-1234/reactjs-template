import { useState, useCallback } from "react";
import styles from "./styles/Switcher.module.scss";
type Option<T> = {
    value: T;
    displayName: string;
};
  
type SwitcherProps<T> = {
    options: Option<T>[];
    initialValue?: Option<T>;
    onChange?: (value: Option<T>) => void;
};

function Switcher<T>({options, initialValue, onChange}: SwitcherProps<T>) {
    const [currentVal, setCurrentVal] = useState<Option<T>>(initialValue || options[0]);

    const handleChange = useCallback((v: Option<T>) => {
        setCurrentVal(v);
        if (onChange) onChange(v);
    }, [onChange]);



    return <div className={styles.switcher}>
        {options.map((option,i) => (
            <button className={option.value === currentVal.value ? styles.option + " " + styles.selected : styles.option} key={i} onClick={handleChange.bind(null, option)}>{option.displayName}</button>
        ))}
    </div>
}

export default Switcher;
