import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../../redux/slices/authSlice';

// Cart Icon Component
const CartIcon = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #555;
  margin-right: 1rem;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #ff6b35;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff6b35;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Become a Chef Button
const BecomeChefButton = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #ff6b35;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s;
  margin-right: 1rem;
  
  &:hover {
    background-color: #ff5719;
  }
  
  @media (max-width: 900px) {
    display: none;
  }
`;

const NavContainer = styled.nav`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.75rem 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-right: auto;
  }
`;

const NavSearch = styled.div`
  position: relative;
  margin: 0 1rem;
  flex-grow: 1;
  max-width: 400px;
  
  @media (max-width: 768px) {
    order: 3;
    margin: 0.5rem 0 0;
    width: 100%;
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #1e88e5;
    box-shadow: 0 0 0 2px rgba(30, 136, 229, 0.2);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-left: auto;
  }
  
  @media (max-width: 600px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: #555;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  white-space: nowrap;

  &:hover {
    color: #1e88e5;
  }
  
  &.active {
    color: #1e88e5;
    font-weight: 600;
  }
  
  @media (max-width: 600px) {
    font-size: 0.9rem;
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
  white-space: nowrap;

  &:hover {
    color: #1e88e5;
  }
  
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  
  @media (max-width: 900px) {
    display: block;
  }
`;

const NavLinksMobile = styled.div`
  display: none;
  
  @media (max-width: 900px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    z-index: 1000;
    
    ${NavLink}, ${NavButton} {
      padding: 0.75rem 0;
      border-bottom: 1px solid #eee;
      
      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  font-size: 0.875rem;
`;

const UserMenuDropdown = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 220px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
`;

const UserInfo = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const UserName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const UserEmail = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const DropdownLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const NotificationBadge = styled.div`
  position: relative;
  
  &::after {
    content: '${props => props.count}';
    position: absolute;
    top: -5px;
    right: -8px;
    background-color: #f44336;
    color: white;
    font-size: 0.7rem;
    font-weight: bold;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    display: ${props => props.count > 0 ? 'flex' : 'none'};
  }
`;

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  
  // Mock unread messages count - would come from Redux in real app
  const unreadMessages = 3;
  // Mock cart items count - would come from Redux in real app
  const cartItemCount = 3;
  
  useEffect(() => {
    // Close menu when clicking outside
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setUserMenuOpen(false);
    }
  };
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return '👤';
    
    const names = user.name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    
    return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
  };
  
  return (
    <NavContainer>
      <NavContent>
        <Logo to="/">Campi</Logo>
        
        <NavSearch>
          <form onSubmit={handleSearch}>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput 
              type="text" 
              placeholder="Search items, food, services..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </NavSearch>
        
        {/* Desktop Nav Links */}
        <NavLinks>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>Home</NavLink>
          <NavLink to="/marketplace" className={location.pathname.includes('/marketplace') ? 'active' : ''}>Marketplace</NavLink>
          <NavLink to="/food-marketplace" className={location.pathname.includes('/food-marketplace') ? 'active' : ''}>Food</NavLink>
          
          {isAuthenticated ? (
            <>
              {/* Become a Chef Button */}
              <BecomeChefButton to="/create-food-listing">Become a Chef</BecomeChefButton>
              
              {/* Cart Icon */}
              <CartIcon to="/cart">
                🛒
                {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
              </CartIcon>
              
              <NavLink to="/social" className={location.pathname.includes('/social') ? 'active' : ''}>Social</NavLink>
              <NavLink to="/messages" className={location.pathname.includes('/messages') ? 'active' : ''}>
                <NotificationBadge count={unreadMessages}>Messages</NotificationBadge>
              </NavLink>
              
              {/* User Menu */}
              <UserMenu ref={userMenuRef}>
                <UserAvatar onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  {getUserInitials()}
                </UserAvatar>
                
                <UserMenuDropdown isOpen={userMenuOpen}>
                  <UserInfo>
                    <UserName>{user?.name || 'User'}</UserName>
                    <UserEmail>{user?.email || 'user@example.com'}</UserEmail>
                  </UserInfo>
                  
                  <DropdownLink to={`/profile/${user?._id}`}>👤 My Profile</DropdownLink>
                  <DropdownLink to="/dashboard">📊 Dashboard</DropdownLink>
                  <DropdownLink to="/marketplace/create">📝 Create Listing</DropdownLink>
                  <DropdownLink to="/create-food-listing">🍲 Become a Chef</DropdownLink>
                  <DropdownLink to="/cart">🛒 My Cart</DropdownLink>
                  <DropdownLink to="/orders">📦 My Orders</DropdownLink>
                  <DropdownButton onClick={handleLogout}>🚪 Logout</DropdownButton>
                </UserMenuDropdown>
              </UserMenu>
            </>
          ) : (
            <>
              <NavLink to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</NavLink>
              <NavLink to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</NavLink>
            </>
          )}
          
          {/* Mobile menu toggle */}
          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            ☰
          </MobileMenuButton>
        </NavLinks>
        
        {/* Mobile Nav Menu */}
        <NavLinksMobile isOpen={mobileMenuOpen}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/marketplace">Marketplace</NavLink>
          <NavLink to="/food-marketplace">Food</NavLink>
          
          {isAuthenticated ? (
            <>
              <NavLink to="/create-food-listing">Become a Chef</NavLink>
              <NavLink to="/cart">My Cart ({cartItemCount})</NavLink>
              <NavLink to="/social">Social Hub</NavLink>
              <NavLink to="/messages">Messages</NavLink>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to={`/profile/${user?._id}`}>My Profile</NavLink>
              <NavLink to="/marketplace/create">Create Listing</NavLink>
              <NavLink to="/orders">My Orders</NavLink>
              <NavButton onClick={handleLogout}>Logout</NavButton>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </NavLinksMobile>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;
