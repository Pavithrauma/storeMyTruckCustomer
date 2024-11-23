import React, { useRef } from 'react';
import SignaturePad from 'react-signature-pad-wrapper';
import "./Parking.css";  

const SignatureField = ({ onChange }) => {
  const signaturePadRef = useRef();

  const handleClear = () => {
    signaturePadRef.current.clear();
    onChange('');
  };

  const handleSave = () => {
    const signature = signaturePadRef.current.toDataURL();
    onChange(signature);
  };

  return (
    <div>
      <SignaturePad
        ref={signaturePadRef}
        canvasProps={{
          width: 400,
          height: 200,
          className: 'signature-pad',
        }}
      />
      <div>
        <button className="canva-btn" onClick={handleClear}>Clear</button>
   
      </div>
    </div>
  );
};

export default SignatureField;
