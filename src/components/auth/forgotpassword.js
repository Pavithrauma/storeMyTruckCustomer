import React, { useState } from 'react';
import "./Sign.css";
import { Link } from "react-router-dom";
import logo from './../images/logo.png';
import { useAxios } from '../../components/http/useAxios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
//import 'sweetalert2/src/sweetalert2.scss';
import Login from './Log-in';
const Forgotpassword = ({ onFormChange }) => { 
    const { axios } = useAxios();
    const [formData, setFormData] = useState({ email: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        
        // Validation logic
        if (!formData.email) {
            validationErrors.email = 'Please enter email';
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
            validationErrors.email = 'Invalid email address';
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            const requestBody = { email: formData.email };

            try {
                const response = await axios.post(process.env.REACT_APP_BASE_FORGOT_PASSWORD, requestBody);

                Swal.fire({
                    position: "top-end",
                    icon: response.data.success ? "success" : "error",
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });

                if (response.data.success) {
                    // Navigate to log-in page
                    // navigate("/log-in");
                }
            } catch (error) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "An error occurred",
                    text: error.response.data.message,
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        }
    };

    return (
        <div className="sign-up-form">
            <div className="row cus-sign-row">
                <div className="login-form">
                    <div className="sign-img">
                        <img src={logo} alt="logo"/>
                    </div>
                    <h2>Forgot Password</h2>
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
                            <div className="col-12 text-center">
                                <button type="submit" className="red_btn">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="line"></div>
                    <div className="guest">
                        <span>
                            <Link to='/Log-in'>Sign In</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forgotpassword;
