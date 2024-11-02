import ValueNavigator from "../common/ValueNavigator";
import styles from './styles/YearPicker.module.scss';

type YearPickerProps = {
    currentDate: Date;
    onChange?: (_date: Date, _type?: "start" | "end") => void;
    mainDateType?: "start" | "end";
}

const YearPicker: React.FC<YearPickerProps> = ({currentDate, mainDateType, onChange }) => {

    const currentYear = currentDate.getFullYear();

    function changeYear(e: React.ChangeEvent<HTMLInputElement>){
        const newYear = parseInt(e.target.value);
        let targetDate :Date = new Date(newYear, currentDate.getMonth(), 1);
        if (newYear<currentYear) targetDate = new Date(newYear, currentDate.getMonth(), currentDate.getDate());
        else if(newYear>currentYear) targetDate = new Date(newYear, currentDate.getMonth(), currentDate.getDate());
        onChange?.(targetDate,mainDateType);
    }

    function goToPreviousYear(){
        const targetDate :Date = new Date(currentYear-1, currentDate.getMonth(), currentDate.getDate());
        onChange?.(targetDate,mainDateType);
    }

    function goToNextYear(){
        const targetDate :Date = new Date(currentYear+1, currentDate.getMonth(), currentDate.getDate());
        onChange?.(targetDate,mainDateType);
    }

    return <div className={styles.YearPicker}>
        <ValueNavigator goToPreviousValue={goToPreviousYear} goToNextValue={goToNextYear}>
            <input type="number" value={currentYear} placeholder="Year" onChange={changeYear}/>
        </ValueNavigator>

    </div>
}

export default YearPicker;