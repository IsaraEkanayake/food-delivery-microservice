import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrderCheckout from './components/order-management/orderCheckout/orderCheckout';
import SelectOrder from './components/order-management/selectOrder/selectOrder';
import Cart from './components/order-management/Cart/Cart';
import Register from './components/order-management/Register/Register';
import Login from './components/order-management/Login/Login';
import Status from './components/order-management/Status/Status';
import Menu from './components/order-management/Menu/Menu';  // ← Import the Menu component

import DeliveryLogin from './components/delivery-management/delivery-login/DeliveryLogin';
import DeliveryRegister from './components/delivery-management/delivery-login/DeliveryRegister';
import DeliveryDashboard from './components/delivery-management/delivery-dashboard/DeliveryDashboard';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav style={{ padding: '20px', textAlign: 'center' }}>
          <Link to="/" style={{ margin: '0 15px', textDecoration: 'none', color: '#00B8D4' }}>
            Home
          </Link>
          <Link to="/menu" style={{ margin: '0 15px', textDecoration: 'none', color: '#00B8D4' }}>
            Menu
          </Link> {/* ← New Menu link */}
          <Link to="/select-order" style={{ margin: '0 15px', textDecoration: 'none', color: '#00B8D4' }}>
            Select Order
          </Link>
          <Link to="/cart" style={{ margin: '0 15px', textDecoration: 'none', color: '#00B8D4' }}>
            Cart
          </Link>
          <Link to="/register" style={{ margin: '0 15px', textDecoration: 'none', color: '#00B8D4' }}>
            Register
          </Link>
          <Link to="/login" style={{ margin: '0 15px', textDecoration: 'none', color: '#00B8D4' }}>
            Login
          </Link>
          <Link to="/status" style={{ margin: '0 15px', textDecoration: 'none', color: '#00B8D4' }}>
            Status
          </Link>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<OrderCheckout />} />
          <Route path="/menu" element={<Menu />} /> {/* ← New Menu route */}
          <Route path="/select-order" element={<SelectOrder />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/status" element={<Status />} />

          {/* Delivery Authentication Screens */}
          <Route path="/delivery-login" element={<DeliveryLogin />} />
          <Route path="/delivery-register" element={<DeliveryRegister />} />
          <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
