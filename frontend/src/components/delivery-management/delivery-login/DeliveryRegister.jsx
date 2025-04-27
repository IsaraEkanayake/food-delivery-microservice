/* DeliveryRegister.jsx */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DeliveryRegister = ({ onRegister }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [phone, setPhone]       = useState('');
  const [vehicle, setVehicle]   = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== confirm) {
      return alert('Passwords do not match');
    }
    // TODO: call your register API here, then:
    onRegister({ fullName, email, phone, vehicle, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm w-full">
      <div>
        <label htmlFor="regName" className="block text-sm font-medium mb-1">
          Full Name
        </label>
        <input
          id="regName"
          type="text"
          required
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div>
        <label htmlFor="regEmail" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="regEmail"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div>
        <label htmlFor="regPhone" className="block text-sm font-medium mb-1">
          Phone Number
        </label>
        <input
          id="regPhone"
          type="tel"
          required
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div>
        <label htmlFor="regVehicle" className="block text-sm font-medium mb-1">
          Vehicle Details
        </label>
        <input
          id="regVehicle"
          type="text"
          placeholder="e.g. Bike, Car, Van"
          required
          value={vehicle}
          onChange={e => setVehicle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="regPassword" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="regPassword"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="regConfirm" className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            id="regConfirm"
            type="password"
            required
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
      >
        Register
      </button>
      <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link to="/" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default DeliveryRegister;
