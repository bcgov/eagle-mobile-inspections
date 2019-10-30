import { isValid, parseISO, isWithinInterval, format, getUnixTime, differenceInCalendarDays, startOfDay, differenceInHours, isSaturday, isSunday, subDays, subHours } from 'date-fns';

import { DATE_ZULU } from '../js/constants';

export function getValidDate(dateTime) {
  if (typeof dateTime === 'string') {
    const parsed = parseISO(dateTime);
    if (isValid(parsed)) { return parsed; }
  } else if (isValid(dateTime)) {
    return dateTime;
  }
  return null;
}

export function formatDateTime(dateTime, formatString) {
  let date = getValidDate(dateTime);
  if (!date) { return ''; }
  if (!formatString) { formatString = DATE_ZULU; }
  if (formatString === DATE_ZULU) {
    const diff = format(date, 'x');
    date = subHours(date, diff);
  }
  return format(date, formatString);
}

export function sortableDateTime(dateTime) {
  const date = getValidDate(dateTime);
  if (!date) { return 0; }
  return getUnixTime(date);
}

export function dateIsBetween(dateTime, startDate, endDate) {
  const date = getValidDate(dateTime);
  if (!date) { return false; }
  const start = getValidDate(startDate);
  if (!start) { return false; }
  const end = getValidDate(endDate);
  if (!end) { return false; }

  return isWithinInterval(date, { start: start, end: end });
}

export function daysFromToday(dateTime) {
  const date = getValidDate(dateTime);
  if (!date) { return 0; }
  return differenceInCalendarDays(date, startOfDay(new Date()));
}

export function hoursAgo(dateTime) {
  const date = getValidDate(dateTime);
  if (!date) { return 0; }
  return differenceInHours(new Date(), date);
}

export function today(formatString) {
  return formatDateTime(startOfDay(new Date()), formatString);
}

export function businessDayOnOrBefore(dateTime, formatString) {
  const date = getValidDate(dateTime);
  if (!date) { return ''; }
  let businessDay = date;
  if (isSaturday(date)) {
    businessDay = subDays(date, 1);
  } else if (isSunday(date)) {
    businessDay = subDays(date, 2);
  }
  // TODO: Holidays
  return formatDateTime(businessDay, formatString);
}

