import './SponsorDetails.css'
import PlaceholderIMG from '../images/placeholder.jpg'

const SponsorDetails = ({driverImage, sponsorArray}) => {
    return (
        <div className='sponsor-details'>
            <img src={PlaceholderIMG} className='driver-image'/>
            <table className='sponsor-list'>
                {sponsorArray.map(sponsorName => <tr><td className='sponsor-name'>{sponsorName}</td></tr>)}
            </table>
        </div>
    );
}

export default SponsorDetails;
