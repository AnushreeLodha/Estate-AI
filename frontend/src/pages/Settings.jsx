import { useState } from 'react';
import { Save, Bot, MessageSquare, Clock, Globe } from 'lucide-react';

export default function Settings() {
  const [autoMessage, setAutoMessage] = useState(true);
  const [autoFollowUp, setAutoFollowUp] = useState(true);
  const [autoBook, setAutoBook] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">Automation Settings</h1>
          <p className="text-textMuted mt-1">Configure how BrokerFlow AI interacts with your leads.</p>
        </div>
        <button className="glass-button flex items-center gap-2"><Save className="w-4 h-4" /> Save Changes</button>
      </div>

      <div className="grid gap-6">
        {/* Core AI Features */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-textMain mb-4 flex items-center gap-2 border-b border-borderCol/50 pb-3">
            <Bot className="w-5 h-5 text-primary" /> AI Behaviours
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-textMain">Auto-Message New Leads</h3>
                <p className="text-xs text-textMuted mt-1">AI will instantly send a welcome message and property brochure when a new lead is added.</p>
              </div>
              <button 
                onClick={() => setAutoMessage(!autoMessage)}
                className={`relative w-12 h-6 rounded-full transition-colors ${autoMessage ? 'bg-primary' : 'bg-surfaceLight'}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-textMain transition-transform ${autoMessage ? 'translate-x-6' : 'translate-x-0'}`}></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-textMain">Smart Follow-ups</h3>
                <p className="text-xs text-textMuted mt-1">AI will automatically follow up with inactive leads after 24 hours.</p>
              </div>
              <button 
                onClick={() => setAutoFollowUp(!autoFollowUp)}
                className={`relative w-12 h-6 rounded-full transition-colors ${autoFollowUp ? 'bg-primary' : 'bg-surfaceLight'}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-textMain transition-transform ${autoFollowUp ? 'translate-x-6' : 'translate-x-0'}`}></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-textMain">Auto-Book Site Visits</h3>
                <p className="text-xs text-textMuted mt-1">AI can propose timings and confirm site visits directly on WhatsApp.</p>
              </div>
              <button 
                onClick={() => setAutoBook(!autoBook)}
                className={`relative w-12 h-6 rounded-full transition-colors ${autoBook ? 'bg-primary' : 'bg-surfaceLight'}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-textMain transition-transform ${autoBook ? 'translate-x-6' : 'translate-x-0'}`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Regional Settings */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-textMain mb-4 flex items-center gap-2 border-b border-borderCol/50 pb-3">
            <Globe className="w-5 h-5 text-primary" /> Language & Regional
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textMain mb-2">Primary AI Language</label>
              <select className="glass-input w-full max-w-xs">
                <option value="en">English (Default)</option>
                <option value="hi">Hindi</option>
                <option value="gu">Gujarati</option>
              </select>
              <p className="text-xs text-textMuted mt-2">AI will default to this language but will auto-switch if the user speaks another language.</p>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-textMain mb-4 flex items-center gap-2 border-b border-borderCol/50 pb-3">
            <Clock className="w-5 h-5 text-primary" /> Working Hours
          </h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-textMain mb-2">Start Time</label>
              <input type="time" defaultValue="09:00" className="glass-input w-full" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-textMain mb-2">End Time</label>
              <input type="time" defaultValue="19:00" className="glass-input w-full" />
            </div>
          </div>
          <p className="text-xs text-textMuted mt-4">Outside these hours, AI will inform leads that you will contact them the next day.</p>
        </div>
      </div>
    </div>
  );
}
