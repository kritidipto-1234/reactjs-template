import styles from './styles/Week.module.scss'
import Day from './Day';
import { useMemo } from 'react';
import { DateInfo } from './Day';
import { ErrorState } from '../@types/datePicker';

declare type WeekProps = {
    weekNumber: number;
    mainDate: Date;
    error?: ErrorState;
    onChange: (_newDate: Date, _dateType?: "start" | "end") => void;
    otherDate?: Date | null;
    mainDateType?: "start" | "end";
    unselectedDate: boolean;
}

const Week:React.FC<WeekProps> = ({weekNumber, error, mainDate,otherDate, unselectedDate,onChange,...props}) => {
    const days: DateInfo[] = useMemo<DateInfo[]>(()=>{
        const year = mainDate.getFullYear();
        const month = mainDate.getMonth();
        const firstDayWeekIndex = (new Date(year, month, 1)).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPreviousMonth = new Date(year, month, 0).getDate(); //js specific hack asking about "0th" date

        const days: DateInfo[] = [];
        for (let weekIndex=0;weekIndex<=6;weekIndex++){

            if (weekNumber === 0 && weekIndex<firstDayWeekIndex) {
                days.push({date: new Date(year, month-1, daysInPreviousMonth - ( firstDayWeekIndex - weekIndex) + 1 ), isOutOfMonth: true});
                continue;
            }

            let currentMonth =month;
            let dayNumber = 1 + weekIndex - firstDayWeekIndex + weekNumber*7;
            let isOutOfMonth = false;
            if (dayNumber > daysInMonth) {
                dayNumber = dayNumber - daysInMonth;
                isOutOfMonth = true;
                currentMonth++;
            }
            days.push({
                date: new Date(year, currentMonth, dayNumber),
                isOutOfMonth
            });

        }
        return days;
    },[weekNumber,mainDate]);


    return <div className={styles.Week}>
        {days.map((day, index) => (
            <Day error={error} mainDateType={props.mainDateType} key={index} otherDate={otherDate} mainDate={mainDate} dateToDisplayInfo={day} unselectedDate={unselectedDate} onChange={onChange}></Day>
        ))}
    </div>
}

export default Week;