import styles from "./styles/ValueNavigator.module.scss";

type ValueNavigatorProps = {
    goToPreviousValue: () => void;
    goToNextValue?: () => void;
    children: React.ReactNode;
    label?: string;
}

const ValueNavigator: React.FC<ValueNavigatorProps> = ({
    goToPreviousValue, 
    children, 
    goToNextValue,
    label
}) => {
    return <div className={styles.ValueNavigator} role="group" aria-label={label}>
        {goToPreviousValue && (
            <button 
                onClick={goToPreviousValue}
                aria-label="Previous"
                type="button"
            >
                {'<'}
            </button>
        )}
        {children}
        {goToNextValue && (
            <button 
                onClick={goToNextValue}
                aria-label="Next"
                type="button"
            >
                {'>'}
            </button>
        )}
    </div>
}

export default ValueNavigator;