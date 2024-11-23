import React from "react";
import "./Choice.css";
import { Link } from "react-router-dom";
import { AnimationOnScroll } from 'react-animation-on-scroll';
import g1 from "./../images/g1.png";
import g2 from "./../images/g2.png";
import g3 from "./../images/g3.png";
import g4 from "./../images/g4.png";
import g5 from "./../images/g5.png";
const Choice = () => {
  return (
    <div className="choice mt-5">
      <div className="container">
        <div className="section-title text-center">
        <AnimationOnScroll animateIn="animate__zoomIn">
          <h2>Choice of Amenities</h2>
          </AnimationOnScroll>
          <AnimationOnScroll animateIn="animate__zoomIn">
          <p>
            Our truck and trailer parking lots are secured with different
            amenities. Many have electronic access control and some have
            full-time security guards, 7,000 Volt Fencing, Office Rental, Free
            Wifi, Laundromat, Driver's Lounge and More!
          </p>
          </AnimationOnScroll>
          <AnimationOnScroll animateIn="animate__zoomIn ">
          <h3 className="color-blue">
            Choose a truck parking lot location to see individual lot security
            features and amenities.
          </h3>
          </AnimationOnScroll>
          <AnimationOnScroll animateIn="animate__zoomIn">
          <Link to="/" className="button">
            Choose Location <i className  ="fa-solid fa-angles-right"></i>
          </Link>
          </AnimationOnScroll>
        </div>
        <div className="row ">
          <div className="col-xl-6 col-lg-6">
            <img src={g1} alt="g1"/>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="row cus-choice-img">
            <div className="col-xl-6 col-lg-6">
              <div className="nd-row-img">
            <img src={g2} alt="g2"/>                            
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
          <div className="nd-row-img">
            <img src={g3} alt="g2"/>                            
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
          <div className="nd-row-img">
            <img src={g4} alt="g2"/>                            
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
          <div className="nd-row-img">
            <img src={g5} alt="g2"/>                            
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choice;
