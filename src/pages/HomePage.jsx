import React from 'react';
import { Helmet } from 'react-helmet-async';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroSection = styled.section`
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
  overflow: hidden;
  border-radius: var(--border-radius);
  
  @media (max-width: 768px) {
    height: 500px;
  }
  
  @media (max-width: 576px) {
    height: 400px;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  padding: 2rem;
  color: var(--white);
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 576px) {
    font-size: 2rem;
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

const HeroButton = styled(motion.button)`
  padding: 1rem 2rem;
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }
`;

const CategoriesSection = styled.section`
  margin-bottom: 4rem;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled(motion.div)`
  position: relative;
  height: 250px;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%);
    transition: var(--transition);
  }
  
  &:hover::after {
    background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const CategoryContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  z-index: 1;
  color: var(--white);
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CategoryLink = styled(Link)`
  color: var(--white);
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  i {
    margin-left: 0.5rem;
    transition: var(--transition);
  }
  
  &:hover i {
    transform: translateX(5px);
  }
`;

const FeaturedSection = styled.section`
  margin-bottom: 4rem;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ViewAllButton = styled(Link)`
  display: block;
  width: fit-content;
  margin: 2rem auto 0;
  padding: 0.75rem 1.5rem;
  background-color: var(--light-gray);
  color: var(--text-color);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--medium-gray);
  }
`;

const BenefitsSection = styled.section`
  margin-bottom: 4rem;
  padding: 3rem 0;
  background-color: var(--light-gray);
`;

const BenefitsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled(motion.div)`
  background-color: var(--white);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  text-align: center;
`;

const BenefitIcon = styled.div`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const BenefitTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const BenefitDescription = styled.p`
  color: var(--dark-gray);
`;

const TestimonialsSection = styled.section`
  margin-bottom: 4rem;
`;

const TestimonialsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const TestimonialCard = styled(motion.div)`
  background-color: var(--white);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  text-align: center;
  margin-bottom: 2rem;
`;

const TestimonialText = styled.p`
  font-size: 1.1rem;
  font-style: italic;
  margin-bottom: 1.5rem;
  color: var(--dark-gray);
`;

const TestimonialAuthor = styled.div`
  font-weight: 600;
`;

const TestimonialRole = styled.div`
  font-size: 0.9rem;
  color: var(--medium-gray);
`;

const NewsletterSection = styled.section`
  margin-bottom: 4rem;
  padding: 3rem;
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
  color: var(--white);
  text-align: center;
`;

const NewsletterTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const NewsletterDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  font-size: 1rem;
  
  &:focus {
    outline: none;
  }
  
  @media (max-width: 576px) {
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
  }
`;

const NewsletterButton = styled.button`
  padding: 1rem 2rem;
  background-color: var(--secondary-color);
  color: var(--white);
  border: none;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--dark-gray);
  }
  
  @media (max-width: 576px) {
    border-radius: var(--border-radius);
  }
`;

