import './ImageAnalysis.css'
import CloudVisionLogo from '../images/cloud-vision-logo.svg'
import Button from '../Button/Button';
import SponsorDetails from '../SponsorDetails/SponsorDetails';
import { useState } from 'react';

const ImageAnalysis = ({imagesAvailable}) => {
    let videoResponseJSON = {
        "files": [
            "frame-1.jpg",
            "frame-2.jpg",
            "frame-3.jpg"
        ]
    }

    let responseJson = {
        "frame-1.jpg": [
            "United Parcel Service",
            "Royal Dutch Shell",
            "Ferrari"
        ],

        "frame-2.jpg": [
            "Sponsor A",
            "B Sponsor",
            "Some Other Sponsor"
        ],

        "frame-3.jpg": [
            "Sponsor A",
            "B Sponsor",
            "Sponsor A",
            "Some Other Sponsor"
        ],
    }
    const [sponsorsAvailable, setSponsorsAvailable] = useState(false);
    return (
        <>
            <p className='heading'>Drivers and Sponsors</p>
            <div className="image-analysis-container">
                {
                    imagesAvailable ?
                        <>
                            <div className='image-button-layout'>
                                <Button label={"Analyze images for sponsors"} isLoading={false} handleClick={() => {}}/>
                                <img src={CloudVisionLogo} className='cloud-vision-logo' alt='logo' />
                            </div>
                            {
                            sponsorsAvailable ?
                                Object.keys(responseJson).map(
                                    frame =>  <SponsorDetails driverImage={frame} sponsorArray={responseJson[frame]}/>
                                    )    
                            :
                                Object.keys(videoResponseJSON.files).map(
                                    frame =>  <p>{videoResponseJSON.files[frame]}</p>
                                    ) 
                            }
                        </>
                    :
                        <div>
                            <p>Avalayse video first</p>
                        </div>
                }
            </div>
        </>
    )
}

export default ImageAnalysis;
