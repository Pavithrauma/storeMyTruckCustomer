import React, { useState, useEffect, useRef } from "react";
import Header from "../../header/Header.js";
import Footer from "../../footer/Footer.js";
import MonthlyAggrement from "./TermsandConditions/MonthlyAgreement.js";
import SignatureField from "./SignatureField.js";
import RadioButton from './RadioButton.js';
import SignatureCanvas from 'react-signature-canvas';
import "./Parking.css";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import FileUploadField from "./FileUploadField.js";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAxios } from '../../../components/http/useAxios';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import validationSchema from "./validationSchema.js";
const MonthlyPrivateVehicle = () => {
    const { axios } = useAxios();
    const { type } = useParams();
    const sigPad = useRef(null);
    const [vehicleTypeId, setvehicleTypeId] = useState('');
    const [signatureDataUrl, setSignatureDataUrl] = useState("");
    const [showExtendedParkingInfo, setShowExtendedParkingInfo] = useState(false);
    const [selectedState, setSelectedState] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [securityCode, setSecurityCode] = useState('');
    const [securityCodeError, setSecurityCodeError] = useState("");
    const [totalDays, setTotalDays] = useState(null);;
    const [locations, setLocations] = useState([]);
    const [signature, setSignature] = useState("");
    const [locationId, setlocationId] = useState('');
    const [parkingDate, setParkingDate] = useState("");
    const [expirationYear, setexpirationYear] = useState("");
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastName, setlastName] = useState("");
    const [lastNameError, setlastNameError] = useState("");
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [creditCardNumberError, setCreditCardNumberError] = useState("");
    const [vehicleInformationYear, setvehicleInformationYear] = useState("");
    const [vehicleInformationmodel, setvehicleInformationmodel] = useState('');
    const [vehicleInformationmake, setvehicleInformationmake] = useState('');
    const [vehicleInformationcolor, setvehicleInformationcolor] = useState('');
    const [vehicleInformationtagnumber, setvehicleInformationtagnumber] = useState('');
    const [securitycode, setsecuritycode] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [comment, setcomment] = useState('');
    const [yearerror, setyearerror] = useState('');
    const [makeerror, setmakeerror] = useState('');
    const [modelerror, setmodelerror] = useState('');
    const [tagnoerror, settagnoerror] = useState('');
    const [colourerror, setcolourerror] = useState('');
    const [expirationMonth, setexpirationMonth] = useState("");
    const [streetAddress, setStreetAddress] = useState('');
    const [streetAddress2, setStreetAddress2] = useState('');
    const [postalCodeError, setPostalCodeError] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setcountry] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [termsError, setTermsError] = useState('');
    const [vehicleData, setVehicleData] = useState({
        year: '',
        make: '',
        model: '',
        usdot: '',
        tagnumber: '',
        color: '',
    });
    const [bookingDate, setBookingDate] = useState(""); // Default to today's date
    const [userDetails, setUserDetails] = useState({
        name: '',
        company_name: '',
        phone_number: '',
        email: '',
    });
    const [year, setyear] = useState("");
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
    const NearestLocationList = async (latitude, longitude) => {
        // const lists = {
        //     latitude: 33.797112,
        //     longitude: -84.422771,
        // };
        const userid = localStorage.getItem("storemytruck_customer_id")
        const NearestList = process.env.REACT_APP_BASE_NEARSET_LOCATION;

        try {
            const res = await axios.get(`${NearestList}`, {
                params: {
                    userId: userid
                }
            });
            // con
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
    useEffect(() => {
        NearestLocationList();
        // Licenseno();
    }, [])
    useEffect(() => {
        const today = new Date();
        setBookingDate(today.toLocaleDateString());
    }, []);
    const handleSignatureChange = () => {
        if (sigPad.current) {
            const dataUrl = sigPad.current.toDataURL('image/png');
            setSignatureDataUrl(dataUrl);
            // console.log(dataUrl, 'Signature Data URL');
        }
    };
    const handleCheckboxChange = (event) => {
        setShowExtendedParkingInfo(event.target.checked);
    };

    const handleSecurityCodeChange = (e) => {
        const value = e.target.value;

        // Allow only up to 3 digits
        if (/^\d{0,3}$/.test(value)) {
            setSecurityCode(value);
            setSecurityCodeError(""); // Clear error if input is valid
        }
    };
    const handleSecurityCodeBlur = () => {
        if (securityCode.length !== 3) {
            setSecurityCodeError("Security code must be exactly 3 digits");
        } else {
            setSecurityCodeError("");
        }
    };






    const statesAndLocations = {
        Alabama: ["Location 1", "Location 2", "Location 3"],
        Georgia: ["Location A", "Location B", "Location C"],
        // Define locations for other states as needed
    };
    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (date && endDate) {
            calculateTotalDays(date, endDate);
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        if (startDate && date) {
            calculateTotalDays(startDate, date);
        }
    };
    const handleRadioChange = (value) => {
        setSelectedOption(value);
    };
    const calculateTotalDays = (start, end) => {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setTotalDays(diffDays);
    };
    const handlelocationidchange = (e) => {
        const value = e.target.value; // Get the selected value
        if (value) {
            try {
                const { id } = JSON.parse(value); // Parse the value
                setlocationId(id); // Set the location ID
            } catch (error) {
                console.error("Error parsing JSON: ", error); // Log any parsing error
            }
        } else {
            setlocationId(null); // Reset location ID if no selection
        }
    };
    const handleClearSignature = () => {
        if (sigPad.current) {
            sigPad.current.clear();
            setSignatureDataUrl('');
        }
    };

    const initialValues = {
        FirstName: "",
        LastName: "",
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
        vehicleType: '',
        numberOfVehicles: '',
        vehicles: [
            {
                yearMakeModel: '',
                color: '',
                usdot: '',
                companyNameOnTractor: ''
            }
        ]
    };
    const handleDateChange = (e) => {
        const dateValue = e.target.value;

        // Ensure the date is valid before setting it
        if (Date.parse(dateValue)) {
            setParkingDate(dateValue);
        } else {
            console.error("Invalid date entered.");
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVehicleData({ ...vehicleData, [name]: value });
    };

    const submitForm = async (event) => {
        event.preventDefault();

        // if (!selectedFile) {
        //   alert('Please select a file before submitting.');
        //   return;
        // }isAcknowledged

        // Check for acknowledgements first
        // const newErrors = {
        //   security: !isAcknowledged.security,
        //   vehicleRelocation: !isAcknowledged.vehicleRelocation,
        //   agreement: !isAcknowledged.agreement,
        //   illegalParking: !isAcknowledged.illegalParking,
        // };

        // // Update the error state
        // setErrors(newErrors);

        // // Check if all required sections are acknowledged
        // const allAcknowledged = Object.values(isAcknowledged).every(value => value === true);

        // if (!allAcknowledged) {
        //   Swal.fire({
        //     position: 'top-end',
        //     icon: 'error',
        //     title: 'An error occurred',
        //     text: 'Please acknowledge all required sections.',
        //     showConfirmButton: false,
        //     confirmButtonText: 'OK',
        //   });
        //   return; // Stop the form submission if not all acknowledgments are made
        // }

        // const parkingDateString = new Date(parkingDate).toISOString();
        // const startDateString = new Date(startDate).toISOString();
        // const endDateString = new Date(endDate).toISOString();



        // vehicles: [
        //     {
        //         yearMakeModel: '',
        //         color: '',
        //         usdot: '',
        //         companyNameOnTractor: ''
        //     }
        // ]

        let vehicle_details = [
            {
                year: vehicleInformationYear,
                make: vehicleInformationmake,
                model: vehicleInformationmodel,
                // trim: trim,
                color: vehicleInformationcolor,
                tagnumber: vehicleInformationtagnumber
                // usdot: usdot || ''
            }
        ];




        setyearerror('');
        setFirstNameError('');
        setlastNameError('');
        setmakeerror('');
        setcolourerror('');
        settagnoerror('');
        setmodelerror('');
        // Validate fields
        if (!vehicleInformationYear) {
            setyearerror('Year is required');
            // return;
        }
        if (!vehicleInformationmake) {
            setmakeerror('make is required')
            // return;
        }
        if (!vehicleInformationcolor) {
            setcolourerror('Color is required')
            // return;
        }
        if (!vehicleInformationmodel) {
            setmodelerror('model is required')
            // return;
        }
        if (!vehicleInformationtagnumber) {
            settagnoerror('Tag number is required')
            // return;
        }
        if (!firstName) {
            setFirstNameError('First name is required');
            // return;
        }

        if (!lastName) {
            setlastNameError('Last name is required');
            // return;
        }
        // if (!creditCardNumber) {
        //     creditCardNumberError('Credit Card Number is required');
        //     // return;
        // }


        if (!termsAccepted) {
            setTermsError('You must accept the terms and conditions');
            // return;
        }



        // vehicle_details.forEach((vehicle, index) => {
        //     Object.keys(vehicle).forEach(key => {


        //         console.log("----------------------------------------",key);

        //       formData.append(`vehicleDetails[${index}][${key}]`, vehicle[key] || '');
        //     });
        //   });

        // let formattedMonth = expirationMonth.toString().padStart(2, '0');
        // let formattedYear = expirationYear.toString().slice(-2);
        let parkingTypeId = '66da9e1837e88d0ccde16399'
        const formData = new FormData();
        // console.log(amountdetail, 'hike');

        // formData.append('parkingDate', parkingDateString);
        // formData.append('startDate', startDateString);
        // formData.append('endDate', endDateString);
        // formData.append('parkingDays', totalDays || '');
        formData.append('city', city || '');
        formData.append('streetAddress', streetAddress || '');
        formData.append('streetAddress2', streetAddress2 || '');
        formData.append('state', state || '');
        formData.append('postalCode', postalCode || '');
        formData.append('country', country || '');
        // // formData.append('totalAmount', totalAmount || '');
        // // formData.append('accountOwnerName', accountOwnerName || '');
        // // formData.append('accountOwnerlastName', accountOwnerlastName || '');
        formData.append('expirationMonth', expirationMonth || '');
        formData.append('expirationYear', expirationYear || '');
        // formData.append('vehicleImages', selectedFile);
        // formData.append('insuranceImages', insuranceCard);
        // formData.append('licenseImages', driversLicense);
        formData.append('Firstname', firstName);
        formData.append('Lastname', lastName);
        formData.append('Creditcardnumber', creditCardNumber);
        formData.append('Securitycode', securityCode);
        formData.append('TotalAmount', selectedOption);
        // formData.append('amountDue', amountdetail.amountDue);
        // formData.append('TransactionFee', amountdetail.convenienceFee);
        // formData.append('TotalAmount', amountdetail.totalAmount);


        vehicle_details.forEach((vehicle, index) => {
            Object.keys(vehicle).forEach(key => {
                formData.append(`vehicleDetails[${index}][${key}]`, vehicle[key] || '');
            });
        });
        // // formData.append('signature', signatureDataUrl || '');
        formData.append('locationId', locationId || '');
        // formData.append('vehicle_details', vehicle_details || '');
        // // formData.append('convenienceFee', convenienceFee || '');
        // // formData.append('companyNameOnTractor', companyNameOnTractor || '');
        // // formData.append('totalAmount2', totalAmount2 || '');
        formData.append('userId', localStorage.getItem("storemytruck_customer_id") || '');
        // formData.append('vehicleTypeId', vehicleTypeId || '');
        formData.append('parkingTypeId', parkingTypeId || '');
        // // formData.append('vechicleCount', vechicleCount || '');
        if (signatureDataUrl) {
            const byteString = atob(signatureDataUrl.split(',')[1]);
            const mimeString = signatureDataUrl.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);

            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            const blob = new Blob([ab], { type: mimeString });

            // Append the signature blob to the FormData
            console.log(blob, 'hike');

            formData.append('signature', blob, 'signature.png');
        }
        try {
            const response = await axios.post(process.env.REACT_APP_API_SAVE_PRIVATE_PARKING, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'MonthlyPrivateVehicle enrolled successfully.',
                showConfirmButton: true,
                confirmButtonText: 'OK',
            }).then(() => {
                // Refresh the page after success popup closes
                window.location.reload();
            });

        } catch (error) {
            console.error('Error submitting form:', error);

            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'An error occurred',
                text: 'Unable to submit the form. Please try again later.',
                showConfirmButton: true,
                confirmButtonText: 'OK',
            });
        }

        // console.log("payload", formData);
    };
    const handlePostalCodeBlur = () => {
        // Check if the input contains only numbers
        const isNumeric = /^[0-9]+$/.test(postalCode);

        if (postalCode.trim() === "") {
            setPostalCodeError("Postal / Zip Code is required");
        } else if (!isNumeric) {
            setPostalCodeError("Please enter numeric values only");
        } else if (postalCode.length < 5 || postalCode.length > 10) {
            setPostalCodeError("Postal / Zip Code should be between 5 and 10 digits");
        } else {
            setPostalCodeError("");
        }
    };
    const handleBlur = () => {
        if (firstName.trim() === "") {
            setFirstNameError("First Name is required");
        } else {
            setFirstNameError("");
        }
    };

    const handleFirstnameChange = (e) => {
        setFirstName(e.target.value);
    };
    const handlenameBlur = () => {
        if (lastName.trim() === "") {
            setlastNameError("Last Name is required");
        } else {
            setlastNameError("");
        }
    };

    const handlelastnameChange = (e) => {
        setlastName(e.target.value);
    };
    const handleCreditBlur = () => {
        // Check if the credit card number is exactly 14 digits
        if (!/^\d{13}$/.test(creditCardNumber)) {
            setCreditCardNumberError("Please enter a valid 13-digit credit card number");
        } else {
            setCreditCardNumberError("");
        }
    };

    const handleCreditChange = (e) => {
        // Allow only numeric input
        const value = e.target.value;

        // Only update if the input is a number and is less than or equal to 14 digits
        if (/^\d*$/.test(value) && value.length <= 14) {
            setCreditCardNumber(value);
        }
    };
    return (
        <div>
            <Header />
            <div className="book-form">
                <div className="container margin_60">
                    <div className="row pb-4">
                        <div className="col-md-12">
                            <h1>MONTHLY PRIVATE VEHICLE PARKING </h1>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>
                                        PRIVATE VEHICLE PARKING AGREEMENT TERMS & CONDITIONS (CLICK TO EXPAND)
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <MonthlyAggrement />
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="sidebox">
                                <div className="box_style_2">
                                    <div className="authuority">
                                        <a href="https://verify.authorize.net/anetseal/?pid=4b8a4eb2-93e5-4223-847f-774760e72a09&amp;rurl=https://www.storemytruck.com" onmouseover="window.status='http://www.authorize.net/'; return true;" onmouseout="window.status=''; return true;" onclick="window.open('https://verify.authorize.net/anetseal/?pid=4b8a4eb2-93e5-4223-847f-774760e72a09&amp;rurl=https://www.storemytruck.com','AuthorizeNetVerification','width=600,height=430,dependent=yes,resizable=yes,scrollbars=yes,menubar=no,toolbar=no,status=no,directories=no,location=yes'); return false;" rel="noopener noreferrer" target="_blank">
                                            <img src="https://verify.authorize.net/anetseal/images/secure90x72.gif" width="90" height="72" border="0" alt="Authorize.Net Merchant - Click to Verify" />
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
                                                MONTHLY PRIVATE VEHICLE PARKING
                                            </h3>
                                            <p>StoreMyTruck.com</p>
                                        </div>
                                        <div className="step">
                                            <div className="row">
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>
                                                            Date
                                                            <span style={{ color: 'red' }}>*</span>
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="bookingDate"
                                                            className="form-control required"
                                                            readOnly
                                                            placeholder={bookingDate}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6" >
                                                    <div className="form-group">
                                                        <label> Locations<span style={{ color: 'red' }}>*</span></label>
                                                        <Field
                                                            onChange={handlelocationidchange}
                                                            as="select"
                                                            name="selectedLocation"
                                                            className="form-control"
                                                            value={locationId ? JSON.stringify({ id: locationId }) : ""} // Ensure the value reflects the state
                                                        >
                                                            <option value="">Location/Available space</option>
                                                            {locations.map((location, index) => (
                                                                <option key={index} value={JSON.stringify({ id: location._id })}>
                                                                    {`${location.addressOne}, ${location.addressTwo}, ${location.addressThree} / ${location.remainingSpace ?? 0}`}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    {/* {selectedState && (
                                                        <div className="form-group">

                                                            <label>Nearest Locations</label>
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
                                                    {/* {`${location.addressOne}, ${location.addressTwo}, ${location.addressThree} / ${location.remainingSpace ?? 0}`}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                        </div>
                                                    )} */}
                                                </div>



                                            </div>
                                            <div className="row">



                                            </div>
                                        </div>
                                        {/* <div className="form_title">
                                            <h3>
                                                <strong>
                                                    <i className="fa-solid fa-2"></i>
                                                </strong>
                                                Account Information
                                            </h3>
                                        </div>
                                        <div className="step">
                                            <div className="row">
                                                <div className="col-md-6 col-sm-6">

                                                    <div className="form-group">
                                                        <label>
                                                            Account Owner's first Name
                                                        </label>
                                                        <Field  
                                                            type="text"
                                                            name="FirstName"
                                                            className="form-control required"

                                                            placeholder="FirstName"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label>
                                                            Account Owner's Last Name
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="LastName"
                                                            className="form-control required"

                                                            placeholder="LastName"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="CompanyName"
                                                            className="form-control required"

                                                            placeholder="CompanyName"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="StreetAddress"
                                                            className="form-control required"

                                                            placeholder="StreetAddress"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="StreetAddressLine2"
                                                            className="form-control required"

                                                            placeholder="StreetAddressLine2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="City"
                                                            className="form-control required"
                                                            placeholder="City"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="StateProvince"
                                                            className="form-control required"

                                                            placeholder="StateProvince"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="PostalZipcode"
                                                            className="form-control required"

                                                            placeholder="PostalZipcode"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="Email"
                                                            className="form-control required"
                                                            placeholder="Email"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <Field
                                                            type="text"
                                                            name="MobileNumber"
                                                            className="form-control required"
                                                            placeholder="MobileNumber"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div> */}
                                        <div className="form_title">
                                            <h3>
                                                <strong>
                                                    <i className="fa-solid fa-2"></i>
                                                </strong>
                                                Personal Vehicle Information
                                            </h3>
                                        </div>
                                        <div className="step">
                                            <div className="row">



                                                <div className="row vehicle-details">
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Year<span style={{ color: 'red' }}>*</span></label>
                                                                    <input
                                                                        type="text"
                                                                        className={`form-control ${yearerror ? 'is-invalid' : ''}`}
                                                                        placeholder="Year"
                                                                        value={vehicleInformationYear}
                                                                        onChange={(e) => {
                                                                            setvehicleInformationYear(e.target.value);
                                                                            setyearerror(''); // Clear error on change
                                                                        }}
                                                                    />
                                                                    {yearerror && <div className="invalid-feedback">{yearerror}</div>}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Make<span style={{ color: 'red' }}>*</span></label>
                                                                    <input
                                                                        type="text"
                                                                        className={`form-control ${makeerror ? 'is-invalid' : ''}`}
                                                                        placeholder="Make"
                                                                        value={vehicleInformationmake}
                                                                        onChange={(e) => {
                                                                            setvehicleInformationmake(e.target.value);
                                                                            setmakeerror(''); // Clear error on change
                                                                        }}
                                                                    />
                                                                    {makeerror && <div className="invalid-feedback">{makeerror}</div>}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Model<span color="red">*</span></label>
                                                                    <input
                                                                        type="text"
                                                                        className={`form-control ${modelerror ? 'is-invalid' : ''}`}
                                                                        placeholder="Model"
                                                                        value={vehicleInformationmodel}
                                                                        onChange={(e) => {
                                                                            setvehicleInformationmodel(e.target.value);
                                                                            setmodelerror(''); // Clear error on change
                                                                        }}
                                                                    />
                                                                    {modelerror && <div className="invalid-feedback">{modelerror}</div>}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Color<span color="red">*</span></label>
                                                                    <input
                                                                        type="text"
                                                                        className={`form-control ${colourerror ? 'is-invalid' : ''}`}
                                                                        placeholder="Color"
                                                                        value={vehicleInformationcolor}
                                                                        onChange={(e) => {
                                                                            setvehicleInformationcolor(e.target.value);
                                                                            setcolourerror(''); // Clear error on change
                                                                        }}
                                                                    />
                                                                    {colourerror && <div className="invalid-feedback">{colourerror}</div>}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Tag Number<span color="red">*</span></label>
                                                                    <input
                                                                        type="text"
                                                                        className={`form-control ${tagnoerror ? 'is-invalid' : ''}`}
                                                                        placeholder="Tag Number"
                                                                        value={vehicleInformationtagnumber}
                                                                        onChange={(e) => {
                                                                            setvehicleInformationtagnumber(e.target.value);
                                                                            settagnoerror(''); // Clear error on change
                                                                        }}
                                                                    />
                                                                    {tagnoerror && <div className="invalid-feedback">{tagnoerror}</div>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                            </div>
                                            <hr />
                                        </div>
                                        <div className="form_title">
                                            <h3>
                                                <strong>
                                                    <i className="fa-solid fa-3"></i>
                                                </strong>
                                                Service
                                            </h3>
                                        </div>
                                        <div className="step">
                                            <div class="row">
                                                <div class="col-md-12 col-sm-12">
                                                    <div className="form-group">
                                                        {/* Pass the callback to RadioButton component */}
                                                        <RadioButton onOptionChange={handleRadioChange} />
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                        <div className="step">
                                            <div className="billing">
                                                <h3>Credit Card Information:</h3>
                                                <div class="row mt-2">
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="form-group">
                                                            <label>Account Owner's First Name<span style={{ color: 'red' }}>*</span></label>
                                                            <input
                                                                name="firstName"
                                                                type="text"
                                                                placeholder="First Name"
                                                                className={`form-control ${firstNameError ? "is-invalid" : ""}`}
                                                                value={firstName}
                                                                onChange={(e) => setFirstName(e.target.value)}
                                                                onBlur={() => firstName === '' && setFirstNameError('First name is required')}
                                                            />
                                                            {firstNameError && (
                                                                <div className="invalid-feedback">
                                                                    {firstNameError}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="form-group">
                                                            <label>Account Owner's Last Name<span style={{ color: 'red' }}>*</span></label>
                                                            <input
                                                                name="lastName"
                                                                type="text"
                                                                placeholder="Last Name"
                                                                className={`form-control ${lastNameError ? "is-invalid" : ""}`}
                                                                value={lastName}
                                                                onChange={(e) => setlastName(e.target.value)}
                                                                onBlur={() => lastName === '' && setlastNameError('Last name is required')}
                                                            />
                                                            {lastNameError && (
                                                                <div className="invalid-feedback">
                                                                    {lastNameError}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-6">
                                                        <div class="form-group">
                                                            <label>Credit Card Number<span style={{ color: 'red' }} >*</span></label>
                                                            <input
                                                                name="companyName"
                                                                type="Number"
                                                                placeholder="Enter the credit card number"
                                                                className={`form-control ${creditCardNumberError ? "is-invalid" : ""}`}
                                                                // value={firstName}
                                                                onChange={handleCreditChange}
                                                                onBlur={handleCreditBlur}
                                                            />
                                                            {creditCardNumberError && (
                                                                <div className="invalid-feedback">
                                                                    {creditCardNumberError}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-6">
                                                        <div class="form-group">
                                                            <label>Security Code</label>
                                                            <input
                                                                name="securityCode"
                                                                type="text"
                                                                class="form-control"
                                                                onChange={handleSecurityCodeChange}
                                                                onBlur={handleSecurityCodeBlur} // Validate on blur
                                                                value={securityCode}
                                                                maxLength="3" // Limit input to 3 digits
                                                                placeholder="Enter 3-digit security code"
                                                            />
                                                            {/* Error Message */}
                                                            {securityCodeError && (
                                                                <div className="text-danger">{securityCodeError}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-6">
                                                        <div class="form-group" onChange={(e => setexpirationYear(e.target.value))}  >
                                                            <label>Expiration Month</label>
                                                            <select name="vehicleType" class="form-control ">
                                                                <option value="">Please Select Month</option>
                                                                <option value="01">January</option>
                                                                <option value="02">February</option>
                                                                <option value="03">March</option>
                                                                <option value="04">April</option>
                                                                <option value="05">May</option>
                                                                <option value="06">June</option>
                                                                <option value="07">July</option>
                                                                <option value="08">August</option>
                                                                <option value="09">September</option>
                                                                <option value="10">October</option>
                                                                <option value="11">November</option>
                                                                <option value="12">December</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-sm-6">
                                                        <div class="form-group" onChange={(e => setexpirationMonth(e.target.value))}>
                                                            <label>Expiration Year</label>
                                                            <select name="vehicleType" class="form-control ">
                                                                <option value="">Please Select Year</option>
                                                                <option value="2024">2024</option>
                                                                <option value="2025">2025</option>
                                                                <option value="2026">2026</option>
                                                                <option value="2027">2027</option>
                                                                <option value="2028">2028</option>
                                                                <option value="2029">2029</option>
                                                                <option value="2030">2030</option>
                                                                <option value="2031">2031</option>
                                                                <option value="2032">2032</option>
                                                                <option value="2033">2033</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="billing">
                                                <h3>Billing Address</h3>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div class="form-group">
                                                            <label>Street Address</label>
                                                            <input
                                                                name="Address"
                                                                type="text"
                                                                class="form-control "

                                                                onChange={(e) => setStreetAddress(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div class="form-group">
                                                            <label>Street Address 2</label>
                                                            <input
                                                                name="Address"
                                                                type="text"
                                                                class="form-control "

                                                                onChange={(e) => setStreetAddress2(e.target.value)}
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

                                                                onChange={(e) => setCity(e.target.value)}
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

                                                                onChange={(e) => setState(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>Postal / Zip Code</label>
                                                            <input
                                                                name="PostalCode"
                                                                type="text"
                                                                className={`form-control ${postalCodeError ? "is-invalid" : ""}`}
                                                                value={postalCode}
                                                                onChange={(e) => setPostalCode(e.target.value)}
                                                                onBlur={handlePostalCodeBlur}
                                                            />
                                                            {postalCodeError && (
                                                                <div className="invalid-feedback">
                                                                    {postalCodeError}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div class="form-group">
                                                            <label>Country</label>
                                                            <input
                                                                name="Address"
                                                                type="text"
                                                                class="form-control "
                                                                onChange={(e) => setcountry(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={termsAccepted}
                                                                onClick={(e) => {
                                                                    setTermsAccepted(e.target.checked);
                                                                    setTermsError(''); // Clear error on change
                                                                }}
                                                            />
                                                            I have read and agree to the <Link>terms & conditions</Link>
                                                            <span>*</span>
                                                        </label>
                                                        {termsError && <div className="invalid-feedback">{termsError}</div>}
                                                    </div>

                                                    {/* {showExtendedParkingInfo && ( */}
                                                    <div className="col-md-12">
                                                        <p>
                                                            Please use your mouse or finger (tablet,
                                                            smartphone) to enter your signature. We require
                                                            either a electronic signature or digital
                                                            signature to complete your parking contract
                                                            agreement. By signing below you agree to the
                                                            terms and conditions and that you have
                                                            authorized your credit card to be charged. If
                                                            you have not received confirmation within 24
                                                            hours that your credit card has been charged,
                                                            contact us directly at 678-631-7275.
                                                        </p>
                                                        <label>Signature <span style={{ color: 'red' }}>*</span></label>
                                                        <div className="form-group">
                                                            <SignatureCanvas
                                                                penColor="black"
                                                                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                                                                ref={sigPad}
                                                                onEnd={handleSignatureChange}
                                                            />
                                                            <button className='button' type="button" onClick={handleClearSignature} style={{}}>Clear</button>
                                                            {signatureDataUrl && (
                                                                <div>
                                                                    {/* <img src={signatureDataUrl} alt="Signature" /> */}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="col-md-12 col-sm-6">
                                                            <div class="form-group">
                                                                <br></br>
                                                                <label>Comments & Additional Information</label>
                                                                <textarea onChange={(e) => setcomment(e.target.value)}
                                                                    name="additionalCommentd"
                                                                    type="textarea"
                                                                    className={`form-control`}
                                                                    style={{ width: "100%", height: "100px" }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* )} */}
                                                </div>
                                            </div>
                                            <a class="button" href="" onClick={submitForm}>
                                                Submit
                                            </a>
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

export default MonthlyPrivateVehicle;
