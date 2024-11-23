import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./Pages.css";
import universal from "./../images/uni.jpg";
import { useDispatch } from 'react-redux';
import { setId } from '../redux/idSlice';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../components/http/useAxios';

const UniversalBootsystem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { axios } = useAxios();
  const handleSetId = (id) => {
    dispatch(setId(id)); // Dispatch the ID to the Redux store
    navigate('/universalbootdetail'); // Navigate to the next page
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let universalBootSystemUrl = process.env.REACT_APP_BASE_UNIVERSAL_BOOTSYSTEM;
        const response = await axios.get(`${universalBootSystemUrl}`);
        setData(response.data.data.list);
      } catch (error) {
        console.error("Error fetching data:", error);
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
            <h1>Universal Boot Systems</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Universal Boot Systems</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="content-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 universal">
              <img src={universal} alt="Universal Boot System" className="img-fluid" />
            </div>
            <div className="col-lg-6">
              <h2>StoreMyTruck: Your Official Destination for Universal Boot Systems in the Southeast</h2>
              <p>Discover the ultimate solution for all your truck and trailer needs at StoreMyTruck...</p>
              <p>Enhance the efficiency and safety of your trucks and trailers with the Universal Boot System solutions...</p>
            </div>
          </div>

          <div className="row mt-5">
            {Array.isArray(data) && data.map((item, index) => (
              <div className="col-lg-4" key={index}>
                <div className="universal-card">
                  <div className="card simple-card">
                    <img
                      src={item.productImage}
                      alt="product"
                      className="card-img simple-img"
                      onError={(e) => { e.target.src = 'path/to/fallbackImage.jpg'; }}
                    />
                  </div>
                  <div className="universal-text">
                    <h4>{item.headingOne}</h4>
                    <p>{item.headingTwo}</p>
                    <button onClick={() => handleSetId(item._id)} className="button">Know More</button>
                  </div>
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

export default UniversalBootsystem;
