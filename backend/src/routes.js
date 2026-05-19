const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { sendWhatsAppMessage } = require('./services/whatsapp');
const { generateWelcomeMessage, generateAutoReply } = require('./services/openai');

const prisma = new PrismaClient();
const router = express.Router();

// --- DASHBOARD STATS ---
router.get('/dashboard/stats', async (req, res) => {
  try {
    const totalLeads = await prisma.lead.count();
    const activeProperties = await prisma.property.count({ where: { status: 'Ready to Move' } }); // simplified
    const siteVisits = await prisma.siteVisit.count({ where: { status: 'Pending' } });

    res.json({
      totalLeads,
      activeProperties,
      pendingVisits: siteVisits,
      // Mocked AI stats
      aiMessagesSent: 1245,
      avgResponseTime: '2 mins'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- LEADS CRUD ---
router.get('/leads', async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/leads', async (req, res) => {
  try {
    const newLead = await prisma.lead.create({
      data: req.body
    });

    // Asynchronously trigger instant AI welcome follow-up on WhatsApp
    if (newLead.phone) {
      setImmediate(async () => {
        try {
          const welcomeText = await generateWelcomeMessage(newLead);
          
          // Log welcome message in DB
          await prisma.message.create({
            data: {
              leadId: newLead.id,
              content: welcomeText,
              direction: 'Outgoing'
            }
          });

          // Send welcome message
          await sendWhatsAppMessage(newLead.phone, welcomeText);
          console.log(`Instant AI Welcome Message sent to lead ${newLead.name}`);
        } catch (err) {
          console.error("Failed to execute automatic welcome trigger:", err.message);
        }
      });
    }

    res.status(201).json(newLead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- PROPERTIES CRUD ---
router.get('/properties', async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/properties', async (req, res) => {
  try {
    const newProperty = await prisma.property.create({
      data: req.body
    });
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/properties/:id', async (req, res) => {
  try {
    const updatedProperty = await prisma.property.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/properties/:id', async (req, res) => {
  try {
    await prisma.property.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- WHATSAPP CLOUD API & SIMULATION ---

// Webhook validation
router.get('/whatsapp/webhook', (req, res) => {
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'brokerflow_secret';
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === verifyToken) {
      console.log('Webhook verified successfully!');
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }
  res.sendStatus(404);
});

// Incoming message webhook receiver
router.post('/whatsapp/webhook', async (req, res) => {
  try {
    const body = req.body;

    if (body.object === 'whatsapp_business_account') {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const message = value?.messages?.[0];

      if (message && message.type === 'text') {
        const fromPhone = message.from;
        const text = message.text?.body;

        // Try to match active lead by last 10 digits
        let lead = await prisma.lead.findFirst({
          where: {
            phone: { contains: fromPhone.slice(-10) }
          }
        });

        if (!lead) {
          lead = await prisma.lead.create({
            data: {
              name: value.contacts?.[0]?.profile?.name || `New WhatsApp Lead`,
              phone: fromPhone,
              budget: 'Not Specified',
              locationPref: 'Not Specified',
              bhkPref: 'Not Specified',
              status: 'New'
            }
          });
        }

        // Save incoming message
        await prisma.message.create({
          data: {
            leadId: lead.id,
            content: text,
            direction: 'Incoming'
          }
        });

        // Trigger AI auto reply
        const replyText = await generateAutoReply(lead, text);
        
        await prisma.message.create({
          data: {
            leadId: lead.id,
            content: replyText,
            direction: 'Outgoing'
          }
        });

        await sendWhatsAppMessage(lead.phone, replyText);
      }
      return res.status(200).send('EVENT_RECEIVED');
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.error("Webhook processing error:", error.message);
    res.sendStatus(500);
  }
});

// Outgoing message sender (triggered manually by Broker from frontend)
router.post('/whatsapp/send', async (req, res) => {
  const { leadId, content } = req.body;
  if (!leadId || !content) {
    return res.status(400).json({ error: "leadId and content are required" });
  }

  try {
    const lead = await prisma.lead.findUnique({
      where: { id: leadId }
    });

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    // Save message to DB
    const newMessage = await prisma.message.create({
      data: {
        leadId,
        content,
        direction: 'Outgoing'
      }
    });

    // Send via WhatsApp
    await sendWhatsAppMessage(lead.phone, content);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Simulate receiving a WhatsApp message (Simulator Dashboard helpers)
router.post('/whatsapp/simulate-incoming', async (req, res) => {
  const { phone, text, name } = req.body;
  if (!phone || !text) {
    return res.status(400).json({ error: "phone and text are required for simulation" });
  }

  try {
    let lead = await prisma.lead.findFirst({
      where: {
        phone: { contains: phone.slice(-10) }
      }
    });

    if (!lead) {
      lead = await prisma.lead.create({
        data: {
          name: name || `Simulated Lead`,
          phone: phone,
          budget: '₹1.5Cr - 3Cr',
          locationPref: 'Andheri',
          bhkPref: '2 BHK',
          status: 'New'
        }
      });
    }

    // 1. Save incoming message
    const incomingMsg = await prisma.message.create({
      data: {
        leadId: lead.id,
        content: text,
        direction: 'Incoming'
      }
    });

    // 2. Generate AI AutoReply
    const replyText = await generateAutoReply(lead, text);
    
    // 3. Save outgoing reply
    const outgoingMsg = await prisma.message.create({
      data: {
        leadId: lead.id,
        content: replyText,
        direction: 'Outgoing'
      }
    });

    // 4. Log "delivery"
    await sendWhatsAppMessage(lead.phone, replyText);

    res.json({
      status: 'success',
      lead,
      incoming: incomingMsg,
      reply: outgoingMsg
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch active chat listing (leads who have messages)
router.get('/whatsapp/chats', async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        messages: {
          orderBy: { timestamp: 'desc' },
          take: 1
        }
      }
    });

    // Only return leads that have conversations started
    const chats = leads
      .filter(l => l.messages.length > 0)
      .map(l => ({
        id: l.id,
        name: l.name,
        phone: l.phone,
        status: l.status,
        lastMessage: l.messages[0]?.content || 'Welcome message sent',
        lastMessageTime: l.messages[0]?.timestamp || l.createdAt,
        unread: false
      }));

    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch full message history between a lead and broker
router.get('/whatsapp/chats/:leadId', async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      where: { leadId: req.params.leadId },
      orderBy: { timestamp: 'asc' }
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- SITE VISITS (CALENDAR) ---
router.get('/visits', async (req, res) => {
  try {
    const visits = await prisma.siteVisit.findMany({
      include: {
        lead: true,
        property: true
      }
    });
    res.json(visits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

