import { format, isToday, isYesterday } from 'date-fns';

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  if (isToday(dateObj)) {
    return `${format(dateObj, 'hh:mm a')}`;
  } else if (isYesterday(dateObj)) {
    return `Yesterday at ${format(dateObj, 'hh:mm a')}`;
  } else {
    return `${format(dateObj, 'MM/dd/yyyy, hh:mm a')}`;
  }
};
