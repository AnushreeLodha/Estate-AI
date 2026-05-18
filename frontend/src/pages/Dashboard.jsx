import { useState, useEffect } from 'react';
import { Users, Flame, Calendar as CalendarIcon, Clock, IndianRupee, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Mon', leads: 4, conversion: 2 },
  { name: 'Tue', leads: 6, conversion: 3 },
  { name: 'Wed', leads: 8, conversion: 5 },
  { name: 'Thu', leads: 5, conversion: 4 },
  { name: 'Fri', leads: 12, conversion: 8 },
  { name: 'Sat', leads: 15, conversion: 10 },
  { name: 'Sun', leads: 18, conversion: 12 },
];

const activityFeed = [
  { id: 1, action: 'Lead Scored', lead: 'Rahul Sharma', time: '10 mins ago', type: 'hot' },
  { id: 2, action: 'Site Visit Booked', lead: 'Sneha Patel', time: '1 hour ago', type: 'success' },
  { id: 3, action: 'WhatsApp Replied', lead: 'Amit Kumar', time: '2 hours ago', type: 'info' },
  { id: 4, action: 'New Lead Added', lead: 'Priya Singh', time: '3 hours ago', type: 'neutral' },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeProperties: 0,
    pendingVisits: 0,
    aiMessagesSent: 1245,
    avgResponseTime: '2 mins'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const kpis = [
    { label: 'Total Leads', value: stats.totalLeads, icon: Users, trend: '+12%', up: true },
    { label: 'Ready Properties', value: stats.activeProperties, icon: Flame, trend: '+4%', up: true },
    { label: 'Pending Visits', value: stats.pendingVisits, icon: CalendarIcon, trend: '-2%', up: false },
    { label: 'AI Messages Sent', value: stats.aiMessagesSent, icon: Clock, trend: '+8%', up: true },
    { label: 'Avg AI Response', value: stats.avgResponseTime, icon: IndianRupee, trend: 'Optimal', up: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">Overview</h1>
          <p className="text-textMuted mt-1">Here's what's happening with your leads today.</p>
        </div>
        <button className="glass-button">Download Report</button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="glass-card p-5 flex flex-col gap-3 group">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-surfaceLight rounded-lg group-hover:bg-primary/20 transition-colors">
                <kpi.icon className="w-5 h-5 text-primary" />
              </div>
              <span className={`text-xs font-semibold flex items-center gap-1 ${kpi.up ? 'text-success' : 'text-danger'}`}>
                {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {kpi.trend}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-textMain">
                {loading ? '...' : kpi.value}
              </p>
              <p className="text-xs text-textMuted">{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="glass-card p-6 lg:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-textMain">Lead Conversion Trends</h2>
            <select className="glass-input text-sm py-1">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#3D332A" vertical={false} />
                <XAxis dataKey="name" stroke="#B8A89A" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#B8A89A" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#2A231E', borderColor: '#3D332A', borderRadius: '12px' }}
                  itemStyle={{ color: '#F2ECE4' }}
                />
                <Area type="monotone" dataKey="leads" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed & Hot Leads */}
        <div className="glass-card p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-textMain">Recent Activity</h2>
          <div className="flex flex-col gap-4">
            {activityFeed.map((item) => (
              <div key={item.id} className="flex gap-3 items-start relative before:absolute before:left-[11px] before:top-8 before:bottom-[-16px] before:w-[2px] before:bg-surfaceLight last:before:hidden">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                  item.type === 'hot' ? 'bg-danger/20 text-danger' :
                  item.type === 'success' ? 'bg-success/20 text-success' :
                  item.type === 'info' ? 'bg-primary/20 text-primary' :
                  'bg-surfaceLight text-textMuted'
                }`}>
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-textMain">{item.action}</p>
                  <p className="text-xs text-textMuted">{item.lead} • {item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="glass-button-secondary w-full mt-auto">View All Activity</button>
        </div>
      </div>
    </div>
  );
}
