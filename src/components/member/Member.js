import React from "react";
import './Member.css';
import { AnimationOnScroll } from 'react-animation-on-scroll';

const Member =() => {
    return(
        <div className="member ">
            <div className="container">
            <AnimationOnScroll animateIn="animate__zoomIn">
                <h2 className="text-white">Become a Member</h2>
                </AnimationOnScroll>
                <div className="row">
                    <div className="col-xl-7">
                    <AnimationOnScroll animateIn="animate__zoomIn">
                    <p className="color-white">You can park your truck at one of our lots then go on your route and later park at another one of our other lots and continue to move around! This is our Membership parking program!</p>
                    </AnimationOnScroll>
                    </div>
                    <div className="col-xl-5">
                    <AnimationOnScroll animateIn="animate__zoomIn ">
                    <p className="color-white text-end"><a class="button" href="#">Sign Up Just $299/Month</a></p>
                    </AnimationOnScroll>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default Member;