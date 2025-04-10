import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../../redux/slices/authSlice';

const NavContainer = styled.nav`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: #555;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #1e88e5;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: #555;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
  font-size: 1rem;
  padding: 0;

  &:hover {
    color: #1e88e5;
  }
`;

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <NavContainer>
      <NavContent>
        <Logo to="/">Campus Marketplace</Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/marketplace">Marketplace</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/social">Social Hub</NavLink>
              <NavLink to="/messages">Messages</NavLink>
              <NavLink to={`/profile/${user?._id}`}>Profile</NavLink>
              <NavButton onClick={handleLogout}>Logout</NavButton>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;
