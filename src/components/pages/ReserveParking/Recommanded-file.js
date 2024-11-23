import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./Pages.css";
import r1 from "./../images/r1.jpg";
import r2 from "./../images/r2.png";
import r3 from "./../images/r3.jpg";
import r4 from "./../images/r4.jpg";
import axios from "axios";

const Recommended = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
 
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.31:5000/api/storemytruck/user/list-recommended-business"
        );
        setData(response.data.data.list);
        // console.log('response');
        // console.log(response.data.data.list);
      } catch (error) {
        console.log(error);
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
            <h1>Recommended Business</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Recommended Business</li>
            </ul>
          </div>
        </div>
      </section>
      <div className="content-section">
        <div className="container">
          <div className="new-location">
            <section className="projects section" id="projects">
              <div className="row projects__container container grid">
                {Array.isArray(data) &&
                  data.map((item) => (
                    <>
                      <article className="col-lg-4 projects__container">
                        <div className="projects__image">
                          <img
                            src={item.productImage}
                            alt="image"
                            className="projects__img"
                          />
                        </div>
                        <div className="projects__content">
                          <h3 className="projects__subtitle">
                            {item.headingThree}
                          </h3>
                          <h2 className="projects__title">{item.headingOne}</h2>
                          <p className="projects__description">
                            {item.headingTwo}
                          </p>
                        </div>
                        <div className="projects__buttons">
                          <a
                            href={item.websiteUrl}
                            target="_blank"
                            className="projects__link"
                          >
                            <i className="ri-github-line" /> Visit Website
                          </a>
                        </div>
                      </article>
                    </>
                
                  ))}
                <article className="col-lg-4 projects__container">
                  <div className="projects__image">
                    <img src={r2} alt="image" className="projects__img" />
                  </div>
                  <div className="projects__content">
                    <h3 className="projects__subtitle">
                      Commercial Truck Towing & Wrecker Service
                    </h3>
                    <h2 className="projects__title">SAFARI TOWING</h2>
                    <p className="projects__description">
                      Providing the best 24 hr. commercial vehicle towing,
                      wrecker and recovery services in Atlanta, GA. Our
                      heavy-duty towing services are capable of towing the
                      largest of commercial vehicles, tractor trailers, semi
                      trucks, motorhomes and more! Contact us today to schedule
                      your towing service!
                    </p>
                  </div>
                  <div className="projects__buttons">
                    <a
                      href="https://www.safaritowingcompany.com/"
                      target="_blank"
                      className="projects__link"
                    >
                      <i className="ri-github-line" /> Visit Website
                    </a>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recommended;







// import React, { useEffect, useState } from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Header from '../header/Header';
// import Footer from '../footer/Footer';
// import TextField from '@mui/material/TextField';
// import './Pages.css';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';
// import liveChatImage from '../images/live-chat.png';  
// import Grid from '@mui/material/Grid';
// import axios from 'axios';
// import Button from '@mui/material/Button';
// import { Link } from "react-router-dom";

// function CustomerService() {
  
//   const [user, setUser] = useState([]); // Initialize state with null
//   const [formErrors, setFormErrors] = useState({});
//   const [formTouched, setFormTouched] = useState({});
//   const [toDos, setToDos] = useState({
//     typeOfParking: '',
//     vehicle: '',
//     typeOfDevice: '',
//   });
//   useEffect(() => {
//    const complex = async () =>{
// try{
//   const response = await axios.get(
//     "http://192.168.0.31:5000/api/storemytruck/user/list-customer-service"
//   );
//   setUser(response.data.data.list);
// }catch(error){
//   console.log(error);
// }
//    }
//    complex();
//   }, []);

//   const handleChange = (field) => (event) => {
//     setFormTouched({ ...formTouched, [field]: event.target.value });
//   };

//   const validate = () => {
//     const errors = {};

//     if (!formTouched.firstName || !formTouched.firstName.trim()) {
//       errors.firstName = 'First name is required';
//     }

//     if (!formTouched.lastName || !formTouched.lastName.trim()) {
//       errors.lastName = 'Last name is required';
//     }

//     if (!formTouched.email || !formTouched.email.trim()) {
//       errors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formTouched.email)) {
//       errors.email = 'Email address is invalid';
//     }
      
//     if (!formTouched.phoneNumber || !formTouched.phoneNumber.trim()) {
//       errors.phoneNumber = 'Phone number is required';
//     } else if (!/^\d{10}$/.test(formTouched.phoneNumber)) {
//       errors.phoneNumber = 'Phone number is invalid';
//     }

//     return errors;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const errors = validate();
//     setFormErrors(errors);

//     if (Object.keys(errors).length === 0) {
//       // Submit form data here
//       console.log('Form is valid and ready for submission');
//     }
//   };
//   if (formSubmitted) {
//     return (
//       <div className="thank-you-message">
//         <Typography variant="h5" component="h2">
//           Thank you. Your information has been submitted. A Storemytruck.com representative will contact you shortly!
//         </Typography>
//       </div>
//     );
//   }
//   return (
//     <div>
//       <Header />
//       <div className='bluebox'>
//         <React.Fragment>
//           <CssBaseline />
//           <Container maxWidth="lg">
//             <Box
//               sx={{
//                 // Uncomment and adjust styles if needed
//                 // background: 'linear-gradient(to bottom, #000428, #004e92)',
//                 // height: '20vh',
//                 // width: '100%',
//                 // display: 'flex',
//                 // justifyContent: 'center',
//                 // alignItems: 'center',
//                 // color: 'white',
//                 // textAlign: 'center',
//                 // mb: 3,
//               }}
//             >
//               <Typography variant="h4">CUSTOMER SERVICE, BILLING & CONTACT INFORMATION</Typography>
//             </Box>
//           </Container>
//         </React.Fragment>
//       </div>
//       <div style={{ background: 'orange', height: '10vh', color:'orange'}}>.</div>
//       <h3 style={{color:'blue', textAlign:'center',padding:'20px'}}><b>NEED FAST HELP? CHAT WITH US ONLINE!</b></h3>
//       <div
//         className="wsite-image wsite-image-border-none"
//         style={{
//           paddingTop: '10px',
//           paddingBottom: '10px',
//           marginLeft: '0',
//           marginRight: '0',
//           textAlign: 'center'
//         }}
//       >
//         <a
//           href="https://app.engati.com/static/standalone/bot.html?bot_key=cf3c5740644f410e&amp;launch_flow=welcome_57283&amp;env=p"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <img
//             src={liveChatImage}
//             alt="Picture"
//             style={{
//               width: 'auto',
//               maxWidth: '100%'
//             }}
//           />
//         </a>
//         <div style={{ display: 'block', fontSize: '90%' }}></div>
//       </div>
//       <h5 style={{textAlign:'center', color:'red'}}><b>Need Help with Making Monthly Parking Reservations? Watch our quick tutorial video below! </b></h5>
//       <div className="container">
//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             <div className="col-lg-6 universal">
            
//               <iframe src="//www.youtube.com/embed/l_4ooMfbT8Y?wmode=opaque" frameborder="0" allowfullscreen width="100%"></iframe>
//             </div>
//             <div className="col-lg-6">
//       <div className="right-ticket" style={{ padding: '20px' }}>
//         Indicates required field<span style={{ color: 'red' }}>*</span>
//         <br />
//         Name<span style={{ color: 'red' }}>*</span>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="first-name"
//               label="First name"
//               variant="outlined"
//               error={!!formErrors.firstName}
//               helperText={formErrors.firstName}
//               onChange={handleChange('firstName')}
//               value={formTouched.firstName || ''}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="last-name"
//               label="Last Name"
//               variant="outlined"
//               error={!!formErrors.lastName}
//               helperText={formErrors.lastName}
//               onChange={handleChange('lastName')}
//               value={formTouched.lastName || ''}
//             />
//           </Grid>
//         </Grid>
//         Email<span style={{ color: 'red' }}>*</span>
//         <br />
//         <TextField
//           required
//           id="email"
//           label="E-mail"
//           variant="outlined"
//           error={!!formErrors.email}
//           helperText={formErrors.email}
//           onChange={handleChange('email')}
//           value={formTouched.email || ''}
//         />
//         <br />
//         Phone number<span style={{ color: 'red' }}>*</span>
//         <br />
//         <TextField
//           required
//           id="phone-number"
//           label="Phone Number"
//           variant="outlined"
//           error={!!formErrors.phoneNumber}
//           helperText={formErrors.phoneNumber}
//           onChange={handleChange('phoneNumber')}
//           value={formTouched.phoneNumber || ''}
//         />
//         <Typography variant="body1" gutterBottom>
//           Comments<span style={{ color: 'red' }}>*</span>
//         </Typography>
//         <TextField
//           required
//           id="issue-description"
//           label="Comments"
//           variant="outlined"
//           multiline
//           rows={4}
//           // value={issueDescription}
//           // onChange={handleIssueDescriptionChange}
//           // error={!!formErrors.issueDescription}
//           // helperText={formErrors.issueDescription}
//         />
//         <br />
//         <br />
//         <FormControl component="fieldset">
//           <FormLabel component="legend">
//             Vehicle <span style={{ color: 'red' }}>*</span>
//           </FormLabel>
//           <RadioGroup
//             aria-labelledby="vehicle"
//             name="vehicle"
//             value={toDos.vehicle}
//             onChange={(e) => setToDos({ ...toDos, vehicle: e.target.value })}
//           >
//             <FormControlLabel value="car" control={<Radio />} label="Car" />
//             <FormControlLabel value="motorcycle" control={<Radio />} label="Motorcycle" />
//             <FormControlLabel value="bicycle" control={<Radio />} label="Bicycle" />
//           </RadioGroup>
//         </FormControl>
//         <div className="col-md-12 col-sm-12" id="submit">
//           <Button type="submit" variant="contained" color="primary" className="mt-3" onClick={handleSubmit}>
//             Submit
//           </Button>
//         </div>
//       </div>
//     </div>
//           </div>
//         </form>
//                 {Array.isArray(user) &&
//                   user.map((item) => (
                  
//                     <>
                
// <div class="container-2">
//         <h4 style={{color:'red'}}>Contact Details</h4>
//         <div class="contact-details-2">
//             <div class="row mt-5">
//                 <div class="col-lg-4">
//                 <b >Customer Service/New Customers:</b>
//                     <div class="contact-details-numbers">
//                         <h9>Phone: <a class="link" href="">{item.phoneNumber}</a></h9>
//                     {/* //<h7 class="my-4">Company Fax:</h7> */}
//                     <div class="contact-details-numbers-2">
//                         <h9>Fax: <a class="link" href="tel:678-585-1733">678-585-1733</a></h9>
//                         <br />
//                         <font color="#d5d5d5">_____________________________________</font>
//                 </div>
//                     </div>
//                 </div>
//             </div>
//             <h7 class="my-4"><b>Accounting & Billing Department:</b>(Monday - Friday: 9am-5pm)</h7>
//             <div class="row">
//                 <div class="col-lg-4">
//                     <h8>For Billing Section:</h8>
//                     <div class="contact-details-numbers-2">
//                         <h9>Phone: <a class="link" href="tel:678-631-7275">678-631-7275</a></h9>
//                         <br />
//                     </div>
//                 </div>
//                 <br/>
//                 <div class="col-lg-4">
//                     <h8>For Accounts Receivable:</h8>
//                     <div class="contact-details-numbers-2">
//                         <h9>Phone: <a class="link" href="tel:(470) 526-1637">(470) 526-1637</a></h9>
//                         <br/>
//                         <h9>Email: <a class="link" href="mailto:accountsReceivable@storemytruck.com">{item.email}</a></h9>
//                         <br />
//                     </div>
//                 </div>
//                 <div class="col-lg-4">
//                     <h8>For Account Changes and Updates:</h8>
//                     <div class="contact-details-numbers-2">
//                         <p>Phone: <a class="link" href="tel:(678) 531-4622">(678) 531-4622</a></p>
//                         <p>Email: <a class="link" href="">{item.email}</a></p>
//                         <br />
//                     </div>
//                 </div>
//                 <div class="col-lg-4">
//                     <h8>For Account Cancellation:</h8>
//                     <div class="contact-details-numbers-2">
//                         <p>Phone: <a class="link" href="tel:(404) 246-8576">(404) 246-8576</a></p>
//                         <br />
//                     </div>
//                 </div>
//                 <div class="col-lg-4">
//                     <h8>For Boots/Impounds:</h8>
//                     <div class="contact-details-numbers-2">
//                         <p>Phone: <a class="link" href="tel:(678) 933-4415">(678) 933-4415</a></p>
//                         <br />
//                     </div>
//                 </div>
//             </div>
//             <div class="row">
//                 <div class="col-lg-4">
//                     <b class="my-4">For Parking Permits:</b>
//                     <div class="contact-details-numbers-2">
//                         <p>Phone: <a class="link" href="tel:678-815-2775">678-815-2775</a></p>
//                         <p>Fill out a <a class="link">Parking Permit Request</a></p>
//                         <br />
//                     </div>
//                 </div>
//                 <div class="col-lg-4">
//                     <h8 class="my-4"><b>For Non-billing issues and after hours daily operations:</b>{item.shiftTime}</h8>
//                     <div class="contact-details-numbers-2">
//                         <p>Phone: <a class="link" href="tel:678-631-7275">678-631-7275</a></p>
//                         <p>Fill out a <a class="link">Business offices are closed shiftTime</a></p>
//                         <br />
//                     </div>
//                 </div>
//                 <div class="col-lg-4">
//                     <h8 class="my-4">For Emergencies Only Between {item.shiftTime}</h8>
//                     <div class="contact-details-numbers-2">
//                         <p>Phone: <a class="link" href="tel:678-789-7441">678-789-7441</a> Mr. Tony</p>
//                         <br />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     </>
//                   ))}
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default CustomerService;

