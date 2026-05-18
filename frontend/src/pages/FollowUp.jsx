import { Clock, PhoneCall, MessageSquare, CheckCircle2 } from 'lucide-react';

const queue = [
  { id: 1, name: 'Vikram Mehta', type: 'Call', time: 'Overdue by 2 hours', priority: 'High', status: 'pending' },
  { id: 2, name: 'Sneha Patel', type: 'WhatsApp', time: 'Due in 30 mins', priority: 'Medium', status: 'pending' },
  { id: 3, name: 'Amit Kumar', type: 'Call', time: 'Due in 2 hours', priority: 'High', status: 'pending' },
];

export default function FollowUp() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-textMain">Follow-up Queue</h1>
        <p className="text-textMuted mt-1">Don't let any lead slip through the cracks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Urgent Column */}
        <div className="glass-card p-4 space-y-4">
          <h2 className="font-semibold text-danger flex items-center gap-2"><Clock className="w-4 h-4" /> Urgent / Overdue</h2>
          {queue.filter(q => q.priority === 'High' && q.time.includes('Overdue')).map(item => (
            <div key={item.id} className="bg-surfaceLight/50 p-4 rounded-xl border border-danger/30 hover:border-danger/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-textMain">{item.name}</h3>
                <span className="text-[10px] uppercase bg-danger/20 text-danger px-2 py-0.5 rounded-full">{item.type}</span>
              </div>
              <p className="text-xs text-danger mb-4">{item.time}</p>
              <div className="flex gap-2">
                <button className="flex-1 glass-button text-xs py-1.5 flex justify-center items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Done</button>
                <button className="flex-1 glass-button-secondary text-xs py-1.5 flex justify-center items-center gap-1"><PhoneCall className="w-3 h-3" /> Action</button>
              </div>
            </div>
          ))}
        </div>

        {/* Today Column */}
        <div className="glass-card p-4 space-y-4">
          <h2 className="font-semibold text-primary flex items-center gap-2"><Clock className="w-4 h-4" /> Today</h2>
          {queue.filter(q => !q.time.includes('Overdue')).map(item => (
            <div key={item.id} className="bg-surfaceLight/50 p-4 rounded-xl border border-borderCol hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-textMain">{item.name}</h3>
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${item.type === 'WhatsApp' ? 'bg-success/20 text-success' : 'bg-info/20 text-info'}`}>{item.type}</span>
              </div>
              <p className="text-xs text-textMuted mb-4">{item.time}</p>
              <div className="flex gap-2">
                <button className="flex-1 glass-button text-xs py-1.5 flex justify-center items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Done</button>
                <button className="flex-1 glass-button-secondary text-xs py-1.5 flex justify-center items-center gap-1">
                  {item.type === 'WhatsApp' ? <MessageSquare className="w-3 h-3" /> : <PhoneCall className="w-3 h-3" />} Action
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Column */}
        <div className="glass-card p-4 space-y-4 opacity-70">
          <h2 className="font-semibold text-textMuted flex items-center gap-2"><Clock className="w-4 h-4" /> Upcoming</h2>
          <div className="p-8 text-center text-sm text-textMuted">No upcoming follow-ups scheduled for tomorrow yet.</div>
        </div>
      </div>
    </div>
  );
}
