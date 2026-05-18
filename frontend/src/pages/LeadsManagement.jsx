import { useState } from 'react';
import { Search, Filter, MessageSquare, Phone, Calendar as CalendarIcon, ChevronDown, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

const leadsData = [
  { id: 'LD-1021', name: 'Rahul Sharma', budget: '₹1.5Cr - 2Cr', location: 'Andheri West', timeline: 'Immediate', score: 92, status: 'Hot', lastMsg: 'I would like to visit the site tomorrow.' },
  { id: 'LD-1022', name: 'Priya Singh', budget: '₹80L - 1Cr', location: 'Malad East', timeline: '3 Months', score: 65, status: 'Warm', lastMsg: 'Send me more details.' },
  { id: 'LD-1023', name: 'Amit Kumar', budget: '₹2.5Cr+', location: 'Bandra West', timeline: 'Immediate', score: 98, status: 'Hot', lastMsg: 'Can we negotiate the price?' },
  { id: 'LD-1024', name: 'Sneha Patel', budget: '₹50L - 80L', location: 'Kandivali', timeline: '6 Months', score: 45, status: 'Cold', lastMsg: 'I am just browsing right now.' },
  { id: 'LD-1025', name: 'Vikram Mehta', budget: '₹3Cr+', location: 'Juhu', timeline: '1 Month', score: 88, status: 'Hot', lastMsg: 'Please schedule a meeting.' },
];

export default function LeadsManagement() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">Leads</h1>
          <p className="text-textMuted mt-1">Manage and track your prospective buyers.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="glass-button-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="glass-button">Add New Lead</button>
        </div>
      </div>

      <div className="glass-card flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-borderCol/50 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-1 bg-surfaceLight p-1 rounded-xl">
            {['All', 'Hot', 'Warm', 'Cold', 'Site Visit'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab ? 'bg-surface shadow-sm text-primary' : 'text-textMuted hover:text-textMain'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
            <input type="text" placeholder="Search by name, location..." className="glass-input pl-10 py-1.5 w-full text-sm" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surfaceLight/50 text-textMuted text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Lead Info</th>
                <th className="p-4 font-semibold">Requirement</th>
                <th className="p-4 font-semibold">AI Score</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold hidden md:table-cell">Last Message</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderCol/50">
              {leadsData.map(lead => (
                <tr key={lead.id} className="hover:bg-surfaceLight/30 transition-colors group">
                  <td className="p-4">
                    <Link to={`/leads/${lead.id}`} className="flex flex-col group-hover:text-primary transition-colors">
                      <span className="font-semibold text-textMain">{lead.name}</span>
                      <span className="text-xs text-textMuted">{lead.id}</span>
                    </Link>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-textMain">{lead.budget}</span>
                      <span className="text-xs text-textMuted">{lead.location} • {lead.timeline}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-primary/20 bg-primary/10 text-primary font-bold text-sm">
                        {lead.score}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      lead.status === 'Hot' ? 'bg-danger/10 text-danger border-danger/20' :
                      lead.status === 'Warm' ? 'bg-warning/10 text-warning border-warning/20' :
                      'bg-surfaceLight text-textMuted border-borderCol'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <p className="text-sm text-textMuted truncate max-w-[200px]" title={lead.lastMsg}>
                      {lead.lastMsg}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-textMuted hover:text-success hover:bg-success/10 rounded-lg transition-colors" title="WhatsApp">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-textMuted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Call">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-textMuted hover:text-info hover:bg-surfaceLight rounded-lg transition-colors" title="Schedule">
                        <CalendarIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-borderCol/50 flex justify-between items-center text-sm text-textMuted">
          <span>Showing 1 to 5 of 24 entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-lg border border-borderCol hover:bg-surfaceLight disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded-lg border border-borderCol hover:bg-surfaceLight">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
