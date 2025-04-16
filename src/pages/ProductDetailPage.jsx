import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProductDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Breadcrumbs = styled.div`
  margin-bottom: 2rem;
  
  a {
    color: var(--dark-gray);
    transition: var(--transition);
    
    &:hover {
      color: var(--primary-color);
    }
  }
  
  span {
    margin: 0 0.5rem;
    color: var(--medium-gray);
  }
`;

const ProductContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ProductCategory = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: var(--primary-color);
  color: var(--white);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const ProductInfo = styled.div``;

const ProductTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  
  .star {
    color: #ffc107;
    margin-right: 0.25rem;
  }
  
  .rating-text {
    font-size: 0.9rem;
    color: var(--medium-gray);
    margin-left: 0.5rem;
  }
`;

const ProductPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
`;

const ProductDescription = styled.p`
  color: var(--dark-gray);
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const ProductFeatures = styled.div`
  margin-bottom: 2rem;
`;

const FeaturesTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  
  &:before {
    content: '✓';
    color: var(--secondary-color);
    font-weight: bold;
    margin-right: 0.75rem;
  }
`;

const ProductActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  overflow: hidden;
`;

const QuantityButton = styled.button`
  background-color: var(--light-gray);
  border: none;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--medium-gray);
    color: var(--white);
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 40px;
  border: none;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
`;

const AddToCartButton = styled(motion.button)`
  flex: 1;
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  padding: 0 2rem;
  height: 40px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const BuyNowButton = styled(motion.button)`
  flex: 1;
  background-color: var(--accent-color);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  padding: 0 2rem;
  height: 40px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: #c0392b;
  }
`;

const ProductMeta = styled.div`
  display: flex;
  gap: 2rem;
  color: var(--dark-gray);
  font-size: 0.9rem;
  
  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading } = useSelector(state => state.products);
  const [quantity, setQuantity] = React.useState(1);
  
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);
  
  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= product?.stock) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        ...product,
        quantity,
      }));
    }
  };
  
  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };
  
  const getCategoryName = (category) => {
    switch(category) {
      case 'printers':
        return '3D Yazıcı';
      case 'filaments':
        return 'Filament';
      case 'models':
        return '3D Model';
      case 'prints':
        return 'Baskılı Ürün';
      default:
        return category;
    }
  };
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt star"></i>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star star"></i>);
    }
    
    return stars;
  };
  
  if (loading) {
    return <div>Ürün yükleniyor...</div>;
  }
  
  if (!product) {
    return <div>Ürün bulunamadı.</div>;
  }
  
  return (
    <ProductDetailContainer>
      <Breadcrumbs>
        <a href="/">Ana Sayfa</a>
        <span>/</span>
        <a href={`/products/${product.category}`}>{getCategoryName(product.category)}</a>
        <span>/</span>
        <span>{product.name}</span>
      </Breadcrumbs>
      
      <ProductContent>
        <ProductImageContainer>
          <ProductImage src={product.image} alt={product.name} />
          <ProductCategory>{getCategoryName(product.category)}</ProductCategory>
        </ProductImageContainer>
        
        <ProductInfo>
          <ProductTitle>{product.name}</ProductTitle>
          
          <ProductRating>
            {renderStars(product.rating)}
            <span className="rating-text">({product.rating} / 5)</span>
          </ProductRating>
          
          <ProductPrice>{product.price.toLocaleString('tr-TR')} ₺</ProductPrice>
          
          <ProductDescription>{product.description}</ProductDescription>
          
          <ProductFeatures>
            <FeaturesTitle>Özellikler</FeaturesTitle>
            <FeaturesList>
              {product.features.map((feature, index) => (
                <FeatureItem key={index}>{feature}</FeatureItem>
              ))}
            </FeaturesList>
          </ProductFeatures>
          
          <ProductActions>
            <QuantitySelector>
              <QuantityButton onClick={() => handleQuantityChange(-1)}>-</QuantityButton>
              <QuantityInput type="text" value={quantity} readOnly />
              <QuantityButton onClick={() => handleQuantityChange(1)}>+</QuantityButton>
            </QuantitySelector>
            
            <AddToCartButton
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
            >
              <i className="fas fa-shopping-cart"></i>
              Sepete Ekle
            </AddToCartButton>
            
            <BuyNowButton
              whileTap={{ scale: 0.95 }}
              onClick={handleBuyNow}
            >
              Hemen Al
            </BuyNowButton>
          </ProductActions>
          
          <ProductMeta>
            <span>
              <i className="fas fa-box"></i>
              Stok: {product.stock} adet
            </span>
            <span>
              <i className="fas fa-shipping-fast"></i>
              Hızlı Kargo
            </span>
            <span>
              <i className="fas fa-undo"></i>
              14 Gün İade
            </span>
          </ProductMeta>
        </ProductInfo>
      </ProductContent>
    </ProductDetailContainer>
  );
};

export default ProductDetailPage;
