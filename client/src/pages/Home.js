import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeroSection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.primary ? '#ffffff' : 'transparent'};
  color: ${props => props.primary ? '#6a11cb' : '#ffffff'};
  border: 2px solid #ffffff;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const FoodButton = styled(Button)`
  background-color: ${props => props.active ? '#ff6b35' : (props.primary ? '#ffffff' : 'transparent')};
  color: ${props => props.active ? '#ffffff' : (props.primary ? '#6a11cb' : '#ffffff')};
  border-color: ${props => props.active ? '#ff6b35' : '#ffffff'};

  &:hover {
    background-color: ${props => props.active ? '#ff5719' : (props.primary ? '#f8f8f8' : 'rgba(255, 255, 255, 0.1)')};
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f8f9fa;
`;

const FeatureTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #6a11cb;
`;

const FeatureHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #6c757d;
  line-height: 1.6;
`;

// Chef Recommendations Section
const ChefRecommendationsSection = styled.section`
  padding: 4rem 2rem;
  background-color: #fff;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const ChefRecsTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
`;

const ChefRecsSubtitle = styled.p`
  text-align: center;
  color: #666;
  max-width: 700px;
  margin: 0 auto 3rem;
`;

const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FoodCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const FoodImage = styled.div`
  height: 200px;
  background-color: #f8f9fa;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FoodInfo = styled.div`
  padding: 1.5rem;
`;

const FoodName = styled.h3`
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
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const FoodDetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const FoodPrice = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  color: #ff6b35;
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

const ViewAllButton = styled(Link)`
  display: block;
  width: fit-content;
  margin: 3rem auto 0;
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: #ff6b35;
  border: 2px solid #ff6b35;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ff6b35;
    color: white;
  }
`;

// Mock chef recommendations data
const mockFoodItems = [
  {
    id: 1,
    name: 'Homemade Pasta Carbonara',
    chef: 'Maria Johnson',
    description: 'Authentic Italian pasta carbonara made with fresh eggs, pancetta, and parmesan cheese.',
    price: 12.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    name: 'Vegetarian Thai Curry',
    chef: 'Alex Chen',
    description: 'Fragrant Thai curry with fresh vegetables, tofu, and aromatic spices. Served with jasmine rice.',
    price: 10.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    name: 'Classic Beef Burger',
    chef: 'James Wilson',
    description: 'Juicy beef patty with lettuce, tomato, cheese, and special sauce on a brioche bun. Comes with fries.',
    price: 9.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 4,
    name: 'Homemade Apple Pie',
    chef: 'Emma Davis',
    description: 'Classic American apple pie with a buttery crust and cinnamon-spiced filling. Made from scratch daily.',
    price: 7.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1562007908-17c67e878c6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

const Home = () => {
  const [showFoodSection, setShowFoodSection] = useState(false);
  
  // Toggle food section when the food button is clicked
  const handleFoodButtonClick = (e) => {
    e.preventDefault();
    setShowFoodSection(!showFoodSection);
    
    // Scroll to chef recommendations section when showing it
    if (!showFoodSection) {
      setTimeout(() => {
        document.getElementById('chef-recommendations').scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <HeroSection>
        <HeroTitle>Campus Marketplace & Social Hub</HeroTitle>
        <HeroSubtitle>
          A comprehensive platform for college students to buy, sell, share homemade food, 
          and connect with others on campus.
        </HeroSubtitle>
        <ButtonContainer>
          <Button to="/marketplace" primary>Explore Marketplace</Button>
          <FoodButton 
            as="a" 
            href="#" 
            onClick={handleFoodButtonClick}
            active={showFoodSection}
          >
            {showFoodSection ? 'Hide Food Options' : 'Explore Food'}
          </FoodButton>
          <Button to="/register">Join Now</Button>
        </ButtonContainer>
      </HeroSection>

      <ChefRecommendationsSection id="chef-recommendations" visible={showFoodSection}>
        <ChefRecsTitle>Chef Recommendations</ChefRecsTitle>
        <ChefRecsSubtitle>
          Discover delicious homemade meals prepared by talented student chefs on campus
        </ChefRecsSubtitle>
        
        <FoodGrid>
          {mockFoodItems.map(food => (
            <FoodCard key={food.id}>
              <FoodImage image={food.image}>
                {!food.image && 'Food Image'}
              </FoodImage>
              <FoodInfo>
                <FoodName>{food.name}</FoodName>
                <ChefName>Chef: {food.chef}</ChefName>
                <FoodDescription>{food.description}</FoodDescription>
                <FoodDetailsRow>
                  <FoodPrice>${food.price.toFixed(2)}</FoodPrice>
                  <OrderButton>Order Now</OrderButton>
                </FoodDetailsRow>
              </FoodInfo>
            </FoodCard>
          ))}
        </FoodGrid>
        
        <ViewAllButton to="/food-marketplace">View All Food Options</ViewAllButton>
      </ChefRecommendationsSection>

      <FeaturesSection>
        <FeatureTitle>Our Features</FeatureTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🛒</FeatureIcon>
            <FeatureHeading>Marketplace</FeatureHeading>
            <FeatureDescription>
              Buy and sell items on campus easily. From textbooks to electronics, find everything you need.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🍔</FeatureIcon>
            <FeatureHeading>Food Sharing</FeatureHeading>
            <FeatureDescription>
              Share homemade food with fellow students. Discover delicious meals made by your peers.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>👥</FeatureIcon>
            <FeatureHeading>Social Hub</FeatureHeading>
            <FeatureDescription>
              Connect with other students, share updates, join discussions, and build a campus community.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>💬</FeatureIcon>
            <FeatureHeading>Messaging</FeatureHeading>
            <FeatureDescription>
              Chat securely with buyers, sellers, and friends. Coordinate meetups and transactions easily.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
    </>
  );
};

export default Home;
