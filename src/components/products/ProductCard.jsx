import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';

const CardContainer = styled(motion.div)`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 75%; /* 4:3 Aspect Ratio */
  overflow: hidden;
`;

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  
  &.new {
    background-color: var(--primary-color);
    color: var(--white);
  }
  
  &.sale {
    background-color: var(--accent-color);
    color: var(--white);
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--white);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: var(--light-gray);
  }
  
  i {
    color: var(--dark-gray);
    font-size: 1rem;
    transition: var(--transition);
  }
  
  &.active i {
    color: var(--accent-color);
  }
`;

const ContentContainer = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Category = styled.div`
  font-size: 0.85rem;
  color: var(--medium-gray);
  margin-bottom: 0.5rem;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  
  a {
    color: var(--text-color);
    text-decoration: none;
    transition: var(--transition);
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  
  i {
    color: #FFD700;
    font-size: 0.9rem;
    margin-right: 0.25rem;
  }
  
  span {
    color: var(--medium-gray);
    font-size: 0.85rem;
    margin-left: 0.5rem;
  }
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: var(--dark-gray);
  margin-bottom: 1rem;
  flex-grow: 1;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-color);
`;

const OldPrice = styled.div`
  font-size: 0.9rem;
  color: var(--medium-gray);
  text-decoration: line-through;
  margin-left: 0.75rem;
`;

const Discount = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent-color);
  margin-left: auto;
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const AddToCartButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: var(--secondary-color);
  }
  
  i {
    margin-right: 0.5rem;
  }
`;

const QuickViewButton = styled.button`
  width: 42px;
  height: 42px;
  background-color: var(--light-gray);
  color: var(--text-color);
  border: none;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--medium-gray);
    color: var(--white);
  }
`;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
  };
  
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };
  
  const calculateDiscount = (price, oldPrice) => {
    if (!oldPrice) return null;
    const discount = ((oldPrice - price) / oldPrice) * 100;
    return Math.round(discount);
  };
  
  return (
    <CardContainer
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ImageContainer>
        <ProductImage src={product.image} alt={product.name} />
        <BadgeContainer>
          {product.isNew && <Badge className="new">Yeni</Badge>}
          {product.onSale && <Badge className="sale">İndirim</Badge>}
        </BadgeContainer>
        <WishlistButton 
          className={isWishlisted ? 'active' : ''}
          onClick={toggleWishlist}
          aria-label="Favorilere ekle"
        >
          <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart`}></i>
        </WishlistButton>
      </ImageContainer>
      
      <ContentContainer>
        <Category>{product.category}</Category>
        <Title>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </Title>
        
        <Rating>
          {[...Array(5)].map((_, index) => (
            <i 
              key={index} 
              className={`${index < product.rating ? 'fas' : 'far'} fa-star`}
            ></i>
          ))}
          <span>({product.reviewCount})</span>
        </Rating>
        
        <Description>{product.description}</Description>
        
        <PriceContainer>
          <Price>{product.price.toLocaleString('tr-TR')} ₺</Price>
          {product.oldPrice && (
            <OldPrice>{product.oldPrice.toLocaleString('tr-TR')} ₺</OldPrice>
          )}
          {product.oldPrice && (
            <Discount>%{calculateDiscount(product.price, product.oldPrice)}</Discount>
          )}
        </PriceContainer>
        
        <ActionContainer>
          <AddToCartButton onClick={handleAddToCart}>
            <i className="fas fa-shopping-cart"></i>
            Sepete Ekle
          </AddToCartButton>
          <QuickViewButton aria-label="Hızlı bakış">
            <i className="fas fa-eye"></i>
          </QuickViewButton>
        </ActionContainer>
      </ContentContainer>
    </CardContainer>
  );
};

export default ProductCard;
