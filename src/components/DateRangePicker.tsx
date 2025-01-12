import {  useCallback, useState } from "react";
import Switcher from "../common/Switcher";
import DatePicker from "./DatePicker";
import styles from "./styles/DateRangePicker.module.scss";
import { getStartOfDay, getStartOfNextDay } from "../utils/DateUtils";
import Modal from "../common/Modal";
import { ErrorState } from "../@types/datePicker";

export type DateRangePickerConfig = {
    pastDateAllowed?: boolean;
    startEndSameAllowed?: boolean;
    maxRange?: number;
    maxDateInFuture?: Date;
}
type DateRangePickerProps = {
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    setStartDate: (_newDate: Date | undefined) => void;
    setEndDate: (_newDate: Date | undefined) => void;
    config: DateRangePickerConfig;
}

/**
 * Validates the configuration and date range for the DateRangePicker component.
 *
 * @param {DateRangePickerConfig} config - The configuration object for the DateRangePicker.
 * @param {Date} startDate - The start date of the range.
 * @param {Date} endDate - The end date of the range.
 * @returns {Object} - An object containing the validation result and an optional error message.
 *                     { isValid: boolean, errorMessage?: string }
 */
function isValidConfig(config: DateRangePickerConfig, startDate: Date, endDate: Date) {
    if (!config.pastDateAllowed  && startDate.getTime() < getStartOfDay().getTime()) return { isValid:false,errorMessage:"Past date not allowed"}   ;
    if (!config.pastDateAllowed  && endDate.getTime() < getStartOfDay().getTime()) return { isValid:false,errorMessage:"Past date not allowed"};
    if (config.maxDateInFuture && startDate.getTime() > config.maxDateInFuture.getTime()) return { isValid:false,errorMessage:"Max date in future exceeded"};
    if (config.maxDateInFuture && endDate.getTime() > config.maxDateInFuture.getTime()) return { isValid:false,errorMessage:"Max date in future exceeded"};
    if (!config.startEndSameAllowed && startDate.getTime() === endDate.getTime()) return { isValid:false,errorMessage:"Start and end date cannot be the same"};
    if (startDate.getTime() > endDate.getTime()) return { isValid:false,errorMessage:"Start date must be before or on end date"};
    if (config.maxRange && (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) > config.maxRange) return { isValid:false,errorMessage:"Max range exceeded"};
    return { isValid:true };
}

function DateRangePicker({startDate, endDate, setStartDate, setEndDate, config = {}}: DateRangePickerProps) {
    const [error, setError] = useState<ErrorState | undefined>(undefined);
    const [visible, setVisible] = useState(false);

    //the actual state ofdates in range picker. Dates arent persisted if its in error state
    const [internalStartDate, setInternalStartDate] = useState<Date>(startDate  || getStartOfDay());
    const [internalEndDate, setInternalEndDate] = useState<Date>(endDate  || getStartOfNextDay());

    const validate = useCallback((newDate: Date, type: "start" | "end") => {
        let d1,d2;
        if (type === "start"){
            d1 = newDate;
            d2 = internalEndDate;
        }else if(type === "end"){
            d1 = internalStartDate;
            d2 = newDate;
        } else {
            throw new Error("Client side error: Invalid type");
        }

        function handleError(message: string){
            setError({isError: true, errorMessage: message, dateType: type});
            return { isError: true, errorMessage: message };
        }

        const currentDayStartTime = getStartOfDay().getTime();
        //Case 0: Past date not allowed
        if (!config.pastDateAllowed && ((d1 && d1.getTime() < currentDayStartTime) || (d2 && d2.getTime() < currentDayStartTime))) {
            return handleError("Past date not allowed");
        }

        const maxAllowedTime = config.maxDateInFuture?(config.maxDateInFuture.getTime()):0;
        //Case 1: Max days in future
        if (config.maxDateInFuture && ((d1 && d1.getTime() > maxAllowedTime) || (d2 && d2.getTime() > maxAllowedTime))) {
            return handleError("Max days in future exceeded");
        }

        //Case 2:If only one date is selected, then no other error
        if(!d1 || !d2) return { isError: false };


        //Case 3: Start must be before or on end
        if (d1.getTime() > d2.getTime()){
            return handleError("Start date must be before or on end date");
        }

        //Case 4: Start and end date cannot be the same
        if (!config.startEndSameAllowed && d1.getTime() === d2.getTime()){
            return handleError("Start and end date cannot be the same");
        }

        //Case 5: Max range
        const daysDifference = (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);
        if (config.maxRange && daysDifference >= config.maxRange) {
            return handleError("Max range exceeded");
        }

        setError(undefined);
        return { isError: false };
    }, [config ,internalStartDate,internalEndDate]);

    const setDates = useCallback((newDate: Date, type?: "start" | "end") => {
        if(type === "start"){
            setStartDate(newDate);
            setInternalStartDate(newDate);
            setEndDate(internalEndDate);
        }else{
            setStartDate(internalStartDate);
            setEndDate(newDate);
            setInternalEndDate(newDate);
        }
    }, [setStartDate, setEndDate,internalStartDate,internalEndDate]);

    const setInternalDates = useCallback((newDate: Date, type?: "start" | "end") => {
        if(type === "start"){
            setInternalStartDate(newDate);
        }else{
            setInternalEndDate(newDate);
        }
    }, [setInternalStartDate, setInternalEndDate]);
    
    const commonProps = {
        mode: 'range' as const,
        validateUsingRangeLogic: validate,
        persistValidatedDate: setDates,
        setInternalDate: setInternalDates,
        error,
        config: { pastDateAllowed: config.pastDateAllowed }
    };



    const  validity = isValidConfig(config,startDate || getStartOfDay(),endDate || getStartOfNextDay());
    if (!validity.isValid) return <div>Invalid Config {validity.errorMessage} </div>;

    const resetPicker = function(){
        setInternalStartDate(startDate || getStartOfDay());
        setInternalEndDate(endDate || getStartOfNextDay());
        setError(undefined);
    }

    const closeDatePickerModal = function(){
        setVisible(false);
        resetPicker();
    }

    function toggleVisibility(){
        setVisible(v=>{
            if(!v) resetPicker();
        return !v});
    }

    const noOfDaysSelected = (internalEndDate.getTime() - internalStartDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
    const dateRangePickerJsx =  <div className={styles.DateRangePicker}>
        <div className={styles.header}>
            <div className={styles.daysSelected}>
                No of days selected: <span>{noOfDaysSelected<=0 ? 0 : noOfDaysSelected}</span>
            </div>
            <button className={styles.closeButton} onClick={closeDatePickerModal}>
                &times;
            </button>
        </div>
        <div className={styles.DatePickerContainer}>
            <DatePicker 
                {...commonProps}
                mainDateType="start"
                mainDate={internalStartDate}
                otherDate={internalEndDate}
            />
            <DatePicker 
                {...commonProps}
                mainDateType="end"
                mainDate={internalEndDate}
                otherDate={internalStartDate}
            />
        </div>
        {error && <div className={styles.Error}>{error.errorMessage}</div>}
    </div>;

    return <div className={styles.container}>
        <button className={styles.rangePicker} onClick={toggleVisibility}>
            <span>Range Picker</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
        {visible && <Modal closeModal={closeDatePickerModal}>{dateRangePickerJsx}</Modal>}
    </div>
}

export default DateRangePicker;
