import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8083/api/orders/customer/17');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchCustomerOrders();
  }, []);

  const handleAddItemsClick = () => {
    navigate('/menu');
  };

  const handleDeleteItem = async (orderId, itemId) => {
    try {
      await axios.delete(`http://localhost:8083/api/orders/${orderId}/customer/17`);
      setOrders(prevOrders => 
        prevOrders.filter(order => order.id !== orderId)
      );
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete item');
    }
  };

  const handleQuantityChange = async (orderId, itemId, newQty) => {
    if (newQty < 1) return;
    
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;
      
      const updatedOrder = {
        ...order,
        orderItems: order.orderItems.map(item => 
          item.id === itemId ? { ...item, qty: newQty } : item
        )
      };
      
      await axios.put(
        `http://localhost:8083/api/orders/${orderId}/customer/17`,
        updatedOrder
      );
      
      setOrders(prevOrders =>
        prevOrders.map(o => o.id === orderId ? updatedOrder : o)
      );
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update quantity');
    }
  };

  const calculateSubtotal = () => {
    return orders.reduce((sum, order) => {
      return sum + order.orderItems.reduce((orderSum, item) => {
        return orderSum + (parseFloat(item.price) * item.qty);
      }, 0);
    }, 0);
  };

  const subtotal = calculateSubtotal();

  const handleCheckout = () => {
    navigate('/'); // Navigate to home page
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button sx={{ mt: 2 }} onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: { xs: '100%', md: 800, lg: 1000 },
        mx: 'auto',
        p: { xs: 2, md: 4 },
        bgcolor: '#fafafa',
        color: '#333',
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 4 } }}>
        <IconButton sx={{ mr: 1 }} onClick={() => navigate(-1)}>
          <Typography variant="h6">{'←'}</Typography>
        </IconButton>
        <Typography variant="h5">Araliya Food Cabin</Typography>
      </Box>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: { xs: 2, md: 3 } }}
      >
        Deliver to 329 Welivita Rd
      </Typography>

      <Divider sx={{ bgcolor: 'grey.300', mb: { xs: 2, md: 3 } }} />

      {/* Cart Items */}
      {orders.length === 0 ? (
        <Typography sx={{ textAlign: 'center', py: 4 }}>
          Your cart is empty
        </Typography>
      ) : (
        orders.flatMap(order =>
          order.orderItems.map(item => (
            <Box key={`${order.id}-${item.id}`} sx={{ display: 'flex', mb: { xs: 2, md: 3 } }}>
              <Box
                component="img"
                src={'https://via.placeholder.com/100'}
                alt={item.name}
                sx={{
                  width: { xs: 80, md: 100 },
                  height: { xs: 80, md: 100 },
                  borderRadius: 1,
                  objectFit: 'cover',
                  mr: { xs: 1.5, md: 3 },
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Portion: {item.portion === 'regular' ? 'Regular' : 'Full'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ordered: {new Date(order.orderDate).toLocaleString()}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  LKR {parseFloat(item.price).toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IconButton onClick={() => handleDeleteItem(order.id, item.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    bgcolor: 'grey.200',
                    borderRadius: 1,
                    overflow: 'hidden',
                    mt: 1,
                  }}
                >
                  <IconButton 
                    size="small"
                    onClick={() => handleQuantityChange(order.id, item.id, item.qty - 1)}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ minWidth: 32, textAlign: 'center' }}>
                    {item.qty}
                  </Typography>
                  <IconButton 
                    size="small"
                    onClick={() => handleQuantityChange(order.id, item.id, item.qty + 1)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))
        )
      )}

      {/* Add Items */}
      <Button
        variant="outlined"
        fullWidth
        onClick={handleAddItemsClick}
        sx={{
          borderColor: 'grey.400',
          color: 'text.primary',
          textTransform: 'none',
          mb: { xs: 2, md: 3 },
          py: { xs: 1, md: 1.5 },
        }}
      >
        + Add items
      </Button>

      {/* Order Note */}
      <Box sx={{ mb: { xs: 2, md: 3 } }}>
        <Typography variant="h6" gutterBottom>
          Add an order note
        </Typography>
        <TextField
          placeholder="Utensils, special instructions, etc."
          variant="outlined"
          fullWidth
          multiline
          rows={3}
        />
      </Box>

      <Divider sx={{ bgcolor: 'grey.300', mb: { xs: 2, md: 3 } }} />

      {/* Subtotal */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: { xs: 2, md: 3 } }}>
        <Typography variant="h6">Subtotal</Typography>
        <Typography variant="h6">LKR {subtotal.toFixed(2)}</Typography>
      </Box>

      {/* Promotion Banner */}
      <Box
        sx={{
          bgcolor: '#2e7d32',
          color: '#fff',
          py: { xs: 1, md: 1.5 },
          px: { xs: 2, md: 3 },
          borderRadius: 1,
          textAlign: 'center',
          mb: { xs: 2, md: 3 },
        }}
      >
        Add LKR 350 to save 20% with promotions
      </Box>

      {/* Checkout */}
      <Button
        variant="contained"
        fullWidth
        disabled={orders.length === 0}
        onClick={handleCheckout} // Added onClick handler
        sx={{
          bgcolor: 'primary.main',
          color: '#fff',
          textTransform: 'none',
          py: { xs: 1.2, md: 1.8 },
          fontSize: { xs: '1rem', md: '1.1rem' },
        }}
      >
        Go to checkout
      </Button>
    </Box>
  );
};

export default Cart;