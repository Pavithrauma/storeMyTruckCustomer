import React, { useState } from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import videoSrc from './../images/video.mp4';
import icon1 from './../images/icon1.png';
import icon2 from './../images/icon2.png';
import icon3 from './../images/icon3.png';
import './Banner.css';
import LoadingScreen from '../LoadingScreen';
const Banner = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleLoadedData = () => {
    setVideoLoaded(true);
  };

  return (
    <div className="banner">
      <div className="banner-section" style={{ position: 'relative' }}>
        <div className="video-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
          {!videoLoaded && (
            <div className="spinner" >
            < LoadingScreen/>
            </div>
          )}
          <video
            className="videoTag"
            autoPlay
            loop
            muted
            onLoadedData={handleLoadedData}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="banner-bottom">
        <div className="row banner-bottoms">
          <div className="col-xl-4 col-lg-4">
            <div className="banner-btm-ctn">
              <AnimationOnScroll animateIn="animate__zoomIn">
                <img src={icon1} alt="icon1" />
                <h5 className="color-blue">Reserve a Space</h5>
                <p>Please choose the type of parking you would like</p>
                <i className="fa-solid fa-arrow-right-long"></i>
              </AnimationOnScroll>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4">
            <AnimationOnScroll animateIn="animate__zoomIn">
              <div className="banner-btm-ctn">
                <img src={icon2} alt="icon2" />
                <h5 className="color-white">Specials & Offers</h5>
                <p className="color-white">Exclusive Truck Parking Deals Await You!</p>
                <i className="fa-solid fa-arrow-right-long"></i>
              </div>
            </AnimationOnScroll>
          </div>
          <div className="col-xl-4 col-lg-4">
            <AnimationOnScroll animateIn="animate__zoomIn">
              <div className="banner-btm-ctn">
                <img src={icon3} alt="icon3" />
                <h5 className="color-white">Locations</h5>
                <p className="color-white">Please Choose Your State for a List of our Available Locations Near You...</p>
                <i className="fa-solid fa-arrow-right-long"></i>
              </div>
            </AnimationOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
