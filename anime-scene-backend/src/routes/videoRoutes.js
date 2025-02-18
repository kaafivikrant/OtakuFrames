const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.post('/upload', videoController.uploadVideo);
router.post('/extract-frames', videoController.extractFrames);

module.exports = router; 