'use client';

import { Contact } from "../../types/chatTypes"; 

interface ContactItemProps {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}

export default function ContactItem({ contact, isSelected, onClick }: ContactItemProps) {
  const getAvatarColor = (avatar: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-indigo-500'
    ];
    const index = avatar.charCodeAt(0) % colors.length;
    return colors[index];
  };

 return (
    <div
      onClick={onClick}
      className={`
        flex items-center p-4 hover:bg-muted cursor-pointer transition-colors duration-200
        ${isSelected ? 'bg-muted border-l-4 rounded-l-sm border-primary' : ''}
      `}
    >
      <div className="relative">
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold
          ${getAvatarColor(contact.avatar)}
        `}>
          {contact.avatar}
        </div>
        {contact.isOnline && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
        )}
      </div>
      
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground truncate">
            {contact.name}
          </h3>
          <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
            {contact.timestamp}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-muted-foreground truncate">
            {contact.lastMessage}
          </p>
          {contact.unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2 flex-shrink-0">
              {contact.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}