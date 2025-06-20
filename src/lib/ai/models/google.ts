import {
  createGoogleGenerativeAI,
  type GoogleGenerativeAIProviderOptions,
} from "@ai-sdk/google";
import { env } from "@/lib/env";

const google = createGoogleGenerativeAI({
  apiKey: env.VITE_GEMINI_API_KEY,
});

const geminiFlash = google("gemini-2.5-flash", {
  useSearchGrounding: true,
  safetySettings: [
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
  ],
});

const geminiPro = google("gemini-2.5-pro", {
  safetySettings: [
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
  ],
});

const googleProviderOptions: GoogleGenerativeAIProviderOptions = {
  thinkingConfig: {
    thinkingBudget: -1, // Dynamic thinking - model decides when to think
    includeThoughts: true,
  },
};

export { geminiFlash, geminiPro, googleProviderOptions };
