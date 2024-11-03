import { useEffect, useState } from "react";
import DateRangePicker, { DateRangePickerConfig } from "../components/DateRangePicker";
type ShowcaseRangepickerProps = {
    config?:DateRangePickerConfig;
    initialStartDate?:Date;
    initialEndDate?:Date;
}

const ShowcaseRangepicker = ({config={},initialStartDate,initialEndDate}:ShowcaseRangepickerProps) => {
    const [startDate, setStartDate] = useState<Date | undefined>(initialStartDate);
    const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate);


    
    return (<div style={{margin:'10px', width:'75vw', border:'1px solid black'}}>
        <div style={{display:'flex',flexDirection:'row' ,gap:'10px'}}>
            <div style={{width:'200px'}}><span style={{fontWeight:'900'}}>Start Date:</span> {startDate?.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
            })}</div>
            <div style={{width:'200px'}}><span style={{fontWeight:'900'}}>End Date:</span> {endDate?.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
            })}</div>
            <DateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} config={config} startDate={startDate} endDate={endDate} />
        </div>
        <div>
            <div style={{fontWeight:'900'}}>Config</div>
            <div>pastDateAllowed: {config.pastDateAllowed?.toString()}</div>
            <div>startEndSameAllowed: {config.startEndSameAllowed?.toString()}</div>
            <div>maxRange: {config.maxRange?.toString()}</div>
            <div>maxDateInFuture: {config.maxDateInFuture?.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
            })}</div>
        </div>
  </div>);
}

export default ShowcaseRangepicker;