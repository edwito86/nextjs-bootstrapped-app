const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

const inventoryRoutes = require('./routes/inventory');
app.use('/api/inventory', inventoryRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('empresaSac backend is running');
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
