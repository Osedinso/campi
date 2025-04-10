import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #f7f9fc;
`;

const MainLayout = () => {
  return (
    <MainContainer>
      <Navbar />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </MainContainer>
  );
};

export default MainLayout;
