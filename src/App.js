import { BrowserRouter, Route, Routes } from "react-router-dom";


import React, { useState, useEffect } from "react";
import "./App.css";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./components/pages/Home";
import Locationvideos from "./components/pages/Location-videos";
import AllLocation from "./components/pages/All-location";
import Truckparking from "./components/pages/Truck-parking";
import Alabama from "./components/pages/Alabama-location";
import Signin from "./components/auth/Sign-in";
import Login from "./components/auth/Log-in";
import Texasdetail from "./components/pages/States-detail";
import Forgotpassword from "./components/auth/forgotpassword";
import MultiLocation from "./components/pages/ReserveParking/MultiLocation";
import MonthlyPrivateVehicle from "./components/pages/ReserveParking/MonthlyPrivateVehicle";
import Recommended from './components/pages/Recommended-Businesses';
import UniversalBootsystem from './components/pages/universalbootsystem';
import UniversalbootDetail from './components/pages/universalboot-details';
import Contact from './components/pages/Contact';
import SpecialOffers from './components/pages/Special-offers';
import Cancel from "./components/pages/ReserveParking/CancelParking";
import MonthlyParking from "./components/pages/ReserveParking/MonthlyParking";
import AccountChangeForm from "./components/pages/Account-change-form";
import CustomerSupportTicket from './components/pages/Customer-Support-Ticket';
import MakeandupdatePayment from "./components/pages/MakeandupdatePayment";
import Popup from "./components/auth/Popup";
import Maincomponent from "./components/auth/Maincomponent";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import WeekendParking from "./components/pages/ReserveParking/WeekendParking";
import WeeklyParking from "./components/pages/ReserveParking/WeeklyParking";
import CustomerService from "./components/pages/CustomerService";
import Parking from "./components/pages/ReserveParking/Parking";
import Parkingid from "./components/pages/ReserveParking/ParkingId";

import { Provider } from 'react-redux';
import { store } from './components/redux/store';
import userReducer from './components/redux/userSlice';
import { configureStore } from '@reduxjs/toolkit';


function App() {
  const [loading, setLoading] = useState(true);
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);

  //   const handleContextMenu = (e) => e.preventDefault();
  //   document.addEventListener('contextmenu', handleContextMenu);

  //   // Disable certain keyboard shortcuts
  //   const handleKeyDown = (e) => {
  //     if (e.ctrlKey && (e.key === 'I' || e.key === 'U' || e.key === 'J')) {
  //       e.preventDefault();
  //     }
  //   };
  //   document.addEventListener('keydown', handleKeyDown);

  //   // Clean up event listeners on component unmount
  //   return () => {
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);
  return (
    <Provider store={store}>
      <div className="App">
        {loading ? (
          <LoadingScreen />
        ) : (
          <BrowserRouter basename="/SMT_UAT/CMS/storemytruck">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/locationvideos" element={<Locationvideos />} />
              <Route path="/AllLocation" element={<AllLocation />} />
              <Route path="/truck" element={<Truckparking />} />
              <Route path="/recommended-business" element={<Recommended />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/monthlyParking" element={<MonthlyParking />} />
              <Route path="/AccountChangeForm" element={<AccountChangeForm />} />
              <Route path="/texas" element={<Alabama />} />
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/log-in" element={<Login />} />
              <Route path="/texas-details/:stateId" element={<Texasdetail />} />
              <Route path="/forgotpassword" element={<Forgotpassword />} />
              <Route path="/dailyParking" element={<Parking />} />
              <Route path="/MultiLocation" element={<MultiLocation />} />
              <Route path="/MonthlyPrivateVehicle" element={<MonthlyPrivateVehicle />} />
              <Route path="/universalbootsystem" element={<UniversalBootsystem />} />
              <Route path="/universalbootdetail" element={<UniversalbootDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/special-offers" element={<SpecialOffers />} />
              <Route path="/CustomerSupportTicket" element={<CustomerSupportTicket />} />
              <Route path="/MakeandupdatePayment" element={<MakeandupdatePayment />} />
              <Route path="/Popup" element={<Popup />} />
              <Route path="/Maincomponent" element={<Maincomponent />} />
              <Route path="/WeekendParking" element={<WeekendParking />} />
              <Route path="/WeeklyParking" element={<WeeklyParking />} />
              <Route path="/Parkingid" element={<Parkingid />} />
              <Route
                path="/cancel"
                element={
                  <ProtectedRoute>
                    <Cancel />
                  </ProtectedRoute>
                }
              />
              <Route path="/CustomerService" element={<CustomerService />} />
              <Route path="/DailyParking" element={<Parking />} />
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </Provider>
  );
}

export default App;