import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRestaurant = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    available: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await axios.post('/api/restaurants', formData);
      navigate('/restaurants');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add restaurant');
      console.error('Error adding restaurant:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6 space-y-6 border border-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Add New Restaurant</h2>
          <p className="mt-1 text-sm text-gray-500">
            Fill in the details below to add a new restaurant
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
            {error}
          </div>
        )}

<form onSubmit={handleSubmit}>
  {/* Restaurant Name Field */}
  <div className="mb-6">  {/* Increased from default to 1.5rem (24px) */}
    <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-3">  {/* Increased bottom margin */}
      Restaurant Name
    </label>
    <input
      type="text"
      id="name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
    />
  </div>

  {/* Address Field */}
  <div className="mb-6">  {/* Matching spacing */}
    <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-3">
      Address
    </label>
    <input
      type="text"
      id="address"
      name="address"
      value={formData.address}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
    />
  </div>

  {/* Checkbox Field */}
  <div className="mb-8 mt-2">  {/* Added top margin and increased bottom margin */}
    <div className="flex items-center">
      <input
        type="checkbox"
        id="available"
        name="available"
        checked={formData.available}
        onChange={handleChange}
        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
      />
      <label htmlFor="available" className="ml-2 text-sm text-gray-600">
        Currently Available
      </label>
    </div>
  </div>

  {/* Submit Button */}
  <div className="mt-6">  {/* Increased top margin */}
    <button
      type="submit"
      style={{
        backgroundColor: '#1a237e',  // Very dark blue
        ':hover': {
          backgroundColor: '#0d1542'  // Even darker on hover
        }
      }}
      disabled={isLoading}
      className={`
        w-full py-2 px-4 rounded-md text-white  
        bg-blue-900 hover:bg-blue-950
        transition-colors duration-200
        ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
      `}
    >
      {isLoading ? 'Adding...' : 'Add Restaurant'}
    </button>
  </div>
</form>
      </div>
    </div>
  );
};

export default AddRestaurant;

