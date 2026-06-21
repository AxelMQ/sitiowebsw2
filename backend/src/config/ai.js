import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("ADVERTENCIA: ¡La variable GEMINI_API_KEY no está definida en las variables de entorno!");
}

export const ai = new GoogleGenAI({ apiKey });
