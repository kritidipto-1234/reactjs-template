import styles from './styles/MonthCalendar.module.scss'
import stylesDay from './styles/Day.module.scss'

import Week from './Week';
import { DatePickerProps, ErrorState, RangeDatePickerProps } from '../@types/datePicker';

interface MonthCalendarProps extends Omit<DatePickerProps, 'mainDate'> {
    mainDate: Date;
    unselectedDate: boolean;
    otherDate?: Date;
    error?: ErrorState;
    onChange: (_newDate: Date, _dateType?: "start" | "end") => void;
    mainDateType?: "start" | "end";
}

const MonthCalendar:React.FC<MonthCalendarProps> = ({ mode, error, mainDate,otherDate, unselectedDate,onChange, ...props }) => {

    const weekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const noOfWeeks = 6;
    return <div className={styles.MonthCalendar}>
        <div className={styles.WeekNames + ' ' + stylesDay.header}>
            {weekNames.map((weekName, index) => (
                <div className={stylesDay.DayName} key={index} >{weekName}</div>
            ))}
        </div>

        {Array.from({length: noOfWeeks}).map((_, week) => (
            <Week error={error} mainDateType={props.mainDateType} onChange={onChange} key={week} weekNumber={week} mainDate={mainDate} otherDate={otherDate} unselectedDate={unselectedDate}/>
        ))}
    </div>
}

export default MonthCalendar;
