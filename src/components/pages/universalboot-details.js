import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./Pages.css";
import 'lightbox.js-react/dist/index.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAxios } from '../../components/http/useAxios';
const UniversalbootDetail = () => {
  const id = useSelector((state) => state.id?.id); // Get the ID from Redux
  const navigate = useNavigate(); // Use navigate to handle redirects if ID is missing
  const [universalBootData, setUniversalBootData] = useState(null);
  const { axios } = useAxios();
  useEffect(() => {
    const getData = async () => {
      try {
        let universalBootSystemUrl = process.env.REACT_APP_BASE_UNIVERSAL_BOOTSYSTEM_DETAILS + "?" + id;       
        const response = await axios.get(`${universalBootSystemUrl}`, { params: { format: 'json' } });
        console.log("universalBootSystemUrl&&&&&&&&&&&&&&&&&" + universalBootSystemUrl)        
        //const response = await axios.get(url, { params: { format: 'json' } });
        const universalBootsystemData = response?.data?.data;
        if (universalBootsystemData) {
          setUniversalBootData({
            headingOne: universalBootsystemData.headingOne,
            headingTwo: universalBootsystemData.headingTwo,
            headingThree: universalBootsystemData.headingThree,
            productImage: universalBootsystemData.productImage,
            images: universalBootsystemData.images,
            productWeight: universalBootsystemData.productWeight,
            productDimension: universalBootsystemData.productDimension,
            productLockOption: universalBootsystemData.productLockOption,
            description: universalBootsystemData.description,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      getData();
    } else {
      console.warn("ID is missing, redirecting to main page.");
      navigate("/"); // Redirect to home or main page if ID is missing
    }
  }, [id, navigate]);

  if (!universalBootData) {
    return <div>Loading...</div>; // Or show a spinner/loading indicator
  }

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
            <h1>Double Wheel Clamp for trucks and trailers</h1>
            <ul className="bread-crumb clearfix">
              <li><a href="/">Home</a></li>
              <li>Double Wheel Clamp for trucks and trailers</li>
            </ul>
          </div>
        </div>
      </section>
      <div className="content-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center">
              <img src={universalBootData.productImage} alt="Product" className="img-fluid shadow-lg rounded" />
            </div>
            <div className="col-lg-6">
              <h2 className="mb-4 text-primary">{universalBootData.headingOne}</h2>
              <p className="lead text-muted">{universalBootData.description}</p>
              <Link to="/dailyParking" className="btn btn-primary btn-lg mt-3">Buy or Lease</Link>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-12">
              <div className="simple-table-wrapper card p-4 shadow-sm">
                <h2 className="mb-4 text-center text-secondary">Additional Information</h2>
                <table className="table table-bordered text-center">
                  <thead className="thead-light">
                    <tr>
                      <th>Weight</th>
                      <th>Dimensions</th>
                      <th>Lock Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{universalBootData.productWeight || 'N/A'}</td>
                      <td>{universalBootData.productDimension || 'N/A'}</td>
                      <td>{universalBootData.productLockOption || 'N/A'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UniversalbootDetail;
