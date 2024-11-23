import React from "react";
import './Scan.css';
import scan from './../images/scan.png';
import bg from './../images/mobile.png';
import { AnimationOnScroll } from 'react-animation-on-scroll';
const Scan = () => {
    return(
        <div className="scan mt-5 text-center">
            <span>STOREMYTRUCK</span>
            <img src={bg} alt="scan" className="scan-img"/>
            <div className="container">
            <AnimationOnScroll animateIn="animate__zoomIn">
                <h2 className="color-white">Scan the QR Code to Download our app</h2>
                
                <img src={scan}  alt="scan" />
                <p className="color-white">Parking at your fingertips <br/> Need help making a reservation or have a question?</p>
                
                <div className="message-box">
                    <h3 className="color-blue"><i className="fa-solid fa-comment-dots"></i> Get customer assistance fast with our live chat service!</h3>
                </div>
                </AnimationOnScroll>
            </div>
        </div>
    )
}

export default Scan;