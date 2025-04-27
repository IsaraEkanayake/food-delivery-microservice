/* DeliveryLogin.jsx */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DeliveryLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: call your login API here, then:
    onLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm w-full">
      <div>
        <label htmlFor="loginEmail" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="loginEmail"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div>
        <label htmlFor="loginPassword" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          id="loginPassword"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
      >
        Login
      </button>
      <p className="mt-4 text-center text-sm">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </p>
    </form>
  );
};

export default DeliveryLogin;