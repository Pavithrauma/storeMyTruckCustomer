
import React, { useState, useEffect } from 'react';
import './Pages.css';
import { Link } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import ReactPlayer from "react-player";
import alabama from './../images/alabama.png';
import geo from './../images/geo.png';
import north from './../images/north.png';
import south from './../images/south.png';
import texas from './../images/texas.png';
import more from './../images/more.png';
import { useParams } from 'react-router-dom';
import { useAxios } from '../http/useAxios';
import LocationNotFound from '../NotFound/locationNotFound';

const Statesdetail = () => {
    const { axios } = useAxios();
    let { stateId  } = useParams();
    const [data, setData] = useState([]);
    const [setState, setStateName] = useState([]);
    const [mes , setMsg] = useState("");
    // console.log("PARAM-->", stateId );
    
    useEffect(() => {
        getLocationList();

    }, [stateId])
    

    async function getLocationList()
    {
        try {
            const res = await axios.get(`admin/auth/location-details?stateId=${stateId}`);
            // console.log("data-->", res);
            setMsg(res.data.message);
            const stateList = res.data.data;
            setData(stateList);
            setStateName(res.data.data[0].stateName);

        } catch (error) {
            console.log("ERROR-->", error);
        }
    }

   return (
    <div className='texas-details'>
        <Header/>
        <section className="page-title centred">
            <div className="bg-layer"></div>
            <div className="line-box">
                <div className="line-1"></div>
                <div className="line-2"></div>
            </div>
            <div className="auto-container">
                <div className="content-box">
                    <h1 style={{ textTransform: 'capitalize' }} >{setState}</h1>
                    <ul className="bread-crumb clearfix">
                        <li><a href="home">Home</a></li>
                        <li style={{ textTransform: 'capitalize' }} >{setState} Location</li>
                     
                    </ul>
                </div>
            </div>
        </section>
        <div className="content-section">
            <div className="container">
                <div className='row'>
                {data.map((item) => (
                    <div className='col-md-4'>
                        <div className='location-details-add'>
                            <div className="de-box de-location-address">
                                <h3 style={{ alignItems: "center", color:"red",textTransform: 'capitalize' }}>{item.cityName}</h3>
                                <p style={{ textTransform: 'capitalize' }} >{item.addressOne},{item.addressTwo},{item.addressThree},{item.pinCode}</p>
                            </div>
                            
                        </div>
                    </div>
                ))}
                {
                    data.length === 0 && <LocationNotFound title="No Locations"/>
                }
                </div>
            </div>

            </div>
            <Footer/>
    </div>
)
}

export default Statesdetail;