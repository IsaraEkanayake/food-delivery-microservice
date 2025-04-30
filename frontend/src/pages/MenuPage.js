import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const MenuPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenuAndRestaurant = async () => {
      try {
        setLoading(true);
        const restaurantRes = await axios.get(`/api/restaurants/${id}`);
        setRestaurant(restaurantRes.data);

        const menuRes = await axios.get(`/api/restaurants/${id}/menu`);
        setMenuItems(menuRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch menu data');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuAndRestaurant();
  }, [id]);

  const handleDelete = async (menuId) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;

    try {
      await axios.delete(`/api/restaurants/${id}/menu/${menuId}`);
      const menuRes = await axios.get(`/api/restaurants/${id}/menu`);
      setMenuItems(menuRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete menu item');
      console.error('Delete error:', err);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-link mb-4 d-flex align-items-center text-decoration-none"
      >
        <i className="bi bi-arrow-left-circle-fill me-2"></i> Back to Restaurants
      </button>

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {restaurant && (
        <div className="mb-5">
          <h1 className="fw-bold text-primary">{restaurant.name} Menu</h1>
          <p className="text-muted">{restaurant.address}</p>
        </div>
      )}

      {menuItems.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="text-muted">No menu items found for this restaurant.</h5>
        </div>
      ) : (
        <div className="row g-4">
          {menuItems.map((item) => (
            <div key={item._id || item.id} className="col-12 col-md-6 col-lg-4">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title">{item.name}</h5>
                    <span className="badge bg-success fs-6">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {item.description && (
                    <p className="card-text text-muted">{item.description}</p>
                  )}

                  {item.category && (
                    <span className="badge bg-primary mb-3">{item.category}</span>
                  )}

                  <div className="mt-auto">
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => navigate(`/menu/${id}/edit/${item._id || item.id}`)}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id || item.id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuPage;