const HomePage = () => {
  // Örnek veriler
  const categories = [
    {
      id: 1,
      name: '3D Yazıcılar',
      image: '/images/3d-printer-real.jpg',
      link: '/products?category=3D Yazıcılar'
    },
    {
      id: 2,
      name: 'Filamentler',
      image: '/images/3d-printer-real.jpg',
      link: '/products?category=Filamentler'
    },
    {
      id: 3,
      name: '3D Baskı Ürünler',
      image: '/images/3d-printer-with-product.jpg',
      link: '/products?category=3D Baskı Ürünler'
    },
    {
      id: 4,
      name: '3D Modeller',
      image: '/images/3d-model-car.png',
      link: '/products?category=3D Modeller'
    }
  ];
  
  const benefits = [
    {
      id: 1,
      icon: 'fas fa-shipping-fast',
      title: 'Hızlı Teslimat',
      description: 'Siparişleriniz aynı gün kargoya verilir ve en hızlı şekilde size ulaştırılır.'
    },
    {
      id: 2,
      icon: 'fas fa-headset',
      title: '7/24 Destek',
      description: 'Teknik destek ekibimiz her zaman yanınızda, sorularınıza anında cevap alın.'
    },
    {
      id: 3,
      icon: 'fas fa-shield-alt',
      title: 'Güvenli Ödeme',
      description: 'SSL sertifikalı güvenli ödeme altyapısı ile ödemelerinizi güvenle yapın.'
    }
  ];
  
  const testimonials = [
    {
      id: 1,
      text: 'Creality Ender 3 V2 3D yazıcıyı buradan aldım ve gerçekten çok memnun kaldım. Ürün kalitesi, fiyatı ve hızlı teslimat için teşekkürler!',
      author: 'Ahmet Yılmaz',
      role: '3D Baskı Hobisti'
    },
    {
      id: 2,
      text: 'Filament kalitesi gerçekten üst düzey. Baskılarım çok daha kaliteli çıkmaya başladı. Kesinlikle tavsiye ediyorum.',
      author: 'Ayşe Demir',
      role: 'Endüstriyel Tasarımcı'
    }
  ];
  
  // Animasyon varyantları
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  return (
    <>
      <Helmet>
        <title>3D Print Shop - 3D Yazıcılar, Filamentler ve 3D Modeller</title>
        <meta name="description" content="3D yazıcılar, filamentler, 3D baskı ürünler ve 3D modellerin satıldığı online mağaza. Yüksek kaliteli ürünler ve uygun fiyatlarla 3D baskı dünyasına adım atın." />
        <meta name="keywords" content="3D yazıcı, 3D printer, filament, PLA, ABS, PETG, 3D model, 3D baskı" />
      </Helmet>
      
      <HeroSection>
        <HeroBackground>
          <LazyLoadImage
            src="/images/3d-printer-real.jpg"
            alt="3D Yazıcı"
            effect="blur"
            width="100%"
            height="100%"
          />
        </HeroBackground>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            3D Baskı Dünyasına Hoş Geldiniz
          </HeroTitle>
          <HeroDescription
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Yüksek kaliteli 3D yazıcılar, filamentler ve 3D modeller ile hayallerinizi gerçeğe dönüştürün.
          </HeroDescription>
          <HeroButton
            as={Link}
            to="/products"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Alışverişe Başla
          </HeroButton>
        </HeroContent>
      </HeroSection>
      
      <HomeContainer>
        <CategoriesSection>
          <SectionTitle>Kategoriler</SectionTitle>
          <CategoriesGrid
            as={motion.div}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                as={motion.div}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <LazyLoadImage
                  src={category.image}
                  alt={category.name}
                  effect="blur"
                  width="100%"
                  height="100%"
                />
                <CategoryContent>
                  <CategoryTitle>{category.name}</CategoryTitle>
                  <CategoryLink to={category.link}>
                    Keşfet <i className="fas fa-arrow-right"></i>
                  </CategoryLink>
                </CategoryContent>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </CategoriesSection>
        
        <FeaturedSection>
          <SectionTitle>Öne Çıkan Ürünler</SectionTitle>
          <ProductsGrid>
            {/* ProductCard bileşenleri buraya gelecek */}
          </ProductsGrid>
          <ViewAllButton to="/products">Tüm Ürünleri Gör</ViewAllButton>
        </FeaturedSection>
      </HomeContainer>
      
      <BenefitsSection>
        <BenefitsContainer>
          <SectionTitle>Neden Bizi Tercih Etmelisiniz?</SectionTitle>
          <BenefitsGrid
            as={motion.div}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {benefits.map((benefit) => (
              <BenefitCard
                key={benefit.id}
                as={motion.div}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <BenefitIcon>
                  <i className={benefit.icon}></i>
                </BenefitIcon>
                <BenefitTitle>{benefit.title}</BenefitTitle>
                <BenefitDescription>{benefit.description}</BenefitDescription>
              </BenefitCard>
            ))}
          </BenefitsGrid>
        </BenefitsContainer>
      </BenefitsSection>
      
      <HomeContainer>
        <TestimonialsSection>
          <SectionTitle>Müşteri Yorumları</SectionTitle>
          <TestimonialsContainer
            as={motion.div}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                as={motion.div}
                variants={fadeInUp}
              >
                <TestimonialText>"{testimonial.text}"</TestimonialText>
                <TestimonialAuthor>{testimonial.author}</TestimonialAuthor>
                <TestimonialRole>{testimonial.role}</TestimonialRole>
              </TestimonialCard>
            ))}
          </TestimonialsContainer>
        </TestimonialsSection>
        
        <NewsletterSection
          as={motion.section}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <NewsletterTitle>Yeniliklerden Haberdar Olun</NewsletterTitle>
          <NewsletterDescription>
            Yeni ürünler, indirimler ve 3D baskı dünyasındaki gelişmelerden haberdar olmak için bültenimize abone olun.
          </NewsletterDescription>
          <NewsletterForm>
            <NewsletterInput
              type="email"
              placeholder="E-posta adresiniz"
              required
            />
            <NewsletterButton type="submit">Abone Ol</NewsletterButton>
          </NewsletterForm>
        </NewsletterSection>
      </HomeContainer>
    </>
  );
};

export default HomePage;
