import { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Check, CheckCheck, Bot, User, Phone, Video, Sparkles } from 'lucide-react';

const contacts = [
  { id: 1, name: 'Rahul Sharma', lastMsg: 'I would like to visit the site tomorrow.', time: '10:30 AM', unread: 2, online: true, aiActive: false },
  { id: 2, name: 'Priya Singh', lastMsg: 'Send me more details.', time: 'Yesterday', unread: 0, online: false, aiActive: true },
  { id: 3, name: 'Amit Kumar', lastMsg: 'Can we negotiate the price?', time: 'Yesterday', unread: 0, online: true, aiActive: false },
  { id: 4, name: 'Sneha Patel', lastMsg: 'I am just browsing right now.', time: 'Monday', unread: 0, online: false, aiActive: true },
];

const messages = [
  { id: 1, text: 'Hi, I saw your ad for Lodha Woods on 99acres.', sender: 'them', time: '10:00 AM', status: 'read' },
  { id: 2, text: 'Hello Rahul! Yes, we have a few premium 3BHK units left. Would you like the brochure?', sender: 'me', time: '10:02 AM', status: 'read', isAi: true },
  { id: 3, text: 'Yes please. What is the price range?', sender: 'them', time: '10:15 AM', status: 'read' },
  { id: 4, text: 'The 3BHK units start at ₹1.5Cr. I have sent the brochure PDF to your email.', sender: 'me', time: '10:16 AM', status: 'read', isAi: true },
  { id: 5, text: 'Thanks! I would like to visit the site tomorrow.', sender: 'them', time: '10:30 AM', status: 'delivered' },
];

export default function WhatsAppChat() {
  const [takeover, setTakeover] = useState(false);
  const [activeContact, setActiveContact] = useState(contacts[0]);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">WhatsApp Center</h1>
          <p className="text-textMuted mt-1">Manage all your client conversations powered by AI.</p>
        </div>
      </div>

      <div className="flex-1 glass-card overflow-hidden flex">
        {/* Left Sidebar - Contacts list */}
        <div className="w-80 border-r border-borderCol/50 flex flex-col bg-surface/30">
          <div className="p-4 border-b border-borderCol/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
              <input type="text" placeholder="Search or start new chat" className="glass-input pl-10 py-2 w-full text-sm" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {contacts.map(contact => (
              <div 
                key={contact.id} 
                onClick={() => setActiveContact(contact)}
                className={`p-4 flex gap-3 cursor-pointer transition-colors border-b border-borderCol/20 ${activeContact.id === contact.id ? 'bg-surfaceLight/60' : 'hover:bg-surfaceLight/30'}`}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-surface border border-borderCol flex items-center justify-center text-primary font-bold">
                    {contact.name.charAt(0)}
                  </div>
                  {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-semibold text-textMain truncate">{contact.name}</h3>
                    <span className="text-xs text-textMuted flex-shrink-0">{contact.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-textMuted truncate flex-1 mr-2">{contact.lastMsg}</p>
                    {contact.unread > 0 ? (
                      <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-background flex-shrink-0">
                        {contact.unread}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Area - Chat Window */}
        <div className="flex-1 flex flex-col bg-[url('https://i.ibb.co/3Yx9bFp/whatsapp-bg-dark.png')] bg-cover bg-center">
          {/* Chat Header */}
          <div className="h-16 px-4 border-b border-borderCol/50 bg-surface/80 backdrop-blur-md flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surfaceLight border border-borderCol flex items-center justify-center text-primary font-bold">
                {activeContact.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-sm font-semibold text-textMain">{activeContact.name}</h2>
                <p className="text-xs text-textMuted">{activeContact.online ? 'Online' : 'Last seen today at 9:00 AM'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 mr-4 bg-surfaceLight/50 px-3 py-1.5 rounded-full border border-borderCol">
                <span className="text-xs text-textMuted font-medium">AI Auto-Reply</span>
                <button 
                  onClick={() => setTakeover(!takeover)}
                  className={`relative w-8 h-4 rounded-full transition-colors ${!takeover ? 'bg-primary' : 'bg-surface'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-textMain transition-transform ${!takeover ? 'translate-x-4' : 'translate-x-0'}`}></span>
                </button>
              </div>
              <button className="text-textMuted hover:text-primary transition-colors"><Video className="w-5 h-5" /></button>
              <button className="text-textMuted hover:text-primary transition-colors"><Phone className="w-5 h-5" /></button>
              <button className="text-textMuted hover:text-primary transition-colors"><MoreVertical className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="flex justify-center mb-6">
              <span className="text-xs bg-surface/80 backdrop-blur-sm px-3 py-1 rounded-lg text-textMuted border border-borderCol/50">Today</span>
            </div>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-xl px-4 py-2 relative group ${
                  msg.sender === 'me' ? 'bg-primary/20 text-textMain rounded-tr-none border border-primary/30' : 'bg-surfaceLight/80 text-textMain rounded-tl-none border border-borderCol/50'
                }`}>
                  {msg.isAi && (
                    <div className="flex items-center gap-1 mb-1 text-primary">
                      <Bot className="w-3 h-3" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm">{msg.text}</p>
                  <div className={`flex items-center gap-1 mt-1 justify-end ${msg.sender === 'me' ? 'text-textMuted' : 'text-textMuted'}`}>
                    <span className="text-[10px]">{msg.time}</span>
                    {msg.sender === 'me' && (
                      msg.status === 'read' ? <CheckCheck className="w-3 h-3 text-primary" /> :
                      msg.status === 'delivered' ? <CheckCheck className="w-3 h-3" /> :
                      <Check className="w-3 h-3" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Suggestions */}
          {takeover && (
            <div className="px-4 py-2 bg-surface/80 backdrop-blur-md border-t border-borderCol/50 flex gap-2 overflow-x-auto custom-scrollbar">
              <button className="flex-shrink-0 text-xs bg-primary/10 text-primary border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors">
                <Sparkles className="w-3 h-3 inline mr-1" /> Suggest time for tomorrow
              </button>
              <button className="flex-shrink-0 text-xs bg-primary/10 text-primary border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors">
                <Sparkles className="w-3 h-3 inline mr-1" /> Send booking link
              </button>
              <button className="flex-shrink-0 text-xs bg-primary/10 text-primary border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors">
                <Sparkles className="w-3 h-3 inline mr-1" /> Ask for preferred time
              </button>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-surface/90 backdrop-blur-md border-t border-borderCol/50 flex items-end gap-3">
            <button className="p-2 text-textMuted hover:text-primary transition-colors"><Paperclip className="w-5 h-5" /></button>
            <div className="flex-1 bg-surfaceLight border border-borderCol rounded-xl overflow-hidden flex items-center">
              <textarea 
                rows="1"
                placeholder={!takeover ? "Take over chat to type..." : "Type a message..."}
                disabled={!takeover}
                className="w-full bg-transparent px-4 py-3 text-sm text-textMain focus:outline-none resize-none disabled:opacity-50"
              ></textarea>
            </div>
            <button 
              disabled={!takeover}
              className={`p-3 rounded-xl flex items-center justify-center transition-all ${
                takeover ? 'bg-primary text-background hover:-translate-y-0.5 shadow-lg shadow-primary/20' : 'bg-surfaceLight text-textMuted cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
