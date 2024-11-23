import React from 'react';
import logo from './../../src/components/images/logo.png'

const LoadingScreen = () => {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
            <img src={logo} alt='logo'/>
            </div>
      </div>
    );
};

export default LoadingScreen;