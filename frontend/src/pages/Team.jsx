import { UserPlus, MoreHorizontal, Shield, Target } from 'lucide-react';

const team = [
  { id: 1, name: 'Arjun Patel', role: 'Lead Broker', leads: 145, conversion: '12%', status: 'Active', avatar: 'A' },
  { id: 2, name: 'Riya Sharma', role: 'Sales Agent', leads: 84, conversion: '8%', status: 'Active', avatar: 'R' },
  { id: 3, name: 'Karan Singh', role: 'Sales Agent', leads: 42, conversion: '5%', status: 'Offline', avatar: 'K' },
];

export default function Team() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">Team Management</h1>
          <p className="text-textMuted mt-1">Manage brokers and track their performance.</p>
        </div>
        <button className="glass-button flex items-center gap-2"><UserPlus className="w-4 h-4" /> Invite Member</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map(member => (
          <div key={member.id} className="glass-card p-6 flex flex-col items-center text-center relative overflow-hidden group">
            <button className="absolute top-4 right-4 text-textMuted hover:text-textMain"><MoreHorizontal className="w-5 h-5" /></button>
            <div className="w-20 h-20 rounded-full bg-surfaceLight border-2 border-primary flex items-center justify-center text-2xl font-bold text-primary mb-4 relative">
              {member.avatar}
              <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background ${member.status === 'Active' ? 'bg-success' : 'bg-textMuted'}`}></div>
            </div>
            <h3 className="text-xl font-bold text-textMain">{member.name}</h3>
            <p className="text-sm text-textMuted mb-6 flex items-center gap-1 justify-center"><Shield className="w-3 h-3" /> {member.role}</p>
            
            <div className="w-full grid grid-cols-2 gap-4 border-t border-borderCol/50 pt-4">
              <div>
                <p className="text-xs text-textMuted">Active Leads</p>
                <p className="text-lg font-semibold text-textMain">{member.leads}</p>
              </div>
              <div>
                <p className="text-xs text-textMuted">Conversion</p>
                <p className="text-lg font-semibold flex items-center justify-center gap-1 text-primary"><Target className="w-3 h-3" /> {member.conversion}</p>
              </div>
            </div>
            <button className="w-full glass-button-secondary mt-6 text-sm">Assign Leads</button>
          </div>
        ))}
      </div>
    </div>
  );
}
