'use client';

import { useState, useEffect } from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { Message } from '../../types/chatTypes';

interface MessageBubbleProps {
  message: Message;
  showAnimation?: boolean;
}

export default function MessageBubble({ message, showAnimation = false }: MessageBubbleProps) {
  const [isVisible, setIsVisible] = useState(!showAnimation);

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  return (
    <div className={`
      flex transition-all duration-500 ease-out
      ${message.isOwn ? 'justify-end' : 'justify-start'}
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
    `}>
      <div className={`
        max-w-xs lg:max-w-md px-4 py-2 rounded-2xl
        ${message.isOwn 
          ? 'bg-primary text-primary-foreground rounded-br-md' 
          : 'bg-muted text-foreground rounded-bl-md'
        }
        transform transition-all duration-300 hover:scale-[1.02]
      `}>
        <p className="text-sm leading-relaxed">{message.text}</p>
        <div className={`
          flex items-center justify-end mt-1 space-x-1
          ${message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}
        `}>
          <span className="text-xs">{message.timestamp}</span>
          {message.isOwn && (
            <div className="flex">
              {message.status === 'sent' && <Check className="w-3 h-3" />}
              {message.status === 'read' && <CheckCheck className="w-3 h-3" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}