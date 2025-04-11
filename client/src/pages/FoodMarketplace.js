import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const FoodMarketplaceContainer = styled.div`
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
  background-color: #ff6b35;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #ff5719;
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
    border-color: #ff6b35;
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
    border-color: #ff6b35;
  }
`;

const SearchButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #ff6b35;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #ff5719;
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
  background-color: ${props => props.active ? '#ff6b35' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid ${props => props.active ? '#ff6b35' : '#ddd'};
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  
  &:hover {
    background-color: ${props => props.active ? '#ff5719' : '#f9f9f9'};
  }
`;

const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const FoodCard = styled.div`
  background: white;
  border-radius: 12px;
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

const FoodImage = styled.div`
  height: 200px;
  background-color: #f0f0f0;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const FoodContent = styled.div`
  padding: 1.25rem;
`;

const FoodTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ChefName = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.75rem;
`;

const FoodDescription = styled.p`
  color: #6c757d;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const FoodDetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.25rem;
`;

const FoodPrice = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  color: #ff6b35;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: #f8f9fa;
  color: #666;
  border-radius: 30px;
  font-size: 0.75rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

const OrderButton = styled.button`
  background-color: #ff6b35;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #ff5719;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const categories = [
  'All', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Snacks', 
  'Vegetarian', 'Vegan', 'Gluten-Free', 'International'
];

// Mock food items data
const mockFoodItems = [
  {
    id: 1,
    title: 'Homemade Pasta Carbonara',
    chef: 'Maria Johnson',
    description: 'Authentic Italian pasta carbonara made with fresh eggs, pancetta, and parmesan cheese.',
    price: 12.99,
    category: 'Dinner',
    cuisine: 'Italian',
    dietary: [],
    rating: 4.7,
    location: 'North Campus',
    createdAt: '2025-03-10T12:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    title: 'Vegetarian Thai Curry',
    chef: 'Alex Chen',
    description: 'Fragrant Thai curry with fresh vegetables, tofu, and aromatic spices. Served with jasmine rice.',
    price: 10.99,
    category: 'Dinner',
    cuisine: 'Thai',
    dietary: ['Vegetarian'],
    rating: 4.5,
    location: 'East Dorms',
    createdAt: '2025-03-12T12:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    title: 'Classic Beef Burger',
    chef: 'James Wilson',
    description: 'Juicy beef patty with lettuce, tomato, cheese, and special sauce on a brioche bun. Comes with fries.',
    price: 9.99,
    category: 'Lunch',
    cuisine: 'American',
    dietary: [],
    rating: 4.8,
    location: 'Student Center',
    createdAt: '2025-03-15T12:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 4,
    title: 'Homemade Apple Pie',
    chef: 'Emma Davis',
    description: 'Classic American apple pie with a buttery crust and cinnamon-spiced filling. Made from scratch daily.',
    price: 7.99,
    category: 'Desserts',
    cuisine: 'American',
    dietary: ['Vegetarian'],
    rating: 4.9,
    location: 'West Campus',
    createdAt: '2025-03-08T12:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1562007908-17c67e878c6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 5,
    title: 'Vegan Buddha Bowl',
    chef: 'Sophia Martinez',
    description: 'Nutritious bowl filled with quinoa, roasted vegetables, avocado, and tahini dressing. Perfect healthy meal.',
    price: 11.99,
    category: 'Lunch',
    cuisine: 'International',
    dietary: ['Vegan', 'Gluten-Free'],
    rating: 4.6,
    location: 'South Campus',
    createdAt: '2025-03-14T12:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 6,
    title: 'Breakfast Burrito',
    chef: 'Michael Brown',
    description: 'Hearty breakfast burrito filled with scrambled eggs, bacon, cheese, potatoes, and fresh salsa.',
    price: 8.99,
    category: 'Breakfast',
    cuisine: 'Mexican',
    dietary: [],
    rating: 4.7,
    location: 'North Campus',
    createdAt: '2025-03-13T12:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 7,
    title: 'Homemade Sushi Rolls',
    chef: 'Yuki Tanaka',
    description: 'Fresh and delicious sushi rolls with cucumber, avocado, and your choice of tuna, salmon, or crab.',
    price: 14.99,
    category: 'Dinner',
    cuisine: 'Japanese',
    dietary: [],
    rating: 4.8,
    location: 'East Dorms',
    createdAt: '2025-03-11T12:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 8,
    title: 'Chocolate Chip Cookies',
    chef: 'Olivia Parker',
    description: 'Warm, gooey chocolate chip cookies made with premium chocolate and a secret family recipe.',
    price: 5.99,
    category: 'Desserts',
    cuisine: 'American',
    dietary: ['Vegetarian'],
    rating: 4.9,
    location: 'Library',
    createdAt: '2025-03-09T12:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

const FoodMarketplace = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  
  useEffect(() => {
    // Simulate API loading
    setLoading(true);
    setTimeout(() => {
      let filteredItems = [...mockFoodItems];
      
      // Filter by category (if not 'All')
      if (activeCategory !== 'All') {
        filteredItems = filteredItems.filter(item => item.category === activeCategory);
      }
      
      // Filter by location (if selected)
      if (locationFilter) {
        filteredItems = filteredItems.filter(item => item.location === locationFilter);
      }
      
      // Filter by search term (if any)
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredItems = filteredItems.filter(item => 
          item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.chef.toLowerCase().includes(term) ||
          item.cuisine.toLowerCase().includes(term)
        );
      }
      
      // Sort items based on selected option
      switch (sortOption) {
        case 'newest':
          filteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'oldest':
          filteredItems.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case 'price_low':
          filteredItems.sort((a, b) => a.price - b.price);
          break;
        case 'price_high':
          filteredItems.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredItems.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
      
      setFilteredFoodItems(filteredItems);
      setLoading(false);
    }, 500);
  }, [activeCategory, searchTerm, locationFilter, sortOption]);
  
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleLocationChange = (e) => {
    setLocationFilter(e.target.value);
  };
  
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  const handleApplyFilters = () => {
    // Filters are already applied in the useEffect
    // This function is just for the button click
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  return (
    <FoodMarketplaceContainer>
      <Header>
        <Title>Campus Food Hub</Title>
        <CreateButton to="/create-food-listing">Post Your Food</CreateButton>
      </Header>
      
      <FiltersContainer>
        <FilterRow>
          <FilterGroup>
            <Label htmlFor="search">Search Food or Chef</Label>
            <Input 
              type="text" 
              id="search" 
              placeholder="What are you craving?"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </FilterGroup>
          
          <FilterGroup>
            <Label htmlFor="sort">Sort By</Label>
            <Select 
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </Select>
          </FilterGroup>
          
          <FilterGroup>
            <Label htmlFor="location">Pickup Location</Label>
            <Select 
              id="location"
              value={locationFilter}
              onChange={handleLocationChange}
            >
              <option value="">All Locations</option>
              <option value="North Campus">North Campus</option>
              <option value="South Campus">South Campus</option>
              <option value="East Dorms">East Dorms</option>
              <option value="West Campus">West Campus</option>
              <option value="Student Center">Student Center</option>
              <option value="Library">Library</option>
              <option value="Downtown">Downtown</option>
            </Select>
          </FilterGroup>
          
          <SearchButton onClick={handleApplyFilters}>Apply Filters</SearchButton>
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
        <LoadingSpinner fullPage />
      ) : filteredFoodItems.length > 0 ? (
        <FoodGrid>
          {filteredFoodItems.map(item => (
            <FoodCard key={item.id}>
              <FoodImage image={item.image}>
                {!item.image && 'Food Image'}
              </FoodImage>
              <FoodContent>
                <FoodTitle>{item.title}</FoodTitle>
                <ChefName>Chef: {item.chef}</ChefName>
                
                <BadgeContainer>
                  {item.cuisine && <Badge>{item.cuisine}</Badge>}
                  {item.dietary.map(diet => (
                    <Badge key={diet}>{diet}</Badge>
                  ))}
                </BadgeContainer>
                
                <FoodDescription>{item.description}</FoodDescription>
                
                <FoodDetailsRow>
                  <FoodPrice>${item.price.toFixed(2)}</FoodPrice>
                  <OrderButton>Order Now</OrderButton>
                </FoodDetailsRow>
              </FoodContent>
            </FoodCard>
          ))}
        </FoodGrid>
      ) : (
        <NoResults>
          <h3>No food items found</h3>
          <p>Try changing your filters or be the first to post a food item!</p>
        </NoResults>
      )}
    </FoodMarketplaceContainer>
  );
};

export default FoodMarketplace;
