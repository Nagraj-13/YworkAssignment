'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Contact, Message } from '../../types/chatTypes';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';

interface ChatAreaProps {
  contact: Contact | null;
  messages: Message[];
  onSendMessage: (text: string) => void;
  isSidebarOpen: boolean;
}

export default function ChatArea({ contact, messages, onSendMessage, isSidebarOpen }: ChatAreaProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() && contact) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
      if(!newMessage || newMessage===""){
        setIsTyping(true);
      }
      if(newMessage){
        setIsTyping(false)
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!contact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Welcome to ChatApp</h3>
          <p className="text-muted-foreground">Select a contact to start messaging</p>
        </div>
      </div>
    );
  }

  const getAvatarColor = (avatar: string) => {
    const colors = [
      'bg-chart-1',
      'bg-chart-2',
      'bg-chart-3', 
      'bg-chart-4',
      'bg-chart-5',
      'bg-primary'
    ];
    const index = avatar.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className={`
      flex-1 flex flex-col bg-card transition-all duration-300
      ${isSidebarOpen ? 'md:ml-0' : 'md:ml-0'}
    `}>
      {/* Chat Header */}
      <div className="bg-card border-b  border-border px-6 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold
              ${getAvatarColor(contact.avatar)}
            `}>
              {contact.avatar}
            </div>
            {contact.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{contact.name}</h3>
            <p className="text-sm text-green-500">
              {contact.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className='h-[535px]'>
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            showAnimation={index === messages.length - 1}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="bg-card border-t border-border p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full p-3 border border-primary bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none placeholder:text-muted-foreground"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}