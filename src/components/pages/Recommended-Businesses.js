import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./Pages.css";
import r1 from "./../images/r1.jpg";
import r2 from "./../images/r2.png";
import r3 from "./../images/r3.jpg";
import r4 from "./../images/r4.jpg";
 
import { useAxios } from '../../components/http/useAxios';
const Recommended = () => {
  const [data, setData] = useState([]);
  const [expandedCards, setExpandedCards] = useState({}); // Track expanded state for each card
  const { axios } = useAxios();
  // Function to toggle expansion of card text
  const toggleExpand = (index) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const MAX_CHAR = 100;


  useEffect(() => {

    const getData = async () => {
      try {
        let recommendedBusiness = process.env.REACT_APP_BASE_RECOMMENDED_BUSINESS;
        const response = await axios.get(`${recommendedBusiness}`);
        setData(response.data.data.list);
       
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
            <h1>Recommended Business</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Recommended Business</li>
            </ul>
          </div>
        </div>
      </section>
      <div className="content-section">
        <div className="container">
          <div className="new-location">
            <section className="projects section" id="projects">
              <div className="row">
                {Array.isArray(data) &&
                  data.map((item, index) => (
                    <div key={index} className="col-lg-4 col-md-6">
                      <div className="card simple-card">
                        <img
                          src={item.productImage}
                          alt="project"
                          className="card-img"
                        />
                        <div className="card-body">
                          <h3 className="card-title">{item.headingOne}</h3>
                          <p className="card-subtitle">{item.headingTwo}</p>
                          <p className="card-text">
                            {expandedCards[index]
                              ? item.headingThree
                              : item.headingThree.substring(0, MAX_CHAR) + '...'}
                          </p> 
                          <div className="btn-container">
                            <button
                              onClick={() => toggleExpand(index)}
                              className="boot-btn btn-link"
                            >
                              {expandedCards[index] ? 'Show Less' : 'Load More'}
                            </button>
                            <a
                              href={item.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-link btn-outline"
                            >
                              Visit Website
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  );
};

export default Recommended;