const express = require('express');
const videoRoutes = require('./routes/videoRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use('/api/videos', videoRoutes);
app.use(errorHandler);

module.exports = app; 