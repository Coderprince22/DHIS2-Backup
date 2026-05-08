/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "undefined") {
      throw new Error("GEMINI_API_KEY is not defined. Please check your environment configuration.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

export async function chatWithAI(message: string, history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []) {
  try {
    const ai = getAiClient();
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message: message });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
