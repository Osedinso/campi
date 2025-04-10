import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #444;
  border-bottom: 2px solid #6a11cb;
  padding-bottom: 0.5rem;
  display: inline-block;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1.5rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TeamMember = styled.div`
  text-align: center;
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const MemberImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #999;
`;

const MemberName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  font-size: 0.9rem;
  color: #6a11cb;
  font-weight: 500;
`;

const About = () => {
  return (
    <AboutContainer>
      <Title>About Campus Marketplace & Social Hub</Title>
      
      <Section>
        <SectionTitle>Our Mission</SectionTitle>
        <Paragraph>
          Campus Marketplace & Social Hub aims to revolutionize campus life by creating 
          a comprehensive platform that connects students, facilitates commerce, and builds 
          community. We believe in the power of student-to-student connections to enhance 
          the college experience.
        </Paragraph>
        <Paragraph>
          Our platform helps students save money by providing a marketplace for second-hand 
          items, offers opportunities to share homemade meals, and fosters a vibrant 
          campus community through our social hub and messaging features.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>Our Story</SectionTitle>
        <Paragraph>
          Campus Marketplace & Social Hub was born from the challenges faced by college 
          students across the country. Our founders, themselves students, experienced the 
          frustration of expensive textbooks, the desire for home-cooked meals, and the 
          difficulty of connecting with peers outside of class.
        </Paragraph>
        <Paragraph>
          What started as a simple idea in a dorm room has grown into a comprehensive 
          platform serving thousands of students across multiple campuses. Our journey 
          continues as we expand to new schools and develop innovative features to 
          better serve the student community.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>Our Team</SectionTitle>
        <Paragraph>
          We're a diverse team of students, recent graduates, and experienced professionals 
          who are passionate about improving campus life through technology.
        </Paragraph>
        
        <TeamGrid>
          <TeamMember>
            <MemberImage>👤</MemberImage>
            <MemberName>Alex Johnson</MemberName>
            <MemberRole>Founder & CEO</MemberRole>
          </TeamMember>
          
          <TeamMember>
            <MemberImage>👤</MemberImage>
            <MemberName>Jamie Smith</MemberName>
            <MemberRole>CTO</MemberRole>
          </TeamMember>
          
          <TeamMember>
            <MemberImage>👤</MemberImage>
            <MemberName>Taylor Williams</MemberName>
            <MemberRole>Lead Designer</MemberRole>
          </TeamMember>
          
          <TeamMember>
            <MemberImage>👤</MemberImage>
            <MemberName>Jordan Lee</MemberName>
            <MemberRole>Community Manager</MemberRole>
          </TeamMember>
        </TeamGrid>
      </Section>
    </AboutContainer>
  );
};

export default About;
