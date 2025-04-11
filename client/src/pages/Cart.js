import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const CartHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #666;
`;

const CartCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const CartEmpty = styled.div`
  text-align: center;
  padding: 3rem;
`;

const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #555;
`;

const EmptyDescription = styled.p`
  color: #777;
  margin-bottom: 2rem;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
  color: #ddd;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #ff6b35;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background-color: #ff5719;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const Cart = () => {
  // Cart is empty for demo purposes
  const cartIsEmpty = true;

  return (
    <CartContainer>
      <CartHeader>
        <Title>Your Cart</Title>
        <Subtitle>Review your selected items before checkout</Subtitle>
      </CartHeader>
      
      <CartCard>
        {cartIsEmpty ? (
          <CartEmpty>
            <EmptyIcon>🛒</EmptyIcon>
            <EmptyTitle>Your cart is empty</EmptyTitle>
            <EmptyDescription>
              Looks like you haven't added any items to your cart yet.
              Browse our selection of delicious homemade foods from campus chefs!
            </EmptyDescription>
            <StyledLink to="/food-marketplace">
              Explore Food Options
            </StyledLink>
          </CartEmpty>
        ) : (
          <div>
            {/* Cart items would go here */}
            Cart Items
          </div>
        )}
      </CartCard>
    </CartContainer>
  );
};

export default Cart;
