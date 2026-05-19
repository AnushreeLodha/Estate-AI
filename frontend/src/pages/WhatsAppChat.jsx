import { useState, useEffect, useRef } from 'react';
import { Search, Send, Paperclip, MoreVertical, Check, CheckCheck, Bot, Sparkles, Terminal, X, MessageSquare } from 'lucide-react';

export default function WhatsAppChat() {
  const [takeover, setTakeover] = useState(true);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typedMessage, setTypedMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulator state
  const [isSimOpen, setIsSimOpen] = useState(false);
  const [simName, setSimName] = useState('Rahul Sharma');
  const [simPhone, setSimPhone] = useState('919876543210');
  const [simText, setSimText] = useState('I would like to visit the Lodha Woods site tomorrow.');
  const [simLoading, setSimLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch all chats
  const fetchChats = async (selectFirst = false) => {
    try {
      const res = await fetch('http://localhost:5000/api/whatsapp/chats');
      if (res.ok) {
        const data = await res.json();
        setChats(data);
        if (selectFirst && data.length > 0 && !activeChat) {
          setActiveChat(data[0]);
        }
      }
    } catch (err) {
      console.error("Error fetching chats:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch message history for selected chat
  const fetchMessages = async (chatId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/whatsapp/chats/${chatId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  // Initial load
  useEffect(() => {
    fetchChats(true);
  }, []);

  // Fetch messages when active chat changes
  useEffect(() => {
    if (activeChat) {
      fetchMessages(activeChat.id);
    }
  }, [activeChat]);

  // Polling for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchChats();
      if (activeChat) {
        fetchMessages(activeChat.id);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [activeChat]);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message manually
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!typedMessage.trim() || !activeChat) return;

    try {
      const res = await fetch('http://localhost:5000/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: activeChat.id,
          content: typedMessage
        })
      });

      if (res.ok) {
        const newMsg = await res.json();
        setMessages([...messages, newMsg]);
        setTypedMessage('');
        fetchChats();
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Trigger Incoming simulated message
  const handleSimulateMessage = async (e) => {
    e.preventDefault();
    if (!simPhone.trim() || !simText.trim()) return;

    setSimLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/whatsapp/simulate-incoming', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: simPhone,
          text: simText,
          name: simName
        })
      });

      if (res.ok) {
        const data = await res.json();
        setIsSimOpen(false);
        setSimText('');
        // Force refresh and select the simulated chat
        await fetchChats();
        setActiveChat({
          id: data.lead.id,
          name: data.lead.name,
          phone: data.lead.phone,
          status: data.lead.status
        });
      }
    } catch (err) {
      console.error("Error simulating message:", err);
    } finally {
      setSimLoading(false);
    }
  };

  const filteredChats = chats.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col relative">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textMain">WhatsApp Center</h1>
          <p className="text-textMuted mt-1">Manage all your client conversations powered by AI.</p>
        </div>
        <button 
          onClick={() => setIsSimOpen(true)}
          className="glass-button flex items-center gap-2 bg-warning/20 border border-warning/30 hover:bg-warning/40 text-warning px-3 py-1.5 rounded-lg text-sm"
        >
          <Terminal className="w-4 h-4" /> Open Test Simulator
        </button>
      </div>

      <div className="flex-1 glass-card overflow-hidden flex">
        {/* Left Sidebar - Contacts list */}
        <div className="w-80 border-r border-borderCol/50 flex flex-col bg-surface/30">
          <div className="p-4 border-b border-borderCol/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chats..." 
                className="glass-input pl-10 py-2 w-full text-sm" 
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="p-8 text-center text-textMuted animate-pulse text-sm">Loading conversations...</div>
            ) : filteredChats.length === 0 ? (
              <div className="p-8 text-center text-textMuted text-xs space-y-2">
                <MessageSquare className="w-8 h-8 text-borderCol mx-auto" />
                <p>No active chats found.</p>
                <p className="text-[10px]">Use the "Test Simulator" to trigger a simulated customer message!</p>
              </div>
            ) : (
              filteredChats.map(chat => (
                <div 
                  key={chat.id} 
                  onClick={() => setActiveChat(chat)}
                  className={`p-4 flex gap-3 cursor-pointer transition-colors border-b border-borderCol/20 ${activeChat?.id === chat.id ? 'bg-surfaceLight/60' : 'hover:bg-surfaceLight/30'}`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-surface border border-borderCol flex items-center justify-center text-primary font-bold">
                      {chat.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-semibold text-textMain truncate">{chat.name}</h3>
                      <span className="text-[10px] text-textMuted flex-shrink-0">
                        {new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-textMuted truncate flex-1 mr-2">{chat.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Area - Chat Window */}
        {activeChat ? (
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="h-16 px-4 border-b border-borderCol/50 bg-surface/80 backdrop-blur-md flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surfaceLight border border-borderCol flex items-center justify-center text-primary font-bold">
                  {activeChat.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-textMain">{activeChat.name}</h2>
                  <p className="text-xs text-textMuted">+{activeChat.phone}</p>
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
                <button className="text-textMuted hover:text-primary transition-colors"><MoreVertical className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex justify-center mb-6">
                <span className="text-xs bg-surface/80 backdrop-blur-sm px-3 py-1 rounded-lg text-textMuted border border-borderCol/50">Today</span>
              </div>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.direction === 'Outgoing' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-xl px-4 py-2 relative group ${
                    msg.direction === 'Outgoing' ? 'bg-primary/20 text-black rounded-tr-none border border-primary/30' : 'bg-surfaceLight/80 text-textMain rounded-tl-none border border-borderCol/50'
                  }`}>
                    {/* Render AI Tag for outbound auto-replies */}
                    {msg.direction === 'Outgoing' && msg.isAi !== false && (
                      <div className="flex items-center gap-1 mb-1 text-primary">
                        <Bot className="w-3 h-3" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm">{msg.content}</p>
                    <div className="flex items-center gap-1 mt-1 justify-end text-textMuted">
                      <span className="text-[10px]">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {msg.direction === 'Outgoing' && <CheckCheck className="w-3 h-3 text-primary" />}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* AI Suggestions (Only visible when takeover is active) */}
            {takeover && (
              <div className="px-4 py-2 bg-surface/80 backdrop-blur-md border-t border-borderCol/50 flex gap-2 overflow-x-auto custom-scrollbar">
                <button 
                  onClick={() => setTypedMessage("Hi, let's schedule a site visit for you tomorrow at 11 AM.")}
                  className="flex-shrink-0 text-xs bg-primary/10 text-primary border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <Sparkles className="w-3 h-3 inline mr-1" /> Suggest time for tomorrow
                </button>
                <button 
                  onClick={() => setTypedMessage("I will send over the detailed brochure with prices on your email right away.")}
                  className="flex-shrink-0 text-xs bg-primary/10 text-primary border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <Sparkles className="w-3 h-3 inline mr-1" /> Send brochure info
                </button>
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-surface/90 backdrop-blur-md border-t border-borderCol/50 flex items-end gap-3">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*,application/pdf,.doc,.docx"
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    alert(`Selected file: ${e.target.files[0].name}. (File upload feature to be connected to backend)`);
                    e.target.value = null; // reset
                  }
                }}
              />
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-textMuted hover:text-primary transition-colors"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <div className="flex-1 bg-surfaceLight border border-borderCol rounded-xl overflow-hidden flex items-center">
                <textarea 
                  rows="1"
                  value={typedMessage}
                  onChange={(e) => setTypedMessage(e.target.value)}
                  placeholder={!takeover ? "Disable AI Auto-Reply to manual type..." : "Type a message..."}
                  disabled={!takeover}
                  className="w-full bg-transparent px-4 py-3 text-sm text-textMain focus:outline-none resize-none disabled:opacity-50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={!takeover || !typedMessage.trim()}
                className={`p-3 rounded-xl flex items-center justify-center transition-all ${
                  takeover && typedMessage.trim() ? 'bg-primary text-background hover:-translate-y-0.5 shadow-lg shadow-primary/20' : 'bg-surfaceLight text-textMuted cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-surface/10 p-8">
            <div className="text-center text-textMuted max-w-sm space-y-3">
              <MessageSquare className="w-12 h-12 text-borderCol mx-auto" />
              <h3 className="font-semibold text-textMain">No Chat Selected</h3>
              <p className="text-xs">Select an ongoing conversation from the sidebar, or trigger a new client simulation to see the CRM in action!</p>
            </div>
          </div>
        )}
      </div>

      {/* Simulator Modal Drawer */}
      {isSimOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-background/60 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-md h-full flex flex-col p-6 animate-fade-in relative">
            <button 
              onClick={() => setIsSimOpen(false)}
              className="absolute top-4 right-4 text-textMuted hover:text-textMain transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-textMain flex items-center gap-2"><Terminal className="w-5 h-5 text-warning" /> WhatsApp Lead Simulator</h2>
              <p className="text-xs text-textMuted mt-1">Mock an incoming WhatsApp message from a customer to test the CRM webhook and the OpenAI Auto-Responder.</p>
            </div>

            <form onSubmit={handleSimulateMessage} className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-textMuted mb-1">Customer Name</label>
                  <input 
                    type="text" 
                    value={simName}
                    onChange={(e) => setSimName(e.target.value)}
                    required
                    className="glass-input w-full text-sm"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-textMuted mb-1">Customer Phone Number</label>
                  <input 
                    type="text" 
                    value={simPhone}
                    onChange={(e) => setSimPhone(e.target.value)}
                    required
                    className="glass-input w-full text-sm"
                    placeholder="e.g. 919876543210"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textMuted mb-1">Message Text</label>
                  <textarea 
                    rows="4"
                    value={simText}
                    onChange={(e) => setSimText(e.target.value)}
                    required
                    className="glass-input w-full text-sm resize-none"
                    placeholder="e.g. Hi Priya, I filled out the form on 99acres. What is the price range for Godrej Prime?"
                  ></textarea>
                </div>
              </div>

              <div className="pt-4 border-t border-borderCol/50 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsSimOpen(false)}
                  className="glass-button-secondary text-xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={simLoading}
                  className="glass-button text-xs bg-warning hover:bg-warning/80 text-background font-bold flex items-center gap-1"
                >
                  {simLoading ? 'Simulating...' : 'Trigger Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

