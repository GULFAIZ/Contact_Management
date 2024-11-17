const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactRoutes = require('./routes/contacts');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/contacts', contactRoutes);

// MongoDB Connection
mongoose.connect('mongodb+srv://GULLU:<password>@cluster0.hrobpqi.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
