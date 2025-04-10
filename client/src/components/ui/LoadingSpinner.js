import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: ${props => props.fullPage ? '70vh' : '200px'};
`;

const SpinnerCircle = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #1e88e5;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.div`
  margin-top: 1rem;
  color: #666;
  font-size: 0.9rem;
`;

const LoadingSpinner = ({ size = 40, fullPage = false, text = 'Loading...' }) => {
  return (
    <SpinnerContainer fullPage={fullPage}>
      <div style={{ textAlign: 'center' }}>
        <SpinnerCircle size={size} />
        {text && <LoadingText>{text}</LoadingText>}
      </div>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
