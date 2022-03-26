require('dotenv').config();
const express = require('express');
const router = require('./routes.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('client/dist'));

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})