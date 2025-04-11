import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layout components
import MainLayout from '../components/layout/MainLayout';

// Auth pages
import Login from '../pages/Login';
import Register from '../pages/Register';

// Public pages
import Home from '../pages/Home';
import About from '../pages/About';

// Protected pages
import Dashboard from '../pages/Dashboard';
import Marketplace from '../pages/Marketplace';
import ListingDetails from '../pages/ListingDetails';
import CreateListing from '../pages/CreateListing';
import SocialFeed from '../pages/SocialFeed';
import Profile from '../pages/Profile';
import Messaging from '../pages/Messaging';

// Food Marketplace pages
import FoodMarketplace from '../pages/FoodMarketplace';
import CreateFoodListing from '../pages/CreateFoodListing';

// Private route component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  
  if (loading) return <div>Loading...</div>;
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Protected routes */}
        <Route 
          path="dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        
        {/* Marketplace routes */}
        <Route path="marketplace">
          <Route index element={<Marketplace />} />
          <Route path=":id" element={<ListingDetails />} />
          <Route 
            path="create" 
            element={
              <PrivateRoute>
                <CreateListing />
              </PrivateRoute>
            } 
          />
        </Route>
        
        {/* Food Marketplace routes */}
        <Route path="food-marketplace">
          <Route index element={<FoodMarketplace />} />
          <Route 
            path="create" 
            element={
              <PrivateRoute>
                <CreateFoodListing />
              </PrivateRoute>
            } 
          />
        </Route>
        
        {/* Direct route for creating food listing */}
        <Route 
          path="create-food-listing" 
          element={
            <PrivateRoute>
              <CreateFoodListing />
            </PrivateRoute>
          } 
        />
        
        {/* Social routes */}
        <Route 
          path="social" 
          element={
            <PrivateRoute>
              <SocialFeed />
            </PrivateRoute>
          } 
        />
        
        {/* Profile route */}
        <Route 
          path="profile/:userId" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />
        
        {/* Messaging routes */}
        <Route 
          path="messages" 
          element={
            <PrivateRoute>
              <Messaging />
            </PrivateRoute>
          } 
        />
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
