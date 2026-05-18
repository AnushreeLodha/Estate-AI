import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, MessageSquare, Calendar as CalendarIcon, FileText, Sparkles, User, MapPin, Building, Clock, Activity } from 'lucide-react';

export default function LeadDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link to="/leads" className="p-2 glass-card hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-textMain flex items-center gap-3">
              Rahul Sharma 
              <span className="text-xs font-medium px-2 py-1 bg-danger/10 text-danger border border-danger/20 rounded-full">Hot Lead</span>
            </h1>
            <p className="text-sm text-textMuted mt-0.5">{id} • Added 2 days ago</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="glass-button-secondary flex items-center gap-2"><Phone className="w-4 h-4" /> Call</button>
          <button className="glass-button-secondary flex items-center gap-2 text-success border-success/30 hover:bg-success/10"><MessageSquare className="w-4 h-4" /> WhatsApp</button>
          <button className="glass-button flex items-center gap-2"><CalendarIcon className="w-4 h-4" /> Book Visit</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Profile & AI Insights */}
        <div className="space-y-6">
          {/* AI Score Card */}
          <div className="glass-card p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-24 h-24 text-primary" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-textMain">AI Lead Analysis</h2>
            </div>
            <div className="flex items-end gap-4 mb-6">
              <div className="text-5xl font-bold text-primary">92</div>
              <div className="pb-1">
                <p className="text-sm font-semibold text-success">Highly likely to convert</p>
                <p className="text-xs text-textMuted">Based on recent chat sentiment</p>
              </div>
            </div>
            <div className="p-3 bg-surfaceLight rounded-xl border border-borderCol">
              <p className="text-sm text-textMuted leading-relaxed">
                <strong className="text-textMain">Summary:</strong> Rahul is a highly motivated buyer looking for a 3BHK in Andheri West. He has budget flexibility up to 2.2Cr and prefers properties with modern amenities. He responded positively to the "Lodha Woods" brochure.
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="text-xs px-2 py-1 bg-surfaceLight rounded-md text-textMuted">High Intent</span>
              <span className="text-xs px-2 py-1 bg-surfaceLight rounded-md text-textMuted">Responsive</span>
              <span className="text-xs px-2 py-1 bg-surfaceLight rounded-md text-textMuted">Ready Finance</span>
            </div>
          </div>

          {/* Preferences */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-textMain mb-4 border-b border-borderCol/50 pb-2">Requirements</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surfaceLight flex items-center justify-center text-primary"><MapPin className="w-4 h-4" /></div>
                <div>
                  <p className="text-xs text-textMuted">Preferred Locations</p>
                  <p className="text-sm font-medium text-textMain">Andheri West, Juhu</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surfaceLight flex items-center justify-center text-primary"><IndianRupee className="w-4 h-4" /></div>
                <div>
                  <p className="text-xs text-textMuted">Budget Range</p>
                  <p className="text-sm font-medium text-textMain">₹1.5Cr - ₹2.2Cr</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surfaceLight flex items-center justify-center text-primary"><Building className="w-4 h-4" /></div>
                <div>
                  <p className="text-xs text-textMuted">Property Type</p>
                  <p className="text-sm font-medium text-textMain">3 BHK Apartment</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surfaceLight flex items-center justify-center text-primary"><Clock className="w-4 h-4" /></div>
                <div>
                  <p className="text-xs text-textMuted">Timeline</p>
                  <p className="text-sm font-medium text-textMain">Immediate (0-1 months)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timeline & Interactions */}
        <div className="xl:col-span-2 glass-card flex flex-col h-[800px]">
          <div className="p-4 border-b border-borderCol/50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-textMain">Interaction Timeline</h2>
            <div className="flex gap-2">
              <button className="glass-button-secondary text-xs py-1.5"><FileText className="w-3 h-3 inline mr-1" /> Add Note</button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            {/* Timeline Items */}
            <div className="relative pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-[-24px] before:w-[2px] before:bg-surfaceLight">
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-success/20 text-success border-2 border-background flex items-center justify-center z-10">
                <MessageSquare className="w-3 h-3" />
              </div>
              <div className="bg-surfaceLight/40 rounded-xl p-4 border border-borderCol/50">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-semibold text-textMain">WhatsApp Message Received</p>
                  <span className="text-xs text-textMuted">Today, 10:30 AM</span>
                </div>
                <p className="text-sm text-textMuted">"Hi, I would like to visit the Lodha Woods site tomorrow. Is 11 AM possible?"</p>
                <div className="mt-3 flex gap-2">
                  <button className="text-xs bg-primary/20 text-primary px-2 py-1 rounded hover:bg-primary/30 transition-colors">Reply via WhatsApp</button>
                  <button className="text-xs bg-surface text-textMain px-2 py-1 rounded border border-borderCol hover:bg-surfaceLight transition-colors">Book Visit</button>
                </div>
              </div>
            </div>

            <div className="relative pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-[-24px] before:w-[2px] before:bg-surfaceLight">
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary/20 text-primary border-2 border-background flex items-center justify-center z-10">
                <Activity className="w-3 h-3" />
              </div>
              <div className="bg-surfaceLight/40 rounded-xl p-4 border border-borderCol/50">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-semibold text-textMain">AI Auto-Reply Sent</p>
                  <span className="text-xs text-textMuted">Yesterday, 4:15 PM</span>
                </div>
                <p className="text-sm text-textMuted">BrokerFlow AI sent the requested brochure for Lodha Woods and asked for preferred visit timings.</p>
              </div>
            </div>

            <div className="relative pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-[-24px] before:w-[2px] before:bg-surfaceLight">
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-warning/20 text-warning border-2 border-background flex items-center justify-center z-10">
                <Phone className="w-3 h-3" />
              </div>
              <div className="bg-surfaceLight/40 rounded-xl p-4 border border-borderCol/50">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-semibold text-textMain">Outbound Call (Duration: 4m 12s)</p>
                  <span className="text-xs text-textMuted">Yesterday, 2:00 PM</span>
                </div>
                <p className="text-sm text-textMuted">Broker Arjun called Rahul. Rahul is interested in 3BHKs in Andheri West. Budget is flexible up to 2.2Cr. Advised him to check Lodha Woods.</p>
              </div>
            </div>

            <div className="relative pl-6">
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-surfaceLight text-textMuted border-2 border-background flex items-center justify-center z-10">
                <User className="w-3 h-3" />
              </div>
              <div className="bg-surfaceLight/40 rounded-xl p-4 border border-borderCol/50">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-semibold text-textMain">Lead Created</p>
                  <span className="text-xs text-textMuted">2 days ago</span>
                </div>
                <p className="text-sm text-textMuted">Source: 99acres (Campaign: Q3_Andheri_Luxury)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
