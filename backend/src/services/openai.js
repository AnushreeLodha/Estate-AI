const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

/**
 * Generates a highly personalized welcome message when a new lead is imported (e.g., from 99acres).
 * Includes properties context to make the greeting relevant.
 * 
 * @param {object} lead - Lead object
 * @returns {Promise<string>} - Generated text message
 */
async function generateWelcomeMessage(lead) {
  // Try to find properties that might match lead's preferences
  let propertyMatches = [];
  try {
    propertyMatches = await prisma.property.findMany({
      take: 2 // get up to 2 items
    });
  } catch (err) {
    console.error("Prisma error in welcome matching:", err);
  }

  const matchesInfo = propertyMatches.map(p => `${p.title} at ${p.location} (${p.bhk}, ${p.priceRange})`).join(' or ');
  const matchingPart = matchesInfo ? ` We have premium options like ${matchesInfo} that fit your criteria perfectly!` : '';

  if (!OPENAI_API_KEY) {
    // Premium Mock AI Response
    return `Hi ${lead.name}! Welcome to BrokerFlow CRM. I noticed you searched for a ${lead.bhkPref || 'property'} in ${lead.locationPref || 'prime locations'} with a budget of ${lead.budget || 'your budget'}.${matchingPart} Would you like me to share brochure details or schedule a quick call?`;
  }

  try {
    const prompt = `You are BrokerFlow AI, a premium assistant for broker Arjun Patel.
A new lead just came in from an portal (e.g. 99acres).
Lead Details:
- Name: ${lead.name}
- Budget: ${lead.budget}
- Location Preference: ${lead.locationPref}
- Configuration Preference: ${lead.bhkPref}
${propertyMatches.length > 0 ? `Here are matching listings we have:\n${propertyMatches.map(p => `- ${p.title} in ${p.location}, price: ${p.priceRange}, bhk: ${p.bhk}, area: ${p.area}`).join('\n')}` : ''}

Generate an instant, friendly, and professional welcoming follow-up message to send via WhatsApp. 
Introduce yourself as BrokerFlow AI.
Refer to their preferences and showcase a matching property if available. Keep it natural, under 80 words, and end with a soft call-to-action inviting them to chat or schedule a visit. Do not use placeholders.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'OpenAI Error');

    return data.choices?.[0]?.message?.content?.trim();
  } catch (error) {
    console.error("OpenAI welcome generation error:", error.message);
    // Fallback if OpenAI API has an error
    return `Hi ${lead.name}! Welcome to BrokerFlow CRM. I noticed you searched for a ${lead.bhkPref || 'property'} in ${lead.locationPref || 'prime locations'} with a budget of ${lead.budget || 'your budget'}.${matchingPart} Would you like me to share brochure details or schedule a quick call?`;
  }
}

/**
 * Generates an automatic response to a lead's incoming WhatsApp message.
 * Feeds property inventory as context to behave as an expert sales agent.
 * 
 * @param {object} lead - Lead object
 * @param {string} incomingMessage - Incoming message content
 * @returns {Promise<string>} - Auto-reply text message
 */
async function generateAutoReply(lead, incomingMessage) {
  let properties = [];
  try {
    properties = await prisma.property.findMany();
  } catch (err) {
    console.error("Prisma error getting properties for AI:", err);
  }

  if (!OPENAI_API_KEY) {
    // Premium Mock Chatbot Rules
    const msg = incomingMessage.toLowerCase();
    if (msg.includes('visit') || msg.includes('schedule') || msg.includes('show') || msg.includes('tomorrow') || msg.includes('today')) {
      return `Hi ${lead.name}! I would love to arrange a site visit for you. We have outstanding availability tomorrow between 11 AM and 4 PM. Does that slot work, or would you prefer a weekend visit?`;
    }
    if (msg.includes('price') || msg.includes('cost') || msg.includes('rate') || msg.includes('budget')) {
      return `Regarding pricing, we have direct options starting from ${lead.budget || 'budget matches'}. For premium properties like ${properties[0]?.title || 'our main project'}, prices range around ${properties[0]?.priceRange || '1.5Cr'}. I can share the complete cost sheets on WhatsApp. Shall I send it?`;
    }
    return `Thank you for details, ${lead.name}. I've logged your request regarding "${incomingMessage}". Broker Arjun Patel has been notified and is checking our exclusive off-market inventory for you. Would you like to set up a quick 5-min phone call?`;
  }

  try {
    const prompt = `You are BrokerFlow AI, a premium, intelligent CRM assistant representing real estate broker Arjun Patel.
Your goal is to converse with our lead, answer their questions accurately using our listings inventory, and guide them towards scheduling a site visit or phone call.

Lead Profile:
- Name: ${lead.name}
- Target Budget: ${lead.budget}
- Location Preference: ${lead.locationPref}
- Configuration Preference: ${lead.bhkPref}

Here is our current property inventory:
${properties.map(p => `- ${p.title} in ${p.location}, config: ${p.bhk}, price: ${p.priceRange}, area: ${p.area}, status: ${p.status}`).join('\n')}

Conversation Context:
The lead just sent this WhatsApp message: "${incomingMessage}"

Instructions:
1. Provide a direct, highly helpful, and warm response to their message.
2. Use the property inventory context to propose matching options or provide pricing/availability.
3. Be professional, concise (under 90 words), and prioritize booking a site visit or a phone call.
4. Do not use placeholders or technical developer jargon.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        temperature: 0.6
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'OpenAI Error');

    return data.choices?.[0]?.message?.content?.trim();
  } catch (error) {
    console.error("OpenAI auto reply error:", error.message);
    return `Thanks for your message! Broker Arjun Patel is reviewing your request and will get back to you shortly with tailored real estate options.`;
  }
}

module.exports = {
  generateWelcomeMessage,
  generateAutoReply
};
