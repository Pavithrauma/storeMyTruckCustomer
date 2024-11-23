 
import * as Yup from "yup";
import React, { useState, useEffect, useRef } from "react";
import Header from "../header/Header.js";
import Footer from "../footer/Footer.js";
import "./Pages.css";
import Imagesrc from "../images/logo.png";
import Swal from "sweetalert2";
import { useAxios } from "../../../src/components/http/useAxios.js"; 
import "./ReserveParking/Parking.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Field, Form, ErrorMessage, FieldArray, useFormikContext } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import validationSchema from "./ReserveParking/validationSchema.js";
import VehicleDetails from "./VehicleDetails";
const Cancel = () => {
  const sigPad = useRef(null);
  const { type } = useParams();
  const [numberOfParking, setNumberOfParking] = useState(0);
  const [signatureDataUrl, setSignatureDataUrl] = useState("");
  const [startDate, setStartDate] = useState(new Date()); 
  const [lastParkingDate, setlastParkingDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalDays, setTotalDays] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [signature, setSignature] = useState("");
  const [firstname, setAccountName] = useState("");
  const [vehicleType1, setvehicleType1] = useState("");
  const [lastname, setaccountOwnerlastName] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [streetaddress, setStreetAddress] = useState("");
  const [streetaddress2, setStreetAddress2] = useState("");
  const [date, setDate] = useState("");
  const [state, setstate] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setcity] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [locations, setLocations] = useState([]);
  const [locationId, setlocationId] = useState("");
  const [parkinglists, setparkinglists] = useState([]);
  const [parkinglistId, setparkinglistId] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [Numberofparking, setNumberofparking] = useState("");
  const [spacesaddingsubtracting, setspacesaddingsubtracting] = useState("");
  const [privateId , setPrivateId] = useState("");
  const [spacesremainingafterchange, setspacesremainingafterchange] =
    useState("");
 
  const [
    Numberofparkingspacesremainingafterchange,
    setNumberofparkingspacesremainingafterchange,
  ] = useState("");
  const [comments, setComments] = useState([]);
  const [parkingatthelocation, setparkingatthelocation] = useState("");
  const [paymentAuthChecked, setPaymentAuthChecked] = useState(false);
  const isoDate = date ? date.toISOString() : "";
  const [selectvehicle, setselectvehicle] = useState("");
  const [vehicleTypeId, setvehicleTypeId] = useState("");
  const [licenseData, setLicenseData] = useState(null);
 
  const [vehicleType, setvehicleType] = useState("");
  const [trailerTracterId , setTrailerTracterId] = useState("");
  const [personalvehicleType, setpersonalvehicleType] = useState("");
  const [parkingInformationId, setparkingTypeId] = useState("");
  const [radioclick, setradioclick] = useState("");
  const [parkingDate, setparkingDate] = useState("");
  const [make, setMake] = useState("");
  const [year, setYear] = useState("");
  const [tag, settag] = useState("");
  const [usdot, setusdot] = useState("");
  const [TagorVin, setTagorVin] = useState("");
  const [otherIdentifyinginfo, setotherIdentifyinginfo] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const [vechicleCount, setvechicleCount] = useState("");
  const [model, setModel] = useState("");
  const [vehicleTypeAdding, setvehicleTypeAdding] = useState("");
  const [parkinglistTypeAdding, setparkinglistTypeAdding] = useState("");
  const [yearmakemodel, setyearmakemodel] = useState("");
  const [color, setColor] = useState("");
  const [tagOrVin, setTagOrVin] = useState("");
  const [showAddingMessage, setShowAddingMessage] = useState(false);
  const [vehicleTypeSelected, setVehicleTypeSelected] = useState("");
  const [spacesAddingSubtracting, setSpacesAddingSubtracting] = useState(0);
  const [spacesRemainingAfterChange, setSpacesRemainingAfterChange] =
    useState(0);
  const [paymentauth, setpaymentauth] = useState("");
  const [otherinfo, setotherinfo] = useState("");
  const [companyNameOnTractor, setcompanyNameOnTractor] = useState("");
  const [trailerlength, settrailerlength] = useState("");
  const [trailertype, settrailertype] = useState("");
  const [vehiclesyouareparking, setvehiclesyouareparking] = useState("");
  const [vehicles, setVehicles] = useState([
    // {
    //   license: '', year: '', make: '', model: '', color: '', usdot: '', tag: '', otherIdentifyingInfo: '', vehicleTypeId:''},
  ]);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [accountChangeOptions, setAccountChangeOptions] = useState([]);
  const [decreaseVehicleTypeIds, setDecreaseVehicleTypeIds] = useState([]);
  const [changeOption, setChangeOption] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    company_name: "",
    phone_number: "",
    email: "",
  });
  const [vehicle, setVehicle] = useState({
    vehicleTypeId,
    year,
    make,
    model,
    color,
    usdot,
  });
  const [personalVehicle,setPersonalVehicle] =useState([])
  const [vehicleInformation, setVehicleInformation] = useState([]);
  
  const [isDisabled, setIsDisabled] = useState(true);
  const [vehicleTypeCode, setVehicleTypeCode] = useState();
 
  const navigate = useNavigate();
  const currentLength = 0;
  const [parkedVehicleTypeList,setParkedVehicleTypeList] = useState('');
  const targetLength = spacesAddingSubtracting;
  useEffect(() => {
    const name = localStorage.getItem("name");
    const company_name = localStorage.getItem("company_name");
    const phone_number = localStorage.getItem("phone_number");
    const email = localStorage.getItem("email");
    const userid = localStorage.getItem("storemytruck_customer_id");
    console.log("userid" + userid);
    if (userid === "" || userid === undefined) {
      navigate("/log-in");
    }
    setUserDetails({
      name,
      company_name,
      phone_number,
      email,
    });
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setBookingDate(today.toLocaleDateString());
    setlastParkingDate(nextMonth.toLocaleDateString());
    setparkingDate(today); // Sets today's date for parkingDate initially
    // NearestLocationList();
    ParkingList();
    optionChecking();
    NearestLocationList();
    //setIsModalOpen(true);
  }, [parkinglistId]);

  const NearestLocationList = async () => {
    try {
      const userid = localStorage.getItem("storemytruck_customer_id");

      const nearest =process.env.REACT_APP_BASE_NEARSET_LOCATION;
      console.log("nearest" + nearest);
      const res = await axios.get(nearest
      // {
      //     params: {
      //       userId: userid,
      //     },
      //   }
      );

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

  const ParkingList = async () => {
    try {
      const userid = localStorage.getItem("storemytruck_customer_id");
      const userParkingData =
        process.env.REACT_APP_BASE_USER_PARKING_DETAILS + "/" + userid;
      const res = await axios.get(`${userParkingData}`);
      if (res?.data?.success) {
        setparkinglists(res.data.data);
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
        title: err.response?.data?.message || "An error occurred",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
      console.log("error", err);
    }
  };

  const Vehicletype = async () => {    
    try {
      const userParkingData =
        process.env.REACT_APP_BASE_VEHICLE_TYPE;
      const res = await axios.get(`${userParkingData}`);
      if (res?.data?.success) {
        setvehicleType(res.data.data.list);
        const vehicleTypeData = res.data.data.list;
       const personalVehicle = vehicleTypeData.find((v) => v.vehicleType === "Private")?._id;
        const trailerTracterId = vehicleTypeData.find((v) => v.vehicleTypeCode === "VT1")?._id;
        setTrailerTracterId(trailerTracterId);
        setvehicleTypeId(personalVehicle);

      //  let newVehicles = {};
         
        
        // if (changeOption === "6") {
        //   setpersonalvehicleType(res.data.data.list);
        //   newVehicles = Array.from({ length: 1 }, () => ({
        //     vehicleTypeId: personalVehicle,
        //     vehicleTypeCode: changeOption === "6" ? 'VT1' : "", // Set vehicleTypeCode based on changeOption      
        //     tagOrVin ,
        //     year,
        //     make,
        //     model,
        //     color
        //   }));
        //   setPersonalVehicles([...personalVehicles, ...newVehicles]);
        //   console.log("changeOption" + changeOption);
        //   console.log("PersonalVehicle" + JSON.stringify(newVehicles));
        // }
        
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

  const ParkedVehicleType = async (parkingInformationId,url) => {
    try {    
      
      const parkedVehicleurl = url + "/" + parkingInformationId
      const res = await axios.get(parkedVehicleurl);
     
      if (res?.data?.success) {
        console.log("res.data.data" + JSON.stringify(res.data.data))
        setParkedVehicleTypeList(res.data.data);
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
  const styles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modalContent: {
      width: '50%',  // Reduced width to make it more compact
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    image: {
      height: '50px',  // Slightly smaller image
      marginBottom: '15px',
    },
    header: {
      marginBottom: '10px',
      fontSize: '1em',  // Reduced font size for headers
      color: '#333',
    },
    ul: {
      textAlign: 'left',
      margin: '10px 0',
      padding: '0 15px',
      fontSize: '0.75em',  // Reduced font size for list items
    },
    li: {
      marginBottom: '8px',
    },
    closeButton: {
      marginTop: '15px',
      padding: '8px 16px',
      fontSize: '0.9em',  // Reduced font size for button text
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const optionChecking = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = process.env.REACT_APP_BASE_ACCOUNT_CHANGE_OPTIONS;
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.data?.success) {
        console.log("setAccountChangeOptions" + JSON.stringify(res.data.data));
        setAccountChangeOptions(res.data.data);
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

  const ParkingInformationDetails = async (parkingInformationId) => {
    try {
      const parkingInformation =
      process.env.REACT_APP_BASE_PARKING_DETAILS + "/" + parkingInformationId;
      const res = await axios.get(`${parkingInformation}`);
      if (res?.data?.success) {
        setNumberOfParking(res.data.data[0].vehicleInformationCount);
        const selectedLocation = locations.find(location => location._id === res.data.data[0].locationId);
        if (selectedLocation) {
          setlocationId(selectedLocation._id); // Set the location ID (update locationId state)
        }
        Vehicletype();        
        setStartDate(res.data.data[0].startDate); 
        console.log("day" + res.data.data[0].startDate )
        const data = res.data.data[0].vehicleInformation;
        console.log("Location Details" + res.data.data[0].locationId)
        setVehicleInformation(data)
      
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
        title: err.response?.data?.message || "An error occurred",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
      console.log("error", err);
    }
  };
  
  const handleDateChange = (date) => {
    setparkingDate(date); // This will allow you to select a new date
  };
   
  const calculateTotalSpaces = (numberOfParking, changeValue, changeOption) => {
    let totalSpaces = 0;
    const numParking = parseInt(numberOfParking, 10) || 0;
    const change = parseInt(changeValue, 10) || 0;
    if (changeOption === "1") {
      // Adding spaces
      totalSpaces = numParking + change;
    } else if (changeOption === "2") {
      // Subtracting spaces
      totalSpaces = numParking - change;
    }
    setSpacesRemainingAfterChange(totalSpaces);
    //setVehicles([]);
    let newVehicles = {};   
    newVehicles = Array.from({ length: changeValue }, () => ({
      vehicleTypeId       
    }));
    setVehicles([...vehicles, ...newVehicles]);       
    setVehicleCount(numberOfParking + changeValue); // Update the count
   
     
  };

  const fetchVehicleData = async (license, index, vehicleTypeId, setFieldValue, vehicleTypeCode) => {
    try {
      setLicenseData(license);
      let url = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVIN/" + license;
      console.log("url" + url);
      const response = await axios.get(url, {
        params: {
          format: "json",
        },
      });
      const vehicledata = [];
      let vehicledataResponse = response.data.Results;
      vehicledataResponse.forEach((vehicleDetail) => {
        // console.log("vehicleerterterterterterterterDetail" + JSON.stringify(vehicleDetail));
        if (vehicleDetail.Variable === "Make")
          vehicledata["make"] = vehicleDetail.Value;
        if (vehicleDetail.Variable === "Model")
          vehicledata["model"] = vehicleDetail.Value;
        if (vehicleDetail.Variable === "Trim")
          vehicledata["trim"] = vehicleDetail.Value;
        if (vehicleDetail.Variable === "Model Year")
          vehicledata["year"] = vehicleDetail.Value;
        if (vehicleDetail.Variable === "Plant Company Name")
          vehicledata["companyName"] = vehicleDetail.Value;
        if (vehicleDetail.Variable === "Trailer Length (feet)")
          vehicledata["overallLength"] = vehicleDetail.Value;
        if (vehicleDetail.Variable === "Tag")
          vehicledata["tag"] = vehicleDetail.Value;
        if (vehicleDetail.Variable === "Trailer Length")
          vehicledata["trailerLength"] = vehicleDetail.Value;
        if (vehicleDetail.Variable === "Trailer Body Type")
          vehicledata["trailerType"] = vehicleDetail.Value;
        // if (vehicleDetail.Variable === "Color")
        //   vehicledata["color"] = vehicleDetail.Value;
      });
      
      let vehicleInformation = {};

      // Determine vehicleInformation based on vehicleTypeCode
      if (vehicleTypeCode === "VT6" || vehicleTypeCode === "VT3" || vehicleTypeCode === "VT5") {
        vehicleInformation = {
          vehicleTypeId,
          license,
          vehicleTypeCode,
          parkingInformationId,
          year: vehicledata["year"],
          make: vehicledata["make"],
          model: vehicledata["model"],
          trim: vehicledata["trim"],
          companyName: vehicledata["companyName"],
         
        };
      } else if (vehicleTypeCode === "VT1" ) {
        vehicleInformation = {
          vehicleTypeId,
          license,
          vehicleTypeCode,
          parkingInformationId,
          trailerLength: vehicledata["trailerLength"],
          trailerType: vehicledata["trailerType"],
          year: vehicledata["year"],
          make: vehicledata["make"],
          model: vehicledata["model"],
          trim: vehicledata["trim"],
          companyName: vehicledata["companyName"],
          overallLength: vehicledata["overallLength"],
        };
      } else if (vehicleTypeCode === "VT4") {
        vehicleInformation = {
          vehicleTypeId,
          license,
          vehicleTypeCode,
          parkingInformationId,
          trailerLength: vehicledata["trailerLength"],
          trailerType: vehicledata["trailerType"],
          year: vehicledata["year"],
          make: vehicledata["make"],
          model: vehicledata["model"]
        };
      }
      // Update vehicles array
      const updatedVehicles = [...vehicles];
      if (updatedVehicles[index]) {
        updatedVehicles[index] = vehicleInformation;       
        setVehicles(updatedVehicles);
        console.log("Updated Vehicles:", updatedVehicles);
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      setVehicleData("");
    }
    // return Responder.sendSuccess(res, "Vehicle Information Fetched successfully", 200, vehicleInforamtion);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setpaymentauth(value);
    console.log("CHECK", value);
  };

  const handleLicenseChange = (value) => {
     
    fetchVehicleData(value); // Fetch vehicle data based on the input
  };

  const handleLicenseData = (index, value, vehicleTypeId, setFieldValue, vehicleTypeCode) => {
    
    fetchVehicleData(value, index, vehicleTypeId, setFieldValue, vehicleTypeCode);
   
  };
  const handleoptionclick = (e) => {
    const value = e.target.value;
    setradioclick(value);
    setChangeOption(value);
    console.log("val", value);
  };
  const handleSignatureChange = () => {
    if (sigPad.current) {
      const dataUrl = sigPad.current.toDataURL("image/png");
      setSignatureDataUrl(dataUrl);
      // console.log(dataUrl, 'Signature Data URL');
    }
  };
  const handleClearSignature = () => {
    if (sigPad.current) {
      sigPad.current.clear();
      setSignatureDataUrl("");
    }
  };

  const getFieldsForVehicleType = (vehicleTypeId, index) => {
    const selectedVehicleType = vehicleType.find(type => type._id === vehicleTypeId);
    if (!selectedVehicleType) return;    
    const updatedVehicles = [...vehicles];
    if (updatedVehicles[index]) {
      updatedVehicles[index].vehicleTypeId = vehicleTypeId;
      updatedVehicles[index].vehicleTypeCode = selectedVehicleType.vehicleTypeCode;
      setVehicles(updatedVehicles);    
    }
    // setVehicleTypeId(selectedVehicleType.vehicleTypeCode)
    //setVehicleTypeCode(selectedVehicleType.vehicleTypeCode)
    // Define a new vehicle object based on vehicleTypeCode    
    console.log("selectedVehicleType" + selectedVehicleType.vehicleTypeCode)     
  };

 
  const submitForm = async (event) => {
    event.preventDefault();
    if (!setpaymentauth) {
      alert("Please provide payment authorization.");
      return;
    }

    // let vehicle_details = [
    //   {
    //     parkingInformationId: parkingInformationId,
    //     vehicleTypeId: vehicleTypeId,
    //     year: vehicleData.year,
    //     make: vehicleData.make,
    //     model: vehicleData.model,
    //     color: vehicleData.color,
    //     usdot: vehicle.usdot,
    //     tag: vehicle.tag,
    //   },
    // ];

    let personalVehicle = [
      {
        parkingInformationId: parkingInformationId,
        vehicleTypeId: vehicleTypeId,
        year: year,
        make: make,
        model: model,
        color: color,
        tagOrVin: tagOrVin
      },
    ];    
    const parkingDateString = new Date(parkingDate).toISOString();
    const formData = new FormData();
    formData.append("noofparkingspaces ", numberOfParking);
    formData.append("howmanyspaces ", spacesAddingSubtracting);
    formData.append("firstname ", firstname);
    formData.append("lastname  ", lastname);
    formData.append("city", city);
    formData.append("streetaddress", streetaddress);
    formData.append("phone ", phone);
    formData.append("email", email);
    formData.append("comments", comments);
    formData.append("streetaddress2", streetaddress2);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("startdate", startDate);
    formData.append("enddate", endDate);
    formData.append("currentlocation", locationId);
    formData.append("removelocation", locationId);
    formData.append("continuelocation", locationId);
    formData.append("effectivedate", parkingDateString);
    if(changeOption === "3"){
      formData.append("newLocation", newLocation || 1);
    }
    formData.append("numofparkingspace", Numberofparking);
    formData.append("spacesaddingsubtracting", spacesaddingsubtracting);
    formData.append("companyName", companyName);
    formData.append("spacesremainingafterchange", spacesremainingafterchange);
    formData.append("totalparkingspaces", spacesRemainingAfterChange);
    formData.append("decreaseVehicleTypeIds", decreaseVehicleTypeIds);
    // formData.append("vehicleType1", vehicleType1);
    // formData.append("vehicleTypeId", vehicleTypeId);
    formData.append("parkingInformationId", parkingInformationId);
    // formData.append("vehicleType", vehicleType);
    formData.append("personalvehicleType", personalvehicleType);
    formData.append("selectvehicle", selectvehicle);
    formData.append("zipcode", postal);
    // formData.append('optionClick', radioclick );
    formData.append("liketochangeId", radioclick);
    formData.append("vehicleTypeAdding", vehicleTypeAdding);
    formData.append("parkinglistTypeAdding", parkinglistTypeAdding);
    formData.append("noofvehicle  ", vehiclesyouareparking);
    console.log("decreaseVehicleTypeIds" + decreaseVehicleTypeIds)
     
    vehicles.forEach((vehicle, index) => {
      Object.keys(vehicle).forEach((key) => {
        formData.append(`vehicleDetails[${index}][${key}]`, vehicle[key]);
      });
    });
   
    personalVehicle.forEach((personalVehicle, index) => {
      Object.keys(personalVehicle).forEach((key) => {
        formData.append(
          `personalvehicleDetails[${index}][${key}]`,
          personalVehicle[key]
        );
      });
    });
    formData.append("personalVehicle", personalVehicle);
    formData.append("vehicles", vehicles);
    // formData.append('Howlongyouexpecttobeparkingatthelocation',parkingatthelocation );
    // formData.append('signature', signature );
    formData.append("userId", localStorage.getItem("storemytruck_customer_id"));
    formData.append("paymentauth ", paymentauth);
    console.log(Array.from(formData.entries()));
    if (signatureDataUrl) {
      console.log(signatureDataUrl, "jjjjj");
      const byteString = atob(signatureDataUrl.split(",")[1]);
      const mimeString = signatureDataUrl
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      // Append the signature blob to the FormData
      formData.append("signature", blob, "signature.png");
    }
    try {
      // const response = await axios.post('http://localhost:5000/api/storemytruck/AccountChange/add-accountchange', formData);
      const response = await axios.post(
        "http://192.168.0.57:5000/api/storemytruck/AccountChange/add-accountchange",
        formData
      );
      // Success popup at top-right
      Swal.fire({
        position: "top-end", // Sets the popup at the top-right
        icon: "success",
        title: "Account change form requested successfully!",
        showConfirmButton: false,
        timer: 3000, // Closes the popup after 3 seconds
      }).then(() => {
        // Refresh the page after success popup closes
        window.location.reload();
      });
      console.log("Response:", response.data);
    } catch (error) {
      // Error popup at top-right
      Swal.fire({
        position: "top-end", // Sets the popup at the top-right
        icon: "error",
        title: "Failed to submit the form.",
        text: "Please try again.",
        showConfirmButton: false,
        timer: 3000, // Closes the popup after 3 seconds
      });
      console.error("Error submitting form:", error);
    }
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value === "" || validateEmail(value)) {
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email address.");
    }
  };
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
    }

    if (value === "" || validatePhoneNumber(value)) {
      setPhoneError("");
    } else {
      setPhoneError("Please enter a valid 10-digit phone number.");
    }
  };

 
  const handlePostalChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setPostal(value);
    }
  };
 
   

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date && endDate) {
      calculateTotalDays(date, endDate);
    }
  };
  const handleaccount = (e) => {
    const value = e.target.value;
    setAccountName(value);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate && date) {
      calculateTotalDays(startDate, date);
    }
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
    }
  };

  const handleVehicleTypeChange = (e) => {
    const { dropdownvehicleType, id } = JSON.parse(e.target.value);
    setvehicleTypeAdding(dropdownvehicleType);
    // setVehicleTypeSelected(selectedValue); // Track selection
    console.log("dropdownvehicleType", dropdownvehicleType);
    setselectvehicle(dropdownvehicleType);
    setvehicleTypeId(id);
  };

  const handlelocationidchange = (e) => {
    const { id } = JSON.parse(e.target.value);
    setlocationId(id);
    console.log(id,'ppppppppppppppppppp');
  };

  const handleparkinglistTypeChange = (e) => {
    const { parkingTypeId, id } = JSON.parse(e.target.value);
    const selectedValue = e.target.value;    
    setparkinglistId(selectedValue);    
    ParkingInformationDetails(id);    
    if ( changeOption === "6") {
      ParkedVehicleType(id,process.env.REACT_APP_BASE_PARKED_PERSONAL_VEHICLE_TYPE_DROPDOWN);
    }
    if (changeOption === "2" || changeOption === "5") {
      ParkedVehicleType(id, process.env.REACT_APP_BASE_PARKED_VEHICLE_TYPE_DROPDOWN);
    }
    if (changeOption === "10") {

    }
   // personalvehicleType(id)
    setparkingTypeId(id);
  };
  const handlelocationidchange1 = (e) => {
    const { id } = JSON.parse(e.target.value);

    setNewLocation(id);
    // console.log(id,'ppppppppppppppppppp');
  };
  const { axios } = useAxios();
  const initialValues = {
    changeOption: "",
    yesOrnO: "",
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
    vehicleTypeId : "",
    companyNameOnTractor: "",  
    tagOrVin:"",
    decreaseVehicleTypeIds: [],
    vehicles: [
      {
        yearMakeModel: "",
        color: "",
        usdot: "",
        companyNameOnTractor: "",
      },
    ],
    
  };
  const [vehicleData, setVehicleData] = useState({
    vehicleTypeId : "",
  
    year: "",
    make: "",
    model: "",
    trim: "",
    size: "",
    color: "",
    overallLength: "",
  });

  const handleFieldChange = (field, value) => {
    if(changeOption === "1") {
      setVehicle(prevVehicle => ({
        ...prevVehicle,
        [field]: value,
      }));
    }
    // if(changeOption === "6") {
    //   setPersonalVehicle(prevPersonalVehicle => ({
    //     ...prevPersonalVehicle,
    //     [field]: value,
    //   }));
    // }
  };
  return (
    <div>
      <Header />
      <div className="book-form">
        <div className="container margin_60" onClick={handleProtectedClick}>
          <div className="row pb-4">
            <div className="col-md-12">
              <h1>ACCOUNT CHANGE FORM</h1>
              <div className="header-style">
                <p>
                  If you have any questions or need our assistance, please call
                  us directly at <span>678-631-7275 </span>678-631- P-A-R-K
                </p>
              </div>
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
                              <span className="value">
                                {userDetails.company_name}
                              </span>
                            </li>
                            <li>
                              <span class="label">Cell Phone Number</span>
                              <span className="value">
                                {userDetails.phone_number}
                              </span>
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
                validationSchema={validationSchema}
                initialValues={initialValues}
               
              >
                {({ values, errors, touched ,setFieldValue }) => (
                  <Form id="quotation" noValidate>
                    {isModalOpen && (
                      <div style={styles.modalOverlay} onClick={closeModal}>
                        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                          <img src={Imagesrc} alt="Instructions" style={styles.image} />
                          <h5 style={styles.header}>Instructions:</h5>
                          <h5>Use this Form to:</h5>
                          <ul style={styles.ul}>
                            <li style={styles.li}>Update Account Information.</li>
                            <li style={styles.li}>
                              Change Parking Start Date and/or how long you expect to be parking at the location.
                            </li>
                            <li style={styles.li}>Request to Move to another LOT/location.</li>
                            <li style={styles.li}>Update current LOT/location.</li>
                            <li style={styles.li}>Increase OR Decrease the Number of Units.</li>
                            <li style={styles.li}>
                              Update the information on units being stored/parked.
                            </li>
                            <li style={styles.li}>
                              Rescind Cancellation (Only valid if done prior to the last day of parking).
                            </li>
                            <li style={styles.li}>
                              Please note that the change does not take effect until you receive an email confirming it has been reviewed and approved by our Accounting Department. You may email or call Monday through Friday 9am-5pm, to confirm the change. Phone: (678) 531-4622 Email: <a href="mailto:mauricio@storemytruck.com">mauricio@storemytruck.com</a>
                            </li>
                            <li style={styles.li}>
                              Please review your entries before submitting the form to ensure that you entered the correct information in all the required fields. Otherwise, your changes will be delayed or not processed.
                            </li>
                          </ul>
                          <button style={styles.closeButton} onClick={closeModal}>Okay</button>
                        </div>
                      </div>
                     )} 
                    
                    <div className="instruction">
                      <div className="instruction-toogle-form">
                        <div>
                          <h3>
                            WHAT WOULD YOU LIKE TO CHANGE: (Please select ONE
                            selection)<span>*</span>
                          </h3>
                          <div>
                            <label>
                              <Field
                                type="radio"
                                name="changeOption"
                                value="1"
                                className="mr-1"
                                onClick={handleoptionclick}
                                disabled={
                                  accountChangeOptions.alloption === 1
                                    ? isDisabled
                                    : false
                                }
                              />
                              <div
                                className={
                                  accountChangeOptions.alloption === 0
                                    ? ""
                                    : "disabled-text"
                                }
                              >
                                1. Increase Number Vehicles
                              </div>
                            </label>
                          </div>
                          <div>
                            <label>
                              <Field
                                type="radio"
                                name="changeOption"
                                value="2"
                                className="mr-1"
                                onClick={handleoptionclick}
                                disabled={
                                  accountChangeOptions.alloption === 1
                                    ? isDisabled
                                    : false
                                }
                              />
                              <div
                                className={
                                  accountChangeOptions.alloption === 0
                                    ? ""
                                    : "disabled-text"
                                }
                              >
                                2. Decrease Number Vehicles
                              </div>
                            </label>
                          </div>
                          <div>
                            <label>
                              <Field
                                type="radio"
                                name="changeOption"
                                value="3"
                                className="mr-1"
                                onClick={handleoptionclick}
                                disabled={
                                  accountChangeOptions.alloption === 1
                                    ? isDisabled
                                    : false
                                }
                              />
                              <div
                                className={
                                  accountChangeOptions.alloption === 0
                                    ? ""
                                    : "disabled-text"
                                }
                              >
                                3. Change in Lot/Location (Not to be used for
                                ADDING a New Vehicle in a different Location)
                              </div>
                            </label>
                          </div>
                          <div>
                            <label>
                              <Field
                                type="radio"
                                name="changeOption"
                                value="4"
                                className="mr-1"
                                onClick={handleoptionclick}
                                disabled={
                                  accountChangeOptions.alloption === 1 ||
                                    accountChangeOptions.option4 === 1
                                    ? isDisabled
                                    : false
                                }
                              />
                              <div
                                className={
                                  accountChangeOptions.alloption === 0 &&
                                    accountChangeOptions.option4 === 0
                                    ? ""
                                    : "disabled-text"
                                }
                              >
                                4. Remove a Location (If parked in more than 1
                                location)
                              </div>
                            </label>
                          </div>
                          <div>
                            <label>
                              <Field
                                type="radio"
                                name="changeOption"
                                value="5"
                                className="mr-1"
                                onClick={handleoptionclick}
                                disabled={
                                  accountChangeOptions.alloption === 1
                                    ? isDisabled
                                    : false
                                }
                              />
                              <div
                                className={
                                  accountChangeOptions.alloption === 0
                                    ? ""
                                    : "disabled-text"
                                }
                              >
                                5. Update Vehicle Information (i.e.
                                Year/Make/Model/Color/Tag/USDOT or Type of
                                Vehicle: From Tractor to Tractor Trailer Combo)
                              </div>
                            </label>
                          </div>
                          <div>
                            <label>
                              <Field
                                type="radio"
                                name="changeOption"
                                value="6"
                                className="mr-1"
                                onClick={handleoptionclick}
                                disabled={
                                  accountChangeOptions.alloption === 1
                                    ? isDisabled
                                    : false
                                }
                              />
                              <div
                                className={
                                  accountChangeOptions.alloption === 0
                                    ? ""
                                    : "disabled-text"
                                }
                              >
                                6. Add or Update Personal Vehicle Information
                              </div>
                            </label>
                          </div>
                          <div>
                            <label>
                              <Field
                                type="radio"
                                name="changeOption"
                                value="7"
                                className="mr-1"
                                onClick={handleoptionclick}
                                disabled={
                                  accountChangeOptions.alloption === 1 ||
                                    accountChangeOptions.option7 === 1
                                    ? isDisabled
                                    : false
                                }
                              />
                              <div
                                className={
                                  accountChangeOptions.alloption === 0 &&
                                    accountChangeOptions.option7 === 0
                                    ? ""
                                    : "disabled-text"
                                }
                              >
                                7. Rescinding Cancellation (i.e. reverse or undo
                                a submitted cancellation. Option only Valid if
                                you do this prior to your last day of parking)
                              </div>
                            </label>
                          </div>
                          <div>
                            <label>
                              <Field
                                type="radio"
                                name="changeOption"
                                value="8"
                                className="mr-1"
                                onClick={handleoptionclick}
                                disabled={
                                  accountChangeOptions.alloption === 1
                                    ? isDisabled
                                    : false
                                }
                              />
                              <div
                                className={
                                  accountChangeOptions.alloption === 0
                                    ? ""
                                    : "disabled-text"
                                }
                              >
                                8. Change Start Date or No. of Months you expect
                                to Park.
                              </div>
                            </label>
                          </div>
                          <div>
                            <label>
                              <Field
                                type="radio"
                                name="changeOption"
                                value="9"
                                className="mr-1"
                                onClick={handleoptionclick}
                                disabled={
                                  accountChangeOptions.alloption === 1
                                    ? isDisabled
                                    : false
                                }
                              />
                              <div
                                className={
                                  accountChangeOptions.alloption === 0
                                    ? ""
                                    : "disabled-text"
                                }
                              >
                                9. Update Personal Information (Address, Email,
                                Phone, etc.).
                              </div>
                            </label>
                          </div>
                          <div>
                            <label>
                              <Field
                                type="radio"
                                name="changeOption"
                                value="10"
                                className="mr-1"
                                onClick={handleoptionclick}
                                disabled={
                                  accountChangeOptions.alloption === 1 ||
                                    accountChangeOptions.option10 === 1
                                    ? isDisabled
                                    : false
                                }
                              />
                              <div
                                className={
                                  accountChangeOptions.alloption === 0 &&
                                    accountChangeOptions.option10 === 0
                                    ? ""
                                    : "disabled-text"
                                }
                              >
                                10. Increase/Decrease Personal Vehicle Parking
                                (Only available at 2100 Jonesboro Rd)
                              </div>
                            </label>
                          </div>
                        </div>
                        <br></br>
                      </div>
                    </div>
                   
                    {(accountChangeOptions.alloption === 0 && radioclick !== '') && (
                      <div>
                        {(values.changeOption === "1" ||
                          values.changeOption === "3") && (
                            <div class="row mt-1">
                              <div class="col-md-12 mb-3">
                                <p class="custom-paragraph">
                                  <strong>
                                    Be aware that any changes will be made at the
                                    currently advertised rates. Your current
                                    billing cycle AND last month's rent will be
                                    prorated and/or adjusted to reflect the new
                                    rate.
                                  </strong>
                                </p>
                              </div>
                            </div>
                          )}
                        
                        <div className="row">
                          <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                              <label>
                                Effective date of change <span>*</span>
                              </label>
                              <DatePicker
                                // value={}
                                type="text"
                                name="bookingDate"
                                className="form-control required"
                                onChange={handleDateChange}
                                selected={parkingDate}
                                placeholderText="Select  date"
                              // placeholder={parkingDate}
                              />
                            </div>
                          </div>
                          {(values.changeOption !== "9") && ( 
                            <div className="col-md-6 col-sm-12">
                              <div className="form-group">
                                <label>Parking List</label>
                                <Field
                                  as="select"
                                  name="selectedLocation"
                                  className="form-control"
                                  value={parkinglistId} // Ensure this value reflects the current state
                                  onChange={(e) => {                                 
                                    handleparkinglistTypeChange(e,);
                                  }}
                                  onFocus={() => setShowAddingMessage(true)} // Optional, if required
                                >
                                  <option value="">Please Select</option>
                                  {Array.isArray(parkinglists) &&
                                    parkinglists.map((vehicleData, index) => (
                                      <option
                                        key={index}
                                        value={JSON.stringify({
                                          id: vehicleData._id,
                                          parkingTypeId: vehicleData.parkingTypeId,
                                        })}
                                      >
                                        {vehicleData.parkinginfo}
                                      </option>
                                    ))}
                                </Field>
                              </div>
                            </div>
                          )}                       
                          {(values.changeOption === "1" || values.changeOption === "2" || values.changeOption === "3" || values.changeOption === "5" )&& (
                          <>
                          <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                              <label>Current Location</label>
                              <Field
                                onChange={handlelocationidchange}
                                as="select"
                                name="selectedLocation"
                                className="form-control"
                                selected={locationId}
                                value={locationId}
                                disabled
                              >
                                <option value="">Please Select</option>
                                {locations.map((location, index) => (
                                  <option
                                    key={index}
                                    value={location._id}
                                  // value={JSON.stringify({
                                  //   id: location._id,
                                  // })}
                                  >
                                    {`${location.addressOne}, ${location.addressTwo
                                      }, ${location.addressThree} / ${location.remainingSpace ?? 0
                                      }`}
                                  </option>
                                ))}
                              </Field>
                            </div>
                          </div>



                          <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                      <label>
                                        Number of parking spaces before change?
                                        <span>*</span>
                                      </label>
                                      <input
                                        type="number"
                                        className="form-control"
                                        value={numberOfParking}
                                        // onChange={(e) => {
                                        //   const parkingValue = e.target.value;
                                        //   setNumberOfParking(parkingValue);
                                        //   calculateTotalSpaces(
                                        //     parkingValue,
                                        //     spacesAddingSubtracting,
                                        //     values.changeOption
                                        //   );
                                        // }}
                                      />
                                    </div>
                                  </div>

                              </>
                         
                        )}
                          {(values.changeOption === "1" || values.changeOption === "5")  && (
                            <>
                            <div className="col-md-6 col-sm-6">
                              <div className="form-group">
                                <label>
                                  How many spaces are you adding/subtracting
                                  <span>*</span>
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  onChange={(e) => {
                                    const changeValue = parseInt(e.target.value, 10);
                                    setSpacesAddingSubtracting(changeValue);
                                    calculateTotalSpaces(numberOfParking, changeValue, values.changeOption);
                                  }}
                                />
                              </div>
                            </div>

                              
                          <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                  {(values.changeOption === "1" || values.changeOption === "5") && (
                                <label>
                                  Total number of parking spaces after
                                  chang<span>*</span>
                                </label>
                              )}
                              {values.changeOption === "2" && (
                                <label>
                                  Number of parking spaces remaining after
                                  change<span>*</span>
                                </label>
                              )}
                              <input
                                type="number"
                                className="form-control"
                                value={spacesRemainingAfterChange}
                                readOnly
                              />
                            </div>
                          </div>
                          <div class="col-md-6 col-sm-6"></div>
                            </>
                          )}
                           
                        </div>

                      
                        {values.changeOption === "8" && (
                          <>
                            <div className="col-md-10 col-sm-4">
                              <div className="form-group">
                                <label>
                                  Original Start Date <span>*</span>
                                </label>
                                <DatePicker
                                  selected={startDate}
                                  onChange={handleStartDateChange}
                                  className="form-control required"
                                  placeholderText="MM/DD/YYYY"
                                />
                              </div>
                            </div>

                            <div className="col-md-10 col-sm-4">
                              <div className="form-group">
                                <label>
                                  New Start Date <span>*</span>
                                </label>
                                <DatePicker
                                  selected={endDate}
                                  onChange={handleEndDateChange}
                                  className="form-control required"
                                  placeholderText="MM/DD/YYYY"
                                />
                              </div>
                            </div>

                            <div class="col-md-10 col-sm-6">
                              <div className="form-group">
                                <label>
                                  How long you expect to be parking at the
                                  location? <span>*</span>
                                </label>
                                <Field
                                  as="select"
                                  id="parkingatthelocation"
                                  name="parkingatthelocation"
                                  className={`form-control ${touched.vehicleType && errors.vehicleType
                                      ? "is-invalid"
                                      : ""
                                    }`}
                                  onChange={(e) =>
                                    setparkingatthelocation(e.target.value)
                                  }
                                >
                                  <option value="">Please Select</option>
                                  <option value="Less than 3 Months">
                                    Less than 3 Months
                                  </option>
                                  <option value="More than 3 Months ">
                                    {" "}
                                    More than 3 Months
                                  </option>
                                </Field>
                              </div>
                            </div>
                          </>
                        )}

                        {(values.changeOption === "2" || values.changeOption === "5") && (
                          <>                             
                            <div className="form-group">
                              <label>
                                Parked Vehicle Type<span>*</span>
                              </label>
                              <Field
                                as="select"
                                name="decreaseVehicleTypeIds"
                                className="form-control"
                                value={values.decreaseVehicleTypeIds || []} // Ensure it's an array
                                onChange={(e) => {                                 
                                  const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                                  setFieldValue("decreaseVehicleTypeIds", selectedOptions);
                                  setDecreaseVehicleTypeIds(selectedOptions)
                                }}
                                multiple
                                onFocus={() => setShowAddingMessage(true)}
                               
                              >
                                <option value="">Please Select</option>
                                {Array.isArray(parkedVehicleTypeList) &&
                                  parkedVehicleTypeList.map((parkedVehicleType, index) => (
                                    <option key={index} value={parkedVehicleType._id}>
                                      {parkedVehicleType.vehicleinfo}
                                    </option>
                                  ))}
                              </Field>
                            </div>                             
                          </>
                        )}
                        {values.changeOption === "3" && (
                          <>
                            <div className="col-md-6 col-sm-6">
                              <div className="form-group">
                                <label>New Location</label>
                                <Field
                                  onChange={handlelocationidchange1}
                                  as="select"
                                  name="newLocation"
                                  className="form-control"
                                  selected={newLocation}
                                >
                                  <option value="">Pleae Select</option>
                                  {locations.map((location, index) => (
                                    //
                                    <option
                                      key={index}
                                      value={JSON.stringify({
                                        id: location._id,
                                      })}
                                    >
                                      {/* value={location.locationId}> */}
                                      {`${location.addressOne}, ${location.addressTwo
                                        }, ${location.addressThree} / ${location.remainingSpace ?? 0
                                        }`}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                            </div>

                          </>
                        )}
                        {(values.changeOption !== "9") && ( 
                          <div className="row">
                          {vehicleInformation !== '' && (
                            <>
                              <h3>Parked Vehicle Information</h3>
                              <br></br>
                              <div>

                                <div className="vehicle-container">
                                  {vehicleInformation.map((vehicle) => (
                                    <div key={vehicle._id} className="vehicle-card">
                                      <span><strong>vehicle Type:</strong> {vehicle.vehicleTypeName}</span>
                                      <span><strong>vehicle number:</strong> {vehicle.vehicleNumber}</span>
                                      <span><strong>Make:</strong> {vehicle.make}</span>
                                      <span><strong>Model:</strong> {vehicle.model}</span>
                                      <span><strong>Year:</strong> {vehicle.year}</span>
                                      <span><strong>Color:</strong> {vehicle.color}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div class="col-md-6 col-sm-6"></div>
                              <div class="col-md-6 col-sm-6"></div>
                              <hr></hr>
                            </>
                          )}
                          </div>
                        )}
                        <div className="billing">
                          <div className="row">
                            {(values.changeOption === "1"   ) && (                               
                                <>
                                <hr></hr>                                         
                                <h3>Vehicle Information</h3>                                
                                <p>
                                  We strongly suggest that you provide us below
                                  with visual identifying markings on your
                                  vehicles to ensure that our Field Auditors do
                                  not tag your vehicle as "Illegally Parked".
                                </p>
                                                                   
                                    <div className="row">
                                      <div>
                                        {displayValue && <p>{displayValue}</p>}
                                      </div>
                                      
                                  <FieldArray name="vehicles">
                                    {({ remove, form: { values, setFieldValue } }) => (
                                      <>
                                        {vehicles.map((vehicle, vehicleIndex) => (
                                          <div key={vehicleIndex} className="row vehicle-details">
                                            <div className="col-md-6 col-sm-6">
                                              <div className="form-group">
                                                <label>
                                                  Vehicle Type <span>*</span>
                                                </label>
                                                <Field
                                                  as="select"
                                                  name={`vehicles[${vehicleIndex}].vehicleTypeId`}
                                                  id={`vehicles[${vehicleIndex}].vehicleTypeId`}
                                                  className="form-control"
                                                  onChange={(e) => {
                                                    const selectedValue = e.target.value;
                                                    setFieldValue(`vehicles[${vehicleIndex}].vehicleTypeId`, selectedValue); // Update Formik's state
                                                    setvehicleTypeId(selectedValue); // Update local state if needed
                                                    getFieldsForVehicleType(selectedValue, vehicleIndex); // Call your custom function
                                                  }}
                                                  onFocus={() => setShowAddingMessage(true)}
                                                >
                                                  <option value="">Please Select</option>
                                                  {Array.isArray(vehicleType) &&
                                                    vehicleType.map((vehicleData, idx) => (
                                                      <option
                                                        key={idx}
                                                        value={vehicleData._id} // Pass only the ID as the value
                                                      >
                                                        {vehicleData.vehicleType}
                                                      </option>
                                                    ))}
                                                </Field>
                                              </div>
                                            </div>
                                            
                                            <div className="col-md-6 col-sm-6">
                                              <div className="form-group">
                                                <label>
                                                  VIN<span style={{ color: 'red' }}>*</span>
                                                </label>
                                                <Field
                                                  type="text"
                                                  name={`vehicles[${vehicleIndex}].license`}
                                                  placeholder="Enter the license number"
                                                  className="form-control"
                                                  onChange={(e) => handleLicenseData(vehicleIndex, e.target.value, vehicleTypeId, setFieldValue, vehicles[vehicleIndex].vehicleTypeCode)}
                                                />
                                                <ErrorMessage
                                                  name={`vehicles[${vehicleIndex}].license`}
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </div>
                                            </div>

                                            { vehicles[vehicleIndex].vehicleTypeId && (
                                              <>
                                                <div className="col-md-2">
                                                  <div className="form-group">
                                                    <label>Year<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                        name={`vehicles[${vehicleIndex}].year`}
                                                      value={vehicle.year}
                                                      className="form-control"
                                                      onChange={(e) => handleFieldChange("year", e.target.value)}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-2">
                                                  <div className="form-group">
                                                    <label>Make<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                        name={`vehicles[${vehicleIndex}].make`}
                                                      value={vehicle.make}
                                                      className="form-control"
                                                      onChange={(e) => handleFieldChange("make", e.target.value)}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-2">
                                                  <div className="form-group">
                                                    <label>Model<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                        name={`vehicles[${vehicleIndex}].model`}
                                                      value={vehicle.model}
                                                      className="form-control"
                                                      onChange={(e) => handleFieldChange("model", e.target.value)}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-3">
                                                  <div className="form-group">
                                                    <label>Color<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                        name={`vehicles[${vehicleIndex}].color`}
                                                      value={vehicle.color}
                                                      className="form-control"
                                                      onChange={(e) => handleFieldChange("color", e.target.value)}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-3">
                                                  <div className="form-group">
                                                    <label>USDOT#<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                        name={`vehicles[${vehicleIndex}].usdot`}
                                                      value={vehicle.usdot}
                                                      className="form-control"
                                                      onChange={(e) => handleFieldChange("usdot", e.target.value)}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-3">
                                                  <div className="form-group">
                                                    <label>TAG<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                      name={`vehicles[${vehicleIndex}].tag`}
                                                      value={vehicle.tag}
                                                      className="form-control"
                                                      onChange={(e) => handleFieldChange("tag", e.target.value)}
                                                    />
                                                  </div>
                                                </div>

        
                                                {(vehicles[vehicleIndex].vehicleTypeCode === 'VT4' || vehicles[vehicleIndex].vehicleTypeCode === 'VT1' ) && (
                                                  <>
                                                    <div className="col-md-3">
                                                      <label>Trailer Length<span>*</span></label>
                                                          <Field as="select" name={`vehicles[${vehicleIndex}].trailerLength`} className="form-control">
                                                        <option value="">Please Select</option>
                                                        <option value="48 ft – 53 ft">48 ft – 53 ft</option>
                                                        <option value="40 ft – 47 ft">40 ft – 47 ft</option>
                                                        <option value="24 ft – 39 ft">24 ft – 39 ft</option>
                                                        <option value="< 24 ft">Less than 24 ft</option>
                                                      </Field>
                                                    </div>
                                                    <div className="col-md-3">
                                                      <label>Trailer Type<span>*</span></label>
                                                          <Field as="select" name={`vehicles[${vehicleIndex}].trailerType`} className="form-control">
                                                        <option value="">Please Select</option>
                                                        <option value="Dry Van">Dry Van</option>
                                                        <option value="Reefer">Reefer</option>
                                                      </Field>
                                                    </div>
                                                  </>
                                                )}

                                                {(vehicles[vehicleIndex].vehicleTypeCode === 'VT2' ) && (
                                                  <div className="col-md-3">
                                                    <label>Company Name On Tractor<span>*</span></label>
                                                        <Field type="text" name={`vehicles[${vehicleIndex}].companyNameOnTractor`} className="form-control" />
                                                  </div>
                                                )}

                                                {['VT5', 'VT6', 'VT3','VT1'].includes(vehicles[vehicleIndex].vehicleTypeCode) && (
                                                  <div className="col-md-3">
                                                    <label>Other Identifying Info<span>*</span></label>
                                                        <Field type="text" name={`vehicles[${vehicleIndex}].otherIdentifyingInfo`} className="form-control" />
                                                  </div>
                                                )}
                                                 
                                                <div className="col-md-4">
                                                  {vehicleIndex > 0 && (
                                                    <button type="button" className="button-2" onClick={() => remove(vehicleIndex)}>
                                                      Delete
                                                    </button>
                                                  )}
                                                </div>
                                            </>


                                          )}  {/**End vehicle available conditon */}
                                          </div>
                                        ))}
                                      </>
                                    )}
                                  </FieldArray>
                                    </div>
                                </>
                            )}
 
                             
                 
                            {values.changeOption === "4" && (
                              <>
                                <hr></hr>

                                <h3>Parking Information</h3>
                                <br></br>
                                <br></br>

                                <div className="col-md-6 col-sm-6">
                                  <div className="form-group">
                                    <label>Location you are Removing</label>
                                    <span>*</span>
                                    <Field
                                      onChange={handlelocationidchange}
                                      as="select"
                                      name="selectedLocation"
                                      className="form-control"
                                      selected={locationId}
                                    >
                                      <option value="">Pleae Select</option>
                                      {locations.map((location, index) => (
                                        //
                                        <option
                                          key={index}
                                          value={JSON.stringify({
                                            id: location._id,
                                          })}
                                        >
                                          {/* value={location.locationId}> */}
                                          {`${location.addressOne}, ${location.addressTwo
                                            }, ${location.addressThree} / ${location.remainingSpace ?? 0
                                            }`}
                                        </option>
                                      ))}
                                    </Field>
                                  </div>
                                </div>
                                <div class="col-md-6 col-sm-6"></div>
                                <div className="col-md-6 col-sm-6">
                                  <div className="form-group">
                                    <label>
                                      Location that you'll continue to park at
                                    </label>
                                    <span>*</span>
                                    <Field
                                      onChange={handlelocationidchange1}
                                      as="select"
                                      name="newLocation"
                                      className="form-control"
                                      selected={newLocation}
                                    >
                                      <option value="">Pleae Select</option>
                                      {locations.map((location, index) => (
                                        //
                                        <option
                                          key={index}
                                          value={JSON.stringify({
                                            id: location._id,
                                          })}
                                        >
                                          {/* value={location.locationId}> */}
                                          {`${location.addressOne}, ${location.addressTwo
                                            }, ${location.addressThree} / ${location.remainingSpace ?? 0
                                            }`}
                                        </option>
                                      ))}
                                    </Field>
                                  </div>
                                </div>
                                <div class="col-md-6 col-sm-6"></div>
                                {/* <div className="col-md-6 col-sm-6">
                                  <div class="form-group">
                                    <label>
                                      Number of vehicles you are parking{" "}
                                      <span>*</span>
                                    </label>
                                    <input
                                      name="numberofvehicle"
                                      type="number"
                                      className={`form-control`}
                                      onChange={(e) =>
                                        setvehiclesyouareparking(e.target.value)
                                      }
                                    />
                                  </div>
                                </div> */}
                                <div class="col-md-6 col-sm-6"></div>
                                
                                
                                  <h3>Vehicle Information</h3>
                                  <br></br>
                                  
                                  <p>
                                    We strongly suggest that you provide us
                                    below with visual identifying markings on
                                    your vehicles to ensure that our Field
                                    Auditors do not tag your vehicle as
                                    "Illegally Parked".
                                  </p>

                            

                                 
                                
                              </>
                            )}
                            {( values.changeOption === "5") && (
                              <>
                                <hr></hr>
                                <h3>Vehicle Information</h3>
                                <p>
                                  We strongly suggest that you provide us below
                                  with visual identifying markings on your
                                  vehicles to ensure that our Field Auditors do
                                  not tag your vehicle as "Illegally Parked".
                                </p>

                                <div className="row">
                                   

                                  <FieldArray name="vehicles">
                                    {({ remove, form: { values, setFieldValue } }) => (
                                      <>
                                        {vehicles.map((vehicle, vehicleIndex) => (
                                          <div key={vehicleIndex} className="row vehicle-details">
                                            <div className="col-md-6 col-sm-6">
                                              <div className="form-group">
                                                <label>
                                                  Vehicle Type <span>*</span>
                                                </label>
                                                <Field
                                                  as="select"
                                                  name={`vehicles[${vehicleIndex}].vehicleTypeId`}
                                                  id={`vehicles[${vehicleIndex}].vehicleTypeId`}
                                                  className="form-control"
                                                  onChange={(e) => {
                                                    const selectedValue = e.target.value;
                                                    setFieldValue(`vehicles[${vehicleIndex}].vehicleTypeId`, selectedValue); // Update Formik's state
                                                    setvehicleTypeId(selectedValue); // Update local state if needed
                                                    getFieldsForVehicleType(selectedValue, vehicleIndex); // Call your custom function
                                                    
                                                  }}
                                                  value={trailerTracterId}
                                                  onFocus={() => setShowAddingMessage(true)}
                                                >
                                                  <option value="">Please Select</option>
                                                  {Array.isArray(vehicleType) &&
                                                    vehicleType.map((vehicleData, idx) => (
                                                      <option
                                                        key={idx}
                                                        value={vehicleData._id} // Pass only the ID as the value
                                                      >
                                                        {vehicleData.vehicleType}
                                                      </option>
                                                    ))}
                                                </Field>
                                              </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                              <div className="form-group">
                                                <label>
                                                  VIN<span style={{ color: 'red' }}>*</span>
                                                </label>
                                                <Field
                                                  type="text"
                                                  name={`vehicles[${vehicleIndex}].license`}
                                                  placeholder="Enter the license number"
                                                  className="form-control"
                                                  onChange={(e) => handleLicenseData(vehicleIndex, e.target.value, vehicleTypeId, setFieldValue, vehicles[vehicleIndex].vehicleTypeCode)}
                                                />
                                                <ErrorMessage
                                                  name={`vehicles[${vehicleIndex}].license`}
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </div>
                                            </div>
                                             
                                              <>
                                                <div className="col-md-2">
                                                  <div className="form-group">
                                                    <label>Year<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                      name={`vehicles[${vehicleIndex}].year`}
                                                      value={vehicle.year}
                                                      className="form-control"
                                                      onChange={(e) => handleFieldChange("year", e.target.value)}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-2">
                                                  <div className="form-group">
                                                    <label>Make<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                      name={`vehicles[${vehicleIndex}].make`}
                                                      value={vehicle.make}
                                                      className="form-control"
                                                      onChange={(e) => setMake(e.target.value)}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-2">
                                                  <div className="form-group">
                                                    <label>Model<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                      name={`vehicles[${vehicleIndex}].model`}
                                                      value={vehicle.model}
                                                      className="form-control"
                                                      onChange={(e) => handleFieldChange("model", e.target.value)}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-3">
                                                  <div className="form-group">
                                                    <label>Color<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                      name={`vehicles[${vehicleIndex}].color`}
                                                      value={vehicle.color}
                                                      className="form-control"
                                                      onChange={(e) => handleFieldChange("color", e.target.value)}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-3">
                                                  <div className="form-group">
                                                    <label>USDOT#<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                      name={`vehicles[${vehicleIndex}].usdot`}
                                                      value={vehicle.usdot}
                                                      className="form-control"
                                                      onChange={(e) => handleFieldChange("usdot", e.target.value)}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-md-3">
                                                  <div className="form-group">
                                                    <label>TAG<span>*</span></label>
                                                    <Field
                                                      type="text"
                                                      name={`vehicles[${vehicleIndex}].tag`}
                                                      value={vehicle.tag}
                                                      className="form-control"
                                                      onChange={(e) => handleFieldChange("tag", e.target.value)}
                                                    />
                                                  </div>
                                                </div>
                                            
                                                <div className="col-md-3">
                                                  <div className="form-group"> 
                                                    <label>Company Name On Tractor<span>*</span></label>
                                                    <Field type="text" name={`vehicles[${vehicleIndex}].companyNameOnTractor`} className="form-control" />
                                                   </div>
                                                </div>
                                            

                                              <h4>Trailer Information*</h4>                                          
                                                   
                                                  <div className="col-md-3">
                                                    <div className="form-group">
                                                      <label>Color<span>*</span></label>
                                                      <Field
                                                        type="text"
                                                        name={`vehicles[${vehicleIndex}].trailerColor`}
                                                        value={vehicle.trailerColor}
                                                        className="form-control"
                                                        onChange={(e) => handleFieldChange("trailerColor", e.target.value)}
                                                      />
                                                    </div>
                                                  </div>
                                                    <div className="col-md-3">
                                                      <label>Trailer Length<span>*</span></label>
                                                      <Field as="select" name={`vehicles[${vehicleIndex}].trailerLength`} className="form-control">
                                                        <option value="">Please Select</option>
                                                        <option value="48 ft – 53 ft">48 ft – 53 ft</option>
                                                        <option value="40 ft – 47 ft">40 ft – 47 ft</option>
                                                        <option value="24 ft – 39 ft">24 ft – 39 ft</option>
                                                        <option value="< 24 ft">Less than 24 ft</option>
                                                      </Field>
                                                    </div>
                                                    <div className="col-md-3">
                                                      <label>Trailer Type<span>*</span></label>
                                                      <Field as="select" name={`vehicles[${vehicleIndex}].trailerType`} className="form-control">
                                                        <option value="">Please Select</option>
                                                        <option value="Dry Van">Dry Van</option>
                                                        <option value="Reefer">Reefer</option>
                                                      </Field>
                                                    </div>
                                                
                                                 
                                                  <div className="col-md-3">
                                                    <label>Other Identifying Info<span>*</span></label>
                                                    <Field type="text" name={`vehicles[${vehicleIndex}].otherIdentifyingInfo`} className="form-control" />
                                                  </div>
                                                 

                                                <div className="col-md-4">
                                                  {vehicleIndex > 0 && (
                                                    <button type="button" className="button-2" onClick={() => remove(vehicleIndex)}>
                                                      Delete
                                                    </button>
                                                  )}
                                                </div>
                                              </>
                                           
                                          </div>
                                        ))}
                                      </>
                                    )}
                                  </FieldArray>
                                </div>
                              </>
                            )}
                            {/* condition starts for 6*/}
                            {values.changeOption === "6" && (
                              
                                  <>
                                    {/* <div className="col-md-6 col-sm-6">
                                      <div className="form-group">
                                        <label>Nearest Locations</label>
                                        <Field
                                          onChange={handlelocationidchange}
                                          as="select"
                                          name="selectedLocation"
                                          className="form-control"
                                          selected={locationId}
                                        >
                                          <option value="">
                                            Location/Available space
                                          </option>
                                          {locations.map((location, index) => (
                                            //
                                            <option
                                              key={index}
                                              value={JSON.stringify({
                                                id: location._id,
                                              })}
                                            >
                                              
                                              {`${location.addressOne}, ${location.addressTwo
                                                }, ${location.addressThree} / ${location.remainingSpace ?? 0
                                                }`}
                                            </option>
                                          ))}
                                        </Field>
                                      </div>
                                    </div> */}

                                    
                                    <div className="col-md-12 mb-3">
                                      <h3>
                                        Personal Vehicle Information{" "}
                                        <span>*</span>
                                      </h3>
                                    </div>
                                <div className="row mt-1">
                                  <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                      <label>
                                        Vehicle Type <span>*</span>
                                      </label>
                                      <Field
                                        as="select"
                                        name="personalVehicle.vehicleTypeId"
                                        className="form-control"
                                       value={privateId}
                                      >
                                        {Array.isArray(vehicleType) &&
                                          vehicleType.map((vehicleData, idx) => (
                                            <option key={idx} value={vehicleData._id}>
                                              {vehicleData.vehicleType}
                                            </option>
                                          ))}
                                      </Field>
                                      <ErrorMessage
                                        name="personalVehicle.vehicleTypeId"
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                      <label>
                                        Tag OR VIN# <span>*</span>
                                      </label>
                                      <Field
                                        type="text"
                                        name="personalVehicle.tagOrVin"
                                        className="form-control"
                                        onChange={(e) =>
                                          setTagOrVin(e.target.value)
                                        }
                                      />
                                      <ErrorMessage
                                        name="personalVehicle.tagOrVin"
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                      <label>
                                        Year <span>*</span>
                                      </label>
                                      <Field
                                        type="text"
                                        name="personalVehicle.year"
                                        className="form-control"
                                        onChange={(e) =>
                                          setYear(e.target.value)
                                        }
                                      />
                                      <ErrorMessage
                                        name="personalVehicle.year"
                                        component="div"
                                        className="invalid-feedback"
                                       
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                      <label>
                                        Make <span>*</span>
                                      </label>
                                      <Field
                                        type="text"
                                        name="personalVehicle.make"
                                        className="form-control"
                                        onChange={(e) =>
                                          setMake(e.target.value)
                                        }
                                      />
                                      <ErrorMessage
                                        name="personalVehicle.make"
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                      <label>
                                        Model <span>*</span>
                                      </label>
                                      <Field
                                        type="text"
                                        name="personalVehicle.model"
                                        className="form-control"
                                        onChange={(e) =>
                                          setModel(e.target.value)
                                        }
                                      />
                                      <ErrorMessage
                                        name="personalVehicle.model"
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                      <label>
                                        Color <span>*</span>
                                      </label>
                                      <Field
                                        type="text"
                                        name="personalVehicle.color"
                                        className="form-control"
                                        onChange={(e) =>
                                          setColor(e.target.value)
                                        }
                                      />
                                      <ErrorMessage
                                        name="personalVehicle.color"
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </div>
                                  </div>
                                </div>
                                </>                            
                            )}

                          

                            {values.changeOption === "9" && (
                              <>
                                <div className="row">
                                  <div className="col-md-12 mb-3">
                                    <h2>
                                      Personal Information{" "}
                                      <span>*</span>
                                    </h2>
                                  </div>
                                  <label>Account Name</label>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <input
                                        name="First Name"
                                        type="text"
                                        className="form-control"
                                        onChange={handleaccount}
                                        value={firstname}
                                        placeholder="First Name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <input
                                        name="Last Name"
                                        type="text"
                                        // onChange={handleaccount}
                                        value={lastname}
                                        className="form-control"
                                        onChange={(e) =>
                                          setaccountOwnerlastName(
                                            e.target.value
                                          )
                                        }
                                        placeholder="Last Name"
                                      />
                                    </div>
                                  </div>
                                  <label>Company</label>
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <input
                                        name=""
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setcompanyName(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <label>
                                    <strong>Mailing Address</strong>
                                  </label>
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>
                                        Street Address<span>*</span>
                                      </label>
                                      <input
                                        name="Address"
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setStreetAddress(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>Street Address Line 2</label>
                                      <input
                                        name="Address"
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setStreetAddress2(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>City</label>
                                      <input
                                        name="Address"
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setcity(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>State / Province</label>
                                      <input
                                        name="Address"
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setstate(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Postal / Zip Code</label>
                                      <input
                                        name="postalCode"
                                        type="text"
                                        className="form-control"
                                        // setzipcode
                                        onChange={handlePostalChange}
                                        value={postal}
                                        placeholder="Enter your postal/zip code"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Country</label>
                                      <input
                                        name="Address"
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setCountry(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                      <label>
                                        Phone Number<span>*</span>
                                      </label>
                                      <input
                                        name="phone"
                                        type="text"
                                        className={`form-control ${phoneError ? "is-invalid" : ""
                                          }`}
                                        onChange={handlePhoneChange}
                                        value={phone}
                                        placeholder="Enter your phone number"
                                      />
                                      {phoneError && (
                                        <small className="text-danger">
                                          {phoneError}
                                        </small>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                      <label>
                                        Email<span>*</span>
                                      </label>
                                      <input
                                        name="email"
                                        type="email"
                                        className={`form-control ${emailError ? "is-invalid" : ""
                                          }`}
                                        onChange={handleEmailChange}
                                        value={email}
                                        placeholder="Enter your email"
                                      />
                                      {emailError && (
                                        <small className="text-danger">
                                          {emailError}
                                        </small>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          
                            <div className="col-md-6 col-sm-6">
                              <div class="form-group">
                                <label>Additonal Comments</label>
                                <textarea
                                  name="additionalCommentd"
                                  type="textarea"
                                  className={`form-control`}
                                  placeholder="Please explain what you're changing in your account"
                                  onChange={(e) => setComments(e.target.value)}
                                  style={{ width: "500px", height: "100px" }}
                                />
                              </div>
                            </div>

                            <div class="col-md-6 col-sm-6"></div>
                            {values.changeOption !== "9" && (
                              <>
                            <div className="col-md-6 col-sm-6">
                              <div className="form-group">
                                <strong>
                                  PAYMENT AUTHORIZATION <span>*</span>
                                </strong>
                              </div>
                            </div>
                            <br></br>
                            <br></br>
                           
                            <div className="col-md-10  col-sm-6  ">
                              <div className="form-group check-box">
                                <input
                                  name="paymentauth"
                                  type="checkbox"
                                  value="1"
                                  onChange={handleCheckboxChange}
                                />
                                <br></br>
                                <label>
                                  I authorize StoreMyTruck.com to charge my
                                  credit card on file for any additional or
                                  remaining vehicles stored/parked at our
                                  facilities, as reflected on this Account
                                  Change Form that I am submitting. I understand
                                  that this authorization will remain in effect
                                  until I cancel it in writing. I agree that no
                                  prior notification will be provided to me for
                                  each scheduled billing cycle payment.
                                  <span>*</span>
                                  <br></br>
                                </label>
                              </div>
                            </div>
                              
                        
                            <div
                              id="signature_pad_34"
                              className="signature-pad-wrapper"
                            >
                              <div
                                className="signature-line signature-wrapper signature-placeholder"
                                data-component="signature"
                              >
                                <div
                                  id="sig_pad_34"
                                  data-width="500" // Adjusted width
                                  data-height="200" // Adjusted height
                                  data-id="34"
                                  data-required="true"
                                  className="pad"
                                  aria-description="Use your pointer or touch input to draw your signature."
                                  aria-labelledby="label_34"
                                  tabIndex="0"
                                >
                                  <SignatureCanvas
                                    penColor="black"
                                    canvasProps={{
                                      className: "jSignature",
                                      width: 500, // Adjusted width
                                      height: 200, // Adjusted height
                                      style: {
                                        margin: "0px",
                                        padding: "0px",
                                        border: "none",
                                        touchAction: "none",
                                        backgroundColor: "rgb(255, 255, 255)",
                                      },
                                    }}
                                    ref={sigPad}
                                    onEnd={handleSignatureChange}
                                  />
                                </div>
                              </div>
                              <input
                                type="hidden"
                                name="q34_signature"
                                className="output4"
                                id="input_34"
                                value={signatureDataUrl}
                              />

                              <aside className="signature-pad-aside">
                                <span
                                  className="clear-pad-btn clear-pad"
                                  role="button"
                                  tabIndex="0"
                                  onClick={handleClearSignature}
                                >
                                  Clear
                                </span>
                              </aside>

                            
                            </div>
                              </>
                            )}
                          </div>
                        </div>
                        <a class="button" href="" onClick={submitForm}>
                          Submit
                        </a>
                      </div>
                    )}
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
