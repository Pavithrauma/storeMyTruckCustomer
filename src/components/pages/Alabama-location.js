import React ,{useEffect, useState}from "react";
import './Pages.css';
import { Link } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import axios from "axios";
import logo1 from './../images/i1.png'
import logo2 from './../images/i2.png'
import logo3 from './../images/i3.png'
import logo4 from './../images/i4.png'
import logo5 from './../images/i5.png'
import { useAxios } from "../../components/http/useAxios";

const Alabama =({ stateName }) => {
   
    const { axios } = useAxios();

    const [selectLocationName, setselectLocationName] = useState([]);

    useEffect(() => {
        fetchLocationList(stateName);
    }, [stateName]);

    const fetchLocationList = async (stateName) => {
        try {
            const response = await axios.get(process.env.REACT_APP_LOCATION_LIST, {
                params: {
                    search: stateName,
                    page: 1,
                    limit: 100,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setselectLocationName(response.data.data.merchant);
        } catch (error) {
            console.error("Error fetching location list:", error.message);
        }
    };
    return(
        <div className="inner-pages">
             <Header/>
             <section className="page-title centred">
            <div className="bg-layer"></div>
            <div className="line-box">
                <div className="line-1"></div>
                <div className="line-2"></div>
            </div>
            <div className="auto-container">
                <div className="content-box">
                    <h1>Texas</h1>
                    <ul className="bread-crumb clearfix">
                        <li><a href="home">Home</a></li>
                        <li>Texas Location</li>
                     
                    </ul>
                </div>
            </div>
        </section>
        <div className="content-section">
            
        <div className="container">
            <div className="new-location">
                
            <div className="row">
                            {selectLocationName.map((location, index) => (
                                <div key={location.locationId} className="col-xl-4">
                                    <div className="state-location">
                                        <h6><span><i className="fa-regular fa-building"></i></span>{location.cityName}</h6>
                                        <p><span><i className="fa-solid fa-location-dot"></i></span>{`${location.addressOne}, ${location.addressTwo}, ${location.addressThree}`}</p>
                                        <div className="lines"></div>
                                        <Link to="/texas-details" className="button">More Details</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
            </div>
                <div className="parking-amenities">
                    <h2>Parking Amenities</h2>
                    <div className="row">
                        <div className="col">
                            <div className="amenities-icons">
                                <img src={logo1} alt="a1"/>
                            </div>
                            <p>Tall Fencing</p>
                        </div>
                        <div className="col">
                        <div className="amenities-icons">
                                <img src={logo2} alt="a2"/>
                            </div>
                            <p>29 Acres</p>
                        </div>
                        <div className="col">
                        <div className="amenities-icons">
                                <img src={logo3} alt="a3"/>
                            </div>
                            <p>Available 24 Hours</p>
                        </div>
                        <div className="col">
                        <div className="amenities-icons">
                                <img src={logo4} alt="a4"/>
                            </div>
                            <p>Gated Entry</p>
                        </div>
                        <div className="col">
                        <div className="amenities-icons">
                                <img src={logo5} alt="a5"/>
                            </div>
                            <p>Bright Lighting</p>
                        </div>
                    </div>
                </div>
        </div>
            </div>
            <Footer/>
            </div>
    )
}

export default Alabama;