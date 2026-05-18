import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import LeadsManagement from './pages/LeadsManagement';
import LeadDetail from './pages/LeadDetail';
import WhatsAppChat from './pages/WhatsAppChat';
import Calendar from './pages/Calendar';
import FollowUp from './pages/FollowUp';
import Properties from './pages/Properties';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leads" element={<LeadsManagement />} />
          <Route path="leads/:id" element={<LeadDetail />} />
          <Route path="chat" element={<WhatsAppChat />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="follow-up" element={<FollowUp />} />
          <Route path="properties" element={<Properties />} />
          <Route path="settings" element={<Settings />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
