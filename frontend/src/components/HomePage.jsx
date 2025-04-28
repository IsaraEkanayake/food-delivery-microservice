// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Welcome</h1>
      <div className="d-grid gap-3 col-6 mx-auto">
        <button 
          className="btn btn-primary"
          onClick={() => handleNavigate('/order-login')}
        >
          Customer
        </button>
        <button 
          className="btn btn-success"
          onClick={() => handleNavigate('/restaurant')}
        >
          Restaurant
        </button>
        <button 
          className="btn btn-warning"
          onClick={() => handleNavigate('/delivery')}
        >
          Delivery
        </button>
      </div>
    </div>
  );
};

export default HomePage;
