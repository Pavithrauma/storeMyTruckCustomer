import React from "react";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./Pages.css";

const contact = () => {
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
            <h1>Contact Us</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
      </section>
      <div className="content-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 universal">
            <h5><b>Need Help with Making Monthly Parking Reservations? Watch our quick tutorial video below! </b></h5>
            <iframe src="//www.youtube.com/embed/l_4ooMfbT8Y?wmode=opaque" frameborder="0" allowfullscreen width="100%"></iframe>
            </div>
            <div className="col-lg-6">
              <form action="#" id="quotation" novalidate="">
                <div className="step1">
                  <div className="row">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                      <div className="form-group"><label>NAME <span>*</span></label>
                      <input name="firstName" type="text" placeholder="First Name" className="form-control " value="" />
                      </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                      <div className="form-group"><label>LAST NAME<span>*</span></label>
                      <input name="firstName" type="text" placeholder="Last Name" className="form-control " value="" />
                      </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                      <div className="form-group"><label>EMAIL<span>*</span></label>
                      <input name="firstName" type="email" placeholder="Email id" className="form-control " value="" />
                      </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                      <div className="form-group"><label>PHONE NUMBER<span>*</span></label>
                      <input name="firstName" type="tel" placeholder="Phone Number" className="form-control " value="" />
                      </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <div className="form-group">
                      <div className="form-group"><label>QUESTION OR COMMENT<span>*</span></label>
                      <textarea />
                      </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12">
                    <a className="button mt-3" href="">Submit</a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="contact-details">
          <div className="row mt-5">
            <div className="col-lg-4">
             
                <h4 className="my-4">Customer Service/New Customers:</h4>
                <div className="contact-details-numbers">
                 <p> Phone : <Link to='tel:678-631-7275'> 678-631-7275</Link></p>
                 </div>
            </div>
            <div className="col-lg-4">
             
             <h4 className="my-4">Company Fax:</h4>
             <div className="contact-details-numbers">
              <p> Fax : <Link to='tel:678-585-1733'>678-585-1733</Link></p>
              </div>
         </div>
          </div>
          <h4 className="my-4">Accounting & Billing Department: (Monday - Friday:  9am- 5pm)</h4>
          <div className="row ">
            <div className="col-lg-4">
                <h5>For Biling Section:</h5>
                <div className="contact-details-numbers">
                 <p> Phone : <Link to='tel:678-631-7275'> 678-631-7275</Link></p>
                 </div>
            </div>
            <div className="col-lg-4">
                <h5>For Accounts Receivable :</h5>
                <div className="contact-details-numbers">
                 <p> Phone : <Link to='tel:(470) 526-1637'> (470) 526-1637</Link></p>
                 <p> Email : <Link to='mailto:accountsReceivable@storemytruck.com'> AccountsReceivable@storemytruck.com</Link></p>
                 </div>
            </div>
            <div className="col-lg-4">
                <h5>For Account Changes and Updates:</h5>
                <div className="contact-details-numbers">
                 <p> Phone : <Link to='tel:(678) 531-4622​'> (678) 531-4622​</Link></p>
                 <p> Email : <Link to='mailto:accounting@storemytruck.com'>Accounting@storemytruck.com</Link></p>
                 </div>
            </div>
            <div className="col-lg-4">
                <h5>For Account Cancellation:</h5>
                <div className="contact-details-numbers">
                 <p> Phone : <Link to='tel:(404) 246-8576​'> (404) 246-8576​</Link></p>
                 
                 </div>
            </div>
            <div className="col-lg-4">
                <h5>For Boots/Impounds:</h5>
                <div className="contact-details-numbers">
                 <p> Phone : <Link to='tel:(678) 933-4415'> (678) 933-4415​</Link></p>             
                 </div>
            </div>
          
          </div>
          <div className="row ">
            <div className="col-lg-4">
             
                <h4 className="my-4">For Parking Permits: </h4>
                <div className="contact-details-numbers">
                 <p> Phone : <Link to='tel:678-815-2775​ '>678-815-2775​ </Link></p>
                 <p>Fill out a <Link>Parking Permit Request</Link></p>
                 </div>
            </div>
            <div className="col-lg-4">
             
             <h4 className="my-4">For Non-billing issues and after hours daily operations:  (7am - 10:30pm) </h4>
             <div className="contact-details-numbers">
              <p> Phone : <Link to='tel:678-631-7275​'>678-631-7275</Link></p>
              <p>Fill out a <Link>Business offices are closed 10:30pm -7am </Link></p>
              </div>
         </div>
         <div className="col-lg-4">
             
             <h4 className="my-4">For Emergencies Only Between 10:30pm -7am:</h4>
             <div className="contact-details-numbers">
              <p> Phone : <Link to='tel:678-631-7275​'>678-789-7441 </Link>Mr. Tony</p>
              
              </div>
         </div>
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default contact;
