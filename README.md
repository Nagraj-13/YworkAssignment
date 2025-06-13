# Responsive Chat Application

A modern, responsive chat application built with Next.js, featuring AI-driven replies, persistent chat history, dark/light themes, and smooth UI interactions. This project fulfills the assignment requirements from Ywork.ai and adds several enhancements beyond the original spec.

> **Assignment Reference:**
> Build a responsive chat app frontend with a fixed top navbar, sidebar listing contacts, opening conversations on click, dummy chat functionality (predefined or random bot replies), and compatibility with desktop/mobile screens. Bonus for Next.js, typing animation, message status, chat transitions, and smooth sidebar collapse .

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Demo & Repository](#demo--repository)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Environment Variables](#environment-variables)
  * [Running Locally](#running-locally)
* [Folder Structure](#folder-structure)
* [Usage](#usage)
* [Deployment](#deployment)
* [Additional Notes](#additional-notes)
* [License](#license)

---

## Features

* **Responsive Design**: Adapts seamlessly to desktop and mobile viewports, with a fixed top navbar and collapsible sidebar for contacts.
* **Dark & Light Themes**: Toggle between dark and light modes, with Tailwind CSS custom variables for consistent styling across components.
* **AI Integration**: Real-time AI-generated responses using the Groq SDK in a Next.js API route. On failures, falls back to predefined bot replies.
* **Typing Indicator **: Shows a “typing...” animation while awaiting AI reply.
* **Message Status**: Displays statuses such as “sent” or “received” for each message bubble.
* **Smooth Animations**: Chat message transition animations, smooth sidebar collapse, and scroll-to-bottom behavior on new messages/typing indicator.

* **Next.js App Router**: Built with Next.js App Router (TypeScript), providing API routes for AI calls and history endpoints.
* **Hosted on Vercel**: Deployed with zero-configuration on Vercel for instant live demo.
* **Accessibility**: Keyboard-friendly input (Enter to send), focus outlines, and semantic HTML for screen readers.

---

## Tech Stack

* **Framework**: Next.js (React) with App Router and TypeScript
* **UI & Styling**: Tailwind CSS with custom theme variables for light/dark, ShadCN UI components for input/button, lucide-react icons.
* **AI**: Groq SDK for chat completions (e.g., `llama-3.3-70b-versatile`), Next.js API route handling.
* **State Management**: React hooks (`useState`, `useEffect`).

* **Animations**: CSS transitions, Tailwind animate utilities, custom TypingIndicator animations.
* **Deployment**: Vercel (CI/CD, environment variables management).

---

## Demo & Repository

* **Live Demo**: [https://ychat-theta.vercel.app/](https://ychat-theta.vercel.app/)

* **GitHub**: [https://github.com/Nagraj-13/YworkAssignment](https://github.com/Nagraj-13/YworkAssignment)



---

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

* **Node.js** v16+ and npm/yarn installed
* **Groq API Key**: Access to Groq SDK (set in environment)
* (Optional) If using backend persistence: a database (e.g., MongoDB) and connection string

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Nagraj-13/YworkAssignment
   cd <app-name>
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Variables

Create a `.env.local` file in the project root with:

```env
# Groq AI integration (server-side only)
GROQ_API=your_groq_api_key_here
```

* **GROQ\_API\_KEY**: Your Groq API key for chat completions. Keep this secret; do not prefix with NEXT\_PUBLIC\_.

After adding `.env.local`, restart the Next.js dev server.

### Running Locally

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser. The app should load, showing the sidebar with contacts and chat area.

---

## Folder Structure

```
.
├── app
│   ├── api
│   │   ├── chat
│   │   │   └── route.ts         # Combined endpoint: save user msg, call AI, save AI reply
│   │   └── chat
│   │       └── history
│   │           └── route.ts     # GET endpoint: fetch chat history per contact
│   ├── layout.tsx
│   └── page.tsx                 # Home page (Chat container)
├── components
│   ├── Navbar.tsx               # Fixed top navbar
│   ├── Sidebar.tsx              # Contacts sidebar with collapse
│   ├── ChatArea.tsx             # Main chat area, input, messages listing
│   ├── MessageBubble.tsx        # Individual message component with status styling
│   ├── TypingIndicator.tsx      # Animated dots indicator
│   └── ui                      # Reusable UI components (Button, Textarea, ScrollArea)
├── types
│   └── chatTypes.ts             # TypeScript interfaces for Contact, Message
├── seed
│   └── chatData.ts              # initialContacts and initialMessages for demo/fallback
├── lib
│   └── mongodb.ts               # (Optional) MongoDB connection helper
├── public                       # Static assets (e.g., logo, icons)
├── styles                       # Global CSS or Tailwind config as needed
├── .env.local                   # Environment variables (not committed)
├── next.config.js               # Next.js config
├── package.json
└── README.md                    # This file
```

---

## Usage

1. **Select a Contact**: Click on a contact in the sidebar to load or start a conversation.
2. **Send Message**: Type in the input area and press Enter or click Send.
3. **Typing Indicator**: Once sent, a “typing...” indicator appears as the AI processes and simulates a human-like delay (4–10 seconds).
4. **AI Replies**: On successful AI call, the response is displayed. On errors (network issues or AI failures), the app uses a random fallback reply for continued UX.
5. **Theme Toggle**: Switch between Dark and Light themes via the toggle in the Navbar (or system preference), with colors applied via CSS variables and Tailwind.
6. **Persistent History**: Chats persist across page refreshes via `localStorage` (or backend fetch if implemented), so you won’t lose conversation when reloading.
7. **Responsive Layout**: On mobile, the sidebar collapses after selecting a contact. The navbar remains fixed at the top on all viewports.

---

## Deployment

The app is configured for seamless deployment on Vercel:

1. **Push to GitHub**: Ensure your code is in a GitHub repository.
2. **Connect to Vercel**: In Vercel dashboard, import the repository; Vercel auto-detects Next.js.
3. **Set Environment Variables**: In Vercel project settings, add `GROQ_API_KEY`.
4. **Deploy**: Vercel builds and deploys automatically on pushes to the main branch.

**Live URL:**
[https://ychat-theta.vercel.app/](https://ychat-theta.vercel.app/)

---

## Additional Notes

* **AI Model**: The default model used is `llama-3.3-70b-versatile`. You may adjust the model name or system prompt in `app/api/chat/route.ts`.
* **Token Limits**: For long conversations, the API route fetches only the most recent N messages (e.g., last 20) to avoid exceeding token limits.
* **Error Handling**: The API returns `{ content: null, error: "..." }` on failures; the frontend falls back to predefined bot responses for robust UX.
* **Customization**:

  * Adjust theme colors in `tailwind.config.js` or CSS variables as per branding.
  * Extend persistence: replace or augment `localStorage` with a real backend (e.g., MongoDB as shown).
  * Streaming responses: If Groq SDK supports streaming, you can implement partial rendering of replies.
  * Authentication: Integrate NextAuth or other auth to isolate chat history by user.
* **Performance**: Components leverage React hooks and functional updates to avoid stale state. The random delay simulates realistic typing behavior.

---

## License

This project is provided as part of a frontend assignment and demo. Feel free to adapt and extend for personal or educational use.

---

Thank you for reviewing this chat application! It demonstrates responsive design, enhanced UX with dark/light mode, AI-driven interactions, and modern Next.js best practices.
