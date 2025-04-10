import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonBase = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  border: none;
  gap: 0.5rem;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  /* Button sizes */
  ${props => props.size === 'large' && `
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  `}
  
  ${props => props.size === 'small' && `
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
  `}
  
  /* Full width */
  ${props => props.fullWidth && `
    width: 100%;
  `}
  
  /* Icon only button */
  ${props => props.iconOnly && `
    padding: ${props.size === 'large' ? '0.75rem' : props.size === 'small' ? '0.25rem' : '0.5rem'};
    aspect-ratio: 1;
  `}
`;

const PrimaryButton = styled(ButtonBase)`
  background-color: #1e88e5;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #1976d2;
  }
  
  &:active:not(:disabled) {
    background-color: #1565c0;
  }
`;

const SecondaryButton = styled(ButtonBase)`
  background-color: transparent;
  color: #1e88e5;
  border: 1px solid #1e88e5;
  
  &:hover:not(:disabled) {
    background-color: rgba(30, 136, 229, 0.08);
  }
  
  &:active:not(:disabled) {
    background-color: rgba(30, 136, 229, 0.16);
  }
`;

const TertiaryButton = styled(ButtonBase)`
  background-color: transparent;
  color: #1e88e5;
  
  &:hover:not(:disabled) {
    background-color: rgba(30, 136, 229, 0.08);
  }
  
  &:active:not(:disabled) {
    background-color: rgba(30, 136, 229, 0.16);
  }
`;

const DangerButton = styled(ButtonBase)`
  background-color: #f44336;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #e53935;
  }
  
  &:active:not(:disabled) {
    background-color: #d32f2f;
  }
`;

const LightButton = styled(ButtonBase)`
  background-color: #f5f5f5;
  color: #333;
  
  &:hover:not(:disabled) {
    background-color: #e0e0e0;
  }
  
  &:active:not(:disabled) {
    background-color: #d5d5d5;
  }
`;

const DarkButton = styled(ButtonBase)`
  background-color: #333;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #444;
  }
  
  &:active:not(:disabled) {
    background-color: #222;
  }
`;

// Button component that can be rendered as a button or a Link
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  to,
  fullWidth = false,
  iconOnly = false,
  ...props
}) => {
  const commonProps = {
    size,
    fullWidth,
    iconOnly,
    ...props
  };
  
  // If 'to' is provided, render as a Link component
  if (to) {
    const ButtonComponent = getButtonComponent(variant);
    return (
      <ButtonComponent
        as={Link}
        to={to}
        {...commonProps}
      >
        {children}
      </ButtonComponent>
    );
  }
  
  // Otherwise render as a button
  const ButtonComponent = getButtonComponent(variant);
  return (
    <ButtonComponent {...commonProps}>
      {children}
    </ButtonComponent>
  );
};

// Helper function to get the correct button component based on variant
const getButtonComponent = (variant) => {
  switch (variant) {
    case 'primary':
      return PrimaryButton;
    case 'secondary':
      return SecondaryButton;
    case 'tertiary':
      return TertiaryButton;
    case 'danger':
      return DangerButton;
    case 'light':
      return LightButton;
    case 'dark':
      return DarkButton;
    default:
      return PrimaryButton;
  }
};

export default Button;
