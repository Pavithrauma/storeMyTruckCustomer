import React from "react";
import Header from "../header/Header";
import Banner from "../banner/Banner";
import About from "../about/About";
import Choice from "../choice/Choice";
import Member from "../member/Member";
// import Update from "../update/Update";
import Recent from "../recent/Recent";
import Scan from "../mobile/Scan";
import Location from "../location/Location";
import Video from "../videos/Video";
import Footer from "../footer/Footer";
const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Banner />
      <About />
      <Choice />
      <Member />
      {/* <Update/> */}
      <Recent />
      <Scan />
      <Location />
      
      <Video />
      <Footer />
    </div>
  );
};

export default Home;
