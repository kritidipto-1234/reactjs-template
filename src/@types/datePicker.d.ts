// Base props that all date pickers share
interface BaseDatePickerProps {
    validateUsingRangeLogic?: (_newDate: Date, _type: "start" | "end") => { isError: boolean, errorMessage?: string };
    persistValidatedDate?: (_newDate: Date, _type?: "start" | "end") => void;
    setInternalDate?: (_newDate: Date, _type?: "start" | "end") => void;
    mainDate?: Date;
    className?: string;
    error?: ErrorState;
    config: {
        pastDateAllowed?: boolean;
    }
}

// Single date picker extends base
interface SingleDatePickerProps extends BaseDatePickerProps {
    mode: 'single';
}

// Range picker extends base and adds range-specific props
interface RangeDatePickerProps extends BaseDatePickerProps {
    mode: 'range';
    otherDate?: Date;
    mainDateType: "start" | "end";
}

// Union type for all picker variants
type DatePickerProps = SingleDatePickerProps | RangeDatePickerProps;

export {
    SingleDatePickerProps,
    RangeDatePickerProps,
    DatePickerProps
}

export type ErrorState = {
    isError: boolean;
    errorMessage?: string;
    dateType: "start" | "end";
}