import React from 'react';
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

const Home = () => {
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
          <Button to="/register">Join Now</Button>
        </ButtonContainer>
      </HeroSection>

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
