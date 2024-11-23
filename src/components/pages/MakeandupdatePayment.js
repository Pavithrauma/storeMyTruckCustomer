import React, { useState } from 'react';
import dayjs from 'dayjs';
import Image from '../images/logo.png';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import './Pages.css';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
//import SignatureField from "./SignatureField.js";
import Radio from '@mui/material/Radio';
//import RadioGroup from '@mui/material/RadioGroup';
import SignatureField from './ReserveParking/SignatureField.js';
import Swal from 'sweetalert2';
const MakeandupdatePayment = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [time, setTime] = useState(dayjs().format('HH:mm'));
  const [browser, setBrowser] = useState('');
  const [vehicleCount, setVehicleCount] = useState('');
const[signature,setSignature]=useState('');
  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormTouched({ ...formTouched, [field]: value });
    if (value.trim() === '') {
      setFormErrors({ ...formErrors, [field]: 'This field is required.' });
    } else {
      setFormErrors({ ...formErrors, [field]: '' });
    }
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleBrowserChange = (event) => {
    setBrowser(event.target.value);
  };

  const handleVehicleCountChange = (event) => {
    setVehicleCount(event.target.value);
  };
  const handleSignatureChange = (value) => {
    setSignature(value);
  };
  const handleProtectedClick =()=>{
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
      // Proceed with the protected action
      
    }
  }
  return (  
    <div>
      <Header />
      <div onClick={handleProtectedClick}>
      <div className="auth1">
        <a
          href="https://verify.authorize.net/anetseal/?pid=4b8a4eb2-93e5-4223-847f-774760e72a09&amp;rurl=https://www.storemytruck.com"
          onMouseOver={() => (window.status = 'http://www.authorize.net/')}
          onMouseOut={() => (window.status = '')}
          onClick={() => window.open('https://verify.authorize.net/anetseal/?pid=4b8a4eb2-93e5-4223-847f-774760e72a09&amp;rurl=https://www.storemytruck.com',
            'AuthorizeNetVerification',
            'width=600,height=430,dependent=yes,resizable=yes,scrollbars=yes,menubar=no,toolbar=no,status=no,directories=no,location=yes')}
          rel="noopener noreferrer"
          target="_blank"
        >
          <img src="https://verify.authorize.net/anetseal/images/secure90x72.gif" width="90" height="72" border="0" alt="Authorize.Net Merchant - Click to Verify" />
        </a>
      </div>

      <div className="page-container">
        <div className="image-and-text">
          <img src={Image} alt="Image" style={{ height: '150px' }} />
          <div className="text-content">
            <Typography variant="h6" gutterBottom>
              MAKE & UPDATE PAYMENT INFORMATION
            </Typography>
            <Typography variant="body1" gutterBottom>
              Use to update your Credit Card. For Existing Monthly Customers ONLY!
            </Typography>
          </div>
        </div>

        <div className="centered-container">
          <div className="centered-content">
            <div className='details'>
              <Box component="form" sx={{ mt: 2, mx: 'auto', maxWidth: 600 }}>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="date"
                      label="Date"
                      variant="outlined"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      error={!!formErrors.date}
                      helperText={formErrors.date}
                      onChange={handleDateChange}
                      value={date}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="time"
                      label="Time"
                      variant="outlined"
                      type="time"
                      InputLabelProps={{ shrink: true }}
                      error={!!formErrors.time}
                      helperText={formErrors.time}
                      onChange={handleTimeChange}
                      value={time}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Typography variant="body1" gutterBottom>
                  StoreMyTruck Account Name <span style={{ color: 'red' }}>*</span>
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="first-name"
                      label="First Name"
                      variant="outlined"
                      error={!!formErrors.firstName}
                      helperText={formErrors.firstName}
                      onChange={handleChange('firstName')}
                      value={formTouched.firstName || ''}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="last-name"
                      label="Last Name"
                      variant="outlined"
                      error={!!formErrors.lastName}
                      helperText={formErrors.lastName}
                      onChange={handleChange('lastName')}
                      value={formTouched.lastName || ''}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Typography variant="body1" gutterBottom>
                  Company Name
                </Typography>
                <TextField
                  id="company"
                  label="Company Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={handleChange('company')}
                  value={formTouched.company || ''}
                />

                <Typography variant="body1" gutterBottom>
                  Phone Number <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  required
                  id="phone-number"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!formErrors.phoneNumber}
                  helperText={formErrors.phoneNumber}
                  onChange={handleChange('phoneNumber')}
                  value={formTouched.phoneNumber || ''}
                />

                <Typography variant="body1" gutterBottom>
                  Email <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  required
                  id="email"
                  label="E-mail"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  onChange={handleChange('email')}
                  value={formTouched.email || ''}
                />

                <Typography variant="body1" gutterBottom>
                  Confirm E-mail <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  required
                  id="confirm-email"
                  label="Confirm E-mail"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!formErrors.confirmEmail}
                  helperText={formErrors.confirmEmail}
                  onChange={handleChange('confirmEmail')}
                  value={formTouched.confirmEmail || ''}
                />

                <Typography variant="body1" gutterBottom>
                  Location <span style={{ color: 'red' }}>*</span>
                </Typography>
                <FormControl fullWidth>
                  <select
                    id="location"
                    name="location"
                    value={browser}
                    onChange={handleBrowserChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      margin: '8px 0',
                      border: `1px solid ${formErrors.browser ? 'red' : '#ccc'}`,
                      borderRadius: '4px',
                    }}
                    required
                  >
                    <option value="">Please Select</option>
                    <option value="location1">Location 1</option>
                    <option value="location2">Location 2</option>
                  </select>
                </FormControl>

                <Typography variant="body1" gutterBottom>
                  Vehicle Type <span style={{ color: 'red' }}>*</span>
                </Typography>
                <FormControl fullWidth>
                  <select
                    id="vehicleType"
                    name="vehicleType"
                    value={browser}
                    onChange={handleBrowserChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      margin: '8px 0',
                      border: `1px solid ${formErrors.browser ? 'red' : '#ccc'}`,
                      borderRadius: '4px',
                    }}
                    required
                  >
                    <option value="">Please Select</option>
                    <option value="tractor">Tractor</option>
                    <option value="trailer">Trailer</option>
                  </select>
                </FormControl>

                <Typography variant="body1" gutterBottom>
                  Total Number of Vehicles <span style={{ color: 'red' }}>*</span>
                </Typography>
                <FormControl fullWidth>
                  <select
                    id="total-vehicle-count"
                    name="total-vehicle-count"
                    value={vehicleCount}
                    onChange={handleVehicleCountChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      margin: '8px 0',
                      border: `1px solid ${formErrors.vehicleCount ? 'red' : '#ccc'}`,
                      borderRadius: '4px',
                    }}
                    required
                  >
                    <option value="">Please Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </FormControl>
                <Typography variant="body1" gutterBottom>
                Invoice number <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  required
                  id="Invoice number"
                  label="Invoice number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  onChange={handleChange('email')}
                  value={formTouched.email || ''}
                />
                 <Typography variant="body1" gutterBottom>
                Comments<span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField  
              required
              id="issue-description"
              label=" Comments"
              variant="outlined"
              multiline
              rows={4}
              // value={issueDescription}
              // onChange={handleIssueDescriptionChange}
              // error={!!formErrors.issueDescription}
              // helperText={formErrors.issueDescription}
            />
            <br/>
            <br/>
          <div className="payment-info">
  <p>
    <strong>All credit card payments are subject to a 3% Transaction Fee.</strong> You can pay your invoice by
    clicking on <span className="pay-button">Review and pay</span> button at the bottom of your invoice without
    being subject to transaction fees. Alternatively, you may pay via ACH without being subject to a transaction fee.
  </p>
