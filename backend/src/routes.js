const express = require('express');
const { PrismaClient } = require('@prisma/client');
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
