import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const StatTitle = styled.h3`
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
`;

const StatChange = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: ${props => props.positive ? '#38b255' : '#e74c3c'};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 7px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.div`
  height: 180px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 1.5rem;
`;

const CardBody = styled.div`
  padding: 1.25rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const CardText = styled.p`
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardPrice = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
  color: #1e88e5;
`;

const CardStatus = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: ${props => props.active ? '#e3f2fd' : '#f5f5f5'};
  color: ${props => props.active ? '#1e88e5' : '#999'};
`;

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);
  
  return (
    <DashboardContainer>
      <Header>
        <Title>Dashboard</Title>
        <div>
          <Link to="/marketplace/create" style={{ textDecoration: 'none' }}>
            <button style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#1e88e5', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}>
              Add New Listing
            </button>
          </Link>
        </div>
      </Header>
      
      <StatsContainer>
        <StatCard>
          <StatTitle>Active Listings</StatTitle>
          <StatValue>5</StatValue>
          <StatChange positive>+2 this month</StatChange>
        </StatCard>
        
        <StatCard>
          <StatTitle>Total Sales</StatTitle>
          <StatValue>$320</StatValue>
          <StatChange positive>+$75 this month</StatChange>
        </StatCard>
        
        <StatCard>
          <StatTitle>Messages</StatTitle>
          <StatValue>12</StatValue>
          <StatChange positive>3 unread</StatChange>
        </StatCard>
        
        <StatCard>
          <StatTitle>Profile Views</StatTitle>
          <StatValue>48</StatValue>
          <StatChange positive>+15 this week</StatChange>
        </StatCard>
      </StatsContainer>
      
      <SectionTitle>Your Active Listings</SectionTitle>
      <GridContainer>
        <Card>
          <CardImage>Product Image</CardImage>
          <CardBody>
            <CardTitle>Calculus Textbook</CardTitle>
            <CardText>Early Transcendentals, 8th Edition. Used but in great condition with no markings.</CardText>
            <CardFooter>
              <CardPrice>$45</CardPrice>
              <CardStatus active>Active</CardStatus>
            </CardFooter>
          </CardBody>
        </Card>
        
        <Card>
          <CardImage>Product Image</CardImage>
          <CardBody>
            <CardTitle>Desk Lamp</CardTitle>
            <CardText>Adjustable LED desk lamp with multiple brightness settings and USB charging port.</CardText>
            <CardFooter>
              <CardPrice>$15</CardPrice>
              <CardStatus active>Active</CardStatus>
            </CardFooter>
          </CardBody>
        </Card>
        
        <Card>
          <CardImage>Product Image</CardImage>
          <CardBody>
            <CardTitle>Wireless Earbuds</CardTitle>
            <CardText>Almost new Bluetooth earbuds. Great battery life and sound quality.</CardText>
            <CardFooter>
              <CardPrice>$35</CardPrice>
              <CardStatus active>Active</CardStatus>
            </CardFooter>
          </CardBody>
        </Card>
      </GridContainer>
      
      <SectionTitle>Recent Activity</SectionTitle>
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0.75rem', borderBottom: '1px solid #eee' }}>
          <div>
            <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Someone messaged about your "Calculus Textbook"</p>
            <p style={{ color: '#666', fontSize: '0.875rem' }}>2 hours ago</p>
          </div>
          <button style={{ backgroundColor: '#f0f8ff', color: '#1e88e5', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', cursor: 'pointer' }}>View</button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0.75rem', borderBottom: '1px solid #eee' }}>
          <div>
            <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Your listing "Desk Chair" was sold</p>
            <p style={{ color: '#666', fontSize: '0.875rem' }}>1 day ago</p>
          </div>
          <button style={{ backgroundColor: '#f0f8ff', color: '#1e88e5', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', cursor: 'pointer' }}>View</button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem' }}>
          <div>
            <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Your post in Social Hub received 5 likes</p>
            <p style={{ color: '#666', fontSize: '0.875rem' }}>3 days ago</p>
          </div>
          <button style={{ backgroundColor: '#f0f8ff', color: '#1e88e5', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', cursor: 'pointer' }}>View</button>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
