import { Calendar as CalendarIcon, MapPin, User, Clock } from 'lucide-react';

export default function Calendar() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">Site Visits Calendar</h1>
          <p className="text-textMuted mt-1">Manage all your scheduled property tours.</p>
        </div>
        <div className="flex gap-2">
          <button className="glass-button-secondary">List View</button>
          <button className="glass-button">Month View</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 glass-card p-6 h-[600px] flex items-center justify-center">
          <div className="text-center">
            <CalendarIcon className="w-16 h-16 text-borderCol mx-auto mb-4" />
            <p className="text-textMuted">Interactive Calendar Component Goes Here</p>
            <p className="text-xs text-textMuted mt-2">(Use a library like react-big-calendar in full implementation)</p>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="font-semibold text-textMain px-2">Upcoming Today</h2>
          {[
            { id: 1, name: 'Rahul Sharma', time: '11:00 AM', property: 'Lodha Woods', status: 'Confirmed' },
            { id: 2, name: 'Priya Singh', time: '04:30 PM', property: 'Godrej Prime', status: 'Pending' }
          ].map(visit => (
            <div key={visit.id} className="glass-card p-4 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold bg-surfaceLight px-2 py-1 rounded text-primary">{visit.time}</span>
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${visit.status === 'Confirmed' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>{visit.status}</span>
              </div>
              <div>
                <p className="font-medium text-textMain flex items-center gap-2"><User className="w-3 h-3 text-textMuted" /> {visit.name}</p>
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
