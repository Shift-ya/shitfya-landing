'use client';

import { useEffect, useState } from 'react';
import { addDays, format, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarDays, CalendarPlus, Clock3, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getSlotListForDate } from '@/lib/meeting-slots';

type MeetingSchedulerDialogProps = {
  triggerClassName?: string;
  triggerLabel?: string;
};

type FormState = {
  name: string;
  email: string;
  company: string;
  notes: string;
};

function getFirstAvailableDate(fromDate: Date) {
  const baseDate = startOfDay(fromDate);
  return baseDate;
}

export function MeetingSchedulerDialog({
  triggerClassName,
  triggerLabel = 'Agendar reunion',
}: MeetingSchedulerDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [confirmedEvent, setConfirmedEvent] = useState<{ date: Date; time: string; notes: string } | null>(null);
  const [status, setStatus] = useState<{ type: 'idle' | 'error' | 'success'; message: string }>({
    type: 'idle',
    message: '',
  });

  useEffect(() => {
    if (!open) return;

    const initialDate = getFirstAvailableDate(new Date());
    setSelectedDate(initialDate);
    setSelectedTime('');
    setConfirmedEvent(null);
  }, [open]);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedDate) return;

      setIsLoadingAvailability(true);
      try {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        const response = await fetch(`/api/meetings?date=${formattedDate}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'No se pudo consultar la disponibilidad.');
        }

        setAvailableSlots(data.availableSlots || []);
        setStatus((current) =>
          current.type === 'success' ? current : { type: 'idle', message: '' }
        );
      } catch (error) {
        setAvailableSlots([]);
        setStatus({
          type: 'error',
          message:
            error instanceof Error ? error.message : 'No se pudo consultar la disponibilidad.',
        });
      } finally {
        setIsLoadingAvailability(false);
      }
    };

    fetchAvailability();
  }, [selectedDate]);

  useEffect(() => {
    if (!selectedDate) return;
    if (!availableSlots.includes(selectedTime)) {
      setSelectedTime(availableSlots[0] ?? '');
    }
  }, [availableSlots, selectedDate, selectedTime]);

  const disabledDays = {
    before: startOfDay(new Date()),
    after: addDays(startOfDay(new Date()), 60),
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedDate || !selectedTime) {
      setStatus({ type: 'error', message: 'Selecciona una fecha y un horario disponible.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const response = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: selectedTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo registrar la reunion.');
      }

      setStatus({
        type: 'success',
        message: 'Reunion agendada correctamente. Te llegara la invitacion y nosotros recibimos la notificacion.',
      });
      setConfirmedEvent({ date: selectedDate, time: selectedTime, notes: form.notes });
      setForm({ name: '', email: '', company: '', notes: '' });
      if (selectedDate) {
        const refreshedAvailability = await fetch(`/api/meetings?date=${format(selectedDate, 'yyyy-MM-dd')}`);
        const refreshedData = await refreshedAvailability.json();
        setAvailableSlots(refreshedData.availableSlots || []);
        setSelectedTime((refreshedData.availableSlots || [])[0] ?? '');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Ocurrio un error al enviar la solicitud.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedDateTimeLabel =
    selectedDate && selectedTime
      ? `${format(selectedDate, "EEEE d 'de' MMMM", { locale: es })} · ${selectedTime}`
      : 'Selecciona un dia y horario';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="lg" variant="transparent" className={triggerClassName}>
          <span className="text-nowrap">{triggerLabel}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border/60 bg-background/95 p-0 backdrop-blur-xl sm:max-w-4xl">
        <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b border-border/50 bg-linear-to-br from-background via-background to-primary/10 p-6 md:border-b-0 md:border-r">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-bold text-foreground">
                Agenda una reunion dentro de la pagina
              </DialogTitle>
              <DialogDescription className="text-sm leading-6 text-muted-foreground">
                Elige un dia, un horario disponible y dejanos tus datos. La solicitud se notifica por email a helloshiftya@gmail.com.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 rounded-2xl border border-primary/30 bg-background/60 p-4 shadow-[0_12px_32px_rgba(46,215,255,0.12)]">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <CalendarDays className="size-4 text-primary" />
                {selectedDateTimeLabel}
              </div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                La disponibilidad se consulta contra Google Calendar real. Solo veras horarios realmente libres.
              </p>
            </div>

            <div className="mt-6 flex justify-center rounded-3xl border border-border/60 bg-background/50 p-3">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={disabledDays}
                locale={es}
              />
            </div>

            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                <Clock3 className="size-4 text-primary" />
                Horarios disponibles
              </div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {isLoadingAvailability ? (
                  <div className="col-span-full flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-3 py-4 text-sm text-muted-foreground">
                    <LoaderCircle className="size-4 animate-spin" />
                    Consultando Google Calendar...
                  </div>
                ) : null}

                {!isLoadingAvailability && availableSlots.length === 0 ? (
                  <div className="col-span-full rounded-xl border border-border/60 bg-background/60 px-3 py-4 text-sm text-muted-foreground">
                    No hay horarios libres para este dia. Prueba otra fecha.
                  </div>
                ) : null}

                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`rounded-xl border px-3 py-2 text-sm transition-colors ${
                      selectedTime === slot
                        ? 'border-primary bg-primary text-primary-foreground shadow-[0_10px_24px_rgba(91,109,255,0.28)]'
                        : 'border-border/60 bg-background/60 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid gap-4">
              <div>
                <label htmlFor="meeting-name" className="mb-2 block text-sm font-medium text-foreground">
                  Nombre
                </label>
                <Input
                  id="meeting-name"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div>
                <label htmlFor="meeting-email" className="mb-2 block text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  id="meeting-email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="nombre@empresa.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="meeting-company" className="mb-2 block text-sm font-medium text-foreground">
                  Empresa
                </label>
                <Input
                  id="meeting-company"
                  value={form.company}
                  onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
                  placeholder="Tu empresa o proyecto"
                />
              </div>
              <div>
                <label htmlFor="meeting-notes" className="mb-2 block text-sm font-medium text-foreground">
                  Objetivo de la reunion
                </label>
                <Textarea
                  id="meeting-notes"
                  value={form.notes}
                  onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                  placeholder="Que quieres construir, mejorar o validar"
                  className="min-h-28"
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border/60 bg-background/40 p-4 text-sm text-muted-foreground">
              Al confirmar, se crea un evento real en Google Calendar y se manda una notificacion a helloshiftya@gmail.com.
            </div>

            {status.message ? (
              <div
                className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                  status.type === 'success'
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                    : 'border-destructive/40 bg-destructive/10 text-red-200'
                }`}
              >
                {status.message}
              </div>
            ) : null}

            {status.type === 'success' && confirmedEvent ? (() => {
              const dateStr = format(confirmedEvent.date, 'yyyyMMdd');
              const [h, m] = confirmedEvent.time.split(':');
              const endH = String(Number(h) + 1).padStart(2, '0');
              const gcLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Reunion con shift.ya')}&dates=${dateStr}T${h}${m}00/${dateStr}T${endH}${m}00&details=${encodeURIComponent(confirmedEvent.notes || 'Reunion agendada con shift.ya')}&location=${encodeURIComponent('Online / A confirmar')}`;
              return (
                <a
                  href={gcLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center gap-3 rounded-2xl border-2 border-emerald-400/60 bg-gradient-to-r from-emerald-500/20 via-emerald-400/15 to-emerald-500/20 px-5 py-4 text-base font-bold text-emerald-200 shadow-[0_0_24px_rgba(52,211,153,0.25)] ring-1 ring-emerald-400/20 transition-all hover:border-emerald-400/90 hover:bg-emerald-500/30 hover:shadow-[0_0_36px_rgba(52,211,153,0.45)] hover:text-emerald-100 active:scale-[0.98]"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/25 ring-1 ring-emerald-400/40">
                    <CalendarPlus className="size-5" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span>Agregar a mi Google Calendar</span>
                    <span className="text-xs font-normal text-emerald-300/70">Se abre en una nueva pestaña</span>
                  </span>
                </a>
              );
            })() : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-muted-foreground">
                Slots base: {selectedDate ? getSlotListForDate(selectedDate).join(' · ') : 'cargando'}.
              </p>
              <Button type="submit" size="lg" className="min-w-44" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Enviando
                  </>
                ) : (
                  'Confirmar solicitud'
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}