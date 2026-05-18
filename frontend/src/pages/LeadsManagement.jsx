import { useState, useEffect } from 'react';
import { Search, Filter, MessageSquare, Phone, Calendar as CalendarIcon, ChevronDown, MoreHorizontal, X, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LeadsManagement() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: '',
    locationPref: '',
    bhkPref: '',
    status: 'Hot'
  });

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleAddLead = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({
          name: '',
          phone: '',
          budget: '',
          locationPref: '',
          bhkPref: '',
          status: 'Hot'
        });
        fetchLeads();
      }
    } catch (err) {
      console.error("Error adding lead:", err);
    }
  };

  // Filtering Logic
  const filteredLeads = leads.filter(lead => {
    const tabMatch = activeTab === 'All' || lead.status === activeTab;
    const searchMatch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        lead.locationPref.toLowerCase().includes(searchTerm.toLowerCase());
    return tabMatch && searchMatch;
  });

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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="glass-button flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Lead
          </button>
        </div>
      </div>

      <div className="glass-card flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-borderCol/50 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-1 bg-surfaceLight p-1 rounded-xl">
            {['All', 'Hot', 'Warm', 'Cold'].map(tab => (
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
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, location..." 
              className="glass-input pl-10 py-1.5 w-full text-sm" 
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-textMuted animate-pulse">Loading leads from Supabase...</div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-12 text-center text-textMuted">No leads found in this view.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surfaceLight/50 text-textMuted text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Lead Info</th>
                  <th className="p-4 font-semibold">Requirement</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold hidden md:table-cell">Phone</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderCol/50">
                {filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-surfaceLight/30 transition-colors group">
                    <td className="p-4">
                      <Link to={`/leads/${lead.id}`} className="flex flex-col group-hover:text-primary transition-colors">
                        <span className="font-semibold text-textMain">{lead.name}</span>
                        <span className="text-xs text-textMuted">{lead.id.substring(0, 8)}...</span>
                      </Link>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-textMain">{lead.budget}</span>
                        <span className="text-xs text-textMuted">{lead.locationPref} • {lead.bhkPref}</span>
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
                      <span className="text-sm text-textMuted">{lead.phone}</span>
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
          )}
        </div>
      </div>

      {/* Add Lead Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-lg p-6 animate-fade-in relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-textMuted hover:text-textMain transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-textMain mb-6">Add New Lead</h2>
            
            <form onSubmit={handleAddLead} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-textMuted mb-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="glass-input w-full" 
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-1">Phone Number</label>
                  <input 
                    required
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="glass-input w-full" 
                    placeholder="e.g. 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-1">Budget</label>
                  <input 
                    required
                    type="text" 
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="glass-input w-full" 
                    placeholder="e.g. ₹1.5Cr - 2Cr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-1">Preferred Location</label>
                  <input 
                    required
                    type="text" 
                    value={formData.locationPref}
                    onChange={(e) => setFormData({...formData, locationPref: e.target.value})}
                    className="glass-input w-full" 
                    placeholder="e.g. Andheri West"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-1">BHK Preference</label>
                  <input 
                    required
                    type="text" 
                    value={formData.bhkPref}
                    onChange={(e) => setFormData({...formData, bhkPref: e.target.value})}
                    className="glass-input w-full" 
                    placeholder="e.g. 2 BHK"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-textMuted mb-1">Lead Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="glass-input w-full"
                >
                  <option value="Hot">Hot</option>
                  <option value="Warm">Warm</option>
                  <option value="Cold">Cold</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-borderCol/50 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="glass-button-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="glass-button">
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
