import React, { useState } from 'react';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Image from '../images/logo.png';
import "./Pages.css";

const CustomerSupportTicket = () => {
  const [toDos, setToDos] = useState({
    typeOfParking: '',
    vehicle: '',
    typeOfDevice: '',
  });
  const [browser, setBrowser] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});
  const [gender, setGender] = useState('female');

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

    if (!browser) {
      errors.browser = 'Browser is required';
    }

    if (!issueDescription.trim()) {
      errors.issueDescription = 'Issue description is required';
    }

    return errors;
  };

  const handleBrowserChange = (event) => {
    setBrowser(event.target.value);
  };

  const handleIssueDescriptionChange = (event) => {
    setIssueDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles([...event.dataTransfer.files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Submit form
    }
  };

  const handleChange = (field) => (event) => {
    setFormTouched({ ...formTouched, [field]: event.target.value });
  };

  return (
    <div>
      <Header />
      <div className='bluebox'>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box
            sx={{
              // background: 'linear-gradient(to bottom, #000428, #004e92)',
              // height: '20vh',
              // width: '100%',
              // display: 'flex',
              // justifyContent: 'center',
              // alignItems: 'center',
              // color: 'white',
              // textAlign: 'center',
              // mb: 3,
            }}
          >
            <Typography variant="h4">Customer Support Ticket</Typography>
          </Box>
        </Container>
      </React.Fragment>
      </div>
      <Container maxWidth="md">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
            '& .MuiFormControl-root': { m: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >
          <div className='ticketname'
           
          >
            <img src={Image} alt="Image" style={{ height: '150px', marginBottom: '16px' }} />
            <Typography variant="h4" gutterBottom>
              STORE MY TRUCK
            </Typography>
            <Typography variant="h6" gutterBottom>
              SUPPORT TICKET FORM
            </Typography>
          </div>

          <div
            className="ticket"
           
          >
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

            <TextField
              required
              id="email"
              label="E-mail"
              variant="outlined"
              error={!!formErrors.email}
              helperText={formErrors.email}
              onChange={handleChange('email')}
              value={formTouched.email || ''}
            />

            <TextField
              required
              id="phone-number"
              label="Phone Number"
              variant="outlined"
              error={!!formErrors.phoneNumber}
              helperText={formErrors.phoneNumber}
              onChange={handleChange('phoneNumber')}
              value={formTouched.phoneNumber || ''}
            />

           

            <FormControl component="fieldset">
              <FormLabel component="legend">
                Type of Parking <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <RadioGroup
                aria-labelledby="type-of-parking"
                name="typeOfParking"
                value={toDos.typeOfParking}
                onChange={(e) => setToDos({ ...toDos, typeOfParking: e.target.value })}
              >
                <FormControlLabel value="street" control={<Radio />} label="Street" />
                <FormControlLabel value="garage" control={<Radio />} label="Garage" />
                <FormControlLabel value="reserved" control={<Radio />} label="Reserved" />
              </RadioGroup>
            </FormControl>

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
                <FormControlLabel value="car" control={<Radio />} label="Car" />
                <FormControlLabel value="motorcycle" control={<Radio />} label="Motorcycle" />
                <FormControlLabel value="bicycle" control={<Radio />} label="Bicycle" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">
                Type of Device <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <RadioGroup
                aria-labelledby="type-of-device"
                name="typeOfDevice"
                value={toDos.typeOfDevice}
                onChange={(e) => setToDos({ ...toDos, typeOfDevice: e.target.value })}
              >
                <FormControlLabel value="laptop" control={<Radio />} label="Laptop" />
                <FormControlLabel value="phone" control={<Radio />} label="Phone" />
                <FormControlLabel value="tablet" control={<Radio />} label="Tablet" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" error={!!formErrors.browser}>
              <FormLabel component="legend">
                Browser <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <select
                id="browser"
                name="browser"
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
                <option value="chrome">Chrome</option>
                <option value="firefox">Firefox</option>
                <option value="safari">Safari</option>
                <option value="edge">Edge</option>
                <option value="opera">Opera</option>
                <option value="other">Other</option>
              </select>
              {formErrors.browser && <Typography variant="body2" color="error">{formErrors.browser}</Typography>}
            </FormControl>

            <TextField
              required
              id="issue-description"
              label="Please describe your issue"
              variant="outlined"
              multiline
              rows={4}
              value={issueDescription}
              onChange={handleIssueDescriptionChange}
              error={!!formErrors.issueDescription}
              helperText={formErrors.issueDescription}
            />

            <FormLabel component="legend">
              Screenshot of Issue <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <Box
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              sx={{
                border: '2px dashed grey',
                borderRadius: '5px',
                padding: '16px',
                textAlign: 'center',
                cursor: 'pointer',
                mb: 3,
              }}
            >
              <Typography variant="body1" color="textSecondary">
                Drag and drop files here, or click to select files
              </Typography>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                <Typography variant="body1" color="primary">
                  Upload a File
                </Typography>
              </label>
            </Box>

            {files.length > 0 && (
              <Box mb={3}>
                <Typography variant="body2" color="textSecondary">
                  {files.length} file(s) selected
                </Typography>
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </Box>
            )}
          </div>
         
          <div className="col-md-12 col-sm-12" id="submit">
  <Button type="submit" variant="contained" color="primary" className="mt-3">
    Submit
  </Button>
</div>
        </Box>
      </Container>

      <Footer />
    </div>
  );
};

export default CustomerSupportTicket;
