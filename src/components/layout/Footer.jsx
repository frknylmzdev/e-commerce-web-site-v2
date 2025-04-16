import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: var(--dark-gray);
  color: var(--white);
  padding: 3rem 0 1.5rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: var(--primary-color);
  }
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterItem = styled.li`
  margin-bottom: 0.75rem;
  
  a {
    color: var(--light-gray);
    transition: var(--transition);
    
    &:hover {
      color: var(--primary-color);
      padding-left: 5px;
    }
  }
`;

const FooterText = styled.p`
  color: var(--light-gray);
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--white);
  transition: var(--transition);
  
  &:hover {
    background-color: var(--primary-color);
    transform: translateY(-3px);
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
  text-align: center;
`;

const Copyright = styled.p`
  color: var(--light-gray);
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>3D Baskı Dünyası</FooterTitle>
          <FooterText>
            3D baskı teknolojileri ve ürünleri için güvenilir adresiniz. En kaliteli 3D yazıcılar, filamentler, modeller ve baskılı ürünler için bizi tercih edin.
          </FooterText>
          <SocialLinks>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Hızlı Erişim</FooterTitle>
          <FooterList>
            <FooterItem>
              <Link to="/">Ana Sayfa</Link>
            </FooterItem>
            <FooterItem>
              <Link to="/products">Ürünler</Link>
            </FooterItem>
            <FooterItem>
              <Link to="/about">Hakkımızda</Link>
            </FooterItem>
            <FooterItem>
              <Link to="/contact">İletişim</Link>
            </FooterItem>
            <FooterItem>
              <Link to="/blog">Blog</Link>
            </FooterItem>
          </FooterList>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Kategoriler</FooterTitle>
          <FooterList>
            <FooterItem>
              <Link to="/products/printers">3D Yazıcılar</Link>
            </FooterItem>
            <FooterItem>
              <Link to="/products/filaments">Filamentler</Link>
            </FooterItem>
            <FooterItem>
              <Link to="/products/models">3D Modeller</Link>
            </FooterItem>
            <FooterItem>
              <Link to="/products/prints">Baskılı Ürünler</Link>
            </FooterItem>
            <FooterItem>
              <Link to="/products/accessories">Aksesuarlar</Link>
            </FooterItem>
          </FooterList>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>İletişim</FooterTitle>
          <FooterText>
            <i className="fas fa-map-marker-alt"></i> Teknoloji Caddesi No:123, İstanbul
          </FooterText>
          <FooterText>
            <i className="fas fa-phone"></i> +90 212 345 67 89
          </FooterText>
          <FooterText>
            <i className="fas fa-envelope"></i> info@3dbaskidunyasi.com
          </FooterText>
          <FooterText>
            <i className="fas fa-clock"></i> Pazartesi - Cumartesi: 09:00 - 18:00
          </FooterText>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>
          &copy; {new Date().getFullYear()} 3D Baskı Dünyası. Tüm hakları saklıdır.
        </Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
