import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeroSection = styled.section`
  position: relative;
  padding: 6rem 2rem;
  color: white;
  text-align: center;
  overflow: hidden;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
    min-height: 400px;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
  z-index: 1;
`;

const HeroBgImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
  z-index: 0;
  filter: brightness(0.9);
`;

const HeroVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
  object-fit: cover;
  display: ${props => props.show ? 'block' : 'none'};
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.85rem 1.75rem;
  background-color: ${props => props.primary ? '#ffffff' : 'transparent'};
  color: ${props => props.primary ? '#ff6b35' : '#ffffff'};
  border: 2px solid #ffffff;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    background-color: ${props => props.primary ? '#f8f8f8' : 'rgba(255, 255, 255, 0.1)'};
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
`;

const FoodButton = styled(Button)`
  background-color: ${props => props.active ? '#ff6b35' : (props.primary ? '#ffffff' : 'transparent')};
  color: ${props => props.active ? '#ffffff' : (props.primary ? '#ff6b35' : '#ffffff')};
  border-color: ${props => props.active ? '#ff6b35' : '#ffffff'};

  &:hover {
    background-color: ${props => props.active ? '#ff5719' : (props.primary ? '#f8f8f8' : 'rgba(255, 255, 255, 0.1)')};
  }
`;

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background-color: #f9f9f9;
  position: relative;
  overflow: hidden;
`;

const FeaturesSectionIntro = styled.div`
  max-width: 800px;
  margin: 0 auto 4rem;
  text-align: center;
`;

const FeatureTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const FeatureSubtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
    border-color: #e0e0e0;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.accentColor || '#ff6b35'};
    opacity: 0.8;
  }
`;

const FeatureIconWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${props => props.bgColor || '#fff0eb'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  ${FeatureCard}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => props.color || '#ff6b35'};
  line-height: 1;
`;

const FeatureHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #333;
`;

const FeatureDescription = styled.p`
  color: #6c757d;
  line-height: 1.6;
  font-size: 1.05rem;
  margin-bottom: 1.5rem;
`;

const FeatureLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #ff6b35;
  font-weight: 500;
  text-decoration: none;
  margin-top: 0.5rem;
  transition: all 0.2s;
  
  &:hover {
    color: #e55a2b;
    text-decoration: underline;
  }
  
  &::after {
    content: '→';
    margin-left: 5px;
    transition: transform 0.2s;
  }
  
  &:hover::after {
    transform: translateX(3px);
  }
`;

// Chef Recommendations Section
const ChefRecommendationsSection = styled.section`
  padding: 5rem 0 4rem;
  background-color: #fff;
  display: ${props => props.visible ? 'block' : 'none'};
  border-bottom: 1px solid #eee;
`;

const ChefRecsSectionHeader = styled.div`
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto 3rem;
`;

const ChefRecsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: left;
  margin-bottom: 1rem;
  color: #333;
`;

const ChefRecsSubtitle = styled.p`
  text-align: left;
  color: #666;
  font-size: 1.2rem;
  line-height: 1.5;
  max-width: 700px;
`;

const ScrollableContainer = styled.div`
  position: relative;
  padding: 0 2rem;
  max-width: 100%;
  overflow: hidden;
`;

const ScrollControls = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto 1.5rem;
`;

const ScrollButton = styled.button`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
  color: #555;
  
  &:hover {
    background-color: #f8f8f8;
    color: #ff6b35;
    border-color: #ff6b35;
  }
  
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
    border-color: #eee;
  }
`;

const FoodScrollWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  gap: 1.5rem;
  padding: 0.5rem 0 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  
  /* &::-webkit-scrollbar {
    display: none;
  } */
`;

const FoodCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #eee;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-width: 320px;
  flex: 0 0 auto;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  }
  
  @media (max-width: 768px) {
    min-width: 280px;
  }
`;

const FoodImage = styled.div`
  height: 220px;
  background-color: #f8f9fa;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ChefAvatarWrapper = styled.div`
  position: absolute;
  bottom: -25px;
  left: 20px;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 10;
`;

const ChefAvatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  display: block;
`;

const FoodInfo = styled.div`
  padding: 1.8rem 1.5rem 1.5rem;
  position: relative;
`;

const FoodName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
`;

const ChefName = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
  padding-left: 55px;
  margin-top: -5px;
`;

