// Import necessary modules
const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8080;

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

// Serve static files (extracted frames)
app.use('/frames', express.static(path.join(__dirname, 'frames')));

// Upload and split video endpoint
app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const videoPath = req.file.path;
  const outputDir = `frames_${Date.now()}`;

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Split video into frames (one frame every second)
  ffmpeg(videoPath)
    .on('end', () => {
      console.log(`Frames extracted to ${outputDir}`);
      res.status(200).send(`Frames extracted to ${outputDir}`);
    })
    .on('error', (err) => {
      console.error('Error processing video:', err);
      res.status(500).send('Error processing video');
    })
    .output(path.join(outputDir, 'frame-%04d.png')) // Save frames as PNG
    .outputOptions('-vf', 'fps=2') // Extract two frames per second
    .run();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
