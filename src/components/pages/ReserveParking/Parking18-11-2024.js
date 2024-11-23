
import React, { useState, useEffect, useRef } from "react";
import Header from "../../header/Header.js";
import Footer from "../../footer/Footer.js";
import DailyAggrement from "./TermsandConditions/DailyAggrement.js";
// import WeekendAggrement from "./TermsandConditions/WeekendAgreement.js";
// import WeekendAggrement from "./TermsandConditions/WeekendAgreement.js";
// import WeeklyAggrement from "./TermsandConditions/WeeklyAgreement.js";
import SignatureField from "./SignatureField.js";
import SignatureCanvas from 'react-signature-canvas';
import "./Parking.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import FileUploadField from "./FileUploadField.js";
import { useParams } from 'react-router-dom';
import { useAxios } from '../../http/useAxios.js';
import Swal from 'sweetalert2/dist/sweetalert2.js';
//import 'sweetalert2/src/sweetalert2.scss';
import validationSchema from "./validationSchema.js";

const Parking = ({ index, touched, }) => {
  const sigPad = useRef(null);
  const [error, setError] = useState('');
  const [signatureError, setSignatureError] = useState('');
  const [lastdateerror, setlastdaterror] = useState('');
  const [firstdaterror, setfirstdaterror] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [locationerror, setlocationerror] = useState('');
  const [licenseError, setLicenseError] = useState('');
  const [vehicleTypeError, setVehicleTypeError] = useState('');
  const { type } = useParams();
  const [showExtendedParkingInfo, setShowExtendedParkingInfo] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [creditCardNumberError, setCreditCardNumberError] = useState("");
  const [parkingDays, setparkingDays] = useState(null);
  const [parkingDate, setparkingDate] = useState("");
  const [locations, setLocations] = useState([]);
  const [signature, setSignature] = useState("");
  const [licenseData, setLicenseData] = useState(null);
  const [licenseValue, setLicenseValue] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const [signatureDataUrl, setSignatureDataUrl] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [streetAddress2, setStreetAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [amountdue, setAmountdue] = useState('');
  const [FieldError, setFieldError] = useState('');
  const [accountOwnerlastName, setaccountOwnerlastName] = useState('');
  const [accountOwnerName, setaccountOwnerName] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [securityCode, setsecurityCode] = useState('');
  const [securityCodeError, setSecurityCodeError] = useState("");
  const [expirationMonth, setexpirationMonth] = useState('')
  const [expirationYear, setexpirationYear] = useState('');
  // const [licenseImages, setlicenseImages] = useState('');
  const [amountdetail, setamountdetail] = useState([]);
  // const [vehicleCount, setvehicleCount] = useState('');
  const [vehicleNumber, setvehicleNumber] = useState('');
  const [year, setyear] = useState('');
  const [model, setmodel] = useState('');
  const [convenienceFee, setConvenienceFee] = useState('');
  const [locationId, setlocationId] = useState(null);
  const [usdot, setusdot] = useState('');
  const [companyNameOnTractor, setcompanyNameOnTractor] = useState('');
  const [vehicleImages, setvehicleImages] = useState('');
  const [totalAmount2, setTotalAmount2] = useState('');
  const [insuranceImages, setinsuranceImages] = useState('');
  const [vehicleType, setVehicleType] = useState([]);
  const [selectvehicle, setselectvehicle] = useState('');
  const [color, setcolor] = useState('');
  const [required, setrequired] = useState('');
  const [vehicleTypeId, setvehicleTypeId] = useState('');
  const [make, setmake] = useState('');
  const [parkingTypeId, setparkingTypeId] = useState('');
  const [vechicleCount, setvechicleCount] = useState('');
  const [insuranceCard, setInsuranceCard] = useState(null);
  const [driversLicense, setDriversLicense] = useState(null);
  const [otherinfo, setotherinfo] = useState('');
  const [trailerlength, settrailerlength] = useState('');
  const [trailertype, settrailertype] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: '',
    company_name: '',
    phone_number: '',
    email: '',
  });
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
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

    const today = new Date();
    setparkingDate(today);

    Vehicletype();
    handleFocus();
    setFormValues(initialValues);
    setStartDate(null);
    setEndDate(null);
    setparkingDays(null);


    if (locationId != "" && vehicleTypeId != "" && vechicleCount != "" && parkingTypeId != "") {
      Amountdetails();
    }
  }, [type, locationId, vehicleTypeId, vechicleCount, parkingTypeId]); 



  const handleFileSelect = (file) => {
    setSelectedFile(file); // Store the selected file in state
  };
  const handleInsurance = (file) => {
    setInsuranceCard(file); // Store the selected file in state
  };
  const handleDriver = (file) => {
    setDriversLicense(file); // Store the selected file in state
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
  const handleSecurityCodeChange = (e) => {
    const value = e.target.value;

    // Allow only up to 3 digits
    if (/^\d{0,3}$/.test(value)) {
      setsecurityCode(value);
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
  const handleLicenseChange = (e) => {
    const value = e.target.value;
    setLicenseData(value);

    // Validate the license number
    if (value.length < 17) {
      setLicenseError('License number must be at least 17 characters long.');
    } else if (value.length > 17) {
      setLicenseError('License number must not exceed 17 characters.');
    } else {
      setLicenseError(''); // Clear error if valid
    }

    // Optionally fetch vehicle data based on the input
    fetchVehicleData(value);
  };
  const handleVehicleTypeChange = (e) => {
    try {
      const value = e.target.value;

      if (value) {
        const { dropdownvehicleType, id } = JSON.parse(value);
        setselectvehicle(dropdownvehicleType);
        setvehicleTypeId(id);
        setVehicleTypeError(''); // Reset error message
      } else {
        setselectvehicle("");
        setvehicleTypeId(null);
        setVehicleTypeError('Vehicle type is required'); // Set error message if no selection
      }
    } catch (error) {
      console.error("Error parsing JSON: ", error);
    }
  };
  const handleFirstNameBlur = () => {
    if (!accountOwnerName) {
      setFirstNameError("First Name is required");
    } else {
      setFirstNameError('');
    }
  };

  const handleLastNameBlur = () => {
    if (!accountOwnerlastName) {
      setLastNameError("Last Name is required");
    } else {
      setLastNameError('');
    }
  }

  const validateNumberOfVehicles = (value) => {
    if (!value) {
      return 'Number of vehicles is required.';
    }
    if (value > 200) {
      return 'Input should not be greater than the maximum value: 200.';
    }
    return '';
  };

  const handletractoronly = (e) => {
    const value = e.target.value;
    setcompanyNameOnTractor(value);
    // setusdot(value);
  }
  const handleVehicleCountChange = (e, index, setFieldValue) => {
    const value = e.target.value;
    setvechicleCount(value); // Update the vehicle count state

    // Validate the value
    const error = validateNumberOfVehicles(value);
    if (error) {
      // Set the error state accordingly
      setFieldError(`vehicles[${index}].numberOfVehicles`, error);
    } else {
      // Clear the error if the input is valid
      setFieldError(`vehicles[${index}].numberOfVehicles`, '');
    }

    // Optionally, if you need to update other related states, do it here
    console.log(value, 'mmmmmmmmm');
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
  // console.log('---------------------------------------locationId', locationId);
  // console.log('bookingDate', bookingDate);
  // console.log('startDate', startDate);
  // console.log('endDate', endDate);
  // console.log('vehicleType', vehicleType);
  // console.log('vehicleCount', vehicleCount);
  // console.log('licenseData', licenseData);
  // console.log('color', color);
  // console.log('totalAmount2', totalAmount2);

  const today = new Date();
  const { axios } = useAxios();

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
    license: "",
    vehicleType: '',
    numberOfVehicles: '',
    vehicles: [
      {
        yearMakeModel: '',
        color: '',
        usdot: '',
        companyNameOnTractor: '',
        trailerlength: "",
        trailertype: '',
        otherinfo: ''
      }

    ]

  };
  const [formValues, setFormValues] = useState(initialValues);
  const [vehicleData, setVehicleData] = useState('');


  const fetchVehicleData = async (license) => {


    try {
      setLicenseData(license);
      let url = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVIN/" + license;
      console.log("url" + url);
      const response = await axios.get(url, {
        params: {
          format: 'json',
        }
      });
      const vehicledata = [];
      let vehicledataResponse = response.data.Results;
      vehicledataResponse.forEach((vehicleDetail) => {
        console.log("vehicleerterterterterterterterDetail" + JSON.stringify(vehicleDetail));
        if (vehicleDetail.Variable == 'Make')
          vehicledata['make'] = vehicleDetail.Value
        if (vehicleDetail.Variable == 'Model')
          vehicledata['model'] = vehicleDetail.Value
        if (vehicleDetail.Variable == 'Trim')
          vehicledata['trim'] = vehicleDetail.Value
        if (vehicleDetail.Variable == "Model Year")
          vehicledata['year'] = vehicleDetail.Value
        if (vehicleDetail.Variable == 'Plant Company Name')
          vehicledata['companyName'] = vehicleDetail.Value
        if (vehicleDetail.Variable == 'Trailer Length (feet)')
          vehicledata['overallLength'] = vehicleDetail.Value
        vehicledata['color'] = "Red";
      });
      const vehicleInforamtion = {
        "year": vehicledata['year'],
        "make": vehicledata["make"],
        "model": vehicledata["model"],
        "trim": vehicledata["trim"],
        "color": vehicledata["color"],
        "type": vehicledata["type"],
        "size": vehicledata["size"],
        "companyName": vehicledata["companyName"],
        "overallLength": vehicledata["overallLength"]
      }
      setVehicleData(vehicleInforamtion);



      console.log(vehicleInforamtion, 'llllll');
      console.log(vehicleInforamtion.year, 'llll1251231231231ll');


      // setyear(vehicleInforamtion.year);
      // setmake(make);
      // setmodel(model);

    } catch (error) {
      console.error('Error fetching vehicle data:', error);
      setVehicleData('');
    }
    // return Responder.sendSuccess(res, "Vehicle Information Fetched successfully", 200, vehicleInforamtion);
  };
  console.log('setVehicleData', vehicleData);

  // const handleSignatureChange = (value) => {
  //   setSignature(value);
  //   const dataUrl = sigPad.toDataURL();
  //   setSignatureDataUrl(dataUrl);

  //   const signatureData = sigPad.current.toDataURL('image/png');
  //   console.log("signatureData", signatureData);
  //   setSignatureDataUrl(signatureData);
  // };

  // const clearSignature = () => {
  //   if (sigPad.current) {
  //     sigPad.current.clear(); // Call the clear method to reset the canvas
  //   }
  //   setSignatureDataUrl('');
  // };

  // const handleFileChange = (e) => {
  //   setvehicleImages(e.target.files);
  // };

  // const handleFileChangeIns = (e) => {
  //   setinsuranceImages(e.target.files);
  // };
  const handleparentrequired = (event) => {
    // Check if event and event.target exist before accessing 'checked'
    if (event && event.target) {
      const checked = event.target.checked;

      // Set all switches based on the first switch's state
      setIsAcknowledged({
        allAcknowledged: checked,
        security: checked,
        vehicleRelocation: checked,
        agreement: checked,
        illegalParking: checked
      });

      // Update the error state accordingly
      setErrors({
        security: !checked,
        vehicleRelocation: !checked,
        agreement: !checked,
        illegalParking: !checked
      });
    }
  };

  const handleSwitchChange = (field) => (event) => {
    setIsAcknowledged({ ...isAcknowledged, [field]: event.target.checked });
    setErrors({
      ...errors,
      [field]: !event.target.checked // Update error if unchecked
    });
    if (!event.target.checked) {
      setIsAcknowledged({ ...isAcknowledged, allAcknowledged: false });
    }
  };



  const handleSignatureChange = () => {
    if (sigPad.current) {
      const dataUrl = sigPad.current.toDataURL('image/png');
      setSignatureDataUrl(dataUrl);
      // console.log(dataUrl, 'Signature Data URL');
    }
  };

  // Clear the signature pad
  const handleClearSignature = () => {
    if (sigPad.current) {
      sigPad.current.clear();
      setSignatureDataUrl('');
    }
  };


  const submitForm = async (event) => {
    event.preventDefault();
    // if (!selectedFile) {
    //   alert('Please select a file before submitting.');
    //   return;
    // }
    // const newErrors = {}
    const allAcknowledged = Object.values(isAcknowledged).every(value => value === true);
    if (!allAcknowledged) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'An error occurred',
        text: 'Please acknowledge all required sections.',
        showConfirmButton: false,
        confirmButtonText: 'OK',
      });
      // return; // Stop the form submission if not all acknowledgments are made
    }
    if (!vehicleTypeId) {
      setVehicleTypeError('Vehicle type is required');
      // return;
    }


    setError(''); // Move this to the top

    // Validation for mandatory fields
    if (!startDate) {
      setfirstdaterror("first date is required")
      // return;
    }
    if (!endDate) {
      setlastdaterror("End date is required")
      // return;
    }


    if (!locationId) {
      setlocationerror("Location is required")
      // return; // Stop submission if validation fails
    }



    // if (!locationId) {
    //   Swal.fire({
    //     position: 'top-end',
    //     icon: 'error',
    //     title: 'An error occurred',
    //     text: 'Location is required.',
    //     showConfirmButton: true,
    //     confirmButtonText: 'OK',
    //   });
    //   // return; // Stop submission if validation fails
    // }




    // Check if all required sections are acknowledged


    if (!licenseData) {
      setLicenseError("VIN is required")
      // return;
    }



    if (!creditCardNumber) {
      setCreditCardNumberError('CreditCard number is required')
      // return;
    }
    if (!isChecked) {
      setError('You must agree to the terms & conditions.');
    }
    if (!accountOwnerName) {
      setFirstNameError('Account owner name is required')
      // return;
    }
    if (!accountOwnerlastName) {
      setLastNameError('Account owner last name is required')
      // return;
    }
    if (!sigPad) {
      setSignatureError('Signature is required.');
      // return;
    }
    // vehicles.forEach((vehicle, index) => {
    //   const error = validateNumberOfVehicles(vehicle.numberOfVehicles);
    //   if (error) {
    //     errors[`vehicles[${index}].numberOfVehicles`] = error;
    //   }
    // });

    // return errors;

    // If there are validation errors, set the state and stop submission
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   return; // Stop form submission
    // }
    const parkingDateString = new Date(parkingDate).toISOString();
    const startDateString = new Date(startDate).toISOString();
    const endDateString = new Date(endDate).toISOString();

    let vehicle_details = [{
      vehicleNumber: vehicleNumber || '',
      year: vehicleData.year || '',
      make: vehicleData.make || '',
      model: vehicleData.model || '',
      color: vehicleData.color || '',
      companyNameOnTractor: companyNameOnTractor || '',
      usdot: usdot || '',
      otherinfo: otherinfo,
      trailerlength: trailerlength,
      trailertype: trailertype
    }];
    
    let formattedMonth = expirationMonth.toString().padStart(2, '0');
    let formattedYear = expirationYear.toString().slice(-2);

    const formData = new FormData();

    formData.append('parkingDate', parkingDateString);
    formData.append('startDate', startDateString);
    formData.append('endDate', endDateString);
    formData.append('parkingDays', parkingDays || '');
    formData.append('city', city || '');
    formData.append('streetAddress', streetAddress || '');
    formData.append('streetAddress2', streetAddress2 || '');
    formData.append('state', state || '');
    formData.append('postalCode', postalCode || '');
    formData.append('country', country || '');
    formData.append('totalAmount', amountdetail.totalAmount || '');
    formData.append('accountOwnerName', accountOwnerName || '');
    formData.append('accountOwnerlastName', accountOwnerlastName || '');
    formData.append('creditCardNumber', creditCardNumber || '');
    formData.append('securityCode', securityCode || '');
    formData.append('expirationMonth', formattedMonth || '');
    formData.append('expirationYear', formattedYear || '');
    formData.append('vehicleImages', selectedFile);
    formData.append('insuranceImages', insuranceCard);
    formData.append('licenseImages', driversLicense);
    formData.append('VIN', licenseData);
    formData.append('termsAndConditions', termsAndConditions);

    vehicle_details.forEach((vehicle, index) => {
      Object.keys(vehicle).forEach(key => {
        formData.append(`vehicleDetails[${index}][${key}]`, vehicle[key] || '');
      });
    });
    // formData.append('signature', signature || '');
    formData.append('locationId', locationId || '');
    formData.append('amountdue', amountdetail.amountDue || '');
    formData.append('convenienceFee', amountdetail.convenienceFee || '');
    formData.append('companyNameOnTractor', companyNameOnTractor || '');
    formData.append('totalAmount2', amountdetail.totalAmount || '');
    formData.append('userId', localStorage.getItem("storemytruck_customer_id") || '');
    formData.append('vehicleTypeId', vehicleTypeId || '');

    formData.append('parkingTypeId', parkingTypeId || '');
    formData.append('vechicleCount', vechicleCount || '');
    if (signatureDataUrl) {

      console.log(signatureDataUrl, 'jjjjj');
      const byteString = atob(signatureDataUrl.split(',')[1]);
      const mimeString = signatureDataUrl.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });

      // Append the signature blob to the FormData
      formData.append('signature', blob, 'signature.png');
    }
    try {
      const response = await axios.post(process.env.REACT_APP_BASE_SAVE_PARKING, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Daily  parking enrolled successfully.',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });

    }
    catch (error) {
      console.error('Error submitting form:', error);

      // Check if the error response contains a message
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
    console.log("payload", formData);
  };



  const handleCheckboxChange = (event) => {
    setShowExtendedParkingInfo(event.target.checked);
    setIsChecked(!isChecked);
    setError('');
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date && endDate) {
      calculateTotalDays(date, endDate);
    }
    setErrors((prevErrors) => ({ ...prevErrors, startDate: '' })); // Clear error on change
  };

  // const handleChangeNo = (event) => {
  //   const { value } = event.target;
  //   setLicenseValue(value);
  //   // console.log('License field value changed:', value);

  //   if (value) {
  //     fetchVehicleData(value);
  //   } else {
  //     setVehicleData({
  //       year: '',
  //       make: '',
  //       model: '',
  //       trim: '',
  //       type: '',
  //       size: '',
  //       color: "",
  //       category: '',
  //       overallLength: '',
  //     });
  //   }
  // };

  // console.log('Current Vehicle Data State:', vehicleData);

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate && date) {
      calculateTotalDays(startDate, date);
      DaysList(startDate, date);
    }
   // setErrors((prevErrors) => ({ ...prevErrors, endDate: '' })); // Clear error on change
  };



  // State to track user agreement for each section
  const [isAcknowledged, setIsAcknowledged] = useState({
    security: false,
    vehicleRelocation: false,
    agreement: false,
    illegalParking: false,
  });


  // State to track if any validation error should be displayed
  const [errors, setErrors] = useState({
    security: false,
    vehicleRelocation: false,
    agreement: false,
    illegalParking: false,
  });

  // Function to handle changes in the switch
  // const handleSwitchChange = (field) => (event) => {
  //   setIsAcknowledged({ ...isAcknowledged, [field]: event.target.checked });
  // };



  const handleProtectedClick = () => {
    const userMode = localStorage.getItem("userMode");
    if (userMode === "guest" || !userMode) {
      Swal.fire({
        position: "top-centre",
        icon: "warning",
        title: "Please log in to access this feature.",
        showConfirmButton: true,
        confirmButtonText: "OK",

      });
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  
  const DaysList = async (startDate, endDate) => {

    let parkingTypeObjectId = '66a23963afd7ace00b1d43d0';

    // if (type === 'DAILY') {
    //   parkingTypeObjectId = '66a23963afd7ace00b1d43d0';
    // } 
    // else if (type === 'WEEKEND') {
    //   parkingTypeObjectId = '66a2397aafd7ace00b1d43db';
    // } 
    // else if (type === 'WEEKLY') {
    //   parkingTypeObjectId = '66a23985afd7ace00b1d43e6';
    // }


    setparkingTypeId(parkingTypeObjectId);

    const data = {
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
      parkingTypeId: parkingTypeObjectId,
    };
    // console.log(data);
    const listState = process.env.REACT_APP_BASE_DAYS_CALCULATION;
    await axios
      .post(`${listState}?`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      )
      .then((res) => {
        // console.log("tetsing", res.data.data.merchant);
        if (res?.data?.success) {

          // console.log("suceess");
        }
        else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: res.data.message,
            showConfirmButton: true,
            confirmButtonText: "OK",
          });

        }
      })
      .catch((err) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: err.response.data.message,
          showConfirmButton: true, // Change to true to show the acknowledge button
          confirmButtonText: "OK", // Customize the text of the button if needed
        });
        console.log("error", err);
      });
  };
  const handleFocus = async (latitude, longitude) => {    

    try {
      //const userid = localStorage.getItem("storemytruck_customer_id")
      const lists = {
        latitude: 33.797112,
        longitude: -84.422771,
      };
      const NearestList = process.env.REACT_APP_BASE_NEARSET_LOCATION_USER;
      const res = await axios.post(`${NearestList}`,lists, {
        headers: {
          'Content-Type': 'application/json',


        }});
      console.log(res, 'suiiiiii-daily');
      if (res?.data?.success) {
        setLocations(res?.data?.data);
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
      console.log("CATCH", err);
    }
  };

  const calculateTotalDays = (start, end) => {
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setparkingDays(diffDays);
  };


  const Vehicletype = async () => {
    let parkingTypeId = '66a23963afd7ace00b1d43d0';
    setparkingTypeId(parkingTypeId);
    const vechicletype = process.env.REACT_APP_BASE_VEHICLE_TYPE;
    try {
      // const res = await axios.get(vechicletype, {
      //   params: {
      //     parkingTypeId: parkingTypeId
      //   }
      // });
      const res = await axios.get(vechicletype);
      // console.log(res);
      if (res?.data?.success) {
        setVehicleType(res.data.data.list);
        console.log("res.data.data" + JSON.stringify( res.data.data.list))
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
      // Swal.fire({
      //   position: "top-end",
      //   icon: "error",
      //   title: err.response?.data?.message || "An error occurred ",
      //   showConfirmButton: true,
      //   confirmButtonText: "OK",
      // });
      console.log("error", err);
    }

  }

  const Amountdetails = async () => {
    const obj = {
      parkingTypeId,
      vechicleCount,
      vehicleTypeId,
      locationId,
    };

    const Amountdetail = process.env.REACT_APP_API_AMOUNT_DETAILS_PARKINGS;

    try {
      const res = await axios.post(Amountdetail, obj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res?.data?.success) {
        setamountdetail(res.data.data);
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: res.data.message,
          showConfirmButton: true,
          confirmButtonText: 'OK',
        });
      }
    } catch (err) {
      console.log('error', err);
    }
  };
  const handleTermsAndConditions = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      // Add the value to the array if checked
      setTermsAndConditions((prev) => [...prev, value]);
    } else {
      // Remove the value from the array if unchecked
      setTermsAndConditions((prev) =>
        prev.filter((item) => item !== value)
      );
    }
  };
  // Effect to call Amountdetails when necessary inputs change
  // useEffect(() => {
  //   if (locationId != "" && vehicleTypeId != "" && vechicleCount != "" && parkingTypeId != "") {
  //     Amountdetails();
  //   }
  // }, [locationId, vehicleTypeId, vechicleCount, parkingTypeId]);

  // const handleAccountOwnerChange = (e) => {
  //   const { value, name } = e.target;

  //   // Basic validation based on field names
  //   switch (name) {
  //     case 'streetAddress':
  //       if (!value) {
  //         setStreetAddressError('Street Address is required.');
  //       } else {
  //         setStreetAddressError('');
  //       }
  //       break;
  //     case 'city':
  //       if (!value) {
  //         setCityError('City is required.');
  //       } else {
  //         setCityError('');
  //       }
  //       break;
  //     case 'state':
  //       if (!value) {
  //         setStateError('State is required.');
  //       } else {
  //         setStateError('');
  //       }
  //       break;
  //     case 'PostalCode':
  //       if (!value) {
  //         setPostalCodeError('Postal Code is required.');
  //       } else {
  //         setPostalCodeError('');
  //       }
  //       break;
  //     default:
  //       break;
  //   }

  //   // Update account owner data
  //   setAccountOwnerData((prevState) => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  //   // setaccountOwnerName(value);
  //   // setaccountOwnerlastName(value);
  //   // setCompany(value);
  //   // setStreetAddress(value);
  //   // setCity(value);
  //   // setState(value);
  //   // setPostalCode(value);
  //   // setPhonenumber(value);
  // };
  // const Licenseno = async () => {
  //   let fd=120;
  //   // Access the environment variable
  //   const license = process.env.REACT_APP_BASE_LICENSE;

  //   try {
  //     // Make the POST request to the URL
  //     const res = await axios.get(`${license}/${fd}`);

  //     // Log the response data
  //     console.log('hfghfghfghfghfgh:' );
  //     console.log('Response:', res);
  //     setLicenseData(res.data);

  //   } catch (error) {
  //     // Handle errors here
  //     console.error('Error occurred:', error);
  //   }
  // };

  // console.log('Current Vehicle Data:', vehicleData);

  return (



    <div>
      <Header />
      <div className="book-form">
        <div className="container margin_60" onClick={handleProtectedClick}>
          <div className="row pb-4">
            <div className="col-md-12">
              <h1>{type} PARKING</h1>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    {type} PARKING AGREEMENT - TERMS AND CONDITIONS (CLICK TO
                    EXPAND)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {type === 'DAILY' && <DailyAggrement />}
                  {/* {type === 'WEEKEND' && <WeekendAggrement />} */}
                  {/* {type === 'WEEKLY' && <WeeklyAggrement />} */}

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
                  <h3>Customer Information</h3>

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
                  // console.log('gggggggggg', values);
                }}

              >
                {({ values, errors, touched }) => (
                  <Form id="quotation" noValidate>
                    <div className="form_title">
                      <h3>
                        <strong>
                          <i className="fa-solid fa-1"></i>
                        </strong>
                        {type} PARKING AGREEMENT
                      </h3>
                      <p>StoreMyTruck.com</p>
                    </div>
                    <div className="step">
                      <div className="row">
                        <div className="col-md-6 col-sm-6" style={{ position: 'relative', top: '-21px' }} onClick={handleProtectedClick} >
                          <div className="form-group">
                            <label>
                              This Licensing Agreement is Made and Entered into on:
                            </label>
                            <DatePicker
                              // value={}
                              type="text"
                              name="bookingDate"
                              className="form-control required"
                              selected={parkingDate}
                              placeholderText="Select  date"
                            // placeholder={parkingDate}
                            />
                          </div>

                        </div>
                        <br />
                        <u><b>At the following location:</b></u>
                        <br /><br />
                        <div className="col-md-6 col-sm-6" style={{ position: 'relative', bottom: '20px' }}>
                          <div className="form-group">
                            <label>Nearest Locations<span style={{ color: 'red' }}>*</span></label>
                            <Field
                              onChange={handlelocationidchange}
                              as="select"
                              name="selectedLocation"
                              className={`form-control ${locationerror ? "is-invalid" : ""}`}
                              value={locationId ? JSON.stringify({ id: locationId }) : ""} // Ensure the value reflects the state
                            >
                              <option value="">Location/Available space</option>
                              {locations.map((location, index) => (
                                <option key={index} value={JSON.stringify({ id: location._id })}>
                                  {`${location.addressOne}, ${location.addressTwo}, ${location.addressThree} / ${location.remainingSpace ?? 0}`}
                                </option>
                              ))}
                              {locationerror && (
                                <div className="invalid-feedback">
                                  {locationerror}
                                </div>
                              )}
                            </Field>

                          </div>
                        </div>
                      </div>


                      <div className="row">
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label>Start Date <span style={{ color: 'red' }}>*</span></label>
                            <DatePicker
                              selected={startDate}
                              onChange={handleStartDateChange}
                              className={`form-control ${firstdaterror ? "is-invalid" : ""}`}
                              placeholderText="Select Start date"
                              minDate={today} // Disable past dates



                            />
                            {firstdaterror && (
                              <div className="invalid-feedback">
                                {firstdaterror}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label>End Date <span style={{ color: 'red' }}>*</span></label>
                            <DatePicker
                              selected={endDate}
                              onChange={handleEndDateChange}
                              className={`form-control ${lastdateerror ? "is-invalid" : ""}`}
                              placeholderText="Select end date"
                              minDate={today} // Disable past dates
                            />
                            {lastdateerror && (
                              <div className="invalid-feedback">
                                {lastdateerror}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          {parkingDays !== null && (
                            <div className="row">
                              <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                  <label>Total Days: {parkingDays}</label>
                                  <Field
                                    type="text"
                                    name="totalDays"
                                    className="form-control"
                                    readOnly
                                    value={parkingDays}




                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form_title">
                      <h3>
                        <strong>
                          <i className="fa-solid fa-2"></i>
                        </strong>
                        Vehicle Information
                      </h3>
                    </div>
                    <div className="step">
                      <div className="row">
                        {/* <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label>Type of Vehicle<span>*</span></label>
                            <Field
                              as="select"
                              id="vehicleType"
                              name="vehicleType"
                              className={`form-control ${touched.vehicleType && errors.vehicleType
                                ? "is-invalid"
                                : ""
                                }`}
                            >
                              <option value="">Please Select</option>
                              <option value="Tractor">Tractor</option>
                              <option value="Car">Car</option>
                              <option value="Box Truck">Box Truck</option>
                            </Field>
                            {touched.vehicleType && errors.vehicleType && (
                              <div className="invalid-feedback">
                                {errors.vehicleType}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label>License<span>*</span></label>
                            <Field
                              type="text"
                              id="license"
                              name="license"
                              placeholder="Enter the license number"
                              onChange={handleChangeNo}
                              className={`form-control ${touched.license && errors.license ? "is-invalid" : ""}`}
                            />
                            {touched.license && errors.license && (
                              <div className="invalid-feedback">
                                {errors.license}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Display the value based on user input */}
                        <div>
                          {displayValue && <p>{displayValue}</p>}
                        </div>
                        {/* <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label>
                              Number Vehicles that you will be Parking<span>*</span>
                            </label>
                            <Field
                              type="number"
                              name="numberOfVehicles"
                              className={`form-control ${errors.numberOfVehicles &&
                                touched.numberOfVehicles
                                ? "is-invalid"
                                : ""
                                }`}
                            />
                            <ErrorMessage
                              name="numberOfVehicles"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div> */}


                        <FieldArray name="vehicles">
                          {({ push, remove, form }) => (
                            <>
                              {values.vehicles.map((vehicle, index,) => (


                                <div key={index} className="row vehicle-details">
                                  {/* Vehicle Type Selection */}
                                  <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                      <label>
                                        Type of Vehicle<span style={{ color: 'red' }}>*</span>
                                      </label>
                                      <Field
                                        onChange={handleVehicleTypeChange}
                                        as="select"
                                        name="selectedLocation"
                                        className={`form-control ${vehicleTypeError ? 'is-invalid' : ''}`} // Add error class if applicable
                                      >
                                        <option value="">Please Select</option>
                                        {Array.isArray(vehicleType) && vehicleType.map((vechicledata, index) => (
                                          <option key={index} value={JSON.stringify({ dropdownvehicleType: vechicledata.vehicleType, id: vechicledata._id })}>
                                            {vechicledata.vehicleType}
                                          </option>
                                        ))}
                                      </Field>
                                      {vehicleTypeError && (
                                        <div className="invalid-feedback">
                                          {vehicleTypeError}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {/* Number of Vehicles */}
                                  <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                      <label>
                                        Number of Vehicles that you will be Parking<span style={{ color: 'red' }}>*</span>
                                      </label>
                                      <Field
                                        type="number"
                                        name={`vehicles[${index}].numberOfVehicles`}
                                        className={`form-control ${touched.vehicles?.[index]?.numberOfVehicles && errors.vehicles?.[index]?.numberOfVehicles ? "is-invalid" : ""}`}
                                        onChange={(e) => handleVehicleCountChange(e, index, form.setFieldValue)}
                                      />
                                      <ErrorMessage
                                        name={`vehicles[${index}].numberOfVehicles`}
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </div>
                                  </div>


                                  {/* Conditional Rendering of Vehicle Details */}
                                  {selectvehicle && (
                                    <>
                                      {selectvehicle === 'Tractor Trailer Combo' && (
                                        <>

                                          <div >
                                            {/* <input onChangeCapture={}> </input> */}
                                          </div>


                                          <div className="form-group">
                                            <label>
                                              VIN<span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Field
                                              type="text"
                                              id="license"
                                              name="license"
                                              placeholder="Enter the license number"
                                              className={`form-control ${licenseError ? "is-invalid" : ""}`} // Show error class if applicable
                                              onChange={handleLicenseChange} // Combined handler
                                              value={licenseData}
                                            />
                                            {licenseError && (
                                              <div className="invalid-feedback">
                                                {licenseError}
                                              </div>
                                            )}
                                            <ErrorMessage
                                              name="license"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </div>




                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Make<span style={{ color: 'red' }}>*</span></label>
                                              <Field onChange={(e => setmake(e.target.value))}
                                                name="vehicles[0].make"
                                                value={vehicleData.make || ''}
                                                className={`form-control ${touched.vehicles?.[0]?.make && errors.vehicles?.[0]?.make ? "is-invalid" : ""}`}

                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Model<span style={{ color: 'red' }}>*</span></label>
                                              <Field onChange={(e => setmodel(e.target.value))}
                                                name={`vehicles[${index}].model`}
                                                value={vehicleData.model || ''}
                                                className={`form-control ${touched.vehicles?.[0]?.model && errors.vehicles?.[0]?.model ? "is-invalid" : ""}`}
                                                
                                              />
                                              <ErrorMessage name="vehicles[0].model" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>

                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Color<span style={{ color: 'red' }}>*</span></label>
                                              <Field onChange={(e => setcolor(e.target.value))}
                                                // name=""
                                                // value={color}
                                                name={`vehicles[${index}].color`}
                                                value={vehicleData.color || ''}
                                                className={`form-control ${touched.vehicles?.[0]?.color && errors.vehicles?.[0]?.color ? "is-invalid" : ""}`}
                                              // readOnly
                                              />
                                              <ErrorMessage name="vehicles[0].color" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>

                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>USDOT#<span style={{ color: 'red' }}>*</span></label>
                                              <Field
                                                // name={`vehicles[${index}].usdot`}
                                                name={`vehicles?.[${index}]?.usdot`}

                                                onChange={handletractoronly}
                                                className={`form-control ${touched.vehicles?.[index]?.firstName && errors.vehicles?.[index]?.firstName ? "is-invalid" : ""}`}
                                              />
                                              <ErrorMessage
                                                name={`vehicles[${index}].firstName`}
                                                component="div"
                                                className="invalid-feedback"
                                              />
                                            </div>
                                          </div>

                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Company Name on Tractor<span style={{ color: 'red' }}>*</span></label>
                                              <Field
                                                name={`vehicles?.[${index}]?.companyNameOnTractor`}
                                                // onChange={(e =>setcompanyNameOnTractor(e.target.value))}
                                                // value={''}
                                                onChange={handletractoronly}
                                                className={`form-control ${touched.vehicles?.[index]?.companyNameOnTractor && errors.vehicles?.[index]?.companyNameOnTractor ? "is-invalid" : ""}`}
                                              />
                                              <ErrorMessage
                                                name={`vehicles[${index}].companyNameOnTractor`}
                                                component="div"
                                                className="invalid-feedback"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>
                                                Tag No<span style={{ color: 'red' }}>*</span>
                                              </label>
                                              <Field
                                                name={`vehicles[${index}].tagno`}
                                                className={`form-control ${touched.vehicles?.[index]?.tagno &&
                                                  errors.vehicles?.[index]?.tagno
                                                  ? 'is-invalid'
                                                  : ''
                                                  }`}
                                              />
                                              <ErrorMessage
                                                name={`vehicles[${index}].tagno`}
                                                component="div"
                                                className="invalid-feedback"
                                              />
                                            </div>
                                          </div>
                                          <>
                                            <h5>Trailer Information<span style={{ color: 'red' }}>*</span></h5>
                                            <>
                                              <div className="col-md-6">
                                                <div className="form-group">
                                                  <label>Color<span style={{ color: 'red' }}>*</span></label>
                                                  <Field onChange={(e => setcolor(e.target.value))}
                                                    // name=""
                                                    // value={color}
                                                    name={`vehicles[${index}].color`}
                                                    value={vehicleData.color || ''}
                                                    className={`form-control ${touched.vehicles?.[0]?.color && errors.vehicles?.[0]?.color ? "is-invalid" : ""}`}
                                                  // readOnly
                                                  />
                                                  <ErrorMessage name={`vehicles[${index}].color`} component="div" className="invalid-feedback" />
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-group">
                                                  <label>
                                                    Tag No<span style={{ color: 'red' }}>*</span>
                                                  </label>
                                                  <Field
                                                    name={`vehicles[${index}].tagno`}
                                                    className={`form-control ${touched.vehicles?.[index]?.tagno &&
                                                      errors.vehicles?.[index]?.tagno
                                                      ? 'is-invalid'
                                                      : ''
                                                      }`}
                                                  />
                                                  <ErrorMessage
                                                    name={`vehicles[${index}].tagno`}
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-group">
                                                  <label>Trailer Length<span style={{ color: 'red' }}>*</span></label>
                                                  {/* Field component wrapped with a select dropdown */}
                                                  <Field
                                                    onChange={(e => settrailerlength(e.target.value))}
                                                    as="select" // specify the field as a dropdown select
                                                    name={`vehicles[${index}].trailerlength`} // Assuming this is part of the Formik state
                                                 
                                                    className={`form-control ${touched.vehicles?.[index]?.trailerlength && errors.vehicles?.[index]?.trailerlength ? "is-invalid" : ""}`}
                                                  >
                                                    <option value="">Select Trailer Length</option> {/* Default option */}
                                                    <option value="48ft-53ft">48 ft - 53 ft</option>
                                                    <option value="40ft-47ft">40 ft - 47 ft</option>
                                                    <option value="24ft-39ft">24 ft - 39 ft</option>
                                                    <option value="> 24ft">{"> 24ft"}</option> {/* Greater than 24 ft option */}
                                                  </Field>
                                                  {/* Error message for the trailer length */}
                                                  <ErrorMessage name={`vehicles[${index}].color`} component="div" className="invalid-feedback" />
                                                  <div className="col-md-6">
                                                    <div className="form-group">
                                                      <label>Other Info<span style={{ color: 'red' }}>*</span></label>

                                                      {/* Field component wrapped as a textarea */}
                                                      <Field
                                                        onChange={(e => setotherinfo(e.target.value))}
                                                        as="textarea" // specify the field as a textarea
                                                        name={`vehicles[${index}].otherinfo`}// Assuming this is for vehicles[index].usdot in Formik state
                                                      
                                                        className={`form-control ${touched.vehicles?.[0]?.otherinfo && errors.vehicles?.[0]?.otherinfo ? "is-invalid" : ""}`}
                                                      />

                                                      {/* Error message for the textarea */}
                                                      <ErrorMessage name={`vehicles[${index}].otherinfo`}   component="div" className="invalid-feedback" />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-group">
                                                  <label>Trailer Type<span style={{ color: 'red' }}>*</span></label>

                                                  {/* Field component wrapped with a select dropdown */}
                                                  <Field
                                                    onChange={(e => settrailertype(e.target.value))}
                                                    as="select" // specify the field as a dropdown select
                                                    name={`vehicles[${index}].trailertype`}// Assuming this is part of the Formik state
                                                    className={`form-control ${touched.vehicles?.[0]?.trailertype && errors.trailertype?.[0]?.trailertype ? "is-invalid" : ""}`}
                                                  >
                                                    <option value="">Select Trailer Length</option> {/* Default option */}
                                                    <option value="Dry Van">Dry Van</option>
                                                    <option value="Reefer">Reefer</option>
                                                    <option value="Flatbed Trailer">Flatbed Trailer</option>
                                                    <option value="Utility Trailer">Utility Trailer</option>
                                                    <option value="Auto Hauler">Auto Hauler</option>
                                                    <option value="Concession Trailer">Concession Trailer</option>
                                                    <option value="Livestock or horse trailer">Livestock or horse trailer</option>
                                                    <option value="Travel trailer">Travel trailer</option>

                                                    {/* Greater than 24 ft option */}
                                                    {/* Greater than 24 ft option */}

                                                    {/* Greater than 24 ft option */}
                                                  </Field>

                                                  {/* Error message for the trailer length */}
                                                  <ErrorMessage name={`vehicles[${index}].color`}   component="div" className="invalid-feedback" />
                                                </div>
                                              </div>
                                            </>

                                          </>
                                        </>

                                      )}
                                      {selectvehicle === 'Tractor Only' && (
                                        <>
                                          <div >
                                            {/* <input onChangeCapture={}> </input> */}
                                          </div>


                                          <div className="form-group">
                                            <label>
                                              VIN<span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Field
                                              type="text"
                                              id="license"
                                              // name="license"
                                              name={`vehicles[${index}].license`}
                                              placeholder="Enter the license number"
                                              className={`form-control ${licenseError ? "is-invalid" : ""}`} // Show error class if applicable
                                              onChange={handleLicenseChange} // Combined handler
                                              value={licenseData}
                                            />
                                            {licenseError && (
                                              <div className="invalid-feedback">
                                                {licenseError}
                                              </div>
                                            )}
                                            <ErrorMessage
                                              name="license"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </div>





                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Make<span style={{ color: 'red' }}>*</span></label>
                                              <Field onChange={(e => setmake(e.target.value))}
                                                name={`vehicles[${index}].make`}
                                               
                                                value={vehicleData.make || ''}
                                                className={`form-control ${touched.vehicles?.[0]?.make && errors.vehicles?.[0]?.make ? "is-invalid" : ""}`}

                                              />
                                              <ErrorMessage name="vehicles[0].make" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                          <div className="col-md-4">

                                            <div className="form-group">
                                              <label>Model<span style={{ color: 'red' }}>*</span></label>
                                              <Field onChange={(e => setmodel(e.target.value))}
                                                name={`vehicles[${index}].model`}                                                
                                                value={vehicleData.model || ''}
                                                className={`form-control ${touched.vehicles?.[0]?.model && errors.vehicles?.[0]?.model ? "is-invalid" : ""}`}

                                              />
                                              <ErrorMessage name="vehicles[0].model" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Color<span style={{ color: 'red' }}>*</span></label>
                                              <Field onChange={(e => setcolor(e.target.value))}
                                                // name=""
                                                // value={color}
                                                name={`vehicles[${index}].color`}
                                                value={vehicleData.color || ''}
                                                className={`form-control ${touched.vehicles?.[0]?.color && errors.vehicles?.[0]?.color ? "is-invalid" : ""}`}
                                              />
                                              <ErrorMessage name="vehicles[0].color" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label>USDOT#<span style={{ color: 'red' }}>*</span></label>
                                              <Field
                                                // name={`vehicles[${index}].usdot`}
                                               
                                                name={`vehicles[${index}].usdot`}
                                                onChange={handletractoronly}
                                                className={`form-control ${touched.vehicles?.[index]?.firstName && errors.vehicles?.[index]?.firstName ? "is-invalid" : ""}`}
                                              />
                                              <ErrorMessage
                                                name={`vehicles[${index}].usdot`}
                                                component="div"
                                                className="invalid-feedback"
                                              />
                                            </div>
                                          </div>

                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label>Company Name on Tractor<span style={{ color: 'red' }}>*</span></label>
                                              <Field
                                                name={`vehicles[${index}].companyNameOnTractor`}
                                                 
                                                // onChange={(e =>setcompanyNameOnTractor(e.target.value))}
                                                // value={''}
                                                onChange={handletractoronly}
                                                className={`form-control ${touched.vehicles?.[index]?.companyNameOnTractor && errors.vehicles?.[index]?.companyNameOnTractor ? "is-invalid" : ""}`}
                                              />
                                              <ErrorMessage
                                                name={`vehicles[${index}].companyNameOnTractor`}
                                                component="div"
                                                className="invalid-feedback"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label>
                                                Tag No<span style={{ color: 'red' }}>*</span>
                                              </label>
                                              <Field
                                                name={`vehicles[${index}].tagno`}
                                                className={`form-control ${touched.vehicles?.[index]?.tagno &&
                                                  errors.vehicles?.[index]?.tagno
                                                  ? 'is-invalid'
                                                  : ''
                                                  }`}
                                              />
                                              <ErrorMessage
                                                name={`vehicles[${index}].tagno`}
                                                component="div"
                                                className="invalid-feedback"
                                              />
                                            </div>
                                          </div>
                                        </>
                                      )}
                                      {selectvehicle === 'Car' && (
                                        <>
                                          <div >
                                            {/* <input onChangeCapture={}> </input> */}
                                          </div>

                                          <div className="form-group">
                                            <label>
                                              VIN<span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Field
                                              type="text"
                                              id="license"
                                              
                                              name={`vehicles[${index}].license`}
                                              placeholder="Enter the license number"
                                              className={`form-control ${licenseError ? "is-invalid" : ""}`} // Show error class if applicable
                                              onChange={handleLicenseChange} // Combined handler
                                              value={licenseData}
                                            />
                                            {licenseError && (
                                              <div className="invalid-feedback">
                                                {licenseError}
                                              </div>
                                            )}
                                            <ErrorMessage
                                              name="license"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </div>


                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Make<span style={{ color: 'red' }}>*</span></label>
                                              <Field onChange={(e => setmake(e.target.value))}
                                                name={`vehicles[${index}].make`}
                                                value={vehicleData.make || ''}
                                                className={`form-control ${touched.vehicles?.[0]?.make && errors.vehicles?.[0]?.make ? "is-invalid" : ""}`}

                                              />
                                              <ErrorMessage name="vehicles[0].make" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Model<span style={{ color: 'red' }}>*</span></label>
                                              <Field onChange={(e => setmodel(e.target.value))}
                                                name={`vehicles[${index}].model`}
                                                value={vehicleData.model || ''}
                                                className={`form-control ${touched.vehicles?.[0]?.model && errors.vehicles?.[0]?.model ? "is-invalid" : ""}`}

                                              />
                                              <ErrorMessage name="vehicles[0].model" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Color<span style={{ color: 'red' }}>*</span></label>
                                              <Field onChange={(e => setcolor(e.target.value))}
                                                // name=""
                                                // value={color}
                                                name={`vehicles[${index}].color`}
                                                value={vehicleData.color || ''}
                                                className={`form-control ${touched.vehicles?.[0]?.color && errors.vehicles?.[0]?.color ? "is-invalid" : ""}`}
                                              // readOnly
                                              />
                                              <ErrorMessage name="vehicles[0].color" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>
                                                Tag No<span style={{ color: 'red' }}>*</span>
                                              </label>
                                              <Field
                                                name={`vehicles[${index}].tagno`}
                                                className={`form-control ${touched.vehicles?.[index]?.tagno &&
                                                  errors.vehicles?.[index]?.tagno
                                                  ? 'is-invalid'
                                                  : ''
                                                  }`}
                                              />
                                              <ErrorMessage
                                                name={`vehicles[${index}].tagno`}
                                                component="div"
                                                className="invalid-feedback"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>USDOT#<span style={{ color: 'red' }}>*</span></label>
                                              <Field
                                                // name={`vehicles[${index}].usdot`}
                                                
                                                name={`vehicles[${index}].usdot`}
                                                onChange={handletractoronly}
                                                className={`form-control ${touched.vehicles?.[index]?.firstName && errors.vehicles?.[index]?.firstName ? "is-invalid" : ""}`}
                                              />
                                              <ErrorMessage
                                                name={`vehicles[${index}].firstName`}
                                                component="div"
                                                className="invalid-feedback"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Company Name on Tractor<span style={{ color: 'red' }}>*</span></label>
                                              <Field
                                                name={`vehicles[${index}].companyNameOnTractor`}
                                                onChange={handletractoronly}
                                                className={`form-control ${touched.vehicles?.[index]?.companyNameOnTractor && errors.vehicles?.[index]?.companyNameOnTractor ? "is-invalid" : ""}`}
                                              />
                                              <ErrorMessage
                                                name={`vehicles[${index}].companyNameOnTractor`}
                                                component="div"
                                                className="invalid-feedback"
                                              />
                                            </div>
                                          </div>
                                        </>
                                      )}
                                      {selectvehicle === 'Trailer Only' && (
                                        <>



                                          <div className="form-group">
                                            <label>
                                              VIN<span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Field
                                              type="text"
                                              id="license"
                                              name={`vehicles[${index}].license`}
                                              placeholder="Enter the license number"
                                              className={`form-control ${licenseError ? "is-invalid" : ""}`} // Show error class if applicable
                                              onChange={handleLicenseChange} // Combined handler
                                              value={licenseData}
                                            />
                                            {licenseError && (
                                              <div className="invalid-feedback">
                                                {licenseError}
                                              </div>
                                            )}
                                            <ErrorMessage
                                              name="license"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </div>







                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Color<span style={{ color: 'red' }}>*</span></label>
                                              <Field onChange={(e => setcolor(e.target.value))}
                                                // name=""
                                                name={`vehicles[${index}].color`}
                                                // value={color}
                                                value={vehicleData.color || ''}
                                                className={`form-control ${touched.vehicles?.[0]?.color && errors.vehicles?.[0]?.color ? "is-invalid" : ""}`}
                                              // readOnly
                                              />
                                              <ErrorMessage name="vehicles[0].color" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Trailer Length<span style={{ color: 'red' }}>*</span></label>

                                              {/* Field component wrapped with a select dropdown */}
                                              <Field
                                                onChange={(e => settrailerlength(e.target.value))}
                                                as="select" // specify the field as a dropdown select
                                               // Assuming this is part of the Formik state
                                                name={`vehicles[${index}].trailerlength`}
                                                className={`form-control ${touched.vehicles?.[0]?.trailerlength && errors.vehicles?.[0]?.trailerlength ? "is-invalid" : ""}`}
                                              >
                                                <option value="">Select Trailer Length</option> {/* Default option */}
                                                <option value="48ft-53ft">48 ft - 53 ft</option>
                                                <option value="40ft-47ft">40 ft - 47 ft</option>
                                                <option value="24ft-39ft">24 ft - 39 ft</option>
                                                <option value="> 24ft">{"> 24ft"}</option> {/* Greater than 24 ft option */}
                                              </Field>

                                              {/* Error message for the trailer length */}
                                              <ErrorMessage name="vehicles[0].color" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Trailer Type<span style={{ color: 'red' }}>*</span></label>

                                              {/* Field component wrapped with a select dropdown */}
                                              <Field
                                                onChange={(e => settrailertype(e.target.value))}
                                                as="select" // specify the field as a dropdown select
                                                name={`vehicles[${index}].trailertype`}
                                                // Assuming this is part of the Formik state
                                                className={`form-control ${touched.vehicles?.[0]?.trailertype && errors.trailertype?.[0]?.trailertype ? "is-invalid" : ""}`}
                                              >
                                                <option value="">Select Trailer Length</option> {/* Default option */}
                                                <option value="Dry Van">Dry Van</option>
                                                <option value="Reefer">Reefer</option>
                                                <option value="Flatbed Trailer">Flatbed Trailer</option>
                                                <option value="Utility Trailer">Utility Trailer</option>
                                                <option value="Auto Hauler">Auto Hauler</option>
                                                <option value="Concession Trailer">Concession Trailer</option>
                                                <option value="Livestock or horse trailer">Livestock or horse trailer</option>
                                                <option value="Travel trailer">Travel trailer</option>
                                              </Field>

                                              {/* Error message for the trailer length */}
                                              <ErrorMessage name="vehicles[0].color" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>
                                                Tag No<span style={{ color: 'red' }}>*</span>
                                              </label>
                                              <Field
                                                name={`vehicles[${index}].tagno`}
                                                className={`form-control ${touched.vehicles?.[index]?.tagno &&
                                                  errors.vehicles?.[index]?.tagno
                                                  ? 'is-invalid'
                                                  : ''
                                                  }`}
                                              />
                                              <ErrorMessage
                                                name={`vehicles[${index}].tagno`}
                                                component="div"
                                                className="invalid-feedback"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label>Other Info<span style={{ color: 'red' }}>*</span></label>

                                              {/* Field component wrapped as a textarea */}
                                              <Field
                                                onChange={(e => setotherinfo(e.target.value))}
                                                as="textarea" // specify the field as a textarea
                                                name={`vehicles[${index}].otherinfo`}
                                               // Assuming this is for vehicles[index].usdot in Formik state
                                                className={`form-control ${touched.vehicles?.[0]?.otherinfo && errors.vehicles?.[0]?.otherinfo ? "is-invalid" : ""}`}
                                              />

                                              {/* Error message for the textarea */}
                                              <ErrorMessage name="vehicles[0].otherinfo" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                        </>
                                      )}
                                      {(selectvehicle === 'Box Truck' || selectvehicle === 'Other' )&& (
                                        <>

                                          <div className="form-group">
                                            <label>
                                              VIN<span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Field
                                              type="text"
                                              id="license"
                                              name={`vehicles[${index}].license`}
                                              placeholder="Enter the license number"
                                              className={`form-control ${licenseError ? "is-invalid" : ""}`} // Show error class if applicable
                                              onChange={handleLicenseChange} // Combined handler
                                              value={licenseData}
                                            />
                                            {licenseError && (
                                              <div className="invalid-feedback">
                                                {licenseError}
                                              </div>
                                            )}
                                            <ErrorMessage
                                              name="license"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </div>

                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Make<span style={{ color: 'red' }}>*</span></label>
                                              <Field onChange={(e => setmake(e.target.value))}
                                                name={`vehicles[${index}].make`}
                                                value={vehicleData.make || ''}
                                                className={`form-control ${touched.vehicles?.[0]?.make && errors.vehicles?.[0]?.make ? "is-invalid" : ""}`}

                                              />
                                              <ErrorMessage name="vehicles[0].make" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Model<span style={{ color: 'red' }}>*</span></label>
                                              <Field onChange={(e => setmodel(e.target.value))}
                                                
                                                name={`vehicles[${index}].model`}
                                                value={vehicleData.model || ''}
                                                className={`form-control ${touched.vehicles?.[0]?.model && errors.vehicles?.[0]?.model ? "is-invalid" : ""}`}
                                              />
                                              <ErrorMessage name="vehicles[0].model" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Color<span style={{ color: 'red' }}>*</span></label>
                                              <Field onChange={(e => setcolor(e.target.value))}
                                                // name=""
                                                // value={color}
                                                name={`vehicles[${index}].color`}
                                                value={vehicleData.color || ''}
                                                className={`form-control ${touched.vehicles?.[0]?.color && errors.vehicles?.[0]?.color ? "is-invalid" : ""}`}
                                              // readOnly
                                              />
                                              <ErrorMessage name="vehicles[0].color" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>
                                                Tag No<span style={{ color: 'red' }}>*</span>
                                              </label>
                                              <Field
                                                
                                                name={`vehicles[${index}].tagno`}
                                                className={`form-control ${touched.vehicles?.[index]?.tagno &&
                                                  errors.vehicles?.[index]?.tagno
                                                  ? 'is-invalid'
                                                  : ''
                                                  }`}
                                              />
                                              <ErrorMessage
                                                name={`vehicles[${index}].tagno`}
                                                component="div"
                                                className="invalid-feedback"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label>Other Info<span style={{ color: 'red' }}>*</span></label>

                                              {/* Field component wrapped as a textarea */}
                                              <Field
                                                onChange={(e => setotherinfo(e.target.value))}
                                                as="textarea" // specify the field as a textarea
                                                name={`vehicles[${index}].otherinfo`}
                                                 // Assuming this is for vehicles[index].usdot in Formik state
                                                className={`form-control ${touched.vehicles?.[0]?.otherinfo && errors.vehicles?.[0]?.otherinfo ? "is-invalid" : ""}`}
                                              />

                                              {/* Error message for the textarea */}
                                              <ErrorMessage name="vehicles[0].otherinfo" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                        </>
                                      )}
                                      {/* Add more conditional fields based on vehicle type here if needed */}
                                    </>
                                  )}
                                  <div className="col-md-8">
                                    {index > 0 && (
                                      <button type="button" className="button-2" onClick={() => remove(index)}>Delete</button>
                                    )}

                                    <button type="button" className="button-1" onClick={() => push({ yearMakeModel: '', color: '', usdot: '', companyNameOnTractor: '', numberOfVehicles: '', license: '', vehicleType: '' })}>Add Another</button>
                                  </div>
                                </div>
                              ))}
                            </>
                          )}
                        </FieldArray>
                        <div class="row mt-1">
                          <div class="col-md-12 mb-3">
                            {/* <p>
                              In order for us to create your parking account, we
                              must receive photos of your vehicle, insurance
                              card and driver's license. If you do not have them
                              ready at this time, please complete this form and
                              email your photos to smtagreements@gmail.com.
                              Please put your name (i.e. the Account Name) in
                              the subject line.
                            </p> */}
                          </div>
                          <Formik initialValues={{ photoOfVehicle: null }}>
                            {({ setFieldValue }) => (
                              <Form>
                                <Grid container spacing={2} style={{ padding: '20px' }}>
                                  {/* Photo of Vehicle Upload */}
                                  <Grid item xs={12} sm={4} style={{ padding: '20px' }}>
                                    <div className="form-group">
                                      <Field
                                        name="photoOfVehicle"
                                        component={FileUploadField}
                                        label="Photo of Vehicle Upload"
                                        type="file"
                                        setFieldValue={setFieldValue}
                                        onFileSelect={handleFileSelect} // Pass the file select handler
                                      />
                                    </div>
                                  </Grid>

                                  {/* Insurance Card Upload */}
                                  <Grid item xs={12} sm={4} style={{ padding: '20px' }}>
                                    <div className="form-group">
                                      <Field
                                        name="insuranceCard"
                                        component={FileUploadField}
                                        label="Insurance Card Upload"
                                        type="file"
                                        setFieldValue={setFieldValue}
                                        onFileSelect={handleInsurance} // Pass the insurance file select handler
                                      />
                                    </div>
                                  </Grid>

                                  {/* Driver's License Upload */}
                                  <Grid item xs={12} sm={4} style={{ padding: '20px' }}>
                                    <div className="form-group">
                                      <Field
                                        name="driversLicense"
                                        component={FileUploadField}
                                        label="Driver's License Upload"
                                        type="file"
                                        setFieldValue={setFieldValue}
                                        onFileSelect={handleDriver} // Pass the driver's license file select handler
                                      />
                                    </div>
                                  </Grid>
                                </Grid>
                                {/* <button type="submit" className="btn btn-primary">
        Submit
      </button> */}
                              </Form>


                            )}
                          </Formik>


                        </div>
                      </div>
                      <hr />
                    </div>
                    <div className="form_title">
                      <h3>
                        <strong>
                          <i className="fa-solid fa-3"></i>
                        </strong>
                        Checkout
                      </h3>
                    </div>
                    <div className="step">

                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label>Amount Due ($)<span style={{ color: 'red' }}>*</span></label>
                            <input
                              type="number"
                              value={amountdetail.amountDue}
                              className="form-control"
                              onChange={e => setAmountdue(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label>Convenience Fee 3%<span style={{ color: 'red' }}>*</span></label>
                            <input
                              type="number"
                              value={amountdetail.convenienceFee}
                              className="form-control"
                              onChange={e => setConvenienceFee(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label>Total Amount Due ($)<span style={{ color: 'red' }}>*</span></label>
                            <input
                              type="number"
                              value={amountdetail.totalAmount}
                              className="form-control"
                              onChange={e => setTotalAmount(e.target.value)}
                            />
                          </div>
                        </div> */}
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label>Total Amount Due<span style={{ color: 'red' }}>*</span></label>
                            <input
                              type="number"
                              value={amountdetail.totalAmount}
                              className="form-control"
                              onChange={e => setTotalAmount2(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="billing">
                        <p>{type} Parking</p>
                        <hr></hr>
                        <h3>Credit Card Information:</h3>
                        <div class="row mt-2">
                          <div className="form-group">
                            <label>Account Owner's Name<span style={{ color: 'red' }}>*</span></label>
                            <input
                              name="firstName"
                              type="text"
                              placeholder="First Name"
                              className={`form-control ${firstNameError ? "is-invalid" : ""}`}
                              onChange={(e) => setaccountOwnerName(e.target.value)}
                              onBlur={handleFirstNameBlur}
                            />
                            {firstNameError && (
                              <div className="invalid-feedback">
                                {firstNameError}
                              </div>
                            )}
                          </div>

                          <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                              <label>Account Owner's Last Name<span style={{ color: 'red' }}>*</span></label>
                              <input
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                className={`form-control ${lastNameError ? "is-invalid" : ""}`}
                                onChange={(e) => setaccountOwnerlastName(e.target.value)}
                                onBlur={handleLastNameBlur}
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
                              <label>Credit Card Number<span style={{ color: 'red' }}>*</span></label>
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
                            <div class="form-group" >

                              <label>Expiration Month</label>
                              <select name="vehicleType" class="form-control " onChange={(e => setexpirationMonth(e.target.value))}>
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
                            <div class="form-group">
                              <label>Expiration Year</label>
                              <select name="vehicleType" class="form-control " onChange={(e) => setexpirationYear(e.target.value)}>
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
                                onChange={(e) => setCity(e.target.value)

                                }
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
                            <div class="form-group">
                              <label>Postal / Zip Code</label>
                              <input
                                name="Address"
                                type="text"
                                class="form-control "
                                onChange={(e) => setPostalCode(e.target.value)}
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
                                onChange={(e) => setCountry(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-12 mb-3">
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography>Acknowledge</Typography>
                              </AccordionSummary>
                              <AccordionDetails>

                                <FormControlLabel
                                  required
                                  control={
                                    <Switch
                                      checked={isAcknowledged.allAcknowledged || false} // Ensure it's either true or false
                                      onChange={handleparentrequired} // Attach handler properly
                                    />
                                  }
                                  label="Select all"
                                />


                                <p>
                                  SECURITY: You understand that when we refer to security on our sites it means that our sites have fencing, lights and gates. Our sites vary in their levels of security. By submitting this license agreement you have agreed to the available security level at the site you selected to park at. StoreMyTruck.com LLC ("Licensor") is not responsible for any theft, damage or loss of Licensee’s vehicle or items contained within such vehicle while parked at our site or for the safety and protection of any persons within the site. Licensor makes no warranty of protection for Licensee’s vehicle or property. Licensees accept that they park at their own risk. Parking Licensee, Driver and Vehicle owner, or its agent and affiliates shall agree to defend, indemnify, and hold harmless the Property Owner, Licensor, and its employees, agents and affiliates from liability and claim for damages resulting from any and against any and all rights, titles, claims or causes of actions resulting in loss, vandalism, theft, bodily injury, death, property damage, sickness, disease or any expense arising from any cause under this agreement to be able to park, access, or be on site at any of the licensor's locations. StoreMyTruck supplies locations to park only, and does not guarantee secure sites, gate access, or security. Licensee assumes all responsibility for every possible loss or damage, and holds Licensor harmless against all losses. <span style={{ color: 'red' }}>*</span>
                                </p>
                                <FormControlLabel
                                  required
                                  control={<Switch
                                    checked={isAcknowledged.security || false} // Default to false if undefined
                                    onChange={handleSwitchChange('security')}
                                  />}
                                  label="Required"
                                />
                                {errors.security && <div className="invalid-feedback">You must acknowledge the security terms.</div>}

                                <p>
                                  Vehicle Relocation within Parking lot: By agreeing to store your vehicle with StoreMyTruck, you acknowledge and consent to the following clause: StoreMyTruck reserves the right to relocate your vehicle at any time, for any reasonable reason, including but not limited to vehicle safety concerns, lot reorganization, and safety reasons. You, as the owner and/or driver of the vehicle, hereby acknowledge and relinquish any right or claims regarding the relocation of your vehicle, and hereby grant consent to StoreMyTruck to move your vehicle as deemed necessary. <span style={{ color: 'red' }}>*</span>
                                </p>
                                <FormControlLabel
                                  required
                                  control={<Switch
                                    checked={isAcknowledged.vehicleRelocation || false}
                                    onChange={handleSwitchChange('vehicleRelocation')}
                                  />}
                                  label="Required"
                                />
                                {errors.vehicleRelocation && <div className="invalid-feedback">You must acknowledge vehicle relocation terms.</div>}

                                <p>
                                  I hereby acknowledge that the information that I provided in this agreement is complete and accurate. Furthermore, I understand and agree that if I park past the "End Date" in this agreement, or if I add additional vehicle(s) without providing StoreMyTruck prior notice it will be considered illegally parked. I waive any additional notice of violations and agree that any violation of the Terms and Conditions of this Licensing Agreement will result in my vehicle being impounded, booted, or towed at my own expense without prior notice. Which may result in significant monetary cost to me. <span style={{ color: 'red' }}>*</span>
                                </p>
                                <FormControlLabel
                                  required
                                  control={<Switch
                                    checked={isAcknowledged.agreement || false}
                                    onChange={handleSwitchChange('agreement')}
                                  />}
                                  label="Required"
                                />
                                {errors.agreement && <div className="invalid-feedback">You must acknowledge the agreement terms.</div>}

                                <p>
                                  I understand and agree that if my vehicle is found parking illegally (“Illegal Parking” means parking on our property without paying or parking for longer than the paid time, or is an Unidentifiable Vehicle, properly and conspicuously displaying a valid STOREMYTRUCK.COM parking permit or parking ID for the lot/location in which you are permitted to park) I waive any additional notice of violations and agree that any violation of the Terms and Conditions of this Licensing Agreement will result in my vehicle being impounded, booted, or towed at my own expense.<span style={{ color: 'red' }}>*</span>
                                </p>
                                <FormControlLabel
                                  required
                                  control={<Switch
                                    checked={isAcknowledged.illegalParking || false}
                                    onChange={handleSwitchChange('illegalParking')}
                                  />}
                                  label="Required"
                                />
                                {errors.illegalParking && <div className="invalid-feedback">You must acknowledge illegal parking terms.</div>}
                              </AccordionDetails>
                            </Accordion>
                          </div>
                          <div className="col-md-6 col-sm-6 mb-3">
                            <div className="form-group check-box">
                              <input
                                name="acknowledge"
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                              />
                              <label>
                                I have read and agree to the terms & conditions.
                                <span style={{ color: 'red' }}>*</span>
                              </label>
                              {error && <div style={{ color: 'red' }}>{error}</div>}
                            </div>
                          </div>
                          {showExtendedParkingInfo && (
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
                                {/* {signatureDataUrl && (
                                  <div>
                                    <img src={signatureDataUrl} alt="Signature" />
                                  </div>
                                )} */}
                              </div>
                              {/* <button onClick={submitForm}>Submit</button> */}
                              <div className="acknowledge">
                                <div className="form-group check-box">
                                  <input
                                    name="acknowledge"
                                    type="checkbox"
                                    onChange={handleTermsAndConditions}
                                    value="I acknowledge that I understand and agree
                                    that this sale is FINAL and no refunds will
                                    be issued once I pay and submit this
                                    agreement unless I submit a Cancellation
                                    Form within 3 hours."
                                  />
                                  <label>
                                    I acknowledge that I understand and agree
                                    that this sale is FINAL and no refunds will
                                    be issued once I pay and submit this
                                    agreement unless I submit a Cancellation
                                    Form within 3 hours.
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-12 my-2">
                                <h5>
                                  <b>
                                    Need to add days and extend your parking?
                                  </b>
                                </h5>
                                <p>
                                  You can extend your parking and add days to
                                  this agreement. If you need to extend your
                                  parking, just click on the link that will be
                                  provided in the confirmation Email that you
                                  will recieve once your order is submitted.
                                </p>
                              </div>
                            </div>
                          )}
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

export default Parking;