const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const formRoutes = require('./routes/formRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/form', formRoutes);

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
