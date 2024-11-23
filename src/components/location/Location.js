import React from "react";
import './Location.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import { AnimationOnScroll } from 'react-animation-on-scroll';
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { useAxios } from '../../components/http/useAxios';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Location() {
  const [data, setData] = useState([]);
  const [value, setValue] = React.useState(0);
  const { axios } = useAxios();
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="Location-section mt-5">
      <div className="container">
        <div className="tabs">
          <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
          >

            <div className="tabs-name">
              {/* <AnimationOnScroll animateIn="animate__zoomIn">
                <h2 className=" color-blue">Our Locations</h2>
                <p>Discover Truck Parking Excellence at Our Locations!</p>
              </AnimationOnScroll> */}
              {data.map((item, index) => (
                <div
                  orientation="vertical"
                  value={value}
                  onChange={handleChange}
                  key={item.stateId}
                  aria-label="Vertical tabs example"
                >
                  <Tab label={item.stateName} {...a11yProps(index)} />
                  {/* You can add additional props for each Tab if needed */}
                </div>
              ))}
            </div>
            {data.map((item, index) => (
              <div className="tab-content">

                <TabPanel value={value} index={0}>
                  <div className="location-address">

                    <iframe

                      width="75%"
                      height="400"
                      style={{ border: "0" }}
                      allowFullScreen
                      loading="lazy"
                      title="Google Maps"
                      referrerPolicy="no-referrer-when-downgrade"

                      src="//www.weebly.com/weebly/apps/generateMap.php?map=google&elementid=513980198961327005&ineditor=0&control=3&width=auto&height=400px&overviewmap=0&scalecontrol=0&typecontrol=0&zoom=15&long=-86.8209423&lat=33.5411329&domain=www&point=1&align=1&reseller=false">

                    </iframe>
                    <div className="map-address">
                      <h3 className="color-blue capitalize ">{item.stateName}</h3>


                      <Link to={`/texas-details/${item.stateId}`} className="button">View all locations</Link>
                    </div>
                  </div>
                </TabPanel>
              </div>
            ))}
          </Box>
        </div>
      </div>
    </div>
  );
}