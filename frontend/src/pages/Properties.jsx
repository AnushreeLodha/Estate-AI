import { Search, Filter, Plus, MapPin, Bed, Maximize, CheckCircle2 } from 'lucide-react';

const properties = [
  { id: 1, title: 'Lodha Woods', price: '₹1.5Cr - 3Cr', location: 'Kandivali East', bhk: '2, 3 BHK', area: '750 - 1200 sqft', status: 'Ready to Move', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400' },
  { id: 2, title: 'Godrej Prime', price: '₹2.1Cr Onwards', location: 'Chembur', bhk: '2, 3, 4 BHK', area: '800 - 1800 sqft', status: 'Under Construction', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400' },
  { id: 3, title: 'Rustomjee Elements', price: '₹8.5Cr+', location: 'Andheri West', bhk: '3, 4, 5 BHK', area: '1500 - 3000 sqft', status: 'Ready to Move', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400' },
];

export default function Properties() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">Property Inventory</h1>
          <p className="text-textMuted mt-1">Manage your listings and projects.</p>
        </div>
        <button className="glass-button flex items-center gap-2"><Plus className="w-4 h-4" /> Add Property</button>
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
                  <button className="glass-button-secondary text-xs px-2 py-1">Edit</button>
                  <button className="glass-button text-xs px-2 py-1">View</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
