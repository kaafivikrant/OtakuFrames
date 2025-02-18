import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VideoUploadForm from '../components/VideoUploadForm';

function HomePage() {
    return (
        <div>
            <Navbar />
            <h2>Welcome to Anime Scene</h2>
            <VideoUploadForm />
            <Footer />
        </div>
    );
}

export default HomePage; 