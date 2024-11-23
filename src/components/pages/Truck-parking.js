import React from "react";
import "./Pages.css";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import alabama from "./../images/ala1.jpg";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { Tooltip, Button, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, Avatar, ListItemText, ListItemIcon, Grid } from '@mui/material';
import { useAxios } from '../../components/http/useAxios';
import LocationNotFound from '../NotFound/locationNotFound';



const Truckparking = () => {
  const [data, setData] = useState([]);
  const [selectLocationName, setselectLocationName] = useState([]);
  const [stateID, setstateID] = useState([]);
  const [showCityLocations, setShowCityLocations] = useState(false);
  const [isDialogOpenView, setIsDialogOpenView] = useState(false);
  const { axios } = useAxios();
  

  const handleCloseDialogView = () => {
    setShowCityLocations(false);
    setIsDialogOpenView(false); // Close the dialog
  };


  const StateList = async () => {
    let params = new URLSearchParams({
      page: 1,
      limit: 100,
    });
    const listState = process.env.REACT_APP_STATE_LIST;
    await axios
      .get(`${listState}?${params.toString()}`, {

        headers: {
          'Content-Type': 'application/json',
        },
      }
      )
      .then((res) => {
        // console.log("tetsing", res.data.data.merchant);
        if (res?.data?.success) {
          setData(res.data.data.list);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  useEffect(() => {
    StateList();
  }, [])

  const LocationList = async (stateID) => {
    let params = new URLSearchParams({
      search: stateID,
      page: 1,
      limit: 100,
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
          setselectLocationName(res.data.data.list);
        }
      })
      .catch((err) => {
        console.log("Error setting up the request:", err.message);

      });
  };
  useEffect(() => {
    LocationList(stateID);
  }, [stateID])

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
            <h1>Location</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="home">Home</a>
              </li>
              <li>Location</li>
            </ul>
          </div>
        </div>
      </section>
      <div className="content-section">
        <div className="container">
          <div className="row cus-map-loc">
          {/* {data ? ( */}
            {data.map((item) => (
              <div key={item.stateId} className="col-xl-4">
                <div className="tourmaster-tour-category-grid tourmaster-item-list  tourmaster-item-pdlr tourmaster-item-mgb tourmaster-column-20 tourmaster-column-first tourmaster-with-thumbnail">
                  <div className="tourmaster-tour-category-item-wrap">
                    <div className="tourmaster-tour-category-thumbnail tourmaster-media-image">
                      <img src={alabama} alt="ala" />
                    </div>
                    <div className="tourmaster-tour-category-overlay"></div>
                    <div className="tourmaster-tour-category-overlay-front"></div>
                    <div className="tourmaster-tour-category-head">
                      <div className="tourmaster-tour-category-head-display clearfix">
                        <h3 className="tourmaster-tour-category-title" style={{ textTransform: 'capitalize' }} >
                          <i className="fa-solid fa-location-dot" ></i>{item.stateName}
                        </h3>
                        <div className="tourmaster-tour-category-count"></div>
                      </div>
                      <div className="tourmaster-tour-category-head-animate">
                        <Link to={`/texas-details/${item.stateId}`} className="tourmaster-tour-category-head-link">View all locations</Link>
                        <div className="tourmaster-tour-category-head-divider"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* ) : (
              <LocationNotFound title="No Locations"/>
            )} */}
          </div>
        </div>
        <Dialog open={isDialogOpenView} onClose={handleCloseDialogView} fullWidth maxWidth="md">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {showCityLocations && (
                <div>
                  <h2 style={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#172961', color: 'white' }}>Location Details</h2>
                  <List dense>
                    {selectLocationName.map((location, index) => (
                      <div key={location.locationId} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#e0e0e0' }}>
                        <ListItem>
                          <ListItemText
                            primary={<strong style={{ color: '#333' }}>{`Location ID: `}</strong>}
                            secondary={location.locationId}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={<strong style={{ color: '#333' }}>{`City: `}</strong>}
                            secondary={location.cityName}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={<strong style={{ color: '#333' }}>{`Address: `}</strong>}
                            secondary={`${location.addressOne}, ${location.addressTwo}, ${location.addressThree}`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={<strong style={{ color: '#333' }}>{`Pin Code: `}</strong>}
                            secondary={location.pinCode}
                          />
                        </ListItem>

                      </div>
                    ))}
                  </List>
                </div>
              )}
            </Grid>
          </Grid>
          <Button
            variant="contained"
            onClick={handleCloseDialogView}
            style={{ backgroundColor: '#172961', color: 'white' }}
          >
            Close
          </Button>
        </Dialog>
        <iframe src="https://www.google.com/maps/d/u/1/embed?mid=1LkPP1_uey4f_qEdsNIyYorjbfijYAi6Z" title="Google Maps222" width='100%' height="500"></iframe>
      </div >

      <Footer />

    </div >
  );
};

export default Truckparking;
