export const getContributionData = (year: number) => {
  const firstDay = new Date(year, 0, 1);
  const lastDay = new Date(year, 11, 31);
  const weeks = [];
  
  // Start from the first Sunday before or on January 1st
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - firstDay.getDay());
  
  let currentDate = new Date(startDate);
  
  while (currentDate <= lastDay || currentDate.getDay() !== 6) {
    if (currentDate.getDay() === 0) {
      weeks.push([]);
    }
    weeks[weeks.length - 1].push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return weeks;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};