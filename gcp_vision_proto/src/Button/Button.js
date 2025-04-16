import Loading from "../images/Loading.svg";
import './Button.css'

const Button = ({label, isLoading, handleClick}) => {
     
    return(
        <button className="analysis_button">
           { isLoading ?
                <img src={Loading} alt="Loading" className="loadingIcon"/>
            :
                <p>{label}</p>}
        </button>
    )
}

export default Button
