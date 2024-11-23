import React, { useState, useEffect, useRef } from "react";
import Header from "../../header/Header.js";
import Footer from "../../footer/Footer.js";
import MonthlyAggrement from "./TermsandConditions/MonthlyAgreement.js";
import SignatureField from "./SignatureField.js";
import { addDays } from 'date-fns';
import SignatureCanvas from 'react-signature-canvas';
// import "./Parking.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Link
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import FileUploadField from "./FileUploadField.js";
import { useParams } from "react-router-dom";

import { useAxios } from '../../../components/http/useAxios';
import validationSchema from "./validationSchema.js";
import Swal from 'sweetalert2/dist/sweetalert2.js';
const MonthlyParking = () => {
  const { type } = useParams();
  const { axios } = useAxios();
  const sigPad = useRef(null);
  const [firstName, setFirstName] = useState("");
  const [vehicleData, setVehicleData] = useState({
    year: '',
    make: '',
    model: '',
    usdot: '',
    companyNameOnTractor: '',
    color: '',
    tagno: ""
  });
  const[locationerror,setlocationerror ] = useState('');
  const [isAcknowledged1, setIsAcknowledged1] = useState(false);
const [isAcknowledged2, setIsAcknowledged2] = useState(false);
const [checkboxError, setCheckboxError] = useState('');
const[firstdaterror,setfirstdaterror] = useState('');
  const [signatureError, setSignatureError] = useState('');
  const [monthlyParkingError, setMonthlyParkingError] = useState('');
  const [licenseError, setLicenseError] = useState('');
  const [streetAddressError, setStreetAddressError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const [customerType, setCustomerType] = useState('');
  const [error, setError] = useState('');
  const [securityCodeError, setSecurityCodeError] = useState("");
  const [usdot, setusdot] = useState("");
  const [amountdetail, setamountdetail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [otherinfo, setotherinfo] = useState('');
  const [licenseData, setLicenseData] = useState(null);
  const [trailerlength, settrailerlength] = useState('');
  const [vehicleNumber, setvehicleNumber] = useState('');
  const [trailertype, settrailertype] = useState('');
  const [Acknowledged, setAcknowledged] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectvehicle, setselectvehicle] = useState('');
  const [model, setmodel] = useState('');
  const [make, setmake] = useState('');
  const [color, setcolor] = useState('');
  const [monthlyParking, setMonthlyParking] = useState('');
  const [lastmonthlyParking, setlastmonthlyParking] = useState('');
  const [discount, setdiscount] = useState('');
  const [Subtotal, setSubtotal] = useState('');
  const [TotalAmountDue, setTotalAmountDue] = useState('');
  const [comment, setcomment] = useState('');
  const [payment, setpayment] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [companyPhoneNumberError, setCompanyPhoneNumberError] = useState('');
  const [parkingTypeId, setparkingTypeId] = useState('');
  const [insuranceCard, setInsuranceCard] = useState(null);
  const [companyNameOnTractor, setcompanyNameOnTractor] = useState('');
  const [vechicleCount, setvechicleCount] = useState('');
  const [vehicleTypeId, setvehicleTypeId] = useState('');
  const [vehicleType, setVehicleType] = useState([]);
  const [postalCodeError, setPostalCodeError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [driversLicense, setDriversLicense] = useState(null);
  const [showExtendedParkingInfo, setShowExtendedParkingInfo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [locationId, setLocationId] = useState("");
  const [selectedStateValue, setselectedstatevalue] = useState('');
  const [signatureDataUrl, setSignatureDataUrl] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [lastName, setlastName] = useState("");
  const [lastNameError, setlastNameError] = useState("");
  const [totalDays, setTotalDays] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [locations, setLocations] = useState([]);
  const [signature, setSignature] = useState("");
  const [showNotice, setShowNotice] = useState(false);
  const [Cusmoterinception, setCusmoterinception] = useState('');
  const [Newlocation, setNewlocation] = useState('');
  const [firstNameError, setFirstNameError] = useState("");
  const [accountOwnerName, setaccountOwnerName] = useState('');
  const [accountOwnerlastName, setaccountOwnerlastName] = useState('');
  const [Company, setCompany] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [State, setState] = useState([]);
  const [statelocation, setstatelocation] = useState([]);
  const [postalCode, setPostalCode] = useState('');
  const [Phonenumber, setPhonenumber] = useState('');
  const [stateID, setstateID] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [securitycode, setsecurityCode] = useState("");
  const [emailconmfrim, setEmailConfrim] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expirationMonth, setexpirationMonth] = useState('');
  const [expirationYear, setexpirationYear] = useState('');
  const [creditCardNumberError, setCreditCardNumberError] = useState("");
  const [confirmEmailError, setConfirmEmailError] = useState('');
  const [streetAddress2, setStreetAddress2] = useState('');
  const [state, setstate] = useState('');
  const [country, setcountry] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [vehicleTypeError, setVehicleTypeError] = useState('');
  const [radioValue, setRadioValue] = useState('');
  // const [vehicleData, setVehicleData] = useState({
  //   Vehiclecount: '',
  //   yearMakeModel: '',
  //   // make: '',
  //   // model: '',
  //   usdot: '',
  //   companyNameOnTractor: '',
  //   color: '',
  // });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [detailsError, setDetailsError] = useState('');
  const [promotionCodeError, setPromotionCodeError] = useState('');
  const [specialPromotionCode, setSpecialPromotionCode] = useState('');
  const [promotionCode, setPromotionCode] = useState('');
  const [accountOwnerData, setAccountOwnerData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: ""
  });
  const [accountOwnerData2, setAccountOwnerData2] = useState({
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: ""
  });
  const [isSameAsAbove, setIsSameAsAbove] = useState(false);

  const [userDetails, setUserDetails] = useState({
    name: '',
    company_name: '',
    phone_number: '',
    email: '',
  });



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
  useEffect(() => {
    const today = new Date();
    setBookingDate(today.toLocaleDateString());
  }, []);
  const handleSignatureChange = () => {
    if (sigPad.current) {
      const dataUrl = sigPad.current.toDataURL('image/png');
      setSignatureDataUrl(dataUrl);

      // Validate the signature
      if (dataUrl) {
        setSignatureError(''); // Clear error if signature exists
      }
    }
  };
  const handleClearSignature = () => {
    if (sigPad.current) {
      sigPad.current.clear();
      setSignatureDataUrl('');
    }
  };
  const handleCheckboxChange = (event, checkboxIndex) => {
    if (checkboxIndex === 1) {
      setIsAcknowledged1(event.target.checked);
    } else if (checkboxIndex === 2) {
      setIsAcknowledged2(event.target.checked);
    }
    // Clear error if at least one checkbox is checked
    if (isAcknowledged1 || isAcknowledged2 || isChecked) {
      setCheckboxError('');
    }
  };

  const handlePromotionCode = (e) => {
    setPromotionCode(e.target.value);
  }

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleMonthlyParkingChange = (e) => {
    const value = e.target.value;

    // Update the monthly parking state
    setMonthlyParking(value);

    // Validate input
    if (value.trim() === '') {
      setMonthlyParkingError('Monthly parking amount is required.');
    } else if (isNaN(value) || Number(value) < 0) {
      setMonthlyParkingError('Please enter a valid number greater than or equal to 0.');
    } else {
      setMonthlyParkingError(''); // Clear error if valid
    }
  };

  const [isAcknowledged, setIsAcknowledged] = useState({
    security: false,
    vehicleRelocation: false,
    agreement: false,
    illegalParking: false,
  });
  const handlePaymentChange = (e) => {
    const value = e.target.value;
    setPaymentMethod(value);
    setPaymentDetails(''); // Reset payment details when changing payment method

    // Validate the payment method
    if (value === '') {
      setPaymentError('Preferred Payment Method is required.');
    } else {
      setPaymentError(''); // Clear error if valid
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
  const validateConfirmEmail = (confirmEmail) => {
    if (confirmEmail.trim() === '') {
      return 'Please confirm your email address';
    } else if (confirmEmail !== email) {
      return 'Email addresses do not match';
    }
    return ''; // No error
  };
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

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    if (email.trim() === '') {
      return 'Email is required';
    } else if (!emailPattern.test(email)) {
      return 'Please enter a valid email address';
    }
    return ''; // No error
  };

  // Function to handle email change
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    const error = validateEmail(value);
    setEmailError(error);
  };

  // Function to handle blur event
  const handleEmailBlur = () => {
    const error = validateEmail(email);
    setEmailError(error);
  };

  const handleLicenseChange = (e) => {
    const value = e.target.value;
    setLicenseData(value);

    // Validate the license number
    if (value.length < 14) {
      setLicenseError('License number must be at least 17 characters long.');
    } else if (value.length > 17) {
      setLicenseError('License number must not exceed 17 characters.');
    } else {
      setLicenseError(''); // Clear error if valid
    }

    // Optionally fetch vehicle data based on the input
    fetchVehicleData(value);
  };



  const handleConfirmEmailChange = (e) => {
    const { value } = e.target;
    setConfirmEmail(value);
    const error = validateConfirmEmail(value);
    setConfirmEmailError(error);
  };


  const handleConfrimEmailBlur = () => {
    setEmailError(validateEmail(email));
    setConfirmEmailError(validateConfirmEmail(confirmEmail));
  };


  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^[0-9]{10}$/; // Assuming a 10-digit phone number format
    if (phoneNumber.trim() === '') {
      return 'Phone number is required';
    } else if (!phoneNumberPattern.test(phoneNumber)) {
      return 'Phone number must be 10 digits long and contain only numbers';
    }
    return ''; // No error
  };

  // Function to handle validation when the user submits or blurs the input
  const handlePhoneNumberBlur = () => {
    const error = validatePhoneNumber(accountOwnerData.phoneNumber);
    setPhoneNumberError(error);
  };
  const handleCompanyPhoneNumberBlur = () => {
    const error = validatePhoneNumber(
      isSameAsAbove ? accountOwnerData.phoneNumber : accountOwnerData2.phoneNumber
    );
    setCompanyPhoneNumberError(error);
  };
  const handlePostalCodeBlur = () => {
    // Check if the input contains only numbers
    const isNumeric = /^[0-9]+$/.test(postalCode);

    if (postalCode.trim() === "") {
      //   setPostalCodeError("Postal / Zip Code is required");
    }
    else if (!isNumeric) {
      setPostalCodeError("Please enter numeric values only");
    } else if (postalCode.length < 5 || postalCode.length > 10) {
      setPostalCodeError("Postal / Zip Code should be between 5 and 10 digits");
    } else {
      setPostalCodeError("");
    }
  };

  const handleStateChange = (event) => {
    try {
      const value = event.target.value;
      const parsedValue = JSON.parse(value); // Safely parse the JSON
      const { id, state_value } = parsedValue;

      setSelectedState(id); // Update state with the selected state's ID
      setselectedstatevalue(state_value || ""); // Set the state name if available
    } catch (error) {
      console.error("Error parsing JSON: ", error);
    }
  };

  const handleLocationIDchange = (event) => {
    try {
      const value = event.target.value;
      const parsedValue = JSON.parse(value); // Safely parse the JSON
      const { id } = parsedValue;

      setLocationId(id); // Update state with the selected location ID
    } catch (error) {
      console.error("Error parsing JSON: ", error);
    }
  };


  const handletractoronly = (e) => {
    const value = e.target.value;
    setcompanyNameOnTractor(value);
    // setusdot(value);
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);

    const calculatedEndDate = calculateEndDate(date); // Calculate the end date based on the start date
    setEndDate(calculatedEndDate); // Update the end date state

    calculateTotalDays(date, calculatedEndDate); // Update the total days
  };

  const calculateTotalDays = (start, end) => {
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotalDays(diffDays);
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

  const handleLocationChange = (event) => {
    const selectedValue = event.target.value;

    // Display the notice if a valid location is selected
    if (selectedValue) {
      setShowNotice(true);
    } else {
      setShowNotice(false);
    }
  };
  const calculateEndDate = (startDate) => {
    const daysToAdd = 30; // For example, set the end date to 7 days later
    const newEndDate = new Date(startDate);
    newEndDate.setDate(newEndDate.getDate() + daysToAdd);
    return newEndDate;
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
    year: "",
    make: "",
    model: "",
    color: "",
    usdot: "",
    companyNameOnTractor: "",
    vehicleType: "",
    numberOfVehicles: "",
    vehicles: [
      {
        year: "",
        make: "",
        model: "",
        color: "",
        usdot: "",
        companyNameOnTractor: "",
        Vehiclecount: ''
      },
    ],
    promotionCode,
    specialPromotionCode

  };
  // const handleClearSignature = () => {
  //   if (sigPad.current) {
  //     sigPad.current.clear();
  //     setSignatureDataUrl('');
  //   }
  // };
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
  const handleAccountOwnerChange = (e) => {
    const { value, name } = e.target;

    // Basic validation based on field names
    switch (name) {
      case 'streetAddress':
        if (!value) {
          setStreetAddressError('Street Address is required.');
        } else {
          setStreetAddressError('');
        }
        break;
      case 'city':
        if (!value) {
          setCityError('City is required.');
        } else {
          setCityError('');
        }
        break;
      case 'state':
        if (!value) {
          setStateError('State is required.');
        } else {
          setStateError('');
        }
        break;
      case 'PostalCode':
        if (!value) {
          setPostalCodeError('Postal Code is required.');
        } else {
          setPostalCodeError('');
        }
        break;
      default:
        break;
    }

    // Update account owner data
    setAccountOwnerData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    // setaccountOwnerName(value);
    // setaccountOwnerlastName(value);
    // setCompany(value);
    // setStreetAddress(value);
    // setCity(value);
    // setState(value);
    // setPostalCode(value);
    // setPhonenumber(value);
  };
  const handleAccountOwnerChange2 = (e) => {
    const { name, value } = e.target;
    setAccountOwnerData2((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }







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





  const handleVehicleCountChange = (e) => {
    const value = e.target.value;
    // setamountdetail(value); 
    setvechicleCount(value);
    console.log(value, 'mmmmmmmmm');


  };

 
  // const handleStateChange = (e) => {
  //   const { id } = JSON.parse(e.target.value);  // Get the state ID from the selected option
  //   formik.setFieldValue("stateID", id);  // Set stateID in Formik's state
  // };
  const Statetype = async () => {
    let userid = localStorage.getItem("storemytruck_customer_id")
    const statetype = process.env.REACT_APP_BASE_MONTHLY_STATE + "?userId=" + userid;  // Correct API URL


    try {
      const res = await axios.get(statetype);
      // console.log('API huhghyugtyugvyvgResponse:', res.data.data);  // Log API response for debugging
      if (res?.data?.success) {
        setState(res.data.data);  // Set the state data
      } else {
        // Swal.fire({
        //   position: "top-end",
        //   icon: "error",
        //   title: res.data.message,
        //   showConfirmButton: true,
        //   confirmButtonText: "OK",
        // });
      }
    } catch (err) {
      // Swal.fire({
      //   position: "top-end",
      //   icon: "error",
      //   title: err.response?.data?.message || "An error occurred ",
      //   showConfirmButton: true,
      //   confirmButtonText: "OK",
      // });
      console.log("Error:", err);
    }
  };
  const Statetypelocation = async () => {
    let userid = localStorage.getItem("storemytruck_customer_id");

    // Directly use selectedState instead of obj
    const statetype = process.env.REACT_APP_BASE_MONTHLY_STATE_LOCATION + "?userId=" + userid + "&stateId=" + selectedState;  // Correct API URL

    try {
      const res = await axios.get(statetype);

      // Debugging the response
      console.log('API Response:', res.data.data);  // Log API response for debugging 

      if (res?.data?.success) {
        setstatelocation(res.data.data);  // Set the state data
      } else {
        // Handle the error response
        // Swal.fire({
        //   position: "top-end",
        //   icon: "error",
        //   title: res.data.message,
        //   showConfirmButton: true,
        //   confirmButtonText: "OK",
        // });
      }
    } catch (err) {
      // Handle the API error
      // Swal.fire({
      //   position: "top-end",
      //   icon: "error",
      //   title: err.response?.data?.message || "An error occurred",
      //   showConfirmButton: true,
      //   confirmButtonText: "OK",
      // });
      console.log("Error:", err);
    }
  };

  // Fetch states when component mounts
  useEffect(() => {
    Statetype();
    Statetypelocation();
  }, [selectedState]); // Add selectedState to the dependency array if it should trigger an API call when changed

  const Vehicletype = async (vehicle) => {
    let parkingTypeId = '66a239ce9e6a50d46e652e66';
    setparkingTypeId(parkingTypeId);
    const vechicletype = process.env.REACT_APP_BASE_VEHICLE_TYPE;


    // console.log(vechicletype, 'hhhhhhh');


    try {
      const res = await axios.get(vechicletype
      //   , {
      //   params: {
      //     parkingTypeId: parkingTypeId
      //   }
      // }
      );
      // console.log(res);
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
    }
    catch (err) {
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
  useEffect(() => {
    Vehicletype();

  }, [])
  useEffect(() => {
    if (locationId != "" && vehicleTypeId != "" && vechicleCount != "" && parkingTypeId != "") {
      Amountdetails();
    }
  }, [locationId, vehicleTypeId, vechicleCount, parkingTypeId]);
  let userId = localStorage.getItem("storemytruck_customer_id");
  const Amountdetails = async () => {
    // console.log();
    // console.log(vehicleTypeId, 'vehicleTypeId');

    // console.log(vechicleCount, 'vechicleCount');
    // console.log(locationId, 'locationId');
    // console.log(parkingTypeId, 'parkingTypeId');
    // console.log();
    let obj = {
      parkingTypeId: "66a239ce9e6a50d46e652e66",
      vehicleTypeId,
      locationId,
      vechicleCount,
      userId

    }
    const Amountdetail = process.env.REACT_APP_API_AMOUNT_DETAILS;

    try {
      const res = await axios.post(Amountdetail, obj,

        {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      // console.log(res, "kkkk");


      if (res?.data?.success) {
        // console.log("amount amountDue" + JSON.stringify(res.data.data.amountDue))
        setamountdetail(res.data.data);


        //setLocations(res.data.data);
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
      // Swal.fire({
      //   position: 'top-end',
      //   icon: 'error',
      //   title: err.response?.data?.message || 'An error occurred',
      //   showConfirmButton: true,
      //   confirmButtonText: 'OK',
      // });
      console.log('error', err);
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setError("");

    // Check if customerType is selected
    if (!customerType) {

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'An error occurred',
        text: 'Customer Inception is required.',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
      // return; // Stop the submission if validation fails
    }
    if (!selectedState) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'An error occurred',
        text: 'State is required.',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
      // return; // Stop submission if validation fails
    }

    // Check if location is selected
    if (!locationId) {
      setlocationerror("Location is required")
    }

     if (!startDate) {
      setfirstdaterror("first date is required")
    }

    let valid = true;

    if (!accountOwnerData.streetAddress) {
      setStreetAddressError('Street Address is required.');
      valid = false;
    }

    if (!accountOwnerData.city) {
      setCityError('City is required.');
      valid = false;
    }

    if (!accountOwnerData.state) {
      setStateError('State is required.');
      valid = false;
    }

    if (!postalCode) {
      setPostalCodeError('Postal Code is required.');
      valid = false;
    }

    if (!vehicleTypeId) {
      setVehicleTypeError('Vehicle type is required');
    }

    if (!signatureDataUrl) {
      setSignatureError('Signature is required.');
    }

    if (paymentMethod === '') {
      setPaymentError('Preferred Payment Method is required.');
      valid = false;
    }

    if ((paymentMethod === "ACH" || paymentMethod === "Other") && paymentDetails.trim() === '') {
      setDetailsError('Payment details are required.');
      valid = false;
    }

    if (!selectedFile) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'An error occurred',
        text: 'Photo of Vehicle Upload is required.',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
      // return;
    }
    if (!licenseData) {
      setLicenseError('VIN is required');
    }
    if (!isAcknowledged1 || !isAcknowledged2 || !isChecked) {
      setCheckboxError('You must acknowledge all statements.');
    }

    if (!creditCardNumber) {
      setCreditCardNumberError('CreditCard number is required')
      // return;
    }




    // Check for acknowledgements first
    const newErrors = {
      security: !isAcknowledged.security,
      vehicleRelocation: !isAcknowledged.vehicleRelocation,
      agreement: !isAcknowledged.agreement,
      illegalParking: !isAcknowledged.illegalParking,
    };

    // Update the error state
    setErrors(newErrors);

    // Check if all required sections are acknowledged
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
 
    const parkingDateString = new Date(bookingDate).toISOString();
    const startDateString = new Date(startDate).toISOString();
    const endDateString = new Date(endDate).toISOString();
    let vehicle_details = [{
      year: vehicleData.year || '',
      make: vehicleData.make || '',
      model: vehicleData.model || '',
      // trim: trim,
      color: vehicleData.color || '',
      companyNameOnTractor: companyNameOnTractor || '',
      usdot: usdot || '',
      otherinfo: otherinfo,
      trailerlength: trailerlength,
      trailertype: trailertype
    }];

    let formattedMonth = expirationMonth.toString().padStart(2, '0');
    let formattedYear = expirationYear.toString().slice(-2);

    console.log(parkingTypeId,)
    const formData = new FormData();

    formData.append('parkingDate', parkingDateString);
    formData.append('startDate', startDateString);
    formData.append('endDate', endDateString);
    formData.append('Cusmoterinception', Cusmoterinception);
    formData.append('Newlocation', Newlocation);
    // formData.append('Company',Company);
    // formData.append('streetAddress',streetAddress);
    // formData.append('Phone-number',Phonenumber);
    // formData.append('Acknowledged', Acknowledged);
    formData.append('comment', comment);
    formData.append('accountOwnerName', accountOwnerData.firstName || '');
    formData.append('accountOwnerlastName', accountOwnerData.lastName || '');
    formData.append('company', accountOwnerData.company || '');
    // formData.append('streetAddress', accountOwnerData.streetAddress.toString() || '');
    // formData.append('city', accountOwnerData.city.toString() || '');
    // formData.append('state', accountOwnerData.state.toString() || '');
    // formData.append('postalCode', accountOwnerData.postalCode.toString() || '');
    formData.append('phoneNumber', accountOwnerData.phoneNumber || '');
    if (isSameAsAbove) {


      // formData.append('streetAddress2', accountOwnerData2.streetAddress.toString() || '');
      formData.append('city2', accountOwnerData2.city || '');
      formData.append('state2', accountOwnerData2.state || '');
      formData.append('postalCode2', accountOwnerData2.postalCode || '');
      formData.append('phoneNumber2', accountOwnerData2.phoneNumber || '');
    } else {


      // formData.append('streetAddress2', accountOwnerData2.streetAddress || '');
      formData.append('city2', accountOwnerData2.city || '');
      formData.append('state2', accountOwnerData2.state || '');
      formData.append('postalCode2', accountOwnerData2.postalCode || '');
      formData.append('phoneNumber2', accountOwnerData2.phoneNumber || '');
    }
    formData.append('Email', email);
    formData.append('Confrimemail', confirmEmail);

    console.log("c", typeof city);
    console.log("s", typeof state);
    console.log("p", typeof postalCode);
    console.log("cc", typeof country);


    // formData.append('parkingDays', bookingDatenew || '');
    formData.append('city', city.toString());
    formData.append('streetAddress', streetAddress.toString() || '');
    formData.append('streetAddress2', streetAddress2.toString() || '');
    formData.append('state', state.toString());
    formData.append('postalCode', postalCode.toString());
    formData.append('country', country.toString() || '');
    // formData.append('totalAmount', amountdetail.totalAmount || '');
    formData.append('c_accountOwnerName', accountOwnerName);
    formData.append('c_accountOwnerlastName', accountOwnerlastName);
    formData.append('creditCardNumber', creditCardNumber || '');
    formData.append('selectedState', selectedState || '');
    formData.append('securityCode', securitycode || '');
    formData.append('expirationMonth', formattedMonth || '');
    formData.append('expirationYear', formattedYear || '');
    formData.append('vehicleImages', selectedFile);
    formData.append('insuranceImages', insuranceCard);
    formData.append('licenseImages', driversLicense);
    formData.append('paymentMethod', paymentMethod);
    formData.append('monthlyParking', monthlyParking);
    formData.append('discount', amountdetail.discount);
    formData.append('lastmonthlyParking', lastmonthlyParking);
    formData.append('Subtotal', amountdetail.amountDue);
    formData.append('totalAmount', amountdetail.totalAmount);
    formData.append('Deposite', amountdetail.deposite);
    formData.append('Last deposite', amountdetail.lastDeposite);
    formData.append('promotionCode', promotionCode);
    formData.append('specialPromotionCode', specialPromotionCode);


    vehicle_details.forEach((vehicle, index) => {
      Object.keys(vehicle).forEach(key => {
        formData.append(`vehicleDetails[${index}][${key}]`, vehicle[key] || '');
      });
    });
    // // formData.append('signature', signature || '');
    formData.append('locationId', locationId || '');
    // formData.append('amountdue',amountdetail.amountDue || '');
    // formData.append('convenienceFee', amountdetail.convenienceFee || '');
    // formData.append('companyNameOnTractor', companyNameOnTractor || '');
    // formData.append('totalAmount2', amountdetail.totalAmount || '');
    formData.append('userId', localStorage.getItem("storemytruck_customer_id") || '');
    formData.append('vehicleTypeId', vehicleTypeId || '');
    formData.append('parkingTypeId', parkingTypeId || '');
    formData.append('vechicleCount', vechicleCount || '');
    if (signatureDataUrl) {

      // alert(signatureDataUrl, 'jjjjj');


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
    console.log("formData->>>>>>>>>>>>>>>", formData);

    try {
      const response = await axios.post(process.env.REACT_APP_BASE_SAVE_MONTHLY_PARKING, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Monthly parking enrolled successfully.',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      }).then(() => {
        // Refresh the page after success popup closes
        window.location.reload();
      });

    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Unable to submit the form. Please try again later.';

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'An error occurred',
        text: errorMessage,
        showConfirmButton: true,
        confirmButtonText: 'OK',
      })
      // .then(() => {
      //   // Refresh the page after success popup closes
      //   window.location.reload();
      // });
    }

    console.log("payload", formData);
  };
  const handleFileSelect = (file) => {
    setSelectedFile(file); // Store the selected file in state
  };
  const handleInsurance = (file) => {
    setInsuranceCard(file); // Store the selected file in state
  };
  const handleDriver = (file) => {
    setDriversLicense(file); // Store the selected file in state
  };
  const [errors, setErrors] = useState({
    security: false,
    vehicleRelocation: false,
    agreement: false,
    illegalParking: false,
  });
  return (
    <div>
      <Header />
      <div className="book-form">
        <div className="container margin_60">
          <div className="row pb-4">
            <div className="col-md-12">
              <h1>MONTHLY PARKING</h1>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    MONTHLY PARKING AGREEMENT - TERMS AND CONDITIONS (CLICK TO
                    EXPAND)
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
                        MONTHLY PARKING
                      </h3>
                      <p>StoreMyTruck.com</p>
                    </div>

                    <div className="step">
                      <div className="row">
                        <div className="col-md-12 col-sm-6">
                          <div className="form-group">
                            <label>
                              Customer Inception<span style={{ color: 'red' }}>*</span>
                            </label>
                            <div>
                              <label>
                                <input
                                  type="radio"
                                  onChange={handleRadioChange}
                                  onClick={() => setCustomerType("newcustomer")}
                                  name="customerType"
                                  value="newcustomer"
                                  className="mr-1"
                                />
                                {"  "}New Customer
                              </label>
                            </div>
                            <div>
                              <label>
                                <input
                                  type="radio"
                                  onChange={handleRadioChange}
                                  onClick={() => setCustomerType("returningcustomer")}
                                  name="customerType"
                                  value="returningcustomer"
                                  className="mr-1"
                                />
                                {"  "}Returning Customer
                              </label>
                            </div>
                            <div>
                              <label>
                                <input
                                  type="radio"
                                  onChange={handleRadioChange}
                                  onClick={() => setCustomerType("existingcustomer")}
                                  name="customerType"
                                  value="existingcustomer"
                                  className="mr-1"
                                />
                                {"  "}Existing Customer (Use this option only if you are adding an additional LOCATION to your existing account. Otherwise please submit an Account Change Form).
                              </label>
                            </div>
                            {error && <div style={{ color: 'red' }}>{error}</div>}
                          </div>
                          {/* Conditional rendering for additional location question */}
                          <hr></hr>
                          {radioValue === "existingcustomer" && (
                            <div className="form-group">
                              <label>
                                Are you adding a New Location to your Existing
                                Account? *
                              </label>
                              <div>
                                <label>
                                  <Field
                                    onClick={(e) => setNewlocation(e.target.value)}
                                    type="radio"
                                    name="addingLocation"
                                    value="yes"
                                    className="mr-1"
                                  />
                                  {"  "}
                                  Yes
                                </label>
                              </div>
                              <div>
                                <label>
                                  <Field
                                    onClick={(e) => setNewlocation(e.target.value)}

                                    type="radio"
                                    name="addingLocation"
                                    value="no"
                                    className="mr-1"
                                  />
                                  {"  "}
                                  No
                                </label>
                                {/* Conditional rendering for Account Change Form message */}
                                {values.addingLocation === "no" && (
                                  <h6>
                                    You need to fill out an{" "}
                                    <a href="/SMT_UAT/CMS/storemytruck/AccountChangeForm">
                                      Account Change Form
                                    </a>{" "}
                                    instead.
                                  </h6>
                                )}
                              </div>
                              <hr></hr>
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label>
                              State<span style={{ color: 'red' }}>*</span>
                            </label>
                            <select
                              name="stateID"
                              className={`form-control ${locationerror ? "is-invalid" : ""}`}
                              onClick={handleStateChange}  // Update stateID in Formik on change
                            >
                              <option value="">Please Select</option>
                              {Array.isArray(State) && State.map((stateData, index) => (
                                <option
                                  key={index}
                                  value={JSON.stringify({ id: stateData.stateId, state_value: stateData.stateName })}  // Send state ID
                                >
                                  {stateData.stateName}  {/* Display the state name */}
                                </option>
                              ))}
                                 {locationerror && (
                              <div className="invalid-feedback">
                                {locationerror}
                              </div>
                            )}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          {selectedStateValue && (
                            <div className="form-group">
                              <label>{selectedStateValue} Locations</label>
                              <Field
                                // onChange={handlelocationidchange}
                                as="select"
                                name="selectedLocation"
                                className="form-control"
                                // selected={locationId}
                                onselect={handleLocationChange}


                                onChange={handleLocationIDchange}
                              >
                                <option value="">Location/Available space</option>
                                {statelocation.map((location, index) => (
                                  //                     
                                  <option key={index}
                                    value={JSON.stringify({ id: location._id })}>
                                    {/* value={location.locationId}> */}
                                    {`${location.addressOne}, ${location.addressTwo}, ${location.addressThree} / ${location.remainingSpace ?? 0}`}
                                  </option>
                                ))}

                              </Field>
                            </div>
                          )}
                        </div>

                        {showNotice && ( // Conditionally render the notice
                          <div className="col-12 mt-3" >
                            <div className="alert alert-warning" role="alert">
                              <strong style={{ color: 'red' }}>IMPORTANT!</strong> BE AWARE THAT YOU CAN ONLY PARK AT THE LOCATION YOU SELECTED. IF YOU NEED TO CHANGE THE LOCATION YOU MUST SUBMIT AN ONLINE ACCOUNT CHANGE FORM. EMAILS WILL NOT BE ACCEPTED TO MAKE CHANGES TO YOUR ACCOUNT.
                              <br />
                              <br />
                              YOUR VEHICLE MAY BE BOOTED OR TOWED IF IT IS PARKED AT ANY OTHER LOCATION WITHOUT A PRE-APPROVED ACCOUNT CHANGE FORM.
                              <br />
                              <br />
                              <strong style={{ color: 'red' }}>Rates:</strong>
                              <ul>
                                <li>Boot Fee: $350.00</li>
                                <li>King Pin Fee: $350.00</li>
                                <li>Towing Fee: Varies (Depending on vehicle and distance)</li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                      <hr></hr>

                      <p style={{ textDecoration: "underline" }}>
                        Customer/Account Information
                      </p>

                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label>
                            This Licensing Agreement is Made and Entered into
                            on:
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
                      <div className="row">
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label>Start Date<span style={{ color: 'red' }}>*</span></label>
                            <DatePicker
                              selected={startDate}
                              onChange={handleStartDateChange}
                              className="form-control required"
                              placeholderText="Select start date"
                              minDate={new Date()} // Prevent selecting past dates
                            />
                                 {firstdaterror && (
                                <div className="invalid-feedback">
                                  {firstdaterror}
                                </div>
                              )}
                          </div>
                        </div>

                        {/* <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label>End Date</label>
                            <DatePicker
                              selected={endDate}
                              onChange={handleEndDateChange}
                              className="form-control required"
                              placeholderText="Select end date"
                              minDate={startDate} // The end date can't be before the start date
                              maxDate={startDate ? addDays(startDate, 30) : null} // Set max 30 days after the start date
                              disabled={!startDate} // Disable end date if start date is not selected
                            />
                          </div>
                        </div> */}
                        {/* <div className="col-md-4 col-sm-4">
                          {totalDays !== null && (
                            <div className="row">
                              <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                  <label>Total Days: {totalDays}</label>
                                  <Field
                                    type="text"
                                    name="totalDays"
                                    className="form-control"
                                    readOnly
                                    value={totalDays}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div> */}
                      </div>

                      <p style={{ fontSize: "20px" }}>
                        Between Storemytruck.com, LLC ("Licensor") and
                      </p>

                      <form>
                        {/* Account Owner's Fields */}
                        <div className="row">


                          <label>COMPANY ADDRESS:</label>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Street Address<span style={{ color: 'red' }}>*</span></label>
                              <input
                                name="streetAddress"
                                type="text"
                                className="form-control"
                                value={accountOwnerData.streetAddress}
                                onChange={handleAccountOwnerChange}
                                placeholder="Street Address"
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label>City</label>
                              <input
                                name="city"
                                type="text"
                                className="form-control"
                                value={accountOwnerData.city}
                                onChange={handleAccountOwnerChange}
                                placeholder="City"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>State / Province</label>
                              <input
                                name="state"
                                type="text"
                                className="form-control"
                                value={accountOwnerData.state}
                                onChange={handleAccountOwnerChange}
                                placeholder="State / Province"
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




                          {/* Phone Number Input */}
                          {/* <div className="col-md-12">
                            <div className="form-group">
                              <label>Phone Number</label>
                              <input
                                name="phoneNumber"
                                type="text"
                                className={`form-control ${phoneNumberError ? 'is-invalid' : ''}`}
                                value={accountOwnerData.phoneNumber}
                                onChange={handleAccountOwnerChange}
                                onBlur={handlePhoneNumberBlur} // Validate on blur
                                placeholder="Phone Number"
                              />
                              {phoneNumberError && <div className="invalid-feedback">{phoneNumberError}</div>}
                            </div>
                          </div> */}



                        </div>

                        {/* Mailing Address Fields */}
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <p>MAILING ADDRESS</p>
                              <label>
                                <Field
                                  type="checkbox"
                                  name="customerType"
                                  value="sameasabove"
                                  className="mr-1"
                                  onClick={() => setIsSameAsAbove(!isSameAsAbove)}
                                />
                                {" "} Same as above
                              </label>
                            </div>
                          </div>


                          <div>

                            {console.log(isSameAsAbove)
                            }
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              {/* <label>Street Address<span>*</span></label>

                              <input
                                name="streetAddress"
                                type="text"
                                className="form-control"
                                value={accountOwnerData.streetAddress}
                                onChange={handleAccountOwnerChange}
                                placeholder="Street Address"
                              /> */}

                              <input
                                name="streetAddress"
                                type="text"
                                className="form-control"
                                onChange={handleAccountOwnerChange2}
                                value={isSameAsAbove ? accountOwnerData.streetAddress : accountOwnerData2.streetAddress}
                                // readOnly={isSameAsAbove}
                                placeholder="Street Address"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>City</label>
                              <input
                                name="city"
                                type="text"
                                className="form-control"
                                value={isSameAsAbove ? accountOwnerData.city : accountOwnerData2.city}
                                readOnly={isSameAsAbove}
                                onChange={handleAccountOwnerChange2}
                                placeholder="City"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>State / Province</label>
                              <input
                                name="state"
                                type="text"
                                onChange={handleAccountOwnerChange2}
                                className="form-control"
                                value={isSameAsAbove ? accountOwnerData.state : accountOwnerData2.state}
                                readOnly={isSameAsAbove}
                                placeholder="State / Province"
                              />
                            </div>
                          </div>
                          {/* <div className="col-md-6">
                            <div className="form-group">
                              <label>Postal / Zip Code</label>
                              <input
                                name="postalCode"
                                type="text"
                                onChange={handleAccountOwnerChange2}
                                className="form-control"
                                value={isSameAsAbove ? accountOwnerData.postalCode : accountOwnerData2.postalCode}
                                readOnly={isSameAsAbove}
                                placeholder="Postal / Zip Code"
                              />
                            </div>
                          </div> */}
                          {/* <div className="col-md-6">
                            <div className="form-group">
                              <label>Postal / Zip Code</label>
                              <input
                                name="PostalCode"
                                type="text"
                                className={`form-control ${postalCodeError ? "is-invalid" : ""}`}
                                value={isSameAsAbove ? accountOwnerData.postalCode : accountOwnerData2.postalCode || ''}
                                onChange={handleAccountOwnerChange2}
                                onBlur={handlePostalCodeBlur}
                              />
                              {postalCodeError && (
                                <div className="invalid-feedback">
                                  {postalCodeError}
                                </div>
                              )}
                            </div>
                          </div> */}


                          {/* <div className="col-md-6">
                            <div className="form-group">
                              <label>Country</label>
                              <input
                                name="mailingCountry"
                                type="text"
                                onChange={handleAccountOwnerChange2}
                                className="form-control"
                                value={isSameAsAbove ? "CountryName" : ""}
                                readOnly={isSameAsAbove}
                                placeholder="Country"
                              />
                            </div>
                          </div> */}

                          {/* <div className="col-md-6">
                            <div className="form-group">
                              <label>Company Phone Number <span>*</span></label>
                              <input
                                name="phoneNumber"
                                type="text"
                                className={`form-control ${companyPhoneNumberError ? 'is-invalid' : ''}`}
                                value={isSameAsAbove ? accountOwnerData.phoneNumber : accountOwnerData2.phoneNumber}
                                readOnly={isSameAsAbove} // Disable input if "Same as Above" is true
                                onBlur={handleCompanyPhoneNumberBlur} // Validate on blur
                                onChange={handleAccountOwnerChange2}
                                placeholder="Company Phone Number"
                              />
                              {companyPhoneNumberError && <div className="invalid-feedback">{companyPhoneNumberError}</div>}
                            </div>
                          </div> */}



                          {/* <div style={{ }}className="col-md-6">
                          <div className="form-group">
                            <b>Gate Access </b>
                            <br />
                            Code can only be sent to a valid mobile number.
                            </div>
                          </div> */}
                        </div>
                      </form>

                      {/* <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label>
                            Email<span>*</span>
                          </label>
                          <input
                            name="email"
                            type="email"
                            className={`form-control ${emailError ? 'is-invalid' : ''}`}
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur} // Validate on blur
                            placeholder="Enter your email"
                          />
                          {emailError && <div className="invalid-feedback">{emailError}</div>}
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label>
                            Confirm Email<span>*</span>
                          </label>
                          <input
                            name="confirmEmail"
                            type="email"
                            className={`form-control ${confirmEmailError ? 'is-invalid' : ''}`}
                            value={confirmEmail}
                            onChange={handleConfirmEmailChange}
                            onBlur={handleConfrimEmailBlur} // Validate on blur
                            placeholder="Re-enter your email address"
                          />
                          {confirmEmailError && <div className="invalid-feedback">{confirmEmailError}</div>}
                          <label>Re-enter your Email Address</label>
                        </div>
                      </div> */}

                      <hr></hr>

                      <div>
                        <strong>
                          Please acknowledge that you are not carrying
                          contaminated, hazardous, petroleum-based, radioactive
                          or any type of waste products and that these types of
                          haulers are not allowed on our properties.
                        </strong>

                        <br></br>
                        <br></br>
                        <strong>
                          Please acknowledge that you have been made aware that
                          there is no repair work allowed to be done on our
                          properties. This includes: oil changes, tire
                          replacements, maintenance or repairs.
                        </strong>

                        <br></br>
                        <br></br>
                        <strong>
                          Please acknowledge that you understand and agree that
                          StoreMyTruck, LLC, its affiliates, subsidiaries or
                          related parties, are not responsible for any damage or
                          loss caused by a third party on our properties.
                        </strong>
                        <br></br>
                        <br></br>

                        <div className="col-md-10  col-sm-6  ">
                          <div className="form-group check-box">
                            <input
                              name="paymentauth"
                              type="checkbox"
                              value=""
                              onChange={handleCheckboxChange}
                            />
                            <br></br>
                            <label>
                              Yes, I Acknowledge <span style={{ color: 'red' }}> *</span>
                              <br></br>
                            </label>
                          </div>
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
                            <label>
                              Type of Vehicle<span>*</span>
                            </label>
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
                        </div> */}
                        {/* <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label>
                              Number Vehicles that you will be Parking
                              <span>*</span>
                            </label>
                            <Field
     
                              type="number"
                              name="numberOfVehicles"
                              onChange={(e) => {

                                setVehicleData((prevState) => ({
                                  ...prevState,
                                  Vehiclecount: e.target.value, // Or adjust this to fit your state structure
                                }));
                              }}
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
                        {/* {values.vehicleType && (
                          <FieldArray name="vehicles">
                            {({ push, remove }) => (
                              <>
                                {values.vehicles.map((vehicle, index) => (
                                  <div
                                    key={index}
                                    className="row vehicle-details"
                                  >
                                    <div className="col-md-8">
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>
                                              Year, Make, Model<span>*</span>
                                            </label>
                                              <Field
                                                name='Year, Make, Model' 
                                                onChange={(e) => {
                                                  
                                                 setVehicleData((prevState) => ({
                                                    ...prevState,
                                                    yearMakeModel: e.target.value, // Or adjust this to fit your state structure
                                                  }));
                                                }}
                                                className={`form-control ${
                                                  touched.vehicles?.[index]
                                                    ?.yearMakeModel &&
                                                  errors.vehicles?.[index]
                                                    ?.yearMakeModel
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                              />
                                            <ErrorMessage
                                              name={`vehicles[${index}].yearMakeModel`}
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>
                                              Color<span>*</span>
                                            </label>
                                            <Field
                                              // name={`vehicles[${index}].color`}
                                              name='Color' 
                                              onChange={(e) => {
                                                  
                                                setVehicleData((prevState) => ({
                                                   ...prevState,
                                                   color: e.target.value, // Or adjust this to fit your state structure
                                                 }));
                                               }}
                                              className={`form-control ${
                                                touched.vehicles?.[index]
                                                  ?.color &&
                                                errors.vehicles?.[index]?.color
                                                  ? "is-invalid"
                                                  : ""
                                              }`}
                                            />
                                            <ErrorMessage
                                              name={`vehicles[${index}].color`}
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>
                                              USDOT#<span>*</span>
                                            </label>
                                            <Field
                                              name='USDOT' 
                                              onChange={(e) => {
                                                  
                                                setVehicleData((prevState) => ({
                                                   ...prevState,
                                                   usdot: e.target.value, // Or adjust this to fit your state structure
                                                 }));
                                               }}
                                              className={`form-control ${
                                                touched.vehicles?.[index]
                                                  ?.usdot &&
                                                errors.vehicles?.[index]?.usdot
                                                  ? "is-invalid"
                                                  : ""
                                              }`}
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
                                            <label>
                                              Company Name on Tractor
                                              <span>*</span>
                                            </label>
                                            <Field
                                               name='Company Name on Tractor' 
                                              onChange={(e) => {
                                                  
                                                setVehicleData((prevState) => ({
                                                   ...prevState,
                                                   companyNameOnTractor: e.target.value, // Or adjust this to fit your state structure
                                                 }));
                                               }}

                                              className={`form-control ${
                                                touched.vehicles?.[index]
                                                  ?.companyNameOnTractor &&
                                                errors.vehicles?.[index]
                                                  ?.companyNameOnTractor
                                                  ? "is-invalid"
                                                  : ""
                                              }`}
                                            />
                                            <ErrorMessage
                                              name={`vehicles[${index}].companyNameOnTractor`}
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      {index > 0 && (
                                        <button
                                          type="button"
                                          className="button-2"
                                          onClick={() => remove(index)}
                                        >
                                          Delete
                                        </button>
                                      )}
                                      <button
                                        type="button"
                                        className="button-1"
                                        onClick={() =>
                                          push({
                                            yearMakeModel: "",
                                            color: "",
                                            usdot: "",
                                            companyNameOnTractor: "",
                                          })
                                        }
                                      >
                                        Add Another+
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </>
                            )}
                          </FieldArray>
                        )} */}
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
                                                name="vehicles[0].model"
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
                                                name={`vehicles?.[index]?.usdot`}

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
                                                name={`vehicles?.[index]?.companyNameOnTractor`}
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
                                                    value={vehicleData.color || ''}
                                                    className={`form-control ${touched.vehicles?.[0]?.color && errors.vehicles?.[0]?.color ? "is-invalid" : ""}`}
                                                  // readOnly
                                                  />
                                                  <ErrorMessage name="vehicles[0].color" component="div" className="invalid-feedback" />
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
                                                    name="vehicles.trailerlength" // Assuming this is part of the Formik state
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
                                                  <div className="col-md-6">
                                                    <div className="form-group">
                                                      <label>Other Info<span style={{ color: 'red' }}>*</span></label>

                                                      {/* Field component wrapped as a textarea */}
                                                      <Field
                                                        onChange={(e => setotherinfo(e.target.value))}
                                                        as="textarea" // specify the field as a textarea
                                                        name={`vehicles?.otherinfo`} // Assuming this is for vehicles[index].usdot in Formik state
                                                        className={`form-control ${touched.vehicles?.[0]?.otherinfo && errors.vehicles?.[0]?.otherinfo ? "is-invalid" : ""}`}
                                                      />

                                                      {/* Error message for the textarea */}
                                                      <ErrorMessage name="vehicles[0].otherinfo" component="div" className="invalid-feedback" />
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
                                                    name="vehicles.trailertype" // Assuming this is part of the Formik state
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
                                                  <ErrorMessage name="vehicles[0].color" component="div" className="invalid-feedback" />
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
                                              <ErrorMessage name="vehicles[0].make" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                          <div className="col-md-4">

                                            <div className="form-group">
                                              <label>Model<span style={{ color: 'red' }}>*</span></label>
                                              <Field onChange={(e => setmodel(e.target.value))}
                                                name="vehicles[0].model"
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
                                                name={`vehicles?.[index]?.usdot`}

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

                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label>Company Name on Tractor<span style={{ color: 'red' }}>*</span></label>
                                              <Field
                                                name={`vehicles?.[index]?.companyNameOnTractor`}
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
                                              <ErrorMessage name="vehicles[0].make" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Model<span style={{ color: 'red' }}>*</span></label>
                                              <Field onChange={(e => setmodel(e.target.value))}
                                                name="vehicles[0].model"
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
                                                name={`vehicles?.[index]?.usdot`}

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
                                                name={`vehicles?.[index]?.companyNameOnTractor`}
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
                                              <label>Color<span style={{ color: 'red' }}>*</span></label>
                                              <Field onChange={(e => setcolor(e.target.value))}
                                                // name=""
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
                                                name="vehicles[0].trailerlength" // Assuming this is part of the Formik state
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
                                                name="vehicles[0].trailertype" // Assuming this is part of the Formik state
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
                                                name={`vehicles?.otherinfo`} // Assuming this is for vehicles[index].usdot in Formik state
                                                className={`form-control ${touched.vehicles?.[0]?.otherinfo && errors.vehicles?.[0]?.otherinfo ? "is-invalid" : ""}`}
                                              />

                                              {/* Error message for the textarea */}
                                              <ErrorMessage name="vehicles[0].otherinfo" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                        </>
                                      )}
                                      {selectvehicle === 'Box Truck' && (
                                        <>

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
                                              <ErrorMessage name="vehicles[0].make" component="div" className="invalid-feedback" />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label>Model<span style={{ color: 'red' }}>*</span></label>
                                              <Field onChange={(e => setmodel(e.target.value))}
                                                name="vehicles[0].model"
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
                                                name={`vehicles?.otherinfo`} // Assuming this is for vehicles[index].usdot in Formik state
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
                            <p class="custom-paragraph">
                              You will receive an email with your paid invoice
                              once you complete this agreement. Your account's
                              "Parking ID" will be on the invoice. Please write
                              the Parking ID number on a sheet of paper and hang
                              it on the driver's side window.
                            </p>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>
                            Will you be parking your personal vehicle while being on the road?
                          </label>
                          <div>
                            <label>
                              <Field
                                type="radio"
                                name="personalvehical"
                                value="yes"
                                className="mr-1"
                              />
                              {"  "}
                              Yes
                            </label>
                          </div>
                          <div>
                            <label>
                              <Field
                                type="radio"
                                name="personalvehical"
                                value="no"
                                className="mr-1"
                              />
                              {"  "}
                              No
                            </label>
                          </div>

                          {/* Conditional Rendering for Vehicle Details */}
                          {values.personalvehical === 'yes' && (
                            <>
                           
                              <FieldArray name="vehicles">
                                {({ push, remove, form }) => (
                                  <>
                                    {values.vehicles.map((vehicle, index) => (
                                      <div key={index} className="row vehicle-details">
                                        
                                        <div className="col-md-4">
                                          <div className="form-group">
                                            <label>
                                              Year<span>*</span>
                                            </label>
                                            <Field
                                              name={`vehicles[${index}].year`}
                                              className={`form-control ${touched.vehicles?.[index]?.year &&
                                                errors.vehicles?.[index]?.year
                                                ? 'is-invalid'
                                                : ''
                                                }`}
                                            />
                                            <ErrorMessage
                                              name={`vehicles[${index}].year`}
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </div>
                                        </div>

                                        <div className="col-md-4">
                                          <div className="form-group">
                                            <label>
                                              Make<span>*</span>
                                            </label>
                                            <Field
                                              name={`vehicles[${index}].make`}
                                              className={`form-control ${touched.vehicles?.[index]?.make &&
                                                errors.vehicles?.[index]?.make
                                                ? 'is-invalid'
                                                : ''
                                                }`}
                                            />
                                            <ErrorMessage
                                              name={`vehicles[${index}].make`}
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </div>
                                        </div>

                                        <div className="col-md-4">
                                          <div className="form-group">
                                            <label>
                                              Model<span>*</span>
                                            </label>
                                            <Field
                                              name={`vehicles[${index}].model`}
                                              className={`form-control ${touched.vehicles?.[index]?.model &&
                                                errors.vehicles?.[index]?.model
                                                ? 'is-invalid'
                                                : ''
                                                }`}
                                            />
                                            <ErrorMessage
                                              name={`vehicles[${index}].model`}
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </div>
                                        </div>

                                        {/* Conditional Fields Based on Vehicle Type */}
                                        {/* {selectvehicle === 'Tractor Only' && (
                                              <> */}
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>
                                              USDOT#<span>*</span>
                                            </label>
                                            <Field
                                              name={`vehicles[${index}].usdot`}
                                              className={`form-control ${touched.vehicles?.[index]?.usdot &&
                                                errors.vehicles?.[index]?.usdot
                                                ? 'is-invalid'
                                                : ''
                                                }`}
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
                                            <label>
                                              Company Name on Tractor<span>*</span>
                                            </label>
                                            <Field
                                              name={`vehicles[${index}].companyNameOnTractor`}
                                              className={`form-control ${touched.vehicles?.[index]
                                                ?.companyNameOnTractor &&
                                                errors.vehicles?.[index]
                                                  ?.companyNameOnTractor
                                                ? 'is-invalid'
                                                : ''
                                                }`}
                                            />
                                            <ErrorMessage
                                              name={`vehicles[${index}].companyNameOnTractor`}
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </div>
                                        </div>
                                        {/* </> */}


                                        {/* {selectvehicle === 'Car' && (
                                              <> */}
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>
                                              Color<span>*</span>
                                            </label>
                                            <Field onChange={(e => setcolor(e.target.value))}
                                              // name=""
                                              // value={color}
                                              value={vehicleData.color || ''}
                                              className={`form-control ${touched.vehicles?.[0]?.color && errors.vehicles?.[0]?.color ? "is-invalid" : ""}`}
                                              required
                                            // readOnly
                                            />
                                            <ErrorMessage
                                              name={`vehicles[${index}].color`}
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>
                                              TAG No<span>*</span>
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
                                        {/* </>
                                            )} */}
                                        {/* </>
                                        )} */}

                                        <div className="col-md-8">
                                          {index > 0 && (
                                            <button
                                              type="button"
                                              className="button-2"
                                              onClick={() => remove(index)}
                                            >
                                              Delete
                                            </button>
                                          )}
                                          <button
                                            type="button"
                                            className="button-1"
                                            onClick={() =>
                                              push({
                                                year: '',
                                                make: '',
                                                model: '',
                                                usdot: '',
                                                companyNameOnTractor: '',
                                                numberOfVehicles: '',
                                                vehicleType: '',
                                              })
                                            }
                                          >
                                            Add Another
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </>
                                )}
                              </FieldArray>
                            </>
                          )}
                        </div>

                        <div className="row mt-1">
                          <div className="col-md-12 mb-3">
                            <p className="custom-paragraph">
                              Please note: You may park 1 personal vehicle per 1 commercial vehicle
                              parking rented. You can't park your commercial vehicle and personal
                              vehicle at the same time.
                            </p>
                          </div>
                        </div>


                        <div class="row mt-1">
                          <div class="col-md-12 mb-3">
                            <p>
                              In order for us to create your parking account, we
                              must receive photos of your vehicle, insurance
                              card and driver's license. If you do not have them
                              ready at this time, please complete this form and
                              email your photos to smtagreements@gmail.com.
                              Please put your name (i.e. the Account Name) in
                              the subject line.
                            </p>
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
                                        label="Photo of Vehicle Upload *"
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
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label>
                            Preferred Payment Method <span style={{ color: 'red' }}>*</span>
                          </label>
                          <Field
                            as="select"
                            name="payment"
                            className={`form-control ${paymentError ? "is-invalid" : ""}`}
                            onChange={handlePaymentChange} // Use the combined handler
                            value={paymentMethod}
                          >
                            <option value="">Please Select</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="ACH">ACH *</option>
                            <option value="Other">Other</option>
                          </Field>
                          {paymentError && (
                            <div className="invalid-feedback">
                              {paymentError}
                            </div>
                          )}
                          <ErrorMessage
                            name="payment"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label>
                           Do you have a Special Promotion Code<span style={{ color: 'red' }}>*</span>
                          </label>
                          <Field
                            as="select"
                            name="promotionCode"
                            className={`form-control ${promotionCodeError ? "is-invalid" : ""}`}
                            onChange={handlePromotionCode} // Use the combined handler
                            value={promotionCode}
                          >
                            <option value="">Please Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option> 
                          </Field>
                          {promotionCodeError && (
                            <div className="invalid-feedback">
                              {promotionCodeError}
                            </div>
                          )}
                          <ErrorMessage
                            name="specialPromationCode"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      {(promotionCode === 'yes') && (
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label>
                            Special Promotion Code
                          </label>
                          <input
                              name="specialPromotionCode"
                              type="text"
                              class="form-control"
                          />
                        </div>
                      </div>
                      )}

                      {(paymentMethod === "ACH" || paymentMethod === "Other") && (
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label>
                              Please let us know how you intend to make payment. <span style={{ color: 'red' }}>*</span>
                            </label>
                            <textarea
                              name="paymentDetails"
                              className={`form-control ${detailsError ? "is-invalid" : ""}`}
                              style={{ width: "100%", height: "100px" }}
                              value={paymentDetails}
                              onChange={(e) => {
                                setPaymentDetails(e.target.value);
                                setDetailsError(''); // Clear error on change
                              }}
                              onBlur={() => {
                                if (paymentDetails.trim() === '') {
                                  setDetailsError('Payment details are required.');
                                }
                              }}
                            />
                            {detailsError && (
                              <div className="invalid-feedback">
                                {detailsError}
                              </div>
                            )}
                          </div>
                        </div>
                      )}


                      <div class="col-md-6 col-sm-6"></div>
                      <div class="row">

                        <div class="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label>
                              Vehicle Type 1 Monthly Parking <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input onChange={handleMonthlyParkingChange}
                              type="number"
                              placeholder="0"
                              value={amountdetail?.deposite}
                              className={`form-control ${monthlyParkingError ? "is-invalid" : ""}`} // Apply invalid class if there's an error
                            />
                            {monthlyParkingError && (
                              <div className="invalid-feedback">
                                {monthlyParkingError}
                              </div>
                            )}
                          </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label>
                              Vehicle Type 1 Last Monthly Payment <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input onChange={(e) => setlastmonthlyParking(e.target.value)}
                              type="number"
                              placeholder="0"
                              value={amountdetail?.lastDeposite}
                              class="form-control"
                            // value="185"
                            />
                          </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label>
                              Discount <span></span>
                            </label>
                            <input
                              type="number"

                              value={amountdetail?.discount}
                              class="form-control"
                            // value=""
                            />
                          </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label>
                              Subtotal <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input onChange={(e) => setSubtotal(e.target.value)}
                              value={amountdetail?.convenienceFee}
                              type="number"
                              // placeholder="185"
                              class="form-control"

                            />
                          </div>
                        </div>

                        {(values.payment === "Credit Card") && (
                          <div class="col-md-6 col-sm-6">
                            <div class="form-group">
                              <label>
                                Transaction Fee (3%) <span style={{ color: 'red' }}>*</span>
                              </label>
                              <input

                                type="number"
                                placeholder=" "
                                class="form-control"

                              />
                            </div>
                          </div>
                        )}
                        <div class="col-md-12 col-sm-6">
                          <div class="form-group">
                            <label>
                              Total Amount Due<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input onChange={(e) => setTotalAmountDue(e.target.value)}
                              type="number"
                              placeholder=""
                              class="form-control"
                              value={amountdetail?.totalAmount}
                            // value=""
                            />
                          </div>
                          {/* <span>Monthly Parking Fee</span> */}
                        </div>
                        <div class="col-md-12 col-sm-6">
                          <div class="form-group">



                            <span style={{ border: '1px solid red', padding: '20px' }}>In order to CONTINUE you must acknowledge and agree to all our Terms & Conditions above.</span>
                            <br />
                            <br />
                          </div>
                        </div>
                        <div class="col-md-12 col-sm-6">
                          <div class="form-group" style={{ border: '1px solid red', padding: '20px' }}>
                            <span> <b style={{ color: 'red' }}>  IMPORTANT! BE AWARE THAT YOU CAN ONLY PARK AT THE LOCATION YOU SELECTED.</b> <span style={{ color: 'black' }}>IF YOU NEED TO CHANGE THE LOCATION YOU MUST SUBMIT AN ONLINE</span>  <a href="/SMT_UAT/CMS/storemytruck/AccountChangeForm">
                              ACCOUNT CHANGE FORM
                            </a>{" "}. <span style={{ color: 'black' }}>EMAILS WILL NOT BE ACCEPTED TO MAKE CHANGES TO YOUR ACCOUNT.</span>
                              <br /><br />
                              <b> YOUR VEHICLE MAY BE BOOTED OR TOWED IF IT IS PARKED AT ANY OTHER LOCATION WITHOUT A PRE-APPROVED ACCOUNT CHANGE FORM.</b>

                              <div style={{ color: 'black' }}>
                                <b>
                                  Rates:
                                  <br />
                                  Boot Fee: $350.00
                                  <br />
                                  King Pin Fee: $350.00
                                  <br />
                                  Towing Fee: Varies (Depending on vehicle and distance)
                                </b>
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                      <br />
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
                              SECURITY: You understand that when we refer to security on our sites it means that our sites have fencing, lights and gates. Our sites vary in their levels of security. By submitting this license agreement you have agreed to the the available security level at the site you selected to park at. StoreMyTruck.com LLC ("Licensor") is not responsible for any theft, damage or loss of Licensee’s vehicle or items contained within such vehicle while parked at our site or for the safety and protection of any persons within the site. Licensor makes no warranty of protection for Licensee’s vehicle or property. Licensees accept that they park at their own risk. Parking Licensee, Driver and Vehicle owner, or its agent and affiliates shall agree to defend, indemnify, and hold harmless the Property Owner, Licensor, and its employees, agents and affiliates from liability and claim for damages resulting from any and against any and all rights, titles, claims or causes of actions resulting in loss, vandalism, theft, bodily injury, death, property damage, sickness, disease or any expense arising from any cause under this agreement to be able to park, access, or be on site at any of the licensor's locations. StoreMyTruck supplies locations to park only, and does not guarantee secure sites, gate access, or security. Licensee assumes all responsibility for every possible loss or damage, and holds Licensor harmless against all losses <span style={{ color: 'red' }}>*</span>
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
                              Vehicle Relocation within Parking lot : By agreeing to store your vehicle with StoreMyTruck, you acknowledge and consent to the following clause: StoreMyTruck reserves the right to relocate your vehicle at any time, for any reasonable reason, including but not limited to vehicle safety concerns, lot reorganization, and safety reasons. You, as the owner and/or driver of the vehicle, hereby acknowledge and relinquish any right or claims regarding the relocation of your vehicle, and hereby grant consent to StoreMyTruck to move your vehicle as deemed necessary. <span style={{ color: 'red' }}>*</span>
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
                              I hereby acknowledge that the information that I provided in this agreement is complete and accurate. Furthermore, I understand and agree that it is your responsibility to inform StoreMyTruck.com of any changes to your account prior to the changes taking effect, by completing and submitting an online "Account Change Form". I understand and agree that if I add any vehicle(s) without providing StoreMyTruck prior notice it will be considered illegally parked and such vehicle(s) may be towed and impounded without prior notice. Which may result in significant monetary cost to me. <span style={{ color: 'red' }}>*</span>
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
                      <hr></hr>
                      <div className="col-md-12 col-sm-6 mb-3">
                        <div className="form-group check-box">
                          <input
                            name="acknowledge1"
                            type="checkbox"
                            checked={isAcknowledged1}
                            onChange={(e) => handleCheckboxChange(e, 1)}
                          />
                          <label>
                            I acknowledge and understand that I must cancel my parking agreement 30 days in advance, prior to my next billing cycle.
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                        </div>
                      </div>

                      <div className="col-md-12 col-sm-6 mb-3">
                        <div className="form-group check-box">
                          <input
                            name="acknowledge2"
                            type="checkbox"
                            checked={isAcknowledged2}
                            onChange={(e) => handleCheckboxChange(e, 2)}
                          />
                          <label>
                            I acknowledge and understand that I will be set up on monthly recurring payments on my billing cycle day.
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                        </div>
                      </div> 
                      {checkboxError && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                          {checkboxError}
                        </div>
                      )}
 
                      <div class="form-group check-box">
                        <input
                          name="acknowledge"
                          type="checkbox"
                          checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <label>
                          I have read and agree to the terms & conditions.
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                      </div>



                      {
                        isChecked === true && (
                          <>
                            <br />
                            <div class="col-md-12 col-sm-6">
                              <div class="form-group">
                                <label>
                                  Total Amount Due<span>*</span>
                                </label>
                                <input onChange={(e) => setTotalAmountDue(e.target.value)}
                                  type="number"
                                  placeholder=""
                                  class="form-control"
                                  value={amountdetail?.totalAmount}
                                // value=""
                                />
                              </div>
                              {/* <span>Monthly Parking Fee</span> */}
                            </div>
                            <div className="billing">
                              <h3>Credit Card Information:</h3>
                              <div class="row mt-2">
                                <div className="col-md-6 col-sm-6">
                                  <div className="form-group">
                                    <label>Account Owner's Name<span>*</span></label>
                                    <input
                                      name="firstName"
                                      type="text"
                                      placeholder="First Name"
                                      className={`form-control ${firstNameError ? "is-invalid" : ""}`}
                                      // value={firstName}
                                      onChange={handleFirstnameChange}
                                      onBlur={handleBlur}
                                    />
                                    {firstNameError && (
                                      <div className="invalid-feedback">
                                        {firstNameError}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                  <div class="form-group">
                                    <label>Account Owner's Name<span>*</span></label>
                                    <input
                                      name="lastName"
                                      type="text"
                                      placeholder="Last Name"
                                      className={`form-control ${firstNameError ? "is-invalid" : ""}`}
                                      // value={firstName}
                                      onChange={handlelastnameChange}
                                      onBlur={handlenameBlur}
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
                                    <label>Credit Card Number<span>*</span></label>
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
                                  <div class="form-group" onChange={(e => setexpirationMonth(e.target.value))}>
                                    <label>Expiration Month</label>
                                    <select name="vehicleType" class="form-control"  >
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
                                  <div class="form-group" onChange={(e => setexpirationYear(e.target.value))}  >
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
                              <br />
                              <div className="row">
                                <label>COMPANY ADDRESS:</label>
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label>Street Address<span style={{ color: 'red' }}>*</span></label>
                                    <input
                                      name="streetAddress"
                                      type="text"
                                      className={`form-control ${streetAddressError ? "is-invalid" : ""}`}
                                      value={accountOwnerData.streetAddress}
                                      onChange={handleAccountOwnerChange}
                                      placeholder="Street Address"
                                    />
                                    {streetAddressError && (
                                      <div className="invalid-feedback">
                                        {streetAddressError}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>City</label>
                                    <input
                                      name="city"
                                      type="text"
                                      className={`form-control ${cityError ? "is-invalid" : ""}`}
                                      value={accountOwnerData.city}
                                      onChange={handleAccountOwnerChange}
                                      placeholder="City"
                                    />
                                    {cityError && (
                                      <div className="invalid-feedback">
                                        {cityError}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>State / Province</label>
                                    <input
                                      name="state"
                                      type="text"
                                      className={`form-control ${stateError ? "is-invalid" : ""}`}
                                      value={accountOwnerData.state}
                                      onChange={handleAccountOwnerChange}
                                      placeholder="State / Province"
                                    />
                                    {stateError && (
                                      <div className="invalid-feedback">
                                        {stateError}
                                      </div>
                                    )}
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
                                      onChange={(e) => {
                                        setPostalCode(e.target.value);
                                        // Optional: Add postal code validation here as well
                                      }}
                                      onBlur={handlePostalCodeBlur}
                                    />
                                    {postalCodeError && (
                                      <div className="invalid-feedback">
                                        {postalCodeError}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                            </div>
                            <hr></hr>




                            <div className="col-md-12">

                              <label>Signature <span style={{ color: 'red' }}>*</span></label>
                              <div className="form-group">
                                <SignatureCanvas
                                  penColor="black"
                                  canvasProps={{ width: 200, height: 100, className: 'sigCanvas' }}
                                  ref={sigPad}
                                  onEnd={handleSignatureChange}
                                />
                                <button className='button' type="button" onClick={handleClearSignature} style={{}}>Clear</button>
                                {signatureDataUrl && (
                                  <div>
                                    <img src={signatureDataUrl} alt="Signature" />
                                  </div>
                                )}
                              </div>
                              <div class="col-md-6 col-sm-6 mb-3">

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
                              <br></br>
                              <label>
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
                              </label>
                              <br></br>
                              <br></br> 
                            </div> 
                            <a class="button" href="" onClick={submitForm}>
                              Submit
                            </a>

                          </>
                        )
                      }


                      {isChecked === false && (
                        <>

                          <div className="col-md-12">

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
                          </div>
                        </>
                      )}
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

export default MonthlyParking;
