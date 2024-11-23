import React from "react";
import './Footer.css';
import scan from './../images/scan.png';
import { Link } from "react-router-dom";

const Footer = () => {
    return(
        <div>

        <div className="footer mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-xl-3 col-lg-3">
                        <h4 className="color-white">Scan the QR Code to Download our app</h4>
                        <img src={scan} alt="scan"/>
                        <p className="color-white">Parking at your fingertips</p>
                    </div>
                    <div className="col-xl-3 col-lg-3">
                        <h4 className="color-white">Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/truck">Locations</Link></li>
                            <li><Link to="/locationvideos">​Location Videos</Link></li>
                            <li><Link>Reserve A Space</Link></li>
                            <li><Link>Cancel / or change parking</Link></li>
                        </ul>
                    </div>
                    <div className="col-xl-3 col-lg-3">
                    <h4 className="color-white">Contact Us</h4>
                        <p>Customer Service: (24 Hours/7 Days) </p>
                        <Link to="tel:678-631-7275">678-631-7275</Link>
                        <p>Accounting & Billing Department <br/><span>Monday - Friday: 9 A.M. - 5 P.M.</span></p>
                        <p>Telephone Numbers: <br/><span>For Accounts Receivable (Invoices & Payments):</span></p>
                        <Link to="tel:(470) 526-1637">(470) 526-1637</Link>
                    </div>
                    <div className="col-xl-3 col-lg-3">
                    <h4 className="color-white">Contact Us</h4>
                        <p>For Account Changes and Updates:</p>
                        <Link to="tel:(678) 531-4622"> (678) 531-4622</Link>
                        <p>​​​For Account Cancellation:</p>
                        <Link to="tel:(404) 246-8576">(404) 246-8576</Link>
                        <p>​​Fax:</p>
                        <Link to="tel:678-585-1733">678-585-1733</Link>
                        <ul className="social-media">
                            <li><Link to="/"><i className="fa-brands fa-facebook-f"></i></Link></li>
                            <li><Link to="/"><i className="fa-brands fa-youtube"></i></Link></li>
                            <li><Link to="/"><i className="fa-brands fa-x-twitter"></i></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
              <div className="copy-rights">
                <div className="container">
                    <p className="color-white">© Copyright 2024 Storemytruck.All Rights Reserved | Design: <Link to='https://www.angleritech.com/' target="_blank">ANGLER Technologies</Link> - <Link to='https://www.digitalatrium.in/' target="_blank">DigitalAtrium</Link></p>
                </div>
              </div>     
        </div>

        
    )
}

export default Footer;