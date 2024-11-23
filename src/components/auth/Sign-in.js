
import React, { useState, useEffect } from 'react';
import "./Sign.css";
import logo from './../images/logo.png';
import { Link } from "react-router-dom";
import { Button, Grid, TextField, Divider } from "@mui/material";
import { useFormik } from "formik";
import { RegisterSchema } from "../../components/validations/validationSchemas";
import { useAxios } from '../http/useAxios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
//import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import Login from './Log-in';
const Signin = ({ onFormChange,closeButton }) => {
  const { axios } = useAxios();
  const navigate = useNavigate();
  const [State, setState] = useState([]);
  const [selectedstate, setselectedstate] = useState('');
  const [stateID, setstateID] = useState('');
  const initialValues = {
    fullName: "",
    email: "",
    phone: {
      number: "",
      code: ""
    },
    acccountOwnerName: "",
    companyName: "",
    companyPhonenUmber: "",
    licenseNumber: "",
    statename:"",
    stateID: "" 
  };

  const formSubmit = async (values) => {
    try {
      const reqBody = {
        fullName: values.fullName,
        email: values.email,
        phone: {
          number: values.phone.number,
          code: values.phone.code
        },
        acccountOwnerName: values.acccountOwnerName,
        companyName: values.companyName,
        companyPhonenUmber: values.companyPhonenUmber,
        licenseNumber: values.licenseNumber,
        statename:values.statename,
        stateID: values.stateID  
      };
  
      const response = await axios.post(process.env.REACT_APP_BASE_URL_SIGNUP, reqBody);
      if (response.data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success",
          html: `<div style="color: black;">${response.data.message}</div>`,
          showConfirmButton: true,
          confirmButtonText: "OK",
          customClass: {
            popup: 'custom-swal-popup'
          },
        }).then(() => {
          navigate("/log-in");
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error",
          html: `<div style="color: black;">${response.data.message}</div>`,
          showConfirmButton: true,
          confirmButtonText: "OK",
          customClass: {
            popup: 'custom-swal-popup'
          },
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "An error occurred",
        html: `<div style="color: black;">${error.response?.data?.message || 'Something went wrong'}</div>`,
        showConfirmButton: true,
        confirmButtonText: "OK",
        customClass: {
          popup: 'custom-swal-popup'
        },
      });
    }
  };

  const handleStateChange = (e) => {
    const { id } = JSON.parse(e.target.value);  // Get the state ID from the selected option
    formik.setFieldValue("stateID", id);  // Set stateID in Formik's state
  };
  const Statetype = async () => {
    const statetype = process.env.REACT_APP_STATE_LIST;  // Correct API URL

    try {
      const res = await axios.get(statetype);
      console.log('API Response:', res);  // Log API response for debugging
      if (res?.data?.success) {
        setState(res.data.data.list);  // Set the state data
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

  // Fetch states when component mounts
  useEffect(() => {
    Statetype();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
    onSubmit: formSubmit,
  });

  return (
    <div className="sign-up-form" style={{color:'black'}}>
      <div className="container">
        <div className="cus-sign-row">
          <div className="cus-form">
            <div className="sign-img">
              <img src={logo} alt="logo" />
            </div>
            <h2>Sign Up</h2>
            <form onSubmit={formik.handleSubmit}>
              <Divider sx={{ marginBottom: "20px", marginTop: "20px" }} />
              <Grid container rowSpacing={2} columnSpacing={2} padding={1}>
                <Grid item xs={6}>
                  <TextField
                    className="form-control"
                    type="text"
                    name="fullName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                    label="Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                    helperText={formik.touched.fullName && formik.errors.fullName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className="form-control"
                    type="email"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    label="Email"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
              </Grid>
              <Grid container rowSpacing={2} columnSpacing={2} padding={1}>
                <Grid item xs={2}>
                  <TextField
                    className="form-control"
                    type="text"
                    name="phone.code"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone.code}
                    label="Code"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={formik.touched.phone?.code && Boolean(formik.errors.phone?.code)}
                    helperText={formik.touched.phone?.code && formik.errors.phone?.code}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    className="form-control"
                    type="text"
                    name="phone.number"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone.number}
                    label="Phone Number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={formik.touched.phone?.number && Boolean(formik.errors.phone?.number)}
                    helperText={formik.touched.phone?.number && formik.errors.phone?.number}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className="form-control"
                    type="text"
                    name="acccountOwnerName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.acccountOwnerName}
                    label="Account Owner Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={formik.touched.acccountOwnerName && Boolean(formik.errors.acccountOwnerName)}
                    helperText={formik.touched.acccountOwnerName && formik.errors.acccountOwnerName}
                  />
                </Grid>
              </Grid>
              <Grid container rowSpacing={2} columnSpacing={2} padding={1}>
                <Grid item xs={6}>
                  <TextField
                    className="form-control"
                    type="text"
                    name="companyName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.companyName}
                    label="Company Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                    helperText={formik.touched.companyName && formik.errors.companyName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className="form-control"
                    type="text"
                    name="companyPhonenUmber"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.companyPhonenUmber}
                    label="Company Phone Number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={formik.touched.companyPhonenUmber && Boolean(formik.errors.companyPhonenUmber)}
                    helperText={formik.touched.companyPhonenUmber && formik.errors.companyPhonenUmber}
                  />
                </Grid>
              </Grid>
              <Grid container rowSpacing={2} columnSpacing={2} padding={1}>
                <Grid item xs={6}>
                  <TextField
                    className="form-control"
                    type="text"
                    name="licenseNumber"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.licenseNumber}
                    label="License Number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={formik.touched.licenseNumber && Boolean(formik.errors.licenseNumber)}
                    helperText={formik.touched.licenseNumber && formik.errors.licenseNumber}
                  />
                </Grid>
              </Grid>
              <div className="form-group">
                <label>
                  State<span>*</span>
                </label>
                <select
                  name="stateID"
                  className="form-control"
                  onChange={handleStateChange}  // Update stateID in Formik on change
                >
                  <option value="">Please Select</option>
                  {Array.isArray(State) && State.map((stateData, index) => (
                    <option
                      key={index}
                      value={JSON.stringify({ id: stateData.stateId })}  // Send state ID
                    >
                      {stateData.stateName}  {/* Display the state name */}
                    </option>
                  ))}
                </select>
              </div>
              <Grid container rowSpacing={2} columnSpacing={2} padding={1}>
                <Grid item xs={4}>
                  <Button
                    variant="contained" 
                    sx={{
                      backgroundColor: "#d32f2f",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#c62828",
                      },
                    }}
                    type="submit"
                  >
                    Submit
                  </Button>
               
                </Grid>
              </Grid>
              <div className="line"></div>
            <div className="guest" style={{top:'20px'}}>
              <span>Already Have an account?
                <span>
                  <Link Link to="/Log-in">Log In</Link>
                </span>
              </span>
            </div>
            </form>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
