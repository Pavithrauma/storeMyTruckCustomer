import React from "react";
import './About.css';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import about from './../images/about1.png'
import about2 from './../images/about2.png'
import ReactPlayer from 'react-player'
import { Link } from "react-router-dom";
const About = () => {
    return(
        <div className="about-us mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-12">
                        <div className="image-video-cnt">
                            <div className="main-img">
                            <AnimationOnScroll animateIn="animate__fadeInUp">
                                 <img src={about} alt="about"/>
                                 </AnimationOnScroll>
                            </div>
                            <div className="video-img">
                            <AnimationOnScroll animateIn="animate__fadeInUp">
                            <ReactPlayer autoPlay light={<img src={about2} alt='Thumbnail' />} url='https://www.youtube.com/watch?v=UUtFMOXEKYk&t=2s' width='100%' height='100%'/>
                            </AnimationOnScroll>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-xl-6 col-lg-6 col-12">
                        <div className="about-content">
                        <AnimationOnScroll animateIn="animate__zoomIn">
                            <h2 >About STOREMYTRUCK</h2>
                            </AnimationOnScroll>
                            <AnimationOnScroll animateIn="animate__zoomIn">
                            <p>Storemytruck.com was Founded in 2009 and our Local Storage and Parking Company. We have 75 location throughout the USA . Our goal is to continue finiding and more locations to fulfill your needs for truck Parking throughout the United States. We provide Atlanta, Marietta, Woodstock, Norcross, Cartersville, Emerson, East Cobb, Smyrna, Mableton, South Atlanta, College Park, Union City, Fairburn, Lithonia, Birmingham, Lebanon, Midtown, Bessemer, Adairsville, Intown, Moreland, Austell, Dallas, Jefferson, Braselton, Kennesaw, Conley, Covington, Douglasville, Jonesboro, Newnan, Norcross, Palmetto, Powder Springs, Smyrna, South Fulton, West Atlanta, Charlotte, High- Point, Winston- Salem, Anderson, Irving and surrounding States with safe, secure, and affordable truck, trailer, box truck, boat and RV parking Daily and Monthly parking and Storage.</p>
                            <p>We currently over 75 tractor trailer truck, RV and Boat Storage Facilities around the southeast. These lots are located all around Atlanta, Alabama, North Carolina, South Carolina, Florida, Tennessee and Texas. Our lots feature easy self parking park and lock facilities, We have secure fencing with gates and 24 hour access for all our patrons.</p>
                            </AnimationOnScroll>
                            <AnimationOnScroll animateIn="animate__zoomIn">
                            <Link className="button" to="/">Know More</Link>
                            </AnimationOnScroll>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;