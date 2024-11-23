import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./Pages.css";
import ReactPlayer from "react-player";
import { useAxios } from '../../components/http/useAxios';
// import axios from "axios";
import { Link } from 'react-router-dom';
const SpecialOffers = () => {
  const [data, setData] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]); // Track visible items for each data item
  const { axios } = useAxios();
  // Function to load more <li> items for a specific item
  const loadMore = (index) => {
    setVisibleItems((prevVisibleItems) => {
      const newVisibleItems = [...prevVisibleItems];
      newVisibleItems[index] += 2; // Increase the visible items for the specific index
      return newVisibleItems;
    });
  };

  // Function to load less <li> items for a specific item
  const loadLess = (index) => {
    setVisibleItems((prevVisibleItems) => {
      const newVisibleItems = [...prevVisibleItems];
      newVisibleItems[index] = Math.max(2, newVisibleItems[index] - 2); // Decrease the visible items, but don't go below 2
      return newVisibleItems;
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let specialOfferUrl = process.env.REACT_APP_BASE_SPECIAL_OFFERS;
        const response = await axios.get(`${specialOfferUrl}`);
        setData(response.data.data.list);

        // Initialize visibleItems state with 2 visible items for each data entry
        setVisibleItems(Array(response.data.data.list.length).fill(2));
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

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
            <h1>Special Offers</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Special Offers</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="content-section">
        <div className="container">
          <div className="row cus-special">
            {Array.isArray(data) &&
              data.map((item, index) => (
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4" key={index}>
                  <div className="video-container">
                    <ReactPlayer
                      url={item.websiteUrl}
                      width="100%"
                      height="100%"
                      controls={true}
                    />
                  </div>
                  <div className="col-12 video-content">
                    <h6>{item.offerName}</h6>

                    {/* UL with limited visible <li> elements */}
                    <ul>
                      {[
                        { text: item.dayOffer },
                        { text: item.amountOffer },
                        { text: item.location },
                        { text: item.description }
                      ]
                        .slice(0, visibleItems[index])
                        .map((listItem, liIndex) => (
                          <li key={liIndex}>{listItem.text}</li>
                        ))}
                    </ul>

                    <div className="load-more-less-container">
                      {/* Load More text link at the end of the list for each item */}
                      {visibleItems[index] < 4 && (
                        <a
                          href="#"
                          className="load-more-link"
                          onClick={() => loadMore(index)}
                        >
                          Load More
                        </a>
                      )}

                      {/* Load Less text link if more than 2 items are visible */}
                      {visibleItems[index] > 2 && (
                        <a
                          href="#"
                          className="load-less-link"
                          onClick={() => loadLess(index)}
                        >
                          Load Less
                        </a>
                      )}
                    </div>
                    
                    <Link className="reserve-parking-button" to="/dailyParking">Reserve Parking</Link>
                    
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SpecialOffers;
