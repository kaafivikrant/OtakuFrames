import React from 'react';

function VideoUploadForm() {
    return (
        <form>
            <input type="file" accept="video/*" />
            <button type="submit">Upload</button>
        </form>
    );
}

export default VideoUploadForm; 