import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getListings } from '../redux/slices/listingsSlice';

const MarketplaceContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const CreateButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: #1e88e5;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1976d2;
  }
`;

const FiltersContainer = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  color: #555;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #1e88e5;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #1e88e5;
  }
`;

const SearchButton = styled.button`
  padding: 0.75rem 1.5rem;
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

const CategoriesContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  
  &::-webkit-scrollbar {
    height: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }
`;

const CategoryButton = styled.button`
  padding: 0.75rem 1.25rem;
  background-color: ${props => props.active ? '#1e88e5' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid ${props => props.active ? '#1e88e5' : '#ddd'};
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  
  &:hover {
    background-color: ${props => props.active ? '#1976d2' : '#f9f9f9'};
  }
`;

const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ListingCard = styled(Link)`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ListingImage = styled.div`
  height: 180px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const ListingContent = styled.div`
  padding: 1rem;
`;

const ListingTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ListingPrice = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  color: #1e88e5;
  margin-bottom: 0.5rem;
`;

const ListingDetails = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.875rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 3rem;
`;

const categories = [
  'All', 'Books', 'Electronics', 'Furniture', 'Clothing', 
  'Appliances', 'Food', 'Services', 'Housing', 'Other'
];

// Mock listings data (replace with Redux data later)
const mockListings = [
  {
    _id: '1',
    title: 'Calculus Textbook',
    price: 45,
    category: 'Books',
    condition: 'Good',
    createdAt: '2025-03-01T12:00:00.000Z',
    location: 'North Campus'
  },
  {
    _id: '2',
    title: 'Desk Lamp',
    price: 15,
    category: 'Furniture',
    condition: 'Like New',
    createdAt: '2025-03-05T12:00:00.000Z',
    location: 'East Dorms'
  },
  {
    _id: '3',
    title: 'Wireless Earbuds',
    price: 35,
    category: 'Electronics',
    condition: 'Like New',
    createdAt: '2025-03-07T12:00:00.000Z',
    location: 'West Campus'
  },
  {
    _id: '4',
    title: 'Mini Fridge',
    price: 80,
    category: 'Appliances',
    condition: 'Good',
    createdAt: '2025-03-10T12:00:00.000Z',
    location: 'South Apartments'
  },
  {
    _id: '5',
    title: 'Psychology 101 Notes',
    price: 20,
    category: 'Books',
    condition: 'N/A',
    createdAt: '2025-03-12T12:00:00.000Z',
    location: 'Library'
  },
  {
    _id: '6',
    title: 'Winter Jacket',
    price: 30,
    category: 'Clothing',
    condition: 'Good',
    createdAt: '2025-03-15T12:00:00.000Z',
    location: 'North Campus'
  },
];

const Marketplace = () => {
  const dispatch = useDispatch();
  // const { listings, loading } = useSelector(state => state.listings);
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // For now, use mock data instead of Redux data
  useEffect(() => {
    // Simulate API loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
      if (activeCategory === 'All') {
        setFilteredListings(mockListings);
      } else {
        setFilteredListings(
          mockListings.filter(listing => listing.category === activeCategory)
        );
      }
    }, 500);
    
    // When Redux is ready:
    // dispatch(getListings());
  }, [activeCategory]);
  
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  return (
    <MarketplaceContainer>
      <Header>
        <Title>Campus Marketplace</Title>
        <CreateButton to="/marketplace/create">Create Listing</CreateButton>
      </Header>
      
      <FiltersContainer>
        <FilterRow>
          <FilterGroup>
            <Label htmlFor="search">Search</Label>
            <Input 
              type="text" 
              id="search" 
              placeholder="What are you looking for?"
            />
          </FilterGroup>
          
          <FilterGroup>
            <Label htmlFor="sort">Sort By</Label>
            <Select id="sort">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </Select>
          </FilterGroup>
          
          <FilterGroup>
            <Label htmlFor="location">Location</Label>
            <Select id="location">
              <option value="all">All Locations</option>
              <option value="north">North Campus</option>
              <option value="south">South Campus</option>
              <option value="east">East Dorms</option>
              <option value="west">West Campus</option>
            </Select>
          </FilterGroup>
          
          <SearchButton>Apply Filters</SearchButton>
        </FilterRow>
      </FiltersContainer>
      
      <CategoriesContainer>
        {categories.map(category => (
          <CategoryButton 
            key={category}
            active={activeCategory === category}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoriesContainer>
      
      {loading ? (
        <LoadingSpinner>Loading listings...</LoadingSpinner>
      ) : filteredListings.length > 0 ? (
        <ListingsGrid>
          {filteredListings.map(listing => (
            <ListingCard key={listing._id} to={`/marketplace/${listing._id}`}>
              <ListingImage>Item Image</ListingImage>
              <ListingContent>
                <ListingTitle>{listing.title}</ListingTitle>
                <ListingPrice>${listing.price}</ListingPrice>
                <ListingDetails>
                  <span>{listing.condition}</span>
                  <span>{formatDate(listing.createdAt)}</span>
                </ListingDetails>
              </ListingContent>
            </ListingCard>
          ))}
        </ListingsGrid>
      ) : (
        <NoResults>
          <h3>No listings found</h3>
          <p>Try changing your filters or create a new listing</p>
        </NoResults>
      )}
    </MarketplaceContainer>
  );
};

export default Marketplace;
