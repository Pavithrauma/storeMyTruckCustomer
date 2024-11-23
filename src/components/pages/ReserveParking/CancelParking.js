import React, { useState, useEffect, useRef } from "react";
import Header from "../../header/Header.js";
import Footer from "../../footer/Footer.js";
import "../Pages.css";
import "./Parking.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Field, Form } from "formik";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import SignatureCanvas from 'react-signature-canvas';
import { useAxios } from '../../../components/http/useAxios';
import validationSchema from "./validationSchema.js";
const Cancel = () => {
  const { type } = useParams();
  const sigPad = useRef(null);
  const [showExtendedParkingInfo, setShowExtendedParkingInfo] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [lastParkingDate, setlastParkingDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalDays, setTotalDays] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [signatureDataUrl, setSignatureDataUrl] = useState('');
  const [locations, setLocations] = useState([]);
  const [signature, setSignature] = useState(""); 
  const [locationId, setlocationId] = useState("");
  const [vehicleTypeId, setvehicleTypeId] = useState('');
  const [vehicleType, setVehicleType] = useState([]);
  const [lastdate, setlastdate] = useState([]);
  const { axios } = useAxios();
  const [formError, setFormError] = useState('');
  const [selectvehicle, setselectvehicle] = useState('');
  const [Address, setAddress] = useState('');
  const [Address1, setAddress1] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [postal, setpostal] = useState('');
  const [country, setcountry] = useState('');
  const [numbervehicle, setnumbervehicle] = useState('');
  const [reasoncancelling, setreasoncancelling] = useState('');
  const [Additonalcomments, setAdditonalcomments] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    company_name: '',
    phone_number: '',
    email: '',
  });
  const [Acknowledgement, setAcknowledgement] = useState('');
  useEffect(() => {
    const name = localStorage.getItem("name");
    const company_name = localStorage.getItem("company_name");
    const phone_number = localStorage.getItem("phone_number");
    const email = localStorage.getItem("email");
    setUserDetails({
      name,
      company_name,
      phone_number,
      email
    });
  }, []);
  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
    setAcknowledgement(e.target.value);
  };
  useEffect(() => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1); 
  }, []);
  const handleSignatureChange = (value) => {
    setSignature(value);
    if (sigPad.current) {
      const dataUrl = sigPad.current.toDataURL('image/png');
      setSignatureDataUrl(dataUrl);
      // console.log(dataUrl, 'Signature Data URL');
    }
  };
  const handleCheckboxChange = (event) => {
    setShowExtendedParkingInfo(event.target.checked);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date && endDate) {
      calculateTotalDays(date, endDate);
    }
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const calculateTotalDays = (start, end) => {
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotalDays(diffDays);
  };
  const handleProtectedClick = () => {
    const userMode = localStorage.getItem("userMode");
    if (userMode === "guest") {
      Swal.fire({
        position: "top-centre",
        icon: "warning",
        title: "Please log in to access this feature.",
        showConfirmButton: true,
        confirmButtonText: "OK",

      });
    } else {
    }
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    companyName: "",
    cellPhoneNumber: "",
    companyPhoneNumber: "",
    email: "",
    confirmEmail: "",
    vehicleType: "",
    numberOfVehicles: "",
    yearMakeModel: "",
    color: "",
    usdot: "",
    companyNameOnTractor: "",
    vehicleType: "",
    numberOfVehicles: "",
    vehicles: [
      {
        yearMakeModel: "",
        color: "",
        usdot: "",
        companyNameOnTractor: "",
      },
    ],
  };

  const handlelocationidchange = (e) => {
    const { id } = JSON.parse(e.target.value);
    setlocationId(id);
  };

  useEffect(() => {
    Lastdate();
    NearestLocationList();
    Vehicletype();
  }, []);

  const Lastdate = async () => {
    const userid = localStorage.getItem("storemytruck_customer_id")
    const lastdate = process.env.REACT_APP_BASE_CANCEL_PARKING_DATE;
   
    try {
      const res = await axios.get(`${lastdate}`, {
        params: {
          userId: userid
        }
      });
      // console.log(res, 'suiiiiii');
      if (res?.data?.success) {
        setlastdate(res.data.data);
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: res.data.message,
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: err.response?.data?.message || "An error occurred ",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
      console.log("error", err);
    }
  };

  const NearestLocationList = async () => { 
    try {
      const userid = localStorage.getItem("storemytruck_customer_id")
      const nearest = process.env.REACT_APP_BASE_NEARSET_LOCATION;
      console.log("nearest" + nearest)
      const res = await axios.get(`${nearest}`, {
        params: {
          userId: userid
        }
      });
      // console.log(res, 'suiiiiii');
      if (res?.data?.success) {
        setLocations(res.data.data);
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: res.data.message,
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: err.response?.data?.message || "An error occurred ",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
      console.log("error", err);
    }
  };

  const Vehicletype = async () => { 
    
    try {
      const vechicletype = process.env.REACT_APP_BASE_VEHICLE_TYPE;
      console.log("vechicletype" + vechicletype)
      const res = await axios.get(vechicletype);
      if (res?.data?.success) {
        setVehicleType(res.data.data.list);
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: res.data.message,
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: err.response?.data?.message || "An error occurred ",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
      console.log("error", err);
    }
  }
  const handleClearSignature = () => {
    if (sigPad.current) {
      sigPad.current.clear();
      setSignature('');
      setSignatureDataUrl('');
    }
  };
  const handleVehicleTypeChange = (e) => {
    try {
      const value = e.target.value;
      if (value) {
        const { dropdownvehicleType, id } = JSON.parse(value);
        console.log('dropdownvehicleType', dropdownvehicleType);
        setselectvehicle(dropdownvehicleType);
        setvehicleTypeId(id);
      } else {
        setvehicleTypeId(null);
      }
    } catch (error) {
      console.error("Error parsing JSON: ", error);
    }
  };

  const isFormValid = () => {
    if (!Address || !reasoncancelling || !numbervehicle || !vehicleTypeId || !signature ) {
      setFormError(' If you don t see the SUBMIT button please go back and make sure that you ve filled all the required fields.');
      return false;
    }
    setFormError(''); // Clear error if valid
    return true;
  };

  

  const submitForm = async (event) => {
    event.preventDefault();
    const parkingDateString = new Date(startDate).toLocaleDateString('en-CA');
    const startDateString = new Date(endDate).toLocaleDateString('en-CA');
    const formData = new FormData();
    formData.append('cancelDate', parkingDateString);
    formData.append('lastParkingDate', startDateString);
    formData.append('Acknowledgement', Acknowledgement);
    formData.append('Address', Address);
    formData.append('Address1', Address1);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('postalCode', postal);
    formData.append('country', country);
    formData.append('vechicleCount', numbervehicle);
    formData.append('reasoncancelling', reasoncancelling);
    formData.append('Additonalcomments', Additonalcomments);
    formData.append('phoneNumber', userDetails.phone_number);
    formData.append('email', userDetails.email);
    formData.append('locationId', locationId);
    formData.append('userId', localStorage.getItem("storemytruck_customer_id") || '');
    formData.append('vehicleTypeId', vehicleTypeId || '');
    if (signatureDataUrl) {
      try {
        // Extract the base64 encoded data and convert to a Blob
        const byteString = atob(signatureDataUrl.split(',')[1]); // Decode base64 string
        const mimeString = signatureDataUrl.split(',')[0].split(':')[1].split(';')[0]; // Extract MIME type

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i); // Convert to char code
        }

        const blob = new Blob([ab], { type: mimeString }); // Create Blob from the byte array

        // Append the signature blob to the FormData object
        formData.append('signature', blob, 'signature.png');
      } catch (err) {
        console.error('Error handling signature:', err);
      }
    }
    try {
      const response = await axios.post(process.env.REACT_APP_BASE_CANCEL_PARKING, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Account cancel successfully. Please check your registered email.',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      }).then(() => {
        window.location.reload();
      });
    }
    catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error?.response?.data?.message || 'Unable to submit the form. Please try again later.';
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'An error occurred',
        text: errorMessage,
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
    }
  };
  return (
    <div className="inner-pages" >
      <Header />

      <div className="book-form" onClick={handleProtectedClick}>
        <div className="container margin_60">
          <div className="row pb-4">
            <div className="col-md-12">
              <h1> PARKING CANCELLATION</h1>
              <h6>
                To cancel your parking space with Store My Truck, Please Fill
                out the Form Below.
              </h6>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    {type} PARKING CANCELLATION -TERMS & CONDITIONS
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="form-notification">
                    <strong> IMPORTANT!</strong>You MUST fill out and submit
                    this Cancellation form{" "}
                    <strong>
                      atleast <span>30 days </span> prior to your next billing
                      cycle in order to avoid being charged on your billing
                      cycle date.
                    </strong>
                    <br></br>
                    <br></br>
                    <strong>
                      Once you cancel your account, StoreMyTruck.com will apply
                      the last month payment that you made at signing, to your
                      last month parking invoice. We<span> DO NOT </span>refund
                      the last month payment deposit, but rather apply it to
                      your last month of parking.
                    </strong>
                    <br></br> <br></br>
                    <strong>
                      If you have a parking permit hanger(s) please mail them
                      back to StoreMyTruck.com
                    </strong>{" "}
                    , LLC at 471 South Cemetery Street, Norcross, GA 30071
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="sidebox">
                <div className="==">
                  <div className="authuority">
                    <a
                      href="https://verify.authorize.net/anetseal/?pid=4b8a4eb2-93e5-4223-847f-774760e72a09&amp;rurl=https://www.storemytruck.com"
                      onmouseover="window.status='http://www.authorize.net/'; return true;"
                      onmouseout="window.status=''; return true;"
                      onclick="window.open('https://verify.authorize.net/anetseal/?pid=4b8a4eb2-93e5-4223-847f-774760e72a09&amp;rurl=https://www.storemytruck.com','AuthorizeNetVerification','width=600,height=430,dependent=yes,resizable=yes,scrollbars=yes,menubar=no,toolbar=no,status=no,directories=no,location=yes'); return false;"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <img
                        src="https://verify.authorize.net/anetseal/images/secure90x72.gif"
                        width="90"
                        height="72"
                        border="0"
                        alt="Authorize.Net Merchant - Click to Verify"
                      />
                    </a>
                  </div>
                  <h3>Customer/Account Information</h3>

                  <div class="cart-info st-border-radius" id="cart-info">
                    <div class="room-type">
                      <span class="label">User Type:</span>
                      <span class="value">
                        <a href="#">New User</a>
                      </span>
                    </div>
                    <div class="info-section">
                      <ul>
                        <li class="ad-info">
                          <ul>
                            <li>
                              <span class="label">Account Owner's Name</span>
                              <span className="value">{userDetails.name}</span>
                            </li>
                            <li>
                              <span class="label">Company Name</span>
                              <span className="value">{userDetails.company_name}</span>
                            </li>
                            <li>
                              <span class="label">Cell Phone Number</span>
                              <span className="value">{userDetails.phone_number}</span>
                            </li>
                            <li>
                              <span class="label">Email</span>
                              <span className="value">{userDetails.email}</span>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ values, errors, touched }) => (
                  <Form id="quotation" noValidate>
                    <div className="form_title">
                      <h3>
                        <strong>
                          <i className="fa-solid fa-1"></i>
                        </strong>
                        {type} PARKING CANCELLATION
                      </h3>
                      <p>StoreMyTruck.com</p>
                    </div>
                    <div className="step">
                      <div className="row">

                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label>
                              Acknowledgement <span style={{ color: 'red' }}>*</span>
                            </label>
                          </div>
                        </div>

                        <div className="col-md-12  col-sm-6  ">
                          <div className="form-group check-box">
                            <input
                              name="cancelparkingradiobtn"
                              type="radio"
                              value='yes'
                              // onClick={(e)=>setradiobox(e.target.value)}
                              onChange={handleRadioChange}
                            />
                            <label>
                              I would like to Cancel my account with
                              StoreMyTruck.com at Any and All locations I am
                              currently parking.
                              <span>*</span>
                              <br></br>
                            </label>
                          </div>
                        </div>
                        <br />
                        <div className="form-group check-box">
                          {/* Checkbox */}
                          <input
                            // onClick={(e)=>setcheckbox(e.target.value)}
                            onChange={handleRadioChange}
                            name="cancelparkingradiobtn"
                            type="radio"
                            value="no"
                          />
                          <label>
                            REMOVE A UNIT OR LOCATION (Check here if you are parked in MULTIPLE LOCATIONS)
                            <span>*</span>
                          </label>

                        </div>
                        {/* condition starts for 8*/}
                        {radioValue == "no" && (
                          <>
                            <div style={{ fontStyle: 'italic', marginTop: '10px', }}>
                              <h3><b> DO NOT USE THIS FORM TO MAKE CHANGES TO YOUR ACCOUT</b>(i.e. Reducing/Removing Units, Changing Locations, etc.). Instead, please fill out our

                                <a href="/SMT_UAT/CMS/storemytruck/AccountChangeForm">
                                  Account Change Form
                                </a>{" "}
                                instead.

                              </h3></div>
                          </>
                        )}
                        {( radioValue === 'yes' ) && (
                          <>
                            <div>
                              <div>
                                <div className="col-md-6 col-sm-6">
                                  <div className="form-group">
                                    <label>
                                      Cancellation Date/Time<span>*</span>
                                    </label>
                                    <DatePicker
                                      selected={startDate}
                                      onChange={handleStartDateChange}
                                      className="form-control required"
                                      placeholderText={bookingDate}
                                      minDate={new Date()}
                                    />
                                  </div>
                                </div>

                                <div className="col-md-6 col-sm-6">
                                  <div className="form-group">
                                    <label>
                                      Last Date Parking <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <div className="tooltip-container">
                                      <DatePicker
                                        selected={endDate}
                                        onChange={handleEndDateChange}
                                        className="form-control required"
                                        placeholderText={lastParkingDate}
                                        minDate={new Date()}
                                      />
                                      <span className="tooltip-text" style={{ color: 'red' }}>
                                        30 Days Cancellation notice Required
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-notification">
                                  <br></br>
                                  <p>
                                    Your Last Day of Parking is
                                    <strong>
                                      {" "}
                                      {lastParkingDate} OR your billing cycle/Invoice
                                      date (i.e. 30 days from the last invoice PAID).
                                    </strong>{" "}
                                  </p>
                                  <span> Important!</span>
                                  We will apply your last month payment that you paid
                                  when you sighned-up to your last month invoice. Your
                                  credit card will not be charged.We  <span style={{ colour: 'red' }}>DO NOT</span>  refund the last month payment deposite but rather apply it to your last month
                                  <br></br>
                                  <br></br>
                                  If you have any questions please call (678) 631-7275
                                  or (404) 246-8576{" "}
                                </div>
                                <br></br>
                              </div>

                              <hr></hr>
                            </div>
                            {/* <div className="step"> */}
                              <div className="billing">
                                <h3>Billing Address</h3>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div class="form-group">
                                      <label>
                                        Street Address<span style={{ color: "red" }}>*</span>
                                      </label>
                                      <input
                                        name="Address"
                                        type="text"
                                        class="form-control "
                                        // value=""
                                        onChange={(e) => setAddress(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    <div class="form-group">
                                      <label>Street Address Line 2</label>
                                      <input
                                        name="Address"
                                        type="text"
                                        class="form-control "
                                        // value=""
                                        onChange={(e) => setAddress1(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div class="form-group">
                                      <label>City</label>
                                      <input
                                        name="Address"
                                        type="text"
                                        class="form-control "
                                        // value=""
                                        onChange={(e) => setcity(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div class="form-group">
                                      <label>State / Province</label>
                                      <input
                                        name="Address"
                                        type="text"
                                        class="form-control "
                                        // value=""
                                        onChange={(e) => setstate(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div class="form-group">
                                      <label>Postal / Zip Code</label>
                                      <input
                                        name="Address"
                                        type="text"
                                        class="form-control "
                                        // value=""
                                        onChange={(e) => setpostal(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div class="form-group">
                                      <label>Country</label>
                                      <input
                                        name="Address"
                                        type="text"
                                        class="form-control "
                                        // value=""
                                        onChange={(e) => setcountry(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div class="col-md-6 col-sm-6">
                                    <div class="form-group">
                                      <label>
                                        Lot Location <span style={{ color: "red" }}>*</span>
                                      </label>
                                      <Field onChange={handlelocationidchange}
                                        as="select"
                                        name="selectedLocation"
                                        className="form-control"
                                        selected={locationId}
                                      >
                                        <option value="">Location/Available space</option>
                                        {locations.map((location, index) => (
                                          //                     
                                          <option key={index}
                                            value={JSON.stringify({ id: location._id })}>
                                            {/* value={location.locationId}> */}
                                            {`${location.addressOne}, ${location.addressTwo}, ${location.addressThree} / ${location.remainingSpace ?? 0}`}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                  </div>
                                  {/* <div class="col-md-6 col-sm-6"></div> */}
                                  <div class="col-md-6 col-sm-6">
                                    <div className="form-group">
                                      <label>
                                        Type of Vehicle<span style={{ color: "red" }}>*</span>
                                      </label>
                                      <Field

                                        onChange={handleVehicleTypeChange}
                                        as="select"
                                        name="selectedLocation"
                                        className="form-control"
                                        selected={vehicleTypeId}
                                      >
                                        <option value="">Please Select</option>
                                        {Array.isArray(vehicleType) && vehicleType.map((vechicledata, index) => (
                                          <option key={index} value={JSON.stringify({ dropdownvehicleType: vechicledata.vehicleType, id: vechicledata._id })}>
                                            {vechicledata.vehicleType}
                                          </option>

                                        ))}
                                      </Field>
                                    </div>
                                  </div>
                                  {/* <div class="col-md-6 col-sm-6"></div> */}
                                  <div className="col-md-6 col-sm-6">
                                    <div class="form-group">
                                      <label>
                                        Number of Vehicle <span style={{ color: "red" }}>*</span>
                                      </label>
                                      <input
                                        name="numberofvehicle"
                                        type="number"
                                        className={`form-control`}
                                        onChange={(e) => setnumbervehicle(e.target.value)}
                                      />
                                    </div>
                                  </div>

                                  {/* <div class="col-md-6 col-sm-6"></div> */}
                                  <div class="col-md-6 col-sm-6">
                                    <div class="form-group">
                                      <label>
                                        Reason for Cancelling <span style={{ color: "red" }}>*</span>
                                      </label>
                                      <select
                                        name="reasonforCancelling"
                                        class="form-control "
                                        onChange={(e) => setreasoncancelling(e.target.value)}
                                      >
                                        <option value="">Please Select </option>
                                        <option value="Moved to Another location">
                                          Moved to Another location
                                        </option>
                                        <option value="Found a cheaper location">
                                          Found a cheaper location
                                        </option>
                                        <option value="Sold my vehicle">
                                          Sold my vehicle
                                        </option>
                                        <option value="Other">Other</option>
                                      </select>
                                    </div>
                                  </div>
                                  {/* <div class="col-md-6 col-sm-6"></div> */}
                                  <div className="col-md-12 col-sm-12">
                                    <div class="form-group">
                                      <label>Additonal Comments</label>
                                      <textarea
                                        onChange={(e) => setAdditonalcomments(e.target.value)}
                                        name="additionalCommentd"
                                        className={`form-control`}
                                        style={{  height: "100px" }}
                                      />
                                    </div>
                                  </div>
                                <div className="col-md-8 col-sm-8">
                                  <label>Signature <span style={{ color: 'red' }}>*</span></label>
                                  <div className="form-group" style={{ background: 'white'}}>
                                    <SignatureCanvas
                                      penColor="black"
                                      canvasProps={{  height: 100, className: 'sigCanvas' }}
                                      ref={sigPad}
                                      onEnd={handleSignatureChange}
                                    />
                                   
                                     
                                  </div>
                                  </div>

                                <div className="col-md-2 col-sm-2">
                                  <button className='button' type="button" onClick={handleClearSignature}  >Clear</button>
                                </div>
                                  <div class="col-md-12 col-sm-6 ">
                                    <div class="form-group check-box">
                                      <input
                                        name="acknowledge"
                                        type="checkbox"
                                        value=""
                                        onChange={handleCheckboxChange}
                                      />
                                      <label>
                                        By checking this box, I acknowledge that I am
                                        cancelling my Monthly Parking Agreement and
                                        agree to not park any vehicle after the date
                                        indicated under "Last Date Parking" or the last
                                        day that is covered by my last paid invoice.
                                        <span>*</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <br></br>
                              </div>
                              {isFormValid() ? (
                                <a
                                  className="button"
                                  href="#"
                                  onClick={submitForm}
                                >
                                  Submit
                                </a>
                              ) : (
                                <div>Please fill in all required fields to enable the submit button.</div>
                              )}
                              {formError && <div className="alert alert-danger">{formError}</div>}
                            {/* </div> */}
                          </>
                        )}
                        <br></br>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cancel;
