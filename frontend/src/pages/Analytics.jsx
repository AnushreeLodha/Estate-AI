import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { name: 'Jan', revenue: 40, target: 24 },
  { name: 'Feb', revenue: 30, target: 13 },
  { name: 'Mar', revenue: 20, target: 98 },
  { name: 'Apr', revenue: 27, target: 39 },
  { name: 'May', revenue: 18, target: 48 },
  { name: 'Jun', revenue: 23, target: 38 },
];

const sourceData = [
  { name: '99acres', value: 400 },
  { name: 'Facebook Ads', value: 300 },
  { name: 'Referral', value: 300 },
  { name: 'Website', value: 200 },
];
const COLORS = ['#D4AF37', '#E8C553', '#B8A89A', '#3D332A'];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-textMain">Analytics & Reports</h1>
        <p className="text-textMuted mt-1">Deep dive into your performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-textMain mb-4">Revenue vs Target (Lakhs)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3D332A" vertical={false} />
                <XAxis dataKey="name" stroke="#B8A89A" tickLine={false} axisLine={false} />
                <YAxis stroke="#B8A89A" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#2A231E', borderColor: '#3D332A', borderRadius: '12px' }} />
                <Bar dataKey="revenue" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#3D332A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-textMain mb-4">Lead Sources</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#2A231E', borderColor: '#3D332A', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {sourceData.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                <span className="text-xs text-textMuted">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
