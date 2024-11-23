import React, { useState } from 'react';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import logo from '../../images/logo.png'; // Correctly import the logo
import './Parkingid.css';
//import ChatBot from 'react-simple-chatbot';
import { useAxios } from '../../../components/http/useAxios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
const Parkingid = () => {
  // State to manage form visibility
  const [isFormVisible, setIsFormVisible] = useState(true);
  // State to manage thank you message visibility
  const [isThankYouVisible, setIsThankYouVisible] = useState(false);
  const [firstName, setfirstname] = useState('');
  const [lastName, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const { axios } = useAxios();
  // Handle button click to show form
  const handleButtonClick = () => {
    setIsFormVisible(false);
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    setIsThankYouVisible(true); // Show thank you message
  };
  const submitForm = async (event) => {
    //   event.preventDefault();
    //   // if (!selectedFile) {
    //   //   alert('Please select a file before submitting.');
    //   //   return;
    //   // }

    //   // Check for acknowledgements first
    //   const newErrors = {
    //     security: !isAcknowledged.security,
    //     vehicleRelocation: !isAcknowledged.vehicleRelocation,
    //     agreement: !isAcknowledged.agreement,
    //     illegalParking: !isAcknowledged.illegalParking,
    //   };

    //   // Update the error state
    //   setErrors(newErrors);

    //   // Check if all required sections are acknowledged
    //   const allAcknowledged = Object.values(isAcknowledged).every(value => value === true);

    //   if (!allAcknowledged) {
    //     Swal.fire({
    //       position: 'top-end',
    //       icon: 'error',
    //       title: 'An error occurred',
    //       text: 'Please acknowledge all required sections.',
    //       showConfirmButton: false,
    //       confirmButtonText: 'OK',
    //     });
    //     return; // Stop the form submission if not all acknowledgments are made
    //   }

    //   const parkingDateString = new Date(parkingDate).toISOString();
    //   const startDateString = new Date(startDate).toISOString();
    //   const endDateString = new Date(endDate).toISOString();

    //   let vehicle_details = [{
    //     vehicleNumber: vehicleNumber || '',
    //     year: vehicleData.year || '',
    //     make: vehicleData.make || '',
    //     model: vehicleData.model || '',
    //     // trim: trim,
    //     color: vehicleData.color || '',
    //     companyNameOnTractor: companyNameOnTractor || '',
    //     usdot: usdot || '',
    //     otherinfo: otherinfo,
    //     trailerlength: trailerlength,
    //     trailertype: trailertype
    //   }];

    //   let formattedMonth = expirationMonth.toString().padStart(2, '0');
    //   let formattedYear = expirationYear.toString().slice(-2);

    const formData = new FormData();

    //   formData.append('parkingDate', parkingDateString);
    //   formData.append('startDate', startDateString);
    //   formData.append('endDate', endDateString);
    //   formData.append('parkingDays', parkingDays || '');
    //   formData.append('city', city || '');
    //   formData.append('streetAddress', streetAddress || '');
    //   formData.append('streetAddress2', streetAddress2 || '');
    //   formData.append('state', state || '');
    //   formData.append('postalCode', postalCode || '');
    //   formData.append('country', country || '');
    //   formData.append('totalAmount', amountdetail.totalAmount || '');
    //   formData.append('accountOwnerName', accountOwnerName || '');
    //   formData.append('accountOwnerlastName', accountOwnerlastName || '');
    //   formData.append('creditCardNumber', creditCardNumber || '');
    //   formData.append('securityCode', securityCode || '');
    //   formData.append('expirationMonth', formattedMonth || '');
    //   formData.append('expirationYear', formattedYear || '');
    //   formData.append('vehicleImages', selectedFile);
    //   formData.append('insuranceImages', insuranceCard);
    //   formData.append('licenseImages', driversLicense);


    //   vehicle_details.forEach((vehicle, index) => {
    //     Object.keys(vehicle).forEach(key => {
    //       formData.append(`vehicleDetails[${index}][${key}]`, vehicle[key] || '');
    //     });
    //   });
    //   // formData.append('signature', signature || '');
    //   formData.append('locationId', locationId || '');
    //   formData.append('amountdue', amountdetail.amountDue || '');
    //   formData.append('convenienceFee', amountdetail.convenienceFee || '');
    //   formData.append('companyNameOnTractor', companyNameOnTractor || '');
    //   formData.append('totalAmount2', amountdetail.totalAmount || '');

    //   formData.append('vehicleTypeId', vehicleTypeId || '');
    //   formData.append('vehicleTypeId', vehicleTypeId || '');
    //   formData.append('parkingTypeId', parkingTypeId || '');
    //   formData.append('vechicleCount', vechicleCount || '');
    //   if (signatureDataUrl) {
    formData.append('firstName', firstName || '');
    formData.append('lastName', lastName || '');
    formData.append('email', email || '');
    formData.append('phone', phone || '');
    formData.append('userId', localStorage.getItem("storemytruck_customer_id") || '');


    //     console.log(signatureDataUrl, 'jjjjj');
    //     const byteString = atob(signatureDataUrl.split(',')[1]);
    //     const mimeString = signatureDataUrl.split(',')[0].split(':')[1].split(';')[0];
    //     const ab = new ArrayBuffer(byteString.length);
    //     const ia = new Uint8Array(ab);

    //     for (let i = 0; i < byteString.length; i++) {
    //       ia[i] = byteString.charCodeAt(i);
    //     }

    //     const blob = new Blob([ab], { type: mimeString });

    //     // Append the signature blob to the FormData
    //     formData.append('signature', blob, 'signature.png');
    //   }
    try {

      const response = await axios.post(process.env.REACT_APP_BASE_USERID_PARKING, formData);

      // Swal.fire({
      //   position: 'top-end',
      //   icon: 'success',
      //   title: 'Daily parking enrolled successfully.',
      //   showConfirmButton: true,
      //   confirmButtonText: 'OK',
      // });

    }
    catch (error) {
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

    //   console.log("payload", formData);
  };
  return (
    <div>
      <Header />

      {isThankYouVisible ? (
       <div className={`thank-you-message ${isThankYouVisible ? 'show' : ''}`}>
       <i className="fa fa-check-circle" style={{ fontSize: '80px', color: '#70f06e',  }}></i>
       <h1><b>Thank You!</b></h1>
       <p>If your information matches our records, you will receive an email and a text message with your Parking ID!</p>
     </div>
     

      ) : (
        <div className="parent-box-child">
          {isFormVisible ? (
            <div className="parking-box-inner-child">
              {/* Display the logo */}
              <img src={logo} alt="Parking Logo" style={{ width: '100px', marginBottom: '20px' }} />

              <h3><b>Welcome! Request your parking ID</b></h3>
              <h4>
                If you are a current customer, please enter your email and mobile number,
                <br />
                and we'll email and text you your PARKING ID.
              </h4>

              <br />
              <h6>1 Question</h6>
              <div className="start-button" onClick={handleButtonClick}>
                Start{" "}
                <i className="fa fa-arrow-right arrow-icon" aria-hidden="true"></i>
              </div>
            </div>
          ) : (
            <div className="parent-box-child">
              <div>
                <img src={logo} alt="Parking Logo" style={{ width: '100px', margintop: '10px' }} />
              </div>
              <div className="form-container-2">

                <form onSubmit={handleFormSubmit}>
                  <p>Please enter your information below and we'll send you your Parking ID <span className="required">*</span></p>
                  <div className="form-group-1">
                    <label htmlFor="firstName" >First Name</label>
                    <input type="text" id="firstName" name="firstName" required onChange={(e) => setfirstname(e.target.value)} />
                  </div>
                  <div className="form-group-1">
                    <label htmlFor="lastName" >Last Name</label>
                    <input type="text" id="lastName" name="lastName" required
                      onChange={(e) => setlastname(e.target.value)} />
                  </div>
                  <div className="form-group-1">
                    <label htmlFor="email" >Email</label>
                    <input type="email" id="email" name="email" placeholder="example@email.com" required
                      onChange={(e) => setemail(e.target.value)} />
                  </div>
                  <div className="form-group-1">
                    <label htmlFor="phone">Mobile Phone</label>
                    <input type="tel" id="phone" name="phone" placeholder="(###) ###-####" required
                      onChange={(e) => setphone(e.target.value)} />
                  </div>
                  <button type="submit" className="submit-button" onClick={submitForm}>Submit</button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Parkingid;
