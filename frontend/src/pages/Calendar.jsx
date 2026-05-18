import { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { MapPin, User, Clock } from 'lucide-react';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Helper to get today at specific hour
const todayAt = (hour, minute = 0) => {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  return d;
};

// Dummy events
const events = [
  {
    id: 1,
    title: 'Rahul Sharma - Lodha Woods',
    start: todayAt(11, 0),
    end: todayAt(12, 0),
    status: 'Confirmed',
    property: 'Lodha Woods',
    client: 'Rahul Sharma',
  },
  {
    id: 2,
    title: 'Priya Singh - Godrej Prime',
    start: todayAt(16, 30),
    end: todayAt(17, 30),
    status: 'Pending',
    property: 'Godrej Prime',
    client: 'Priya Singh',
  },
  {
    id: 3,
    title: 'Amit Desai - Rustomjee Elements',
    start: new Date(new Date().setDate(new Date().getDate() + 1)), // tomorrow
    end: new Date(new Date().setDate(new Date().getDate() + 1)),
    status: 'Confirmed',
    property: 'Rustomjee Elements',
    client: 'Amit Desai',
  },
];

export default function Calendar() {
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  const CustomEvent = ({ event }) => (
    <div className="text-xs p-1">
      <div className="font-semibold">{event.client}</div>
      <div className="truncate opacity-80">{event.property}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">Site Visits Calendar</h1>
          <p className="text-textMuted mt-1">Manage all your scheduled property tours.</p>
        </div>
        <div className="flex gap-2">
          <button 
            className={`glass-button${view === 'agenda' ? '' : '-secondary'}`}
            onClick={() => setView('agenda')}
          >
            List View
          </button>
          <button 
            className={`glass-button${view === 'month' ? '' : '-secondary'}`}
            onClick={() => setView('month')}
          >
            Month View
          </button>
          <button 
            className={`glass-button${view === 'week' ? '' : '-secondary'}`}
            onClick={() => setView('week')}
          >
            Week View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 glass-card p-4 h-[650px] custom-calendar-wrapper">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={view}
            date={date}
            onView={(newView) => setView(newView)}
            onNavigate={(newDate) => setDate(newDate)}
            components={{
              event: CustomEvent,
            }}
            eventPropGetter={(event) => {
              const isConfirmed = event.status === 'Confirmed';
              return {
                className: isConfirmed ? 'event-confirmed' : 'event-pending',
              };
            }}
          />
        </div>
        
        <div className="space-y-4">
          <h2 className="font-semibold text-textMain px-2">Upcoming Today</h2>
          {events.filter(e => e.start.getDate() === new Date().getDate()).map(visit => (
            <div key={visit.id} className="glass-card p-4 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold bg-surfaceLight px-2 py-1 rounded text-primary">
                  {format(visit.start, 'hh:mm a')}
                </span>
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${visit.status === 'Confirmed' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                  {visit.status}
                </span>
              </div>
              <div>
                <p className="font-medium text-textMain flex items-center gap-2"><User className="w-3 h-3 text-textMuted" /> {visit.client}</p>
                <p className="text-xs text-textMuted flex items-center gap-2 mt-1"><MapPin className="w-3 h-3" /> {visit.property}</p>
              </div>
              <div className="flex gap-2 pt-2 border-t border-borderCol/50">
                <button className="flex-1 glass-button-secondary text-[10px] py-1">Reschedule</button>
                <button className="flex-1 glass-button text-[10px] py-1">Check In</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
