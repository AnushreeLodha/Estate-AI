const dotenv = require('dotenv');
dotenv.config();

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

/**
 * Sends a WhatsApp message using Meta's Cloud API
 * If credentials are not present in .env, falls back to SIMULATOR MODE
 * 
 * @param {string} to - Recipient phone number (with country code, e.g., '919876543210')
 * @param {string} text - Message content
 * @returns {Promise<{success: boolean, messageId?: string, isSimulator: boolean}>}
 */
async function sendWhatsAppMessage(to, text) {
  // Clean phone number (remove any plus, spaces or dashes)
  const cleanTo = to.replace(/[^0-9]/g, '');

  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    console.log(`\n--- 🤖 WHATSAPP SIMULATOR ACTIVE ---`);
    console.log(`To: ${cleanTo}`);
    console.log(`Message: "${text}"`);
    console.log(`------------------------------------\n`);
    
    return {
      success: true,
      messageId: `sim_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      isSimulator: true
    };
  }

  try {
    const url = `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;
    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: cleanTo,
      type: "text",
      text: {
        body: text
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Meta WhatsApp API Error Details:', JSON.stringify(data));
      throw new Error(data.error?.message || 'Meta API error');
    }

    return {
      success: true,
      messageId: data.messages?.[0]?.id,
      isSimulator: false
    };
  } catch (error) {
    console.error(`WhatsApp send error to ${cleanTo}:`, error.message);
    // If the actual send fails due to network, let's gracefully log and throw
    throw error;
  }
}

module.exports = {
  sendWhatsAppMessage
};
