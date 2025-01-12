import { ErrorState } from '../@types/datePicker';
import styles from './styles/Day.module.scss'
import { memo, useCallback } from 'react';
declare type DayProps = {
    mainDate: Date,
    dateToDisplayInfo: DateInfo,
    error?: ErrorState,
    unselectedDate: boolean,
    onChange: (_newDate: Date, _dateType?: "start" | "end") => void;
    otherDate?: Date | null;
    mainDateType?: "start" | "end";
}

export type DateInfo = {
    date: Date;
    isOutOfMonth: boolean;
}

function isDateBetween(dateToCheck: Date, startDate: Date, endDate: Date): boolean {
    // Normalize to timestamps for comparison
    const check = dateToCheck.getTime();
    const start = startDate.getTime();
    const end = endDate.getTime();

    // Handle cases where dates might be in either order
    const min = Math.min(start, end);
    const max = Math.max(start, end);

    return min<=check && check <= max;
}


const Day:React.FC<DayProps> = ({mainDate, dateToDisplayInfo, error, otherDate,...props}) => {

    const dateToDisplay = dateToDisplayInfo.date;    
    const mainDateType = props.mainDateType;

    function changeDate(){
        props.onChange(dateToDisplay,props.mainDateType);
    }

    const isSelected = !props.unselectedDate && mainDate.getTime() === dateToDisplay.getTime();
    const isOtherDate = otherDate && otherDate.getTime() === dateToDisplay.getTime() && !dateToDisplayInfo.isOutOfMonth;
    const inRange =  !(error) && !props.unselectedDate && otherDate && isDateBetween(dateToDisplay, mainDate, otherDate) && !dateToDisplayInfo.isOutOfMonth;

    const classes: string[] = [];
    if (isSelected || isOtherDate || inRange) classes.push(styles.selected);
    if (dateToDisplayInfo.isOutOfMonth) classes.push(styles.isOutOfMonth);
    if (mainDateType === "start" && (isSelected)) {
        classes.push(styles.leftHalfCircle);
        classes.push(styles.mainControl);
    }
    if (mainDateType === "end" && (isSelected)) {
        classes.push(styles.rightHalfCircle);
        classes.push(styles.mainControl);
    }

    if (mainDateType === "start" && (isOtherDate)) classes.push(styles.rightHalfCircle);
    if (mainDateType === "end" && (isOtherDate)) classes.push(styles.leftHalfCircle);

    // Create accessible date description
    const formattedDate = dateToDisplay.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    let ariaLabel = formattedDate;
    if (isSelected) {
        ariaLabel += `, selected as ${mainDateType} date`;
    } else if (isOtherDate) {
        ariaLabel += `, ${mainDateType === 'start' ? 'end' : 'start'} date`;
    } else if (inRange) {
        ariaLabel += ', within selected range';
    }
    if (dateToDisplayInfo.isOutOfMonth) {
        ariaLabel += ', outside current month';
    }

    return <button 
        onClick={changeDate} 
        className={`${styles.Day} ${classes.join(' ')}`}
        aria-label={ariaLabel}
        tabIndex={dateToDisplayInfo.isOutOfMonth ? -1 : 0}
        aria-selected={isSelected || isOtherDate || false}
        aria-disabled={dateToDisplayInfo.isOutOfMonth}
        role="gridcell"
    >
        {dateToDisplay.getDate()}
    </button>
}

export default memo(Day);