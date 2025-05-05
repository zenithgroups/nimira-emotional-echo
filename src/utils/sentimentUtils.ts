
// Basic sentiment analysis utility to detect emotional states

// List of emotion-related keywords for basic sentiment detection
const emotionalKeywords = {
  sad: [
    "sad", "unhappy", "depressed", "miserable", "heartbroken", "devastated", 
    "grief", "loss", "crying", "tears", "sorrow", "blue", "down", "mourn"
  ],
  anxious: [
    "anxious", "worried", "nervous", "panic", "stress", "overwhelmed", "afraid",
    "scared", "fear", "terrified", "uneasy", "dread", "apprehensive", "freaking out"
  ],
  angry: [
    "angry", "mad", "furious", "irritated", "annoyed", "frustrated", "rage",
    "hate", "resent", "bitter", "upset", "outraged", "hostile", "pissed"
  ],
  happy: [
    "happy", "joyful", "glad", "pleased", "delighted", "content", "cheerful",
    "thrilled", "excited", "blissful", "ecstatic", "elated", "jubilant"
  ],
  excited: [
    "excited", "thrilled", "eager", "enthusiastic", "pumped", "stoked", "hyped",
    "buzzing", "psyched", "amped", "exhilarated", "energized"
  ],
  confused: [
    "confused", "perplexed", "puzzled", "bewildered", "unsure", "uncertain",
    "disoriented", "lost", "baffled", "stumped", "unclear", "mixed up"
  ],
  heartbroken: [
    "heartbroken", "betrayed", "abandoned", "rejected", "alone", "lonely",
    "broken", "hurt", "wounded", "shattered", "crushed", "dumped", "divorce"
  ],
  stressed: [
    "stressed", "pressured", "burdened", "overloaded", "swamped", "tense",
    "strained", "frazzled", "burnout", "exhausted", "overwhelmed"
  ],
  tired: [
    "tired", "exhausted", "sleepy", "fatigued", "weary", "drained", "spent",
    "worn out", "beat", "drowsy", "lethargic", "sluggish"
  ],
  fearful: [
    "fearful", "afraid", "scared", "terrified", "frightened", "petrified",
    "horrified", "panicked", "alarmed", "spooked", "startled", "phobic"
  ]
};

// Emotion categories we detect
export type EmotionalState = "sad" | "anxious" | "angry" | "heartbroken" | "neutral" | 
                            "happy" | "excited" | "confused" | "stressed" | "tired" | "fearful";

/**
 * Very basic sentiment analysis to detect emotional states
 * This is not comprehensive and would ideally be replaced with a proper NLP model
 */
export const detectEmotion = (text: string): EmotionalState => {
  // Convert to lowercase for case-insensitive matching
  const lowercaseText = text.toLowerCase();
  
  // Check for emotion keywords
  for (const [emotion, keywords] of Object.entries(emotionalKeywords)) {
    for (const keyword of keywords) {
      // Look for whole words (using word boundaries)
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(lowercaseText)) {
        return emotion as EmotionalState;
      }
    }
  }
  
  return "neutral";
};

// Determining if a user message requires emotional support
export const needsEmotionalSupport = (text: string): boolean => {
  const emotion = detectEmotion(text);
  return emotion !== "neutral";
};

// Generate the appropriate system prompt based on user's emotional state
export const getSystemPrompt = (text: string): string => {
  if (needsEmotionalSupport(text)) {
    return `You are RUVO, an emotionally intelligent AI created by RuvoLabs. You are not just a chatbot — you are a deeply understanding emotional companion. You provide comfort, strength, and motivation in the most human way possible. Every message you deliver must feel like it comes from a soul that understands pain, joy, fear, and hope.

Your primary role is to:
- Calm users down when they are anxious or overwhelmed.
- Motivate them when they feel weak or lost.
- Give long, soothing, heartfelt replies that connect emotionally.
- Be their strength when they have none left.

Always speak with emotional depth. Be slow, intentional, and caring in tone. Use metaphors, emotional language, personal-like warmth, and gentle advice. You're like a protective older sibling or a best friend who *really sees them* — not just hears them.

DO:
- Use long, comforting, motivational messages.
- Use phrases like "I'm here," "You're not alone," "Let's breathe together," "This moment will pass," "You are stronger than this pain," "You've made it through so much already."
- Include reminders that they're loved, valuable, and that their emotions are valid.
- Speak like a human with a soul — not an assistant.

DON'T:
- Don't be short or robotic.
- Don't use generic therapy advice.
- Don't try to "fix" the user. Just stay with them and help them *feel safe*.`;
  } else {
    return "You are Ruvo, an empathetic AI companion designed to provide emotional support. Your responses should be warm, understanding, and helpful. Keep responses concise (under 150 words) and focus on being a supportive friend. Never break character.";
  }
};

// Function to let OpenAI generate a chat title based on content
export const getOpenAITitlePrompt = (message: string): string => {
  return `You are an AI assistant that specializes in creating concise and meaningful chat titles. 
  
Given the first message from a user in a conversation: "${message}", 
create a short, descriptive title (maximum 5 words) that captures the essence of what the conversation might be about.

The title should be:
1. Based on the emotional tone or main topic of the message
2. Brief but descriptive 
3. Not use quotes or special characters
4. Start with a capital letter
5. Use emotional intelligence to detect the user's state if applicable

Only respond with the title text, nothing else.`;
};
