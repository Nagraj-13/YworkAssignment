'use client';

import { X } from 'lucide-react';
import { Contact } from '../../types/chatTypes';
import ContactItem from './ContactItem';
import { Button } from './ui/button';

interface SidebarProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onContactSelect: (contact: Contact) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  contacts,
  selectedContact,
  onContactSelect,
  isOpen,
  onClose
}: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:static top-0 left-0 h-full bg-card border-r border-border z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-80 md:w-80 flex flex-col
      `}>
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Chats</h2>
          <Button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors md:hidden"
          >
            <X className="w-5 h-5 text-muted" />
          </Button>
        </div>
        
        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              isSelected={selectedContact?.id === contact.id}
              onClick={() => onContactSelect(contact)}
            />
          ))}
        </div>
      </div>
    </>
  );
}