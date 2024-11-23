import React, { useState } from 'react';

import Login from './Log-in';
import Signin from './Sign-in';
import Forgotpassword from './forgotpassword';
const Popup = ({ onClose, callBackHe }) => {
  
  const [currentForm, setCurrentForm] = useState('login');

  const handleFormChange = (form) => {
    setCurrentForm(form);
  };

  const callMe = () => {
    callBackHe();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <button style={styles.closeButton} onClick={onClose}>X</button>
        {currentForm === 'login' && <Login onFormChange={handleFormChange} onClose={onClose} callBackHehe={() => callMe} />}
        {currentForm === 'register' && <Signin onFormChange={handleFormChange} />}
        {currentForm === 'forgotPassword' && <Forgotpassword onFormChange={handleFormChange} />}
        {currentForm === '/' && <Login onFormChange={handleFormChange} />}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    backgroundcolor:'#545955',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    position: 'relative',
    width: '800px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  }
};

export default Popup;
