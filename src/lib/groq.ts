// lib/groq.ts – run ONLY on the server, never in the browser
import OpenAI from 'openai';

export const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,               // set in .env.local
  baseURL: 'https://api.groq.com/openai/v1',
});
