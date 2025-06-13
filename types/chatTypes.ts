export interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
  unreadCount: number;
}

export interface Message {
  id: number;
  text: string;
  timestamp: string;
  isOwn: boolean;
  status: 'sent' | 'received' | 'read';
}