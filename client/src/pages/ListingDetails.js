import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getListingById, deleteListing } from '../redux/slices/listingsSlice';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Breadcrumb = styled.div`
  margin-bottom: 1.5rem;
  
  a {
    color: #555;
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: #1e88e5;
    }
  }
  
  span {
    margin: 0 0.5rem;
    color: #999;
  }
`;

const ListingWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1.5fr 1fr;
  }
`;

const ImageSection = styled.div`
  border-radius: 8px;
  overflow: hidden;
  background-color: #f5f5f5;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 1.5rem;
`;

const DetailsSection = styled.div`
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Price = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
  color: #1e88e5;
  margin-bottom: 1.5rem;
`;

const InfoTable = styled.div`
  margin-bottom: 2rem;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.div`
  font-weight: 500;
  color: #666;
`;

const InfoValue = styled.div`
  color: #333;
`;

const Description = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  p {
    line-height: 1.6;
    color: #555;
  }
`;

const SellerSection = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SellerHeader = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #333;
`;

const SellerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SellerAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const SellerName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const SellerJoined = styled.div`
  font-size: 0.875rem;
  color: #666;
`;

const ContactButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1976d2;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const EditButton = styled(Link)`
  flex: 1;
  padding: 0.75rem;
  background-color: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const DeleteButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  background-color: #ffebee;
  color: #e53935;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #ffcdd2;
  }
`;

const LoadingSpinner = styled.div`
  padding: 5rem 0;
  text-align: center;
`;

// Mock listing data
const mockListing = {
  _id: '1',
  title: 'Calculus Textbook',
  price: 45,
  category: 'Books',
  condition: 'Good',
  location: 'North Campus',
  description: 'Early Transcendentals, 8th Edition. Used but in great condition with no markings or highlights. Perfect for Calculus I through III courses. Save over 75% compared to the bookstore price!',
  createdAt: '2025-03-01T12:00:00.000Z',
  seller: {
    _id: 'user1',
    name: 'Alex Johnson',
    joinedDate: '2024-09-01T12:00:00.000Z'
  },
  isOwner: true
};

const ListingDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading: authLoading, user } = useSelector(state => state.auth);
  
  // Use mock data for now
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setListing(mockListing);
      setLoading(false);
    }, 500);
    
    // When Redux is ready:
    // dispatch(getListingById(id));
  }, [id]);
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      // Simulate API call
      setTimeout(() => {
        alert('Listing deleted successfully!');
        navigate('/marketplace');
      }, 500);
      
      // When Redux is ready:
      // dispatch(deleteListing(id)).then(() => {
      //   navigate('/marketplace');
      // });
    }
  };
  
  // Format dates helper function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  if (loading) {
    return <LoadingSpinner>Loading listing details...</LoadingSpinner>;
  }
  
  if (!listing) {
    return (
      <Container>
        <h2>Listing not found</h2>
        <p>The listing you're looking for may have been removed or doesn't exist.</p>
        <Link to="/marketplace">Back to Marketplace</Link>
      </Container>
    );
  }
  
  return (
    <Container>
      <Breadcrumb>
        <Link to="/marketplace">Marketplace</Link>
        <span>›</span>
        <Link to={`/marketplace?category=${listing.category}`}>{listing.category}</Link>
        <span>›</span>
        {listing.title}
      </Breadcrumb>
      
      <ListingWrapper>
        <ImageSection>Product Image</ImageSection>
        
        <DetailsSection>
          <Title>{listing.title}</Title>
          <Price>${listing.price}</Price>
          
          <InfoTable>
            <InfoRow>
              <InfoLabel>Condition</InfoLabel>
              <InfoValue>{listing.condition}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Category</InfoLabel>
              <InfoValue>{listing.category}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Location</InfoLabel>
              <InfoValue>{listing.location}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Listed On</InfoLabel>
              <InfoValue>{formatDate(listing.createdAt)}</InfoValue>
            </InfoRow>
          </InfoTable>
          
          <Description>
            <h3>Description</h3>
            <p>{listing.description}</p>
          </Description>
          
          {listing.isOwner ? (
            <ActionButtons>
              <EditButton to={`/marketplace/${listing._id}/edit`}>Edit Listing</EditButton>
              <DeleteButton onClick={handleDelete}>Delete Listing</DeleteButton>
            </ActionButtons>
          ) : (
            <SellerSection>
              <SellerHeader>About the Seller</SellerHeader>
              <SellerInfo>
                <SellerAvatar>👤</SellerAvatar>
                <div>
                  <SellerName>{listing.seller.name}</SellerName>
                  <SellerJoined>Member since {formatDate(listing.seller.joinedDate)}</SellerJoined>
                </div>
              </SellerInfo>
              <ContactButton>Contact Seller</ContactButton>
            </SellerSection>
          )}
        </DetailsSection>
      </ListingWrapper>
    </Container>
  );
};

export default ListingDetails;
