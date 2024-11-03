import ValueNavigator from "../common/ValueNavigator";
import styles from "./styles/MonthPicker.module.scss";

type MonthPickerProps = {
    currentDate: Date;
    onChange?: (_date: Date, _type?: "start" | "end") => void;
    mainDateType?: "start" | "end";
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MonthPicker: React.FC<MonthPickerProps> = ({currentDate,onChange, mainDateType }) => {

    const currentMonth = currentDate.getMonth();

    function changeMonth(e: React.ChangeEvent<HTMLSelectElement>){
        const newMonth = parseInt(e.target.value);
        const lastDayOfNewMonth = new Date(currentDate.getFullYear(), newMonth+1, 0).getDate();
        onChange?.(new Date(currentDate.getFullYear(), newMonth, newMonth<currentMonth?lastDayOfNewMonth:1),mainDateType);
    }

    const goToPreviousValue = () => {
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentMonth, 0).getDate();
        onChange?.(new Date(currentDate.getFullYear(), currentMonth - 1, lastDayOfMonth),mainDateType);
    }

    const goToNextValue = () => {
        onChange?.(new Date(currentDate.getFullYear(), currentMonth + 1, 1),mainDateType);
    }

    return <div 
        className={styles.MonthPicker}
        role="group"
        aria-label="Month selection"
    >
        <ValueNavigator 
            goToPreviousValue={goToPreviousValue} 
            goToNextValue={goToNextValue}
            label="Month selection"
        >
            <div 
                className={styles.Month}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'ArrowLeft') goToPreviousValue();
                    if (e.key === 'ArrowRight') goToNextValue();
                }}
                aria-label={`Current month: ${months[currentMonth]} ${currentDate.getFullYear()}`}
            >
                {months[currentMonth]}
            </div>
        </ValueNavigator>
    </div>
}

export default MonthPicker;