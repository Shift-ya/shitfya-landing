export const weekdaySlots = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'];
export const weekendSlots = ['10:00', '11:00', '12:00'];

export function getSlotListForDate(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6 ? weekendSlots : weekdaySlots;
}

export function getSlotStart(date: string, time: string) {
  return `${date}T${time}:00`;
}

export function getSlotEnd(date: string, time: string, durationMinutes = 60) {
  const start = new Date(`${date}T${time}:00`);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
  const year = end.getFullYear();
  const month = String(end.getMonth() + 1).padStart(2, '0');
  const day = String(end.getDate()).padStart(2, '0');
  const hours = String(end.getHours()).padStart(2, '0');
  const minutes = String(end.getMinutes()).padStart(2, '0');
  const seconds = String(end.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}