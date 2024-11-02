import ValueNavigator from "../common/ValueNavigator";

type MonthPickerProps = {
    currentDate: Date;
    onChange?: (_date: Date, _type?: "start" | "end") => void;
    mainDateType?: "start" | "end";
}

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

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return <div>
        <ValueNavigator goToPreviousValue={goToPreviousValue} goToNextValue={goToNextValue}>
            <select value={currentMonth} onChange={changeMonth}>
                {months.map((month, index) => (
                    <option key={index} value={index}>{month}</option>
                ))}
            </select>
        </ValueNavigator>

    </div>
}

export default MonthPicker;