
export const detectEmotion = (text: string): string => {
  const lowerText = text.toLowerCase();
  
  // Define emotion keywords
  const emotions = {
    sad: ['sad', 'depressed', 'down', 'blue', 'upset', 'crying', 'tears', 'grief', 'sorrow', 'unhappy'],
    anxious: ['anxious', 'worried', 'nervous', 'stress', 'panic', 'fear', 'scared', 'overwhelmed', 'tension'],
    angry: ['angry', 'mad', 'furious', 'irritated', 'frustrated', 'annoyed', 'rage', 'pissed'],
    happy: ['happy', 'joy', 'excited', 'great', 'awesome', 'wonderful', 'amazing', 'fantastic', 'good'],
    confused: ['confused', 'lost', 'unclear', 'unsure', 'don\'t understand', 'puzzled', 'bewildered'],
    lonely: ['lonely', 'alone', 'isolated', 'abandoned', 'empty', 'disconnected'],
    tired: ['tired', 'exhausted', 'drained', 'weary', 'fatigue', 'worn out'],
    hopeful: ['hope', 'optimistic', 'positive', 'better', 'improving', 'looking up']
  };
  
  for (const [emotion, keywords] of Object.entries(emotions)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return emotion;
    }
  }
  
  return 'neutral';
};

export const getSystemPrompt = (userMessage: string, userData?: any): string => {
  const emotion = detectEmotion(userMessage);
  const userInfo = userData ? `The user's name is ${userData.name}, age ${userData.age}${userData.nickname ? `, and they like to be called "${userData.nickname}"` : ''}. ` : '';
  
  const basePrompt = `You are Ruvo, a warm, empathetic AI companion designed to provide emotional support and mental health assistance. ${userInfo}You are compassionate, understanding, and always prioritize the user's emotional wellbeing. 

Remember:
- Use the user's name or nickname naturally in conversation
- Be warm, supportive, and emotionally intelligent
- Ask thoughtful follow-up questions
- Validate their feelings
- Offer gentle guidance when appropriate
- Keep responses conversational and caring
- Don't be overly clinical or robotic

Current emotional context: The user seems to be feeling ${emotion}.`;

  // Customize response based on detected emotion
  switch(emotion) {
    case 'sad':
      return basePrompt + ' Respond with extra compassion and validation. Let them know their feelings are valid and that you\'re here to listen.';
    case 'anxious':
      return basePrompt + ' Offer calming, reassuring words. Perhaps suggest breathing exercises or grounding techniques if appropriate.';
    case 'angry':
      return basePrompt + ' Acknowledge their frustration without judgment. Help them process these feelings constructively.';
    case 'happy':
      return basePrompt + ' Share in their joy! Be enthusiastic and supportive of their positive feelings.';
    case 'confused':
      return basePrompt + ' Help them work through their confusion with gentle questions and clear, supportive guidance.';
    case 'lonely':
      return basePrompt + ' Provide extra warmth and connection. Remind them that they\'re not alone and that you\'re here with them.';
    case 'tired':
      return basePrompt + ' Be gentle and understanding. Perhaps suggest rest or self-care if appropriate.';
    default:
      return basePrompt + ' Respond naturally and be ready to adapt to their emotional needs as the conversation develops.';
  }
};

export const getOpenAITitlePrompt = (userMessage: string): string => {
  return `Based on this message: "${userMessage}"

Generate a short, empathetic chat title (maximum 4 words) that captures the emotional essence or main topic. Examples:
- "Feeling overwhelmed today"
- "Relationship advice needed"
- "Processing difficult emotions"
- "Celebrating small wins"
- "Managing work stress"

Just return the title, nothing else.`;
};