</div>

              </Box>
            </div>
          </div>
        </div>
      </div>
      <div className="page-container">
        {/* <div className="image-and-text">
          <img src={Image} alt="Image" style={{ height: '150px' }} />
          <div className="text-content">
            <Typography variant="h6" gutterBottom>
              MAKE & UPDATE PAYMENT INFORMATION
            </Typography>
            <Typography variant="body1" gutterBottom>
              Use to update your Credit Card. For Existing Monthly Customers ONLY!
            </Typography>
          </div>
        </div> */}

        <div className="centered-container">
          <div className="centered-content">
            <div className='details'>
              <Box component="form" sx={{ mt: 2, mx: 'auto', maxWidth: 600 }}>
                {/* Payment Information Section */}
                <Typography variant="h6" gutterBottom>
                  PAYMENT INFORMATION
                </Typography>
                <Typography variant="body1" gutterBottom>
                  ENTER THE PERSON'S NAME ON THE CARD. NOT A COMPANY NAME
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="invoice-amount"
                      label="Invoice Amount"
                      variant="outlined"
                      type="number"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="transaction-fee"
                      label="Transaction Fee (3%)"
                      variant="outlined"
                      type="number"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <TextField
                  required
                  id="total-amount"
                  label="Total Amount"
                  variant="outlined"
                  type="number"
                  fullWidth
                  margin="normal"
                />

          <FormControlLabel
            value="update-payment"
            control={<Radio sx={{ top:'-0px',color: 'black','&.Mui-checked': { color: 'black' } }} />}
            label={
              <Typography variant="body1"
              
              >
                Please update my payment information and change my card on my billing cycle day of each month untill i cancel my parking (30 days prior to my text to my next billing cycle ).
              </Typography>
            }
          />
      
                <Typography variant="h7" gutterBottom>
                In the amount of: <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  required
                  id="amount"
                  label="Amount"
                  variant="outlined"
                  type="number"
                  fullWidth
                  margin="normal"
                />

                {/* Credit Card Information */}
                <Typography variant="h6" gutterBottom>
                  Credit Card Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="first-name"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="last-name"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <TextField
                  required
                  id="credit-card-number"
                  label="Credit Card Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  required
                  id="security-code"
                  label="Security Code"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="expiration-month"
                      label="Expiration Month"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="expiration-year"
                      label="Expiration Year"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                {/* Billing Address */}
                <Typography variant="h6" gutterBottom>
                  Billing Address
                </Typography>
                <TextField
                  required
                  id="street-address"
                  label="Street Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="street-address-line-2"
                  label="Street Address Line 2"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="city"
                      label="City"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="state-province"
                      label="State/Province"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <TextField
                  required
                  id="postal-code"
                  label="Postal/Zip Code"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  required
                  id="country"
                  label="Country"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
      
    <FormControl fullWidth sx={{ my: 2 }}>
      <Typography variant="body1" gutterBottom>
        You authorize regularly scheduled charges to your credit card. You will be charged
        the amount above on the date you indicated on each billing period. A receipt for
        each payment will be provided to you automatically and the charge will appear on
        your credit card statement. You agree that no prior notification will be provided
        unless the date or amount changes.
      </Typography>
      <FormControl component="fieldset">
        <FormControlLabel
          control={
            <Checkbox className='form-group check-box'
              required
              sx={{
                color: 'black', // Set the default color of the checkbox
                '&.Mui-checked': {
                  color: 'black', // Set the color when the checkbox is checked
                },
                '&:hover': {
                 border:'red',
                  backgroundColor: 'transparent', // Optional: Remove the default background on hover
                },
              }}
            />
          }
          label="I Authorize"
        />
      </FormControl>
    </FormControl>
                <div className="form-group">
                                <label>Signature <span>*</span></label>
                                <SignatureField
                                  onChange={handleSignatureChange}
                                />
                                {signature && (
                                  <div>
                                    <img src={signature} alt="Signature" />
                                  </div>
                                )}
                                
                              </div>

              </Box>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default MakeandupdatePayment;
