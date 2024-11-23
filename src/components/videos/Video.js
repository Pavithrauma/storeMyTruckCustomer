import React from "react";
import "./Video.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
const Video = () => {
  return (
    <div className="video-section text-center mt-5">
      <div className="container">
      <AnimationOnScroll animateIn="animate__zoomIn">
        <h2 className="color-blue text-center">Our Videos</h2>
        <p> Watch our video below to learn more!</p>
        </AnimationOnScroll>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-12">
          <ReactPlayer url='https://www.youtube.com/watch?v=dGhcljjTGbE' width='100%' height='100%'/>
          </div>
          <div className="col-xl-4 col-lg-4 col-12">
          <ReactPlayer url='https://www.youtube.com/watch?v=dGhcljjTGbE' width='100%' height='100%'/>
          </div>
          <div className="col-xl-4 col-lg-4 col-12">
          <ReactPlayer url='https://www.youtube.com/watch?v=dGhcljjTGbE' width='100%' height='100%'/>
          </div>
        </div>
        <AnimationOnScroll animateIn="animate__zoomIn">
        <Link to="/" className="button">Load More</Link>
        </AnimationOnScroll>
      </div>
    </div>
  );
};

export default Video;
