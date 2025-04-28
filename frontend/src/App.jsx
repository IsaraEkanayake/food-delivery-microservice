import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import DeliveryLogin from './components/delivery-management/delivery-login/DeliveryLogin';
import DeliveryRegister from './components/delivery-management/delivery-login/DeliveryRegister';
import DeliveryDashboard from './components/delivery-management/delivery-dashboard/DeliveryDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Screens */}
        <Route path="/" element={<DeliveryLogin />} />
        <Route path="/register" element={<DeliveryRegister />} />
+        <Route path="/dashboard" element={<DeliveryDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
