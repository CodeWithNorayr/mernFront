import React, { useCallback, useContext, useEffect } from 'react';
import "./Verify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
  const { token } = useContext(StoreContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`https://mernback-s3ih.onrender.com/api/order/verify`, { success, orderId },{headers:{
        "Authorization":`Bearer ${token}`
      }});
      if (response.data.success) {
        navigate('/orders');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      navigate('/');
    }
  };

  useEffect(() => {
    if (success && orderId) {
      verifyPayment();
    } else {
      navigate('/');
    }
  }, [success, orderId]);
  

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
