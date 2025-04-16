import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
`;

const NotFoundTitle = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const NotFoundSubtitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NotFoundText = styled.p`
  font-size: 1.2rem;
  color: var(--dark-gray);
  max-width: 600px;
  margin-bottom: 2rem;
`;

const BackToHomeButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: var(--primary-color);
  color: var(--white);
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-3px);
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundSubtitle>Sayfa Bulunamadı</NotFoundSubtitle>
      <NotFoundText>
        Aradığınız sayfa mevcut değil veya kaldırılmış olabilir. 
        Lütfen ana sayfaya dönün veya başka bir sayfaya gidin.
      </NotFoundText>
      <BackToHomeButton to="/">
        Ana Sayfaya Dön
      </BackToHomeButton>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
