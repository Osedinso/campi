import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ProfileHeader = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #999;
  
  @media (min-width: 768px) {
    margin-right: 2rem;
    margin-bottom: 0;
  }
`;

const ProfileInfo = styled.div`
  text-align: center;
  flex-grow: 1;
  
  @media (min-width: 768px) {
    text-align: left;
  }
`;

const ProfileName = styled.h1`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ProfileJoined = styled.p`
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ProfileStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1e88e5;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #666;
`;

const ProfileBio = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 0;
  max-width: 600px;
`;

const EditProfileButton = styled(Link)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  text-decoration: none;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? '#1e88e5' : '#666'};
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#1e88e5' : 'transparent'};
  transition: all 0.2s;
  
  &:hover {
    color: #1e88e5;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const ItemCard = styled(Link)`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ItemImage = styled.div`
  height: 180px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const ItemContent = styled.div`
  padding: 1rem;
`;

const ItemTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ItemPrice = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  color: #1e88e5;
  margin-bottom: 0.5rem;
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.875rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// Mock user data
const mockUser = {
  _id: 'user1',
  name: 'Alex Johnson',
  joinedDate: '2024-09-01T12:00:00.000Z',
  bio: 'Computer Science senior at State University. Passionate about tech, music, and sustainability. Always looking for good study spots and coffee on campus!',
  isOwner: true,
  stats: {
    listings: 5,
    sold: 12,
    posts: 8
  }
};

// Mock listings data
const mockListings = [
  {
    _id: '1',
    title: 'Calculus Textbook',
    price: 45,
    condition: 'Good',
    createdAt: '2025-03-01T12:00:00.000Z'
  },
  {
    _id: '2',
    title: 'Desk Lamp',
    price: 15,
    condition: 'Like New',
    createdAt: '2025-03-05T12:00:00.000Z'
  },
  {
    _id: '3',
    title: 'Wireless Earbuds',
    price: 35,
    condition: 'Like New',
    createdAt: '2025-03-07T12:00:00.000Z'
  }
];

// Mock sold items data
const mockSoldItems = [
  {
    _id: '4',
    title: 'Desk Chair',
    price: 50,
    condition: 'Good',
    createdAt: '2025-02-15T12:00:00.000Z'
  },
  {
    _id: '5',
    title: 'Python Programming Book',
    price: 30,
    condition: 'Like New',
    createdAt: '2025-02-20T12:00:00.000Z'
  }
];

const Profile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('listings');
  const [userData, setUserData] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [userSoldItems, setUserSoldItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Load mock data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API loading
    setTimeout(() => {
      setUserData(mockUser);
      setUserListings(mockListings);
      setUserSoldItems(mockSoldItems);
      setLoading(false);
    }, 500);
  }, [userId]);
  
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading profile...</div>;
  }
  
  if (!userData) {
    return <div style={{ textAlign: 'center', padding: '3rem' }}>User not found</div>;
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric',
      month: 'long'
    }).format(date);
  };
  
  const getActiveItems = () => {
    switch (activeTab) {
      case 'listings':
        return userListings;
      case 'sold':
        return userSoldItems;
      default:
        return [];
    }
  };
  
  const activeItems = getActiveItems();
  
  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileAvatar>👤</ProfileAvatar>
        
        <ProfileInfo>
          <ProfileName>{userData.name}</ProfileName>
          <ProfileJoined>Member since {formatDate(userData.joinedDate)}</ProfileJoined>
          
          <ProfileStats>
            <StatItem>
              <StatValue>{userData.stats.listings}</StatValue>
              <StatLabel>Listings</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{userData.stats.sold}</StatValue>
              <StatLabel>Sold</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{userData.stats.posts}</StatValue>
              <StatLabel>Posts</StatLabel>
            </StatItem>
          </ProfileStats>
          
          <ProfileBio>{userData.bio}</ProfileBio>
        </ProfileInfo>
        
        {userData.isOwner && (
          <EditProfileButton to="/profile/edit">Edit Profile</EditProfileButton>
        )}
      </ProfileHeader>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'listings'} 
          onClick={() => setActiveTab('listings')}
        >
          Active Listings
        </Tab>
        <Tab 
          active={activeTab === 'sold'} 
          onClick={() => setActiveTab('sold')}
        >
          Sold Items
        </Tab>
        <Tab 
          active={activeTab === 'posts'} 
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </Tab>
      </TabsContainer>
      
      {activeItems.length > 0 ? (
        <GridContainer>
          {activeItems.map(item => (
            <ItemCard key={item._id} to={`/marketplace/${item._id}`}>
              <ItemImage>Item Image</ItemImage>
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemPrice>${item.price}</ItemPrice>
                <ItemFooter>
                  <span>{item.condition}</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </ItemFooter>
              </ItemContent>
            </ItemCard>
          ))}
        </GridContainer>
      ) : (
        <EmptyState>
          <h3>No {activeTab} to display</h3>
          {activeTab === 'listings' && userData.isOwner && (
            <p>
              <Link to="/marketplace/create" style={{ color: '#1e88e5', textDecoration: 'none' }}>
                Create your first listing
              </Link>
            </p>
          )}
        </EmptyState>
      )}
    </ProfileContainer>
  );
};

export default Profile;
