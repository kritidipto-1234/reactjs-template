/**
 * Returns a new Date object set to the start of the day (00:00:00) for the given date.
 * If no date is provided, it defaults to the current date.
 * 
 * @param {Date} [date=new Date()] - The date for which to get the start of the day.
 * @returns {Date} - A new Date object set to the start of the day.
 */
export const getStartOfDay = (date: Date = new Date()): Date => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
}

/**
 * Returns a new Date object set to the start of the next day (00:00:00) for the given date.
 * If no date is provided, it defaults to the current date.
 * 
 * @param {Date} [date=new Date()] - The date for which to get the start of the next day.
 * @returns {Date} - A new Date object set to the start of the next day.
 */
export const getStartOfNextDay = (date: Date = new Date()): Date => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
}

/**
 * Returns a new Date object set to the first day of the month and year of the given date.
 * 
 * @param {Date} date - The date for which to get the first day of the month and year.
 * @returns {Date} - A new Date object set to the first day of the month and year.
 */
export const getDateWithFirstofMonthYear = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setDate(1);
    return newDate;
}