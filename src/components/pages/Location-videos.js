import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import './Pages.css';
import ReactPlayer from 'react-player';
import { locationdata } from "./data/Location-data";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import LocationNotFound from '../NotFound/locationNotFound';
import { useAxios } from '../../components/http/useAxios';

const Locationvideos = () => {
  const [selectLocationName, setselectLocationName] = useState([]);
  const { axios } = useAxios();
  const LocationList = async () => {
    let params = new URLSearchParams({
      page: 1,
      limit: 1000,
    });
    const listLoc = process.env.REACT_APP_LOCATION_LIST;
    await axios
      .get(`${listLoc}?${params.toString()}`, {

        headers: {
          'Content-Type': 'application/json',
        },
      }
      )
      .then((res) => {
        if (res?.data?.success) {
          setselectLocationName(res.data.data.merchant);
        }

      })
      .catch((err) => {
        console.log(err.message);

      });
  };
  useEffect(() => {
    LocationList();
  }, [])

  return (
    <div className="inner-pages">
      <Header />
      <section className="page-title centred">
        <div className="bg-layer"></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>Location Videos</h1>
            <ul className="bread-crumb clearfix">
              <li><a href="home">Home</a></li>
              <li>Location Videos</li>

            </ul>
          </div>
        </div>
      </section>
      <div className="content-section">
        <div className="content-section">
          <div className="container">
            <div className="row">
            {selectLocationName && selectLocationName.length > 0 ? (
  selectLocationName.map((item, index) => (
    item.videoUrl ? (
      <div className="col-xl-4 col-lg-4 mb-3" key={index}>
        <div className="card">
          <div className="card-body">
            <ReactPlayer
              controls={true}
              url={item.videoUrl}
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: { controls: 1 },
                },
              }}
            />
            {/* Show additional text if videoUrl is present */}
            <div className="add-text">
            <h6 style={{ textTransform: 'capitalize' }}>{`${item.addressOne}, ${item.cityName}`}</h6>

            </div>
          </div>
        </div>
      </div>
    ) : null
  ))
) : (
  <LocationNotFound title="No Location Videos" />
)}



            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default Locationvideos;