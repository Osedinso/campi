import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from './redux/slices/authSlice';
import { initializeSocket, disconnectSocket } from './services/socketService';
import './App.css';

// Import routes
import AppRoutes from './routes/AppRoutes';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is authenticated on app load
    if (localStorage.getItem('token')) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);
  
  // Initialize socket connection when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const token = localStorage.getItem('token');
      if (token) {
        initializeSocket(token);
      }
    } else {
      disconnectSocket();
    }
    
    // Cleanup socket connection on component unmount
    return () => {
      disconnectSocket();
    };
  }, [isAuthenticated, user]);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