const FoodDescription = styled.p`
  color: #6c757d;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FoodDetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  border-top: 1px solid #f0f0f0;
  padding-top: 1rem;
`;

const FoodPrice = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  color: #ff6b35;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const Rating = styled.div`
  color: #ff9800;
  font-size: 1rem;
  margin-right: 0.5rem;
`;

const RatingCount = styled.span`
  color: #999;
  font-size: 0.9rem;
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
  padding: 0.85rem 1.75rem;
  background-color: transparent;
  color: #ff6b35;
  border: 2px solid #ff6b35;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ff6b35;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
`;

// Mock chef recommendations data
const mockFoodItems = [
  {
    id: 1,
    name: 'Homemade Pasta Carbonara',
    chef: 'Maria Johnson',
    description: 'Authentic Italian pasta carbonara made with fresh eggs, pancetta, and parmesan cheese. Served with garlic bread.',
    price: 12.99,
    rating: 4.7,
    ratingCount: 34,
    chefImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    name: 'Vegetarian Thai Curry',
    chef: 'Alex Chen',
    description: 'Fragrant Thai curry with fresh vegetables, tofu, and aromatic spices. Served with jasmine rice and spring rolls.',
    price: 10.99,
    rating: 4.5,
    ratingCount: 28,
    chefImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    name: 'Classic Beef Burger',
    chef: 'James Wilson',
    description: 'Juicy beef patty with lettuce, tomato, cheese, and special sauce on a brioche bun. Comes with fries and coleslaw.',
    price: 9.99,
    rating: 4.8,
    ratingCount: 42,
    chefImage: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 4,
    name: 'Homemade Apple Pie',
    chef: 'Emma Davis',
    description: 'Classic American apple pie with a buttery crust and cinnamon-spiced filling. Made from scratch daily and served with vanilla ice cream.',
    price: 7.99,
    rating: 4.9,
    ratingCount: 51,
    chefImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1562007908-17c67e878c6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 5,
    name: 'Spicy Chicken Tikka Masala',
    chef: 'Priya Patel',
    description: 'Tender chicken in a rich and spicy tomato-based sauce with aromatic Indian spices. Served with naan bread and basmati rice.',
    price: 13.99,
    rating: 4.6,
    ratingCount: 37,
    chefImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 6,
    name: 'Homemade Chocolate Brownies',
    chef: 'David Smith',
    description: 'Rich and fudgy chocolate brownies made with premium dark chocolate. Perfect with a scoop of vanilla ice cream.',
    price: 5.99,
    rating: 4.9,
    ratingCount: 45,
    chefImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
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

  // Create a ref for the video element
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Handle video loading
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <>
      <HeroSection>
        {/* Video background with fallback image */}
        <HeroBgImage />
        <HeroVideo 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          onLoadedData={handleVideoLoaded}
          show={videoLoaded}
        >
          <source src="https://player.vimeo.com/external/454063524.hd.mp4?s=2c01107e325ab49f891353b8fe6f3f7673febd70&profile_id=175&oauth2_token_id=57447761" type="video/mp4" />
        </HeroVideo>
        <HeroOverlay />
        
        <HeroContent>
          <HeroTitle>Discover Homemade Campus Cuisine</HeroTitle>
          <HeroSubtitle>
            Support student chefs, enjoy authentic meals, and connect with the campus community through delicious food.
          </HeroSubtitle>
          <ButtonContainer>
            <FoodButton 
              as="a" 
              href="#" 
              onClick={handleFoodButtonClick}
              active={showFoodSection}
              primary
            >
              {showFoodSection ? 'Hide Food Options' : 'Explore Delicious Food'}
            </FoodButton>
            <Button to="/create-food-listing">Become a Campus Chef</Button>
          </ButtonContainer>
        </HeroContent>
      </HeroSection>

      <ChefRecommendationsSection id="chef-recommendations" visible={showFoodSection}>
        <ChefRecsSectionHeader>
          <ChefRecsTitle>Popular Campus Chefs</ChefRecsTitle>
          <ChefRecsSubtitle>
            Discover delicious homemade meals prepared by talented student chefs on campus
          </ChefRecsSubtitle>
        </ChefRecsSectionHeader>
        
        <ScrollControls>
          <ScrollButton onClick={() => document.getElementById('food-scroll').scrollBy({left: -1000, behavior: 'smooth'})}>
            ←
          </ScrollButton>
          <ScrollButton onClick={() => document.getElementById('food-scroll').scrollBy({left: 1000, behavior: 'smooth'})}>
            →
          </ScrollButton>
        </ScrollControls>
        
        <ScrollableContainer>
          <FoodScrollWrapper id="food-scroll">
            {mockFoodItems.map(food => (
              <FoodCard key={food.id}>
                <FoodImage image={food.image}>
                  {!food.image && 'Food Image'}
                  <ChefAvatarWrapper>
                    <ChefAvatar src={food.chefImage} alt={food.chef} />
                  </ChefAvatarWrapper>
                </FoodImage>
                <FoodInfo>
                  <FoodName>{food.name}</FoodName>
                  <ChefName>{food.chef}</ChefName>
                  
                  <RatingWrapper>
                    <Rating>★★★★★</Rating>
                    <RatingCount>{food.rating} ({food.ratingCount})</RatingCount>
                  </RatingWrapper>
                  
                  <FoodDescription>{food.description}</FoodDescription>
                  
                  <FoodDetailsRow>
                    <FoodPrice>${food.price.toFixed(2)}</FoodPrice>
                    <OrderButton>Order Now</OrderButton>
                  </FoodDetailsRow>
                </FoodInfo>
              </FoodCard>
            ))}
          </FoodScrollWrapper>
        </ScrollableContainer>
        
        <ViewAllButton to="/food-marketplace">View All Chef Options</ViewAllButton>
      </ChefRecommendationsSection>

      <FeaturesSection>
        <FeaturesSectionIntro>
          <FeatureTitle>How It Works</FeatureTitle>
          <FeatureSubtitle>
            Our platform makes it easy to discover authentic food, support student chefs, and build community
          </FeatureSubtitle>
        </FeaturesSectionIntro>
        
        <FeaturesGrid>
          <FeatureCard accentColor="#ff6b35">
            <FeatureIconWrapper bgColor="#fff0eb">
              <FeatureIcon color="#ff6b35">🍲</FeatureIcon>
            </FeatureIconWrapper>
            <FeatureHeading>Order Homemade Food</FeatureHeading>
            <FeatureDescription>
              Browse through a diverse selection of authentic, homemade dishes prepared by talented student chefs on campus. Filter by cuisine type, dietary preferences, or chef ratings.
            </FeatureDescription>
            <FeatureLink href="/food-marketplace">Explore food options</FeatureLink>
          </FeatureCard>

          <FeatureCard accentColor="#3f51b5">
            <FeatureIconWrapper bgColor="#eceffe">
              <FeatureIcon color="#3f51b5">👨‍🍳</FeatureIcon>
            </FeatureIconWrapper>
            <FeatureHeading>Become a Campus Chef</FeatureHeading>
            <FeatureDescription>
              Share your culinary talents with the campus community. Create your chef profile, add your signature dishes, set your own prices, and start earning by doing what you love.
            </FeatureDescription>
            <FeatureLink href="/create-food-listing">Start cooking</FeatureLink>
          </FeatureCard>

          <FeatureCard accentColor="#4caf50">
            <FeatureIconWrapper bgColor="#ecf8ec">
              <FeatureIcon color="#4caf50">🛒</FeatureIcon>
            </FeatureIconWrapper>
            <FeatureHeading>Student Marketplace</FeatureHeading>
            <FeatureDescription>
              Buy and sell items on campus easily. From textbooks to electronics, find everything you need or list items you no longer use. Connect directly with other students.
            </FeatureDescription>
            <FeatureLink href="/marketplace">Visit marketplace</FeatureLink>
          </FeatureCard>

          <FeatureCard accentColor="#ff9800">
            <FeatureIconWrapper bgColor="#fff6e5">
              <FeatureIcon color="#ff9800">👥</FeatureIcon>
            </FeatureIconWrapper>
            <FeatureHeading>Campus Community</FeatureHeading>
            <FeatureDescription>
              Connect with other students, share updates, join food-related discussions, and build meaningful relationships within the campus community through shared dining experiences.
            </FeatureDescription>
            <FeatureLink href="/social">Join the community</FeatureLink>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
    </>
  );
};

export default Home;
