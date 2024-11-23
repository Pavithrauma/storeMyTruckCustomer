import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ children }) => {
  const [redirect, setRedirect] = useState(false);
  const userMode = localStorage.getItem('userMode');

  useEffect(() => {
    if (userMode === 'guest') {
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'As a guest user, you can only access the home page.',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      }).then(() => {
        setRedirect(true);  // Set the flag to redirect after Swal finishes
      });
    }
  }, [userMode]);

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (userMode === 'guest') {
    // Return null while waiting for the Swal popup to finish
    return null;
  }

  return children;
};

export default ProtectedRoute;
