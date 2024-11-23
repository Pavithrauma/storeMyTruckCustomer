import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from './../images/logo.png';
import { useAxios } from '../../components/http/useAxios';
import Swal from 'sweetalert2';
//import 'sweetalert2/src/sweetalert2.scss';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = ({ onFormChange, onClose }) => {
  const { axios } = useAxios();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (formData.email.length === 0) {
      validationErrors.email = 'Please enter email';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      validationErrors.email = 'Invalid email address';
    }
    if (formData.password.length === 0) {
      validationErrors.password = 'Please enter password';
    } else if (formData.password.length < 3 || formData.password.length > 15) {
      validationErrors.password = 'Password must be between 3 and 15 characters';
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(process.env.REACT_APP_BASE_URL_LOGIN, formData);
        if (response.data.success) {
          const { username, token, customerId, role, companyName, companyPhonenUmber } = response.data.data;
          console.log("User data" + JSON.stringify( response.data.data ));
          localStorage.setItem("email", formData.email);
          localStorage.setItem("company_name", companyName);
          localStorage.setItem("phone_number", companyPhonenUmber);
          localStorage.setItem("name", username);
          localStorage.setItem("token", token);
          localStorage.setItem("userMode", "admin");
          localStorage.setItem("storemytruck_customer_id", customerId);
          localStorage.setItem("roles", JSON.stringify(role.roleCode));
          localStorage.setItem("role_name", JSON.stringify(role.roleName));

          Swal.fire({
            position: "top",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 3000,
          });
          navigate("/");
          if (onClose) onClose();
        } else {
          setErrors({ general: response.data.message });
        }
      } catch (error) {
        setErrors({ general: error.response?.data?.message || 'An unexpected error occurred.' });
      }
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleMembershipClick = () => {
    localStorage.setItem("name", "Membership User");
    localStorage.setItem("token", "membership-token");
    localStorage.setItem("userMode1", "membership");
    navigate("/");
    if (onClose) onClose();
  };

  const handleGuestClick = () => {
    localStorage.setItem("name", "Guest User");
    localStorage.setItem("token", "guest-token");
    localStorage.setItem("userMode2", "guest");
    navigate("/");
    if (onClose) onClose();
  };

  return (
    <div className="sign-up-form">
      <div className="row cus-sign-row">
        <div className="login-form">
          <div className="sign-img">
            <img src={logo} alt="logo" />
          </div>
          <h2>Welcome to Storemytruck</h2>

          {/* Display General Error Message */}
          {errors.general && <div className="error-message">{errors.general}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-12 col-xl-12">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="col-lg-12 col-xl-12">
                <label>Password</label>
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" >
                        <IconButton
                        sx={{color:'black'}}
                          aria-label="toggle password visibility"
                          onClick={handlePasswordVisibility}
                        >
                          {showPassword ? <VisibilityOff sx={{ color: 'black' }}/> : <Visibility  sx={{ color: 'black' }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>

              <div className="col-12 text-center">
                <button type="submit" className="red_btn">
                  Submit
                </button>
              </div>

              <div className="guest">
                <span><Link to='/forgotpassword'>Forgot Password</Link></span>
              </div>
            </div>
          </form>

          <div className="line"></div>
          <div className="guest">
            <div style={{ right: '-10px' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: 'green' }}
                onClick={handleMembershipClick}
              >
                Membership
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: '#bf2311' }}
                onClick={handleGuestClick}
              >
                Login as guest
              </Button>
            </div>
            <span>Don't have an account? <Link to="/Sign-in">Sign Up</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
