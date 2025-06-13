import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';


const GROQ_API_KEY = process.env.GROQ_API;
if (!GROQ_API_KEY) {
  throw new Error('Missing GROQ_API_KEY in environment');
}

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

const SYSTEM_PROMPT =
  "You are a helpful assistant. You are a conversational chatbot. Your task is to mimic human-like chats for any given messages. Respond like a human.";

interface FrontendMessage {
  id: number;
  text: string;
  timestamp: string;
  isOwn: boolean;
  status: string;
}

function isFrontendMessage(obj: unknown): obj is FrontendMessage {
  if (typeof obj !== 'object' || obj === null) return false;
  const o = obj as Record<string, unknown>;
  return (
    typeof o.id === 'number' &&
    typeof o.text === 'string' &&
    typeof o.timestamp === 'string' &&
    typeof o.isOwn === 'boolean' &&
    typeof o.status === 'string'
  );
}

interface ChatResponse {
  content: string | null;
  error: string | null;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: unknown = await req.json();

    if (
      typeof body !== 'object' ||
      body === null ||
      !('messages' in body)
    ) {
      const res: ChatResponse = {
        content: null,
        error: 'Invalid payload: messages array required',
      };
      return NextResponse.json(res, { status: 400 });
    }

    const maybeMessages = (body as Record<string, unknown>).messages;
    if (!Array.isArray(maybeMessages)) {
      const res: ChatResponse = {
        content: null,
        error: 'Invalid payload: messages array required',
      };
      return NextResponse.json(res, { status: 400 });
    }


    const rawMessages = maybeMessages as unknown[];

    const frontendMessages: FrontendMessage[] = [];
    for (const item of rawMessages) {
      if (isFrontendMessage(item)) {
        frontendMessages.push(item);
      } else {
        const res: ChatResponse = {
          content: null,
          error:
            'Invalid payload: each message must have id, text, timestamp, isOwn, status',
        };
        return NextResponse.json(res, { status: 400 });
      }
    }

    type ChatCompletionMessage = {
      role: 'system' | 'user' | 'assistant';
      content: string;
    };

    const groqMessages: ChatCompletionMessage[] = frontendMessages.map((msg) => {
      const role: 'user' | 'assistant' = msg.isOwn ? 'user' : 'assistant';
      return { role, content: msg.text };
    });

    const allMessages: ChatCompletionMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...groqMessages,
    ];

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: allMessages,
    });

    const aiContent = completion.choices?.[0]?.message?.content || '';

    const res: ChatResponse = {
      content: aiContent,
      error: null,
    };
    return NextResponse.json(res);
  } catch (err: unknown) {
    console.error('Error in /api/chat:', err);
    const res: ChatResponse = {
      content: null,
      error: 'AI call failed',
    };
  
    return NextResponse.json(res, { status: 200 });
  }
}
