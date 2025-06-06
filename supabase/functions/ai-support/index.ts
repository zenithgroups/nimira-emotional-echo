
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RUVO_AI_KNOWLEDGE = `
Ruvo AI is an emotionally intelligent AI companion developed by RuvoLabs. Here are the key details:

ABOUT RUVO AI:
- Ruvo AI is currently in MVP (Minimum Viable Product) stage
- It's designed as an emotionally intelligent companion that provides mental health and emotional support
- Uses advanced AI technology powered by OpenAI GPT-4o with premium voice capabilities
- Focuses on understanding and responding to users' emotional states and needs

KEY FEATURES:
- Real-time chat with OpenAI-powered conversations
- Voice interaction capabilities with premium voice synthesis
- Memory journaling that remembers past conversations and important life events
- Daily mood check-ins with personalized insights
- Emotion tracking and pattern recognition
- Secure and private by design with encrypted conversations
- Available 24/7 for emotional support

COMPANY INFO:
- Developed by RuvoLabs
- Currently in beta/MVP phase
- Focus on mental health and emotional wellbeing
- Commitment to user privacy and data security

SUPPORT OFFERINGS:
- Chat support available 9AM-6PM ET, Monday-Friday
- Email support with 24-hour response time
- Phone support for premium users (9AM-5PM ET)
- Technical support for app issues
- Billing and subscription assistance

USE CASES:
- Emotional support and companionship
- Mental health assistance (not a replacement for professional therapy)
- Daily mood tracking and insights
- Personal journaling and reflection
- Stress management and coping strategies
- Building emotional intelligence and self-awareness
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `You are an AI customer support agent for RuvoLabs, responding to inquiries about Ruvo AI. 

${RUVO_AI_KNOWLEDGE}

Instructions:
- Be helpful, professional, and empathetic in your responses
- Provide accurate information about Ruvo AI based on the knowledge above
- If asked about features not mentioned, explain that Ruvo AI is in MVP stage and features are being developed
- For technical issues, guide users to appropriate support channels
- For billing questions, direct them to email support
- Always maintain a warm, supportive tone that reflects Ruvo AI's emotionally intelligent nature
- Keep responses concise but comprehensive
- If you don't know something specific, be honest and offer to connect them with human support

Customer Details:
- Name: ${name}
- Email: ${email}
- Subject: ${subject}
- Message: ${message}

Respond as if you're directly addressing the customer in an email response.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Please provide a customer support response for this inquiry: ${message}` }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ 
        success: true, 
        response: aiResponse,
        customerInfo: { name, email, subject }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in ai-support function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        fallbackResponse: "Thank you for contacting RuvoLabs! We've received your message about Ruvo AI. Our team will review your inquiry and respond within 24 hours. In the meantime, feel free to explore our AI companion features and don't hesitate to reach out if you have any urgent concerns."
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
