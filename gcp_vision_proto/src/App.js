import { useState } from 'react';
import './App.css'
import ImageAnalysis from './ImageAnalysis/ImageAnalysis';
import VideoAnalysis from './VideoAnalysis/VideoAnalysis';

function App() {
  const [framesAvailable, setFramesAvailable] = useState(false)
  return (
    <>
      <div className="title">
        <p className="product-name">Sponsor Analyzer</p>
        <p className="team-name">Team G</p>
      </div>

      <VideoAnalysis />
      <ImageAnalysis imagesAvailable={framesAvailable} />

    </>
  );
}

export default App;

