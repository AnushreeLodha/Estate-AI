import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Dummy Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'BrokerFlow AI API is running' });
});

// Placeholders for modular routes
// app.use('/api/leads', leadRoutes);
// app.use('/api/properties', propertyRoutes);
// app.use('/api/whatsapp', whatsappRoutes);
// app.use('/api/analytics', analyticsRoutes);

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
