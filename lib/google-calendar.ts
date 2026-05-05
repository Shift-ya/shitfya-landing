import { google } from 'googleapis';
import { getSlotListForDate } from '@/lib/meeting-slots';

const GOOGLE_CALENDAR_SCOPES = ['https://www.googleapis.com/auth/calendar'];

/**
 * Convierte una fecha local (YYYY-MM-DD) y hora (HH:MM) a RFC3339 con offset
 * de la zona horaria especificada usando la API Intl nativa de Node.js.
 */
function toRFC3339(date: string, time: string, timeZone: string): string {
  const localStr = `${date}T${time}:00`;
  // Calculamos el offset comparando fechas UTC vs local
  const local = new Date(localStr);
  const utcStr = local.toLocaleString('en-CA', { timeZone, hour12: false })
    .replace(', ', 'T')
    .replace(/(\d{2}:\d{2}:\d{2})$/, '$1');
  const utcLocal = new Date(utcStr);
  const offsetMs = local.getTime() - utcLocal.getTime();
  const offsetMin = Math.round(offsetMs / 60000);
  const sign = offsetMin >= 0 ? '+' : '-';
  const absMin = Math.abs(offsetMin);
  const hh = String(Math.floor(absMin / 60)).padStart(2, '0');
  const mm = String(absMin % 60).padStart(2, '0');
  return `${localStr}${sign}${hh}:${mm}`;
}

function getGoogleCalendarConfig() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const timeZone = process.env.GOOGLE_CALENDAR_TIMEZONE || 'America/Argentina/Buenos_Aires';

  if (!clientEmail || !privateKey || !calendarId) {
    throw new Error('Missing Google Calendar environment variables.');
  }

  return { clientEmail, privateKey, calendarId, timeZone };
}

function getCalendarClient() {
  const { clientEmail, privateKey } = getGoogleCalendarConfig();
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: GOOGLE_CALENDAR_SCOPES,
  });

  return google.calendar({ version: 'v3', auth });
}

export async function getAvailableSlotsForDate(date: string) {
  const { calendarId, timeZone } = getGoogleCalendarConfig();
  const calendar = getCalendarClient();
  const dateValue = new Date(`${date}T12:00:00`);
  const slotCandidates = getSlotListForDate(dateValue);

  const timeMin = toRFC3339(date, '00:00', timeZone);
  const timeMax = toRFC3339(date, '23:59', timeZone);

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      timeZone,
      items: [{ id: calendarId }],
    },
  });

  const busyPeriods = response.data.calendars?.[calendarId]?.busy ?? [];

  const availableSlots = slotCandidates.filter((slot) => {
    const slotStart = new Date(toRFC3339(date, slot, timeZone));
    const [slotHour, slotMin] = slot.split(':').map(Number);
    const endHour = slotHour + 1;
    const endTime = `${String(endHour).padStart(2, '0')}:${String(slotMin).padStart(2, '0')}`;
    const slotEnd = new Date(toRFC3339(date, endTime, timeZone));

    return !busyPeriods.some((busy) => {
      if (!busy.start || !busy.end) return false;
      const busyStart = new Date(busy.start);
      const busyEnd = new Date(busy.end);
      return slotStart < busyEnd && slotEnd > busyStart;
    });
  });

  return availableSlots;
}

type CreateCalendarEventInput = {
  name: string;
  email: string;
  company?: string;
  notes?: string;
  date: string;
  time: string;
};

export async function createCalendarMeeting(input: CreateCalendarEventInput) {
  const { calendarId, timeZone } = getGoogleCalendarConfig();
  const calendar = getCalendarClient();
  const start = toRFC3339(input.date, input.time, timeZone);
  const [hour, min] = input.time.split(':').map(Number);
  const endHour = hour + 1;
  const endTime = `${String(endHour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
  const end = toRFC3339(input.date, endTime, timeZone);

  const result = await calendar.events.insert({
    calendarId,
    sendUpdates: 'all',
    requestBody: {
      summary: `Reunion shift.ya con ${input.name}`,
      description: [
        `Nombre: ${input.name}`,
        `Email: ${input.email}`,
        `Empresa: ${input.company || 'No informada'}`,
        `Objetivo: ${input.notes || 'No informado'}`,
      ].join('\n'),
      start: {
        dateTime: start,
        timeZone,
      },
      end: {
        dateTime: end,
        timeZone,
      },
      reminders: {
        useDefault: true,
      },
    },
  });

  return result.data;
}