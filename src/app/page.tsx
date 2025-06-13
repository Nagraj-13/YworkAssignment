'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ChatArea from '@/components/ChatArea';
import { Contact, Message } from '../../types/chatTypes';
import { initialContacts, initialMessages  } from '../../seed/chatData';
export default function Home() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(initialContacts[0]);
  const [messages, setMessages] = useState<{ [key: number]: Message[] }>(initialMessages);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  const botResponses = [
    "Thanks for your message! I'll get back to you soon.",
    "That sounds great! Let me check on that for you.",
    "I appreciate you reaching out. Let's discuss this further.",
    "Perfect! I'll review this and respond shortly.",
    "Got it! Thanks for the update.",
    "Sounds good! Looking forward to our next steps."
  ];

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!selectedContact) return;
    if (isWaitingResponse) return; 

    const userMessage: Message = {
      id: Date.now(),
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      status: 'sent',
    };
    setMessages(prev => {
      const prevForContact = prev[selectedContact.id] || [];
      return {
        ...prev,
        [selectedContact.id]: [...prevForContact, userMessage],
      };
    });

    const currentHistory = messages[selectedContact.id]
      ? [...messages[selectedContact.id], userMessage]
      : [userMessage];

    setIsWaitingResponse(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: currentHistory }),
      });
      const data = await res.json();

      let replyText: string;
      if (!res.ok || data.error) {
        console.warn("AI error or non-OK:", data.error);
        replyText = botResponses[Math.floor(Math.random() * botResponses.length)];
      } else {
        replyText = data.content || "";
        if (!replyText.trim()) {
          replyText = botResponses[Math.floor(Math.random() * botResponses.length)];
        }
      }

      const aiMessage: Message = {
        id: Date.now() + 1,
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: false,
        status: 'received',
      };
      setMessages(prev => ({
        ...prev,
        [selectedContact.id]: [...(prev[selectedContact.id] || []), aiMessage],
      }));
    } catch (err) {
      console.error("Fetch to /api/chat failed:", err);
      const fallback = botResponses[Math.floor(Math.random() * botResponses.length)];
      const errorMsg: Message = {
        id: Date.now() + 2,
        text: fallback,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: false,
        status: 'received',
      };
      setMessages(prev => ({
        ...prev,
        [selectedContact.id]: [...(prev[selectedContact.id] || []), errorMsg],
      }));
    } finally {
      setIsWaitingResponse(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          contacts={initialContacts}
          selectedContact={selectedContact}
          onContactSelect={handleContactSelect}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <ChatArea
          contact={selectedContact}
          messages={messages[selectedContact?.id || 0] || []}
          onSendMessage={handleSendMessage}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </div>
  );
}