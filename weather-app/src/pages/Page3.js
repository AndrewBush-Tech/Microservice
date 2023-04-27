import React from 'react';
import { useNavigate } from 'react-router-dom';
import backArrow from '../back-arrow.png';
import './Page3.css';

function Page3() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <div style={{ paddingTop: '50px', paddingBottom: '50px' }} className="page-container">
      <h1>Settings Page</h1>
      <img
        src={backArrow}
        alt="back arrow"
        className="back-arrow"
        onClick={() => handleBack()}
      />
    </div>
  );
}

export default Page3;
