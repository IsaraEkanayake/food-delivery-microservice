/* App.jsx */
import React from 'react';
import {BrowserRouter as Router,Routes,Route,} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import DeliveryLogin from './components/delivery-management/delivery-login/DeliveryLogin';
import DeliveryRegister from './components/delivery-management/delivery-login/DeliveryRegister';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<DeliveryLogin />} />
          <Route path="/register" element={<DeliveryRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;