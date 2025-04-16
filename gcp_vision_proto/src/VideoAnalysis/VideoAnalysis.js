
import './VideoAnalysis.css'
import VideoThumbnail from '../images/VideoThumbnail.svg'
import VideoIntelligenceLogo from '../images/video-intelligence-logo.svg'
import Button from '../Button/Button';

const VideoAnalysis = () => {

    const analyzeVideo =() =>{
        fetch("/videoIntelligence").then( 
          res => res.json()
          ).then(
            data => {
              console.log(data);
            //   setLogoData(data)
            }
          )
      }

    return (
        <div className="video-analysis-container">
            <img src={VideoThumbnail} />
            <div className='video-button-layout'>
                <Button label={"Analyze video for faces"} isLoading={false} handleClick= {analyzeVideo}/>
                <img src={VideoIntelligenceLogo} className='video-intelligence-logo' alt="logo"/>
            </div>
        </div>
    )
}

export default VideoAnalysis;
