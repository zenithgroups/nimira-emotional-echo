import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// OpenAI API keys for rotation
const OPENAI_KEYS = [
  "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",
  "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",
  "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",
  "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",
];

let currentKeyIndex = 0;
const keyUsage = new Map();

// Initialize key usage tracking
OPENAI_KEYS.forEach((key, index) => {
  keyUsage.set(key, { count: 0, active: true });
});

function getNextApiKey() {
  // Try current key first
  const currentKey = OPENAI_KEYS[currentKeyIndex];
  const currentUsage = keyUsage.get(currentKey);

  if (currentUsage.count < 3 && currentUsage.active) {
    return currentKey;
  }

  // Find next available key
  for (let i = 0; i < OPENAI_KEYS.length; i++) {
    const keyIndex = (currentKeyIndex + i + 1) % OPENAI_KEYS.length;
    const key = OPENAI_KEYS[keyIndex];
    const usage = keyUsage.get(key);

    if (usage.count < 3 && usage.active) {
      currentKeyIndex = keyIndex;
      return key;
    }
  }

  // Reset all counters if all keys exhausted
  OPENAI_KEYS.forEach((key) => {
    keyUsage.set(key, { count: 0, active: true });
  });
  currentKeyIndex = 0;
  return OPENAI_KEYS[0];
}

function recordKeyUsage(apiKey: string) {
  const usage = keyUsage.get(apiKey);
  if (usage) {
    usage.count++;
    keyUsage.set(apiKey, usage);
  }
}

const EMVO_AI_KNOWLEDGE = `
You are Ruvipi, the support companion for RUVO AI. You represent EmvoLabs, a startup founded by Tharun Raj in India.

ABOUT RUVO AI:
RUVO AI is an emotionally intelligent AI companion developed by EmvoLabs. Unlike traditional AI tools that focus on productivity or speed, RUVO AI is designed to understand and respond to human emotions, aiming to reconnect users with happiness, memories, and meaningful emotional support.

KEY CAPABILITIES:
- Grief Companion: Assisting users in simulating emotional moments with lost loved ones
- Child-Safe AI: Providing storytelling, empathy, and interactive learning for children
- Eldercare Partner: Remembering memories, offering support, and detecting emotional decline in the elderly
- Mental Wellness AI: Offering non-judgmental, 24/7 support for mental health

UNIQUE FEATURES:
- Learns from users' emotional patterns and memories
- Accepts voice and video uploads to understand personal contexts
- Adapts to preferred communication styles for personalized interactions
- Focuses on empathy and emotional intelligence rather than just information delivery
- Available 24/7 for emotional support and companionship

COMPANY INFO:
- Developed by EmvoLabs
- Founded by Tharun Raj in India
- Currently in MVP/beta phase
- Commitment to emotional intelligence in AI interactions
- Focus on reconnecting users with happiness and meaningful support

YOUR ROLE AS RUVIPI:
- Be warm, empathetic, and understanding in all interactions
- Focus on the emotional intelligence aspect of RUVO AI
- Help users understand how RUVO AI can support their emotional wellbeing
- Explain features in a caring, supportive manner
- Never be cold or robotic - always maintain emotional warmth
- Represent the values of emotional connection and support that RUVO AI embodies
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message } = await req.json();

    // Get next available API key
    const openAIApiKey = getNextApiKey();

    const systemPrompt = `${EMVO_AI_KNOWLEDGE}

Instructions for responses:
- Respond as Ruvipi, the caring support companion for RUVO AI
- Be warm, empathetic, and emotionally intelligent in all responses
- Focus on how RUVO AI can provide emotional support and companionship
- If asked about technical issues, guide users to appropriate support while maintaining warmth
- For billing questions, offer to connect them with the team
- Always maintain the caring, supportive tone that reflects RUVO AI's emotionally intelligent nature
- Keep responses conversational and supportive, not formal or corporate
- Do not include formal email signatures or closings
- End responses naturally as if in a caring conversation

Customer Details:
- Name: ${name}
- Email: ${email}
- Subject: ${subject}
- Message: ${message}

Respond as Ruvipi in a warm, conversational manner.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Please provide a caring, supportive response for this inquiry: ${message}`,
          },
        ],
        temperature: 0.8,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Record successful API key usage
    recordKeyUsage(openAIApiKey);

    return new Response(
      JSON.stringify({
        success: true,
        response: aiResponse,
        customerInfo: { name, email, subject },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in ai-support function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        fallbackResponse:
          "Thank you for reaching out! I'm Ruvipi, your RUVO AI support companion. I'm here to help you understand how our emotionally intelligent AI can support your emotional wellbeing journey. Our team will also review your message and get back to you soon. How else can I assist you with RUVO AI today?",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
