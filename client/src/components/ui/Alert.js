import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 90%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  background-color: ${props => {
    switch (props.type) {
      case 'success': return '#e8f5e9';
      case 'error': return '#ffebee';
      case 'warning': return '#fff8e1';
      case 'info': default: return '#e3f2fd';
    }
  }};
  border-left: 5px solid ${props => {
    switch (props.type) {
      case 'success': return '#4caf50';
      case 'error': return '#f44336';
      case 'warning': return '#ff9800';
      case 'info': default: return '#2196f3';
    }
  }};
  animation: ${props => props.isClosing ? slideOut : slideIn} 0.3s ease-in-out;
`;

const AlertContent = styled.div`
  display: flex;
  align-items: center;
`;

const AlertIcon = styled.div`
  margin-right: 12px;
  font-size: 1.5rem;
  color: ${props => {
    switch (props.type) {
      case 'success': return '#4caf50';
      case 'error': return '#f44336';
      case 'warning': return '#ff9800';
      case 'info': default: return '#2196f3';
    }
  }};
`;

const AlertMessage = styled.div`
  flex: 1;
`;

const AlertTitle = styled.h4`
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  color: #333;
`;

const AlertText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #666;
`;

const AlertCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: #999;
  padding: 0;
  margin-left: 8px;
`;

const Alert = ({ type = 'info', title, message, duration = 5000, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  
  const getIcon = () => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      case 'info': default: return 'ℹ';
    }
  };
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };
  
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration]);
  
  return (
    <AlertContainer type={type} isClosing={isClosing}>
      <AlertContent>
        <AlertIcon type={type}>{getIcon()}</AlertIcon>
        <AlertMessage>
          {title && <AlertTitle>{title}</AlertTitle>}
          {message && <AlertText>{message}</AlertText>}
        </AlertMessage>
        <AlertCloseButton onClick={handleClose}>×</AlertCloseButton>
      </AlertContent>
    </AlertContainer>
  );
};

export default Alert;
