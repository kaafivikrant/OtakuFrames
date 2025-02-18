const frameExtractor = require('../services/frameExtractor');

exports.uploadVideo = (req, res) => {
    // Logic to handle video upload
    res.send('Video uploaded successfully');
};

exports.extractFrames = (req, res) => {
    // Logic to extract frames using frameExtractor
    frameExtractor.extract(req.file.path, (err, frames) => {
        if (err) {
            return res.status(500).send('Error extracting frames');
        }
        res.send(frames);
    });
}; 