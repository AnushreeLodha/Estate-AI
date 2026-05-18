import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, MessageSquare, Calendar as CalendarIcon, 
  ListTodo, Building2, Settings as SettingsIcon, BarChart3, Bell, Search, UserCircle
} from 'lucide-react';

export default function Layout() {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Leads', path: '/leads', icon: Users },
    { name: 'WhatsApp Chat', path: '/chat', icon: MessageSquare },
    { name: 'Calendar', path: '/calendar', icon: CalendarIcon },
    { name: 'Follow-ups', path: '/follow-up', icon: ListTodo },
    { name: 'Properties', path: '/properties', icon: Building2 },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-borderCol/50 flex flex-col z-20">
        <div className="h-16 flex items-center px-6 border-b border-borderCol/50">
          <span className="text-xl font-bold text-primary tracking-wider">BrokerFlow <span className="text-textMain">AI</span></span>
        </div>
        <nav className="flex-1 overflow-y-auto custom-scrollbar py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-sm' 
                    : 'text-textMuted hover:bg-surface hover:text-textMain hover:border-transparent border border-transparent'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-borderCol/50">
          <div className="glass-card p-4 flex flex-col gap-2">
            <p className="text-xs text-textMuted">AI Credits Remaining</p>
            <div className="w-full bg-background rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full w-[75%]"></div>
            </div>
            <p className="text-sm font-semibold">7,500 / 10,000</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Top Navbar */}
        <header className="h-16 glass border-b border-borderCol/50 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
              <input 
                type="text" 
                placeholder="Search leads, properties, or messages..." 
                className="w-full glass-input pl-10 text-sm py-1.5"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-textMuted hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full animate-pulse"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-borderCol/50 cursor-pointer group">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-textMain group-hover:text-primary transition-colors">Arjun Patel</p>
                <p className="text-xs text-textMuted">Lead Broker</p>
              </div>
              <UserCircle className="w-8 h-8 text-primary" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto custom-scrollbar p-8">
          <div className="max-w-7xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
