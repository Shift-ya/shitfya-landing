import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { createCalendarMeeting, getAvailableSlotsForDate } from '@/lib/google-calendar';

export const runtime = 'nodejs';

const meetingSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  company: z.string().max(120).optional().default(''),
  notes: z.string().max(2000).optional().default(''),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
});

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_REQUESTS = 8;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_REQUESTS) {
    return false;
  }

  record.count += 1;
  return true;
}

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables.');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get('date');

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: 'Fecha invalida.' }, { status: 400 });
    }

    const availableSlots = await getAvailableSlotsForDate(date);
    return NextResponse.json({ availableSlots });
  } catch (error) {
    console.error('Meeting availability error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error && error.message.includes('Missing Google Calendar')
            ? 'Falta configurar Google Calendar en las variables de entorno.'
            : 'No se pudo consultar la disponibilidad.',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Intenta nuevamente en unos minutos.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = meetingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Datos invalidos para agendar la reunion.' },
        { status: 400 }
      );
    }

    const { name, email, company, notes, date, time } = result.data;
    const notificationEmail = process.env.MEETING_NOTIFICATION_EMAIL || 'helloshiftya@gmail.com';
    const availableSlots = await getAvailableSlotsForDate(date);

    if (!availableSlots.includes(time)) {
      return NextResponse.json(
        { error: 'Ese horario ya no esta disponible. Selecciona otro slot.' },
        { status: 409 }
      );
    }

    const createdEvent = await createCalendarMeeting({
      name,
      email,
      company,
      notes,
      date,
      time,
    });

    const transporter = getTransporter();

    await transporter.sendMail({
      from: `shift.ya <${process.env.GMAIL_USER}>`,
      to: notificationEmail,
      replyTo: email,
      subject: `Nueva solicitud de reunion - ${name}`,
      text: [
        'Nueva solicitud de reunion desde la landing de shift.ya',
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Empresa: ${company || 'No informada'}`,
        `Fecha: ${date}`,
        `Horario: ${time}`,
        `Evento de Google Calendar: ${createdEvent.htmlLink || 'Creado sin link visible'}`,
        `Objetivo: ${notes || 'No informado'}`,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2>Nueva solicitud de reunion</h2>
          <p>Se registro una nueva solicitud desde la landing de shift.ya.</p>
          <table cellpadding="8" cellspacing="0" border="0">
            <tr><td><strong>Nombre</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email</strong></td><td>${email}</td></tr>
            <tr><td><strong>Empresa</strong></td><td>${company || 'No informada'}</td></tr>
            <tr><td><strong>Fecha</strong></td><td>${date}</td></tr>
            <tr><td><strong>Horario</strong></td><td>${time}</td></tr>
            <tr><td><strong>Google Calendar</strong></td><td><a href="${createdEvent.htmlLink || '#'}">${createdEvent.htmlLink || 'Sin link disponible'}</a></td></tr>
            <tr><td><strong>Objetivo</strong></td><td>${notes || 'No informado'}</td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, eventLink: createdEvent.htmlLink || null });
  } catch (error) {
    console.error('Meeting scheduling error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error && error.message.includes('Missing Google Calendar')
            ? 'Falta configurar Google Calendar en las variables de entorno.'
            : error instanceof Error && error.message.includes('Missing GMAIL_USER')
              ? 'Falta configurar el envio de correo en las variables de entorno.'
              : 'No se pudo registrar la reunion en Google Calendar.',
      },
      { status: 500 }
    );
  }
}