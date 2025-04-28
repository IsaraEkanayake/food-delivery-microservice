// src/components/delivery-management/DriverProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DriverProfile = ({ driverId, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    vehicle: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:8084/api/driver/${driverId}`
        );
        const { fullName, email, phone, vehicle } = resp.data;
        setForm({ fullName, email, phone, vehicle, password: '' });
      } catch (err) {
        setError('Failed to load profile.');
      }
    };
    fetchDriver();
  }, [driverId]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const resp = await axios.put(
        `http://localhost:8084/api/driver/${driverId}`,
        form,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setSuccess('Profile updated successfully!');
      onUpdate(resp.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Update failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop show">
      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Your Profile</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger">{error}</div>
              )}
              {success && (
                <div className="alert alert-success">{success}</div>
              )}
              <form onSubmit={handleSubmit}>
                {['fullName', 'email', 'phone', 'vehicle', 'password'].map(field => (
                  <div className="mb-3" key={field}>
                    <label className="form-label" htmlFor={field}>
                      {field === 'fullName'
                        ? 'Full Name'
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type={field === 'password' ? 'password' : 'text'}
                      className="form-control"
                      value={form[field]}
                      onChange={handleChange}
                      disabled={loading}
                      required={field !== 'password'}
                    />
                    {field === 'password' && (
                      <div className="form-text">
                        Leave blank to keep current password
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading
                    ? <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
