
export const initialContacts = [
  {
    id: 1,
    name: 'Emma Thompson',
    avatar: 'EM',
    lastMessage: "I've sent you the latest project files",
    timestamp: '12:45 PM',
    isOnline: true,
    unreadCount: 2
  },
  {
    id: 2,
    name: 'Michael Johnson',
    avatar: 'MJ',
    lastMessage: 'Are we still meeting for coffee tomorrow?',
    timestamp: 'Yesterday',
    isOnline: false,
    unreadCount: 0
  },
  {
    id: 3,
    name: 'Sophia Lee',
    avatar: 'SL',
    lastMessage: 'The design team loved your presentation',
    timestamp: 'Yesterday',
    isOnline: true,
    unreadCount: 1
  },
  {
    id: 4,
    name: 'Robert Brown',
    avatar: 'RB',
    lastMessage: 'Can you review the budget proposal?',
    timestamp: 'Tuesday',
    isOnline: false,
    unreadCount: 0
  },
  {
    id: 5,
    name: 'Amelia Wilson',
    avatar: 'AW',
    lastMessage: 'Thanks for your help with the client presentation',
    timestamp: 'Monday',
    isOnline: true,
    unreadCount: 0
  },
  {
    id: 6,
    name: 'Daniel Martinez',
    avatar: 'DM',
    lastMessage: "Let's schedule a call to discuss the project timeline",
    timestamp: 'May 25',
    isOnline: false,
    unreadCount: 0
  }
];

export const initialMessages: {  } = {
  1: [
    {
      id: 1,
      text: "Sounds great! I've heard good things about their pasta. Looking forward to it!",
      timestamp: '12:00 PM',
      isOwn: false,
      status: 'received'
    },
    {
      id: 2,
      text: "Oh, I almost forgot - do you have the latest version of the client presentation? I want to make sure we're all on the same page for tomorrow.",
      timestamp: '12:05 PM',
      isOwn: false,
      status: 'received'
    },
    {
      id: 3,
      text: "I've just sent it to your email. It includes all the updates we discussed in the last meeting. Let me know if you need anything else!",
      timestamp: '12:15 PM',
      isOwn: true,
      status: 'sent'
    },
    {
      id: 4,
      text: "Got it, thanks! I'll review it before our lunch. See you soon!",
      timestamp: '12:20 PM',
      isOwn: false,
      status: 'received'
    },
    {
      id: 5,
      text: "Looking forward to it! 👋",
      timestamp: '12:25 PM',
      isOwn: true,
      status: 'sent'
    },
     {
      id: 6,
      text: "Got it, thanks! I'll review it before our lunch. See you soon!",
      timestamp: '12:20 PM',
      isOwn: false,
      status: 'received'
    },
    {
      id: 7,
      text: "Looking forward to it! 👋",
      timestamp: '12:25 PM',
      isOwn: true,
      status: 'sent'
    }
  ]
};
