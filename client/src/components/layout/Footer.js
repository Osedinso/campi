import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #2c3e50;
  color: #ffffff;
  padding: 2rem 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const FooterLink = styled.a`
  color: #ecf0f1;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: #3498db;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid #34495e;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Campus Marketplace</FooterTitle>
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/marketplace">Marketplace</FooterLink>
          <FooterLink href="/social">Social Hub</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink href="/faq">FAQ</FooterLink>
          <FooterLink href="/terms">Terms of Service</FooterLink>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/help">Help Center</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Connect</FooterTitle>
          <FooterLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</FooterLink>
          <FooterLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</FooterLink>
          <FooterLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</FooterLink>
          <FooterLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; {new Date().getFullYear()} Campus Marketplace & Social Hub. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
