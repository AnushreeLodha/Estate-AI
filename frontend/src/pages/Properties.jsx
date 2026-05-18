import { useState } from 'react';
import { Search, Filter, Plus, MapPin, Bed, Maximize, X } from 'lucide-react';

const initialProperties = [
  { id: 1, title: 'Lodha Woods', price: '₹1.5Cr - 3Cr', location: 'Kandivali East', bhk: '2, 3 BHK', area: '750 - 1200 sqft', status: 'Ready to Move', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400' },
  { id: 2, title: 'Godrej Prime', price: '₹2.1Cr Onwards', location: 'Chembur', bhk: '2, 3, 4 BHK', area: '800 - 1800 sqft', status: 'Under Construction', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400' },
  { id: 3, title: 'Rustomjee Elements', price: '₹8.5Cr+', location: 'Andheri West', bhk: '3, 4, 5 BHK', area: '1500 - 3000 sqft', status: 'Ready to Move', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400' },
];

export default function Properties() {
  const [properties, setProperties] = useState(initialProperties);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingProperty, setViewingProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: '', price: '', location: '', bhk: '', area: '', status: 'Ready to Move', img: ''
  });

  const handleSaveProperty = (e) => {
    e.preventDefault();
    if (editingId) {
      setProperties(properties.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
    } else {
      const newProperty = {
        ...formData,
        id: Date.now(),
        img: formData.img || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400' 
      };
      setProperties([newProperty, ...properties]);
    }
    closeFormModal();
  };

  const closeFormModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: '', price: '', location: '', bhk: '', area: '', status: 'Ready to Move', img: '' });
  };

  const openEditModal = (prop) => {
    setFormData(prop);
    setEditingId(prop.id);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">Property Inventory</h1>
          <p className="text-textMuted mt-1">Manage your listings and projects.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="glass-button flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Property
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
          <input type="text" placeholder="Search properties by name or location..." className="glass-input pl-10 py-2 w-full text-sm" />
        </div>
        <button className="glass-button-secondary flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(prop => (
          <div key={prop.id} className="glass-card overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
              <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md px-2 py-1 rounded-md text-xs font-semibold text-primary z-10 border border-borderCol">
                {prop.status}
              </div>
              <img src={prop.img} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
              <h3 className="absolute bottom-3 left-3 text-lg font-bold text-textMain">{prop.title}</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-textMuted">
                <MapPin className="w-4 h-4 text-primary" /> {prop.location}
              </div>
              <div className="flex justify-between items-center py-2 border-y border-borderCol/50">
                <div className="flex flex-col items-center">
                  <Bed className="w-4 h-4 text-textMuted mb-1" />
                  <span className="text-xs font-medium">{prop.bhk}</span>
                </div>
                <div className="w-px h-8 bg-borderCol"></div>
                <div className="flex flex-col items-center">
                  <Maximize className="w-4 h-4 text-textMuted mb-1" />
                  <span className="text-xs font-medium">{prop.area}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="text-xs text-textMuted">Price Range</p>
                  <p className="text-sm font-bold text-primary">{prop.price}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(prop)} className="glass-button-secondary text-xs px-2 py-1">Edit</button>
                  <button onClick={() => setViewingProperty(prop)} className="glass-button text-xs px-2 py-1">View</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Property Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-lg p-6 animate-fade-in relative">
            <button 
              onClick={closeFormModal}
              className="absolute top-4 right-4 text-textMuted hover:text-textMain transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-textMain mb-6">{editingId ? 'Edit Property' : 'Add New Property'}</h2>
            
            <form onSubmit={handleSaveProperty} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-textMuted mb-1">Property Title</label>
                <input 
                  required
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="glass-input w-full" 
                  placeholder="e.g. Lodha Woods"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-1">Price</label>
                  <input 
                    required
                    type="text" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="glass-input w-full" 
                    placeholder="e.g. ₹1.5Cr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-1">Location</label>
                  <input 
                    required
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="glass-input w-full" 
                    placeholder="e.g. Andheri West"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-1">BHK Configuration</label>
                  <input 
                    required
                    type="text" 
                    value={formData.bhk}
                    onChange={(e) => setFormData({...formData, bhk: e.target.value})}
                    className="glass-input w-full" 
                    placeholder="e.g. 2, 3 BHK"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-1">Area (sqft)</label>
                  <input 
                    required
                    type="text" 
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                    className="glass-input w-full" 
                    placeholder="e.g. 750 - 1200 sqft"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-1">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="glass-input w-full"
                  >
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="New Launch">New Launch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-1">Image URL (Optional)</label>
                  <input 
                    type="text" 
                    value={formData.img}
                    onChange={(e) => setFormData({...formData, img: e.target.value})}
                    className="glass-input w-full" 
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-borderCol/50 mt-6">
                <button 
                  type="button" 
                  onClick={closeFormModal}
                  className="glass-button-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="glass-button">
                  {editingId ? 'Update Property' : 'Save Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Property Modal */}
      {viewingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-2xl overflow-hidden animate-fade-in relative">
            <button 
              onClick={() => setViewingProperty(null)}
              className="absolute top-4 right-4 text-white hover:text-primary z-20 transition-colors bg-background/50 p-1 rounded-full backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="h-64 relative">
              <img src={viewingProperty.img} alt={viewingProperty.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <span className="bg-primary text-background text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                  {viewingProperty.status}
                </span>
                <h2 className="text-3xl font-bold text-textMain">{viewingProperty.title}</h2>
              </div>
            </div>
            <div className="p-6 grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-textMuted mb-1">Location</p>
                <p className="text-lg font-medium text-textMain flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {viewingProperty.location}</p>
              </div>
              <div>
                <p className="text-sm text-textMuted mb-1">Price Range</p>
                <p className="text-lg font-bold text-primary">{viewingProperty.price}</p>
              </div>
              <div>
                <p className="text-sm text-textMuted mb-1">Configuration</p>
                <p className="text-lg font-medium text-textMain flex items-center gap-2"><Bed className="w-4 h-4 text-primary" /> {viewingProperty.bhk}</p>
              </div>
              <div>
                <p className="text-sm text-textMuted mb-1">Area</p>
                <p className="text-lg font-medium text-textMain flex items-center gap-2"><Maximize className="w-4 h-4 text-primary" /> {viewingProperty.area}</p>
              </div>
            </div>
            <div className="bg-surfaceLight/30 p-6 flex justify-end gap-3 border-t border-borderCol/50">
              <button onClick={() => setViewingProperty(null)} className="glass-button-secondary">Close</button>
              <button onClick={() => { setViewingProperty(null); openEditModal(viewingProperty); }} className="glass-button">Edit Details</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
