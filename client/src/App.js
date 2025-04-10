import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './redux/slices/authSlice';
import './App.css';

// Import routes
import AppRoutes from './routes/AppRoutes';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is authenticated on app load
    if (localStorage.getItem('token')) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
