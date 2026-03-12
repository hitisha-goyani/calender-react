import { HOLIDAYS } from "./constants";

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay();
}

export function getHoliday(year, month, day) {
  return HOLIDAYS[`${year}-${month + 1}-${day}`] || null;
}

export function readFileAsDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

export function buildCalendarCells(year, month) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
