import React from "react";
import './Pages.css';
import { Link } from "react-router-dom";
import Header from "../header/Header";
import loc1 from './../images/alabama.jpg'
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { useAxios } from '../../components/http/useAxios';



const AllLocation = () => {
  const [data,setData] =useState([]);
  const { axios } = useAxios();
  const LocationList = async () => {

    await axios
      .get(process.env.REACT_APP_STATE_LIST)
      .then((res) => {
        setData(res.data.data.merchant);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  useEffect(() => {
    LocationList();
  }, [])

  return (
    <div>
      <Header />

      <div className="content-sections">
        <div className="container-fluid full-height">
          <div className="row row-height">
            <div className="col-xl-5 content-left ">
              <div className="row">
                {data.map((item) => (
              <div key={item.stateId} className="col-xl-6">
                
                  <div className="location-address">
                    <div className="map-address cus-map-address">
                      <img src={loc1} alt={item.stateName} />
                      <div className="location-details">
                        <h3 className="color-blue">{item.stateName}</h3>

                        <Link href="#" className="button">More Details</Link>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
               
              </div>
            </div>
            <div className="col-xl-7 map-right">
              <iframe src="https://www.google.com/maps/d/u/1/embed?mid=1LkPP1_uey4f_qEdsNIyYorjbfijYAi6Z" title="Google Maps22" width='100%' height="500"></iframe>
            </div>
          </div>

        </div>
      </div>



    </div>
  );
}

export default AllLocation;