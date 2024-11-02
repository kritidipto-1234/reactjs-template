import styles from './styles/DatePicker.module.scss';
import MonthCalendar from './MonthCalendar';
import { DatePickerProps, RangeDatePickerProps } from '../@types/datePicker';
import MonthPicker from './MonthPicker';
import YearPicker from './YearPicker';
import { useCallback, useState } from 'react';
import { getStartOfDay } from '../utils/DateUtils';


const DatePicker: React.FC<DatePickerProps> = ({validateUsingRangeLogic,persistValidatedDate,error, setInternalDate, ...props}) => {
        //the actual state ofdates in picker. Dates arent persisted if its in error state
    const [mainDate, setMainDate] = useState(props.mainDate || getStartOfDay());

    const validate = useCallback((newDate: Date, type: "start" | "end") => {
        if (validateUsingRangeLogic) {
            const result = validateUsingRangeLogic(newDate, type);
            return !result.isError;
        }

        return true;
    }, [validateUsingRangeLogic]);

    const onChange = useCallback((newDate: Date, dateType?: "start" | "end") => {
        let validateSuccess;
        if (dateType === "end"){
            validateSuccess =validate(newDate, "end");
        }else{
            validateSuccess = validate(newDate, "start");
        }

        if (validateSuccess){
            if(persistValidatedDate){
                persistValidatedDate(newDate, dateType);
            }
            setMainDate(newDate);
            if (setInternalDate) setInternalDate(newDate,dateType);
        }
        else{
            setMainDate(newDate);
            if (setInternalDate) setInternalDate(newDate,dateType);
        }   

    }, [persistValidatedDate,validate,setInternalDate]);

    return <div className={styles.DatePicker}>
        <div className={styles.selectedDate}>
            {mainDate 
                ? mainDate.toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : <span className={styles.placeholder}>No date selected</span>
            }
        </div>
        <div className={styles.YearMonthPicker}>
            <MonthPicker onChange={onChange} currentDate={mainDate}  {...(props.mode === 'range' ? { mainDateType: props.mainDateType } : {})}/>
            <YearPicker onChange={onChange} {...(props.mode === 'range' ? { mainDateType: props.mainDateType } : {})}  currentDate={mainDate}/>
        </div>
        <MonthCalendar error={error} onChange={onChange}  {...(props.mode === 'range' ? { mainDateType: props.mainDateType, otherDate: props.otherDate } : {})} unselectedDate={!props.mainDate}  {...props} mainDate={mainDate} />
    </div>
}

export default DatePicker;
