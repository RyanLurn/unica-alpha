import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { env } from "@/lib/env";

const openrouter = createOpenRouter({
  apiKey: env.VITE_OPENROUTER_API_KEY,
});

const deepseekR1Free = openrouter.chat("deepseek/deepseek-r1-0528:free");

const deepseekR1 = openrouter.chat("deepseek/deepseek-r1-0528");

export { deepseekR1Free, deepseekR1 };
