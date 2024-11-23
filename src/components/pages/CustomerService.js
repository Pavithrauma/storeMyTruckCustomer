import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import TextField from '@mui/material/TextField';
import './Pages.css';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import liveChatImage from '../images/live-chat.png';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Button from '@mui/material/Button';

function CustomerService() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [user, setUser] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});
  const [toDos, setToDos] = useState({
    vehicle: '',
  });
  useEffect(() => {
    const complex = async () =>{
 try{
   const response = await axios.get(
     "http://192.168.0.31:5000/api/storemytruck/user/list-customer-service"
   );
   setUser(response.data.data.list);
 }catch(error){
   console.log(error);
 }
    }
    complex();
   }, []);

  const handleChange = (field) => (event) => {
    setFormTouched({ ...formTouched, [field]: event.target.value });
  };

  const validate = () => {
    const errors = {};

    if (!formTouched.firstName || !formTouched.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formTouched.lastName || !formTouched.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formTouched.email || !formTouched.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formTouched.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!formTouched.phoneNumber || !formTouched.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formTouched.phoneNumber)) {
      errors.phoneNumber = 'Phone number is invalid';
    }

    if (!formTouched.issueDescription || !formTouched.issueDescription.trim()) {
      errors.issueDescription = 'Comments are required';
    }

    if (!toDos.vehicle) {
      errors.vehicle = 'Vehicle type is required';
    }

    return errors;
  };

  const handleSubmits = async (event) => {
    event.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Example API call or form submission logic
      try {
        await axios.post('http://192.168.0.31:5000/api/storemytruck/user/list-customer-service', formTouched);
        console.log('Form successfully submitted');
      } catch (error) {
        console.error('Submission error', error);
      }
      setFormSubmitted(true);
    }
  };

  return (
    <div>
      <Header />
      <div className='bluebox'>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            <Box>
              <Typography variant="h4" style={{ color: 'white' }}>CUSTOMER SERVICE, BILLING & CONTACT INFORMATION</Typography>
            </Box>
          </Container>
        </React.Fragment>
      </div>
      <div style={{ background: 'orange', height: '10vh', color: 'orange' }}>.</div>
      <h3 style={{ color: 'blue', textAlign: 'center', padding: '20px' }}><b>NEED FAST HELP? CHAT WITH US ONLINE!</b></h3>
      <div
        className="wsite-image wsite-image-border-none"
        style={{
          paddingTop: '10px',
          paddingBottom: '10px',
          marginLeft: '0',
          marginRight: '0',
          textAlign: 'center'
        }}
      >
        <a
          href="https://app.engati.com/static/standalone/bot.html?bot_key=cf3c5740644f410e&amp;launch_flow=welcome_57283&amp;env=p"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={liveChatImage}
            alt="Picture"
            style={{
              width: 'auto',
              maxWidth: '100%'
            }}
          />
        </a>
      </div>
      <h5 style={{ textAlign: 'right', color: 'red', padding: '20px', width: '50%' }}><b>Need Help with Making Monthly Parking Reservations? Watch our quick tutorial video below!</b></h5>
      
      <div className="form-container">
        <div className="video-container">
          <iframe src="//www.youtube.com/embed/l_4ooMfbT8Y?wmode=opaque" frameborder="0" allowfullscreen></iframe>
        </div>
        <div className="right-ticket">
          <form onSubmit={handleSubmits}>
            {!formSubmitted ? (
              <div>
                <p>Indicates required field<span style={{ color: 'red' }}>*</span></p>
                <p>Name<span style={{ color: 'red' }}>*</span></p>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="first-name"
                      label="First name"
                      variant="outlined"
                      error={!!formErrors.firstName}
                      helperText={formErrors.firstName}
                      onChange={handleChange('firstName')}
                      value={formTouched.firstName || ''}
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
                    />
                  </Grid>
                </Grid>
                <p>Email<span style={{ color: 'red' }}>*</span></p>
                <TextField
                  required
                  id="email"
                  fullWidth
                  label="E-mail"
                  variant="outlined"
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  onChange={handleChange('email')}
                  value={formTouched.email || ''}
                />
                <p>Phone number<span style={{ color: 'red' }}>*</span></p>
                <TextField
                  required
                  id="phone-number"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  error={!!formErrors.phoneNumber}
                  helperText={formErrors.phoneNumber}
                  onChange={handleChange('phoneNumber')}
                  value={formTouched.phoneNumber || ''}
                />
                <Typography variant="body1" gutterBottom>
                  Comments<span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  required
                  id="issue-description"
                  label="Comments"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  error={!!formErrors.issueDescription}
                  helperText={formErrors.issueDescription}
                  onChange={handleChange('issueDescription')}
                  value={formTouched.issueDescription || ''}
                />
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Vehicle <span style={{ color: 'red' }}>*</span>
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="vehicle"
                    name="vehicle"
                    value={toDos.vehicle}
                    onChange={(e) => setToDos({ ...toDos, vehicle: e.target.value })}
                  >
                    <FormControlLabel value="car" control={<Radio />} label="Yes" />
                    <FormControlLabel value="motorcycle" control={<Radio />} label="No" />
                  </RadioGroup>
                  {formErrors.vehicle && (
                    <Typography variant="body2" color="error">
                      {formErrors.vehicle}
                    </Typography>
                  )}
                </FormControl>
               <div>
               <Button type="submit" variant="contained" color="primary" className="mt-3">
                  Submit
                </Button>
               </div>
              </div>
              
            ) : (
              <div style={{ padding: '20px' }}>
                <Typography variant="h6" component="div">
                  <b style={{ color: 'blue', fontFamily: 'Arial, sans-serif' }}>
                    Thank you. Your information has been submitted. A Storemytruck.com representative will contact you shortly!
                  </b>
                </Typography>
              </div>
            )}
          </form>
        </div>
      </div>

      {Array.isArray(user) &&
                  user.map((item) => (
                  
                    <>
          {console.log(user)}
          <div className="contact-detail" key={item.id}>
            <h4><b style={{color:'red'}}>Contact Details</b></h4>
            <div className="contact-details-2">
              <div className="row mt-5">
                <div className="col-lg-4">
                 <p> <b>Customer Service/New Customers:</b></p>
                  <div className="contact-details-numbers">
                    <p>Phone: <a className="link" href={`tel:${item.phoneNumber}`}>{item.phoneNumber}</a></p>
                    <div className="contact-details-numbers-2">
                      <p>Fax: <a className="link" href="tel:678-585-1733">678-585-1733</a></p>
                    </div>
                  </div>
                </div>
              </div>
              <p><b>Accounting & Billing Department:</b> (Monday - Friday: 9am-5pm)</p>
              <div className="row">
                <div className="col-lg-4">
                  <p><b>For Billing Section:</b></p>
                  <div className="contact-details-numbers-2">
                    <p >Phone: <a style={{color:'red'}}className="link" href={`tel:${item.phoneNumber}`}>{item.phoneNumber} </a></p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <p><b>For Accounts Receivable:</b></p>
                  <div className="contact-details-numbers-2">
                    <p>Phone: <a className="link"style={{color:'red'}} href="tel:(470) 526-1637">(470) 526-1637</a></p>
                    <p>Email: <a className="link"style={{color:'red'}} href={`mailto:${item.email}`}>{item.email}</a></p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <p><b>For Account Changes and Updates:</b></p>
                  <div className="contact-details-numbers-2">
                    <p>Phone: <a className="link" style={{color:'red'}}href="tel:(678) 531-4622">(678) 531-4622</a></p>
                    <p>Email: <a className="link"style={{color:'red'}} href={`mailto:${item.email}`}>{item.email}</a></p>
                    {console.log(item)}
                  </div>
                </div>
                <div className="col-lg-4">
                  <p><b>For Account Cancellation:</b></p>
                  <div className="contact-details-numbers-2">
                    <p>Phone: <a className="link"style={{color:'red'}} href="tel:(404) 246-8576">(404) 246-8576</a></p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <p><b>For Boots/Impounds:</b></p>
                  <div className="contact-details-numbers-2">
                    <p>Phone: <a className="link" style={{color:'red'}}href="tel:(678) 933-4415">(678) 933-4415</a></p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <p><b>For Parking Permits:</b></p>
                  <div className="contact-details-numbers-2">
                    <p>Phone: <a className="link" style={{color:'red'}}href="tel:678-815-2775">678-815-2775</a></p>
                    <p>Fill out a <a className="link"style={{color:'red'}}>Parking Permit Request</a></p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <p><b>For Non-billing issues and after hours daily operations:</b> {item.shiftTime}</p>
                  <div className="contact-details-numbers-2">
                    <p>Phone: <a className="link"style={{color:'red'}} href="tel:678-631-7275">678-631-7275</a></p>
                    <p>Fill out a <a className="link"style={{color:'red'}}>Business offices are closed shiftTime</a></p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <p><b>For Emergencies Only Between {item.shiftTime}</b></p>
                  <div className="contact-details-numbers-2">
                    <p>Phone: <a className="link" style={{color:'red'}}href="tel:678-789-7441">678-789-7441</a> Mr. Tony</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
        ))}

      <Footer />
    </div>
  );
}

export default CustomerService;