export const getStartOfDay = (date: Date = new Date()): Date => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
}

export const getStartOfNextDay = (date: Date = new Date()): Date => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
}

export const getDateWithFirstofMonthYear = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setDate(1);
    return newDate;
}