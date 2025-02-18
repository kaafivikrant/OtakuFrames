const ffmpeg = require('fluent-ffmpeg');

exports.extract = (videoPath, callback) => {
    // Logic to extract frames using FFmpeg
    ffmpeg(videoPath)
        .on('end', () => {
            callback(null, 'Frames extracted successfully');
        })
        .on('error', (err) => {
            callback(err);
        })
        .save('/frames_output/frame-%03d.png');
}; 