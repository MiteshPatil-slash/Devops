const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('./config/passport');

const authRoutes = require('./routes/authRoutes');
const generateRoutes = require('./routes/generateRoutes');

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use(passport.initialize());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/generate', generateRoutes);

// 404 handler
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error('[server] unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
