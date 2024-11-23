import React from "react";
import './Update.css';
import ReactPlayer from 'react-player'
import { AnimationOnScroll } from 'react-animation-on-scroll';
const Update = () => {

    return(
        <div className="update mt-5 text-center">
            <div className="container">
            <AnimationOnScroll animateIn="animate__zoomIn">
            <h2 className="color-blue ">Video Updates</h2>
            </AnimationOnScroll>
            <div className="update-video">
                 <ReactPlayer url='https://www.youtube.com/watch?v=dGhcljjTGbE' width='100%' height='100%'/>
            </div>
            <AnimationOnScroll animateIn="animate__zoomIn">
            <p><b>The Trucker's Dozen Truck Parking Promotion</b></p>
            </AnimationOnScroll>
            <div className="row">
                <div className="col-xl-3 col-lg-3">
                <ReactPlayer url='https://www.youtube.com/watch?v=dGhcljjTGbE' width='100%' height='100%'/>
                </div>
                <div className="col-xl-3 col-lg-3">
                <ReactPlayer url='https://www.youtube.com/watch?v=dGhcljjTGbE' width='100%' height='100%'/>
                </div>
                <div className="col-xl-3 col-lg-3">
                <ReactPlayer url='https://www.youtube.com/watch?v=dGhcljjTGbE' width='100%' height='100%'/>
                </div>
                <div className="col-xl-3 col-lg-3">
                <ReactPlayer url='https://www.youtube.com/watch?v=dGhcljjTGbE' width='100%' height='100%'/>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Update;

