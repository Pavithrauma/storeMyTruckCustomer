import React, { useState } from 'react';
import Popup from './Popup';

const Maincomponent = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  return (
    <div>
      <button onClick={openPopup}>Open Login Popup</button>
      {isPopupOpen && <Popup onClose={closePopup} />}
    </div>
  );
};

export default Maincomponent;
