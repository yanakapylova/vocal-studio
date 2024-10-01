// utils.js
export const getCurrentDateInfo = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = currentDate.getDate() 
    return { year, month, today };
  };
  
  export const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  export const getFirstDayOfMonth = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    return firstDayOfMonth.getDay();
  };
  