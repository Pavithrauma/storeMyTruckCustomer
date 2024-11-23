import React from "react";
import './Recent.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReactPlayer from 'react-player';
import { Link } from "react-router-dom";
import { AnimationOnScroll } from 'react-animation-on-scroll';
const Recent = () => {

    var settings = {
        dots: false,
        arrows:true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
       
      };

    return(
        <div className="recent mt-5">
            <div className="container">
            <AnimationOnScroll animateIn="animate__zoomIn">
                <h2 className="color-blue text-center">Our Recent</h2>
                </AnimationOnScroll>
                <div className="video-slider text-center">
                <Slider {...settings}>
      <div>
      <ReactPlayer url='https://www.youtube.com/watch?v=dGhcljjTGbE' width='100%' height='100%'/>
      </div>
      <div>
      <ReactPlayer url='https://www.youtube.com/watch?v=dGhcljjTGbE' width='100%' height='100%'/>
      </div>
      <div>
      <ReactPlayer url='https://www.youtube.com/watch?v=dGhcljjTGbE' width='100%' height='100%'/>
      </div>
     
    </Slider>
    <AnimationOnScroll animateIn="animate__zoomIn">
             <p>Our newest locations are now open for reservations.<br/><b>1521 HUBER ST NW, ATLANTA GA, 30341</b></p>
             <Link to="/" className="button">Know More</Link>
             </AnimationOnScroll>
                </div>
            </div>
        </div>
    )
}

export default Recent;