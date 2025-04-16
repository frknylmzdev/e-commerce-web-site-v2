import React from 'react';
import { Helmet } from 'react-helmet-async';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: var(--medium-gray);
  
  a {
    color: var(--medium-gray);
    text-decoration: none;
    transition: var(--transition);
    
    &:hover {
      color: var(--primary-color);
    }
  }
  
  span {
    margin: 0 0.5rem;
  }
`;

const ProductsLayout = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.aside`
  width: 280px;
  flex-shrink: 0;
  
  @media (max-width: 992px) {
    width: 100%;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
`;

const FilterTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--light-gray);
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CategoryItem = styled.li`
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: none;
  border: none;
  padding: 0.5rem 0;
  text-align: left;
  font-size: 0.95rem;
  color: var(--text-color);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover, &.active {
    color: var(--primary-color);
  }
  
  span {
    color: var(--medium-gray);
    font-size: 0.85rem;
  }
`;

const PriceRange = styled.div`
  margin-top: 1rem;
`;

const PriceInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const PriceInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const FilterButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const CheckboxGroup = styled.div`
  margin-top: 1rem;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  input {
    margin-right: 0.5rem;
  }
  
  label {
    font-size: 0.95rem;
    cursor: pointer;
  }
`;

const MainContent = styled.div`
  flex: 1;
`;

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ProductCount = styled.div`
  font-size: 0.95rem;
  color: var(--medium-gray);
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  label {
    font-size: 0.95rem;
    color: var(--medium-gray);
  }
  
  select {
    padding: 0.5rem;
    border: 1px solid var(--light-gray);
    border-radius: var(--border-radius);
    font-size: 0.9rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
`;

const ViewToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
  
  button {
    background: none;
    border: none;
    font-size: 1.1rem;
    color: var(--medium-gray);
    cursor: pointer;
    transition: var(--transition);
    
    &:hover, &.active {
      color: var(--primary-color);
    }
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
  
  &.list-view {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled(motion.div)`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--box-shadow-hover);
  }
  
  &.list-view {
    display: flex;
    
    .product-image {
      width: 200px;
      flex-shrink: 0;
    }
    
    .product-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    .product-description {
      display: block;
      margin-bottom: 1rem;
    }
    
    @media (max-width: 768px) {
      flex-direction: column;
      
      .product-image {
        width: 100%;
      }
    }
  }
`;

const ProductImage = styled.div`
  position: relative;
  height: 200px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductBadges = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 4px;
  
  &.new {
    background-color: #4CAF50;
    color: white;
  }
  
  &.sale {
    background-color: #F44336;
    color: white;
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: var(--transition);
  
  i {
    color: var(--medium-gray);
    transition: var(--transition);
  }
  
  &:hover i {
    color: #F44336;
  }
  
  &.active i {
    color: #F44336;
  }
`;

const ProductContent = styled.div`
  padding: 1rem;
`;

const ProductCategory = styled.div`
  font-size: 0.8rem;
  color: var(--medium-gray);
  margin-bottom: 0.5rem;
`;

const ProductName = styled.h3`
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

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: var(--dark-gray);
  margin-bottom: 0.5rem;
  display: none;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  .stars {
    color: #FFC107;
  }
  
  .count {
    font-size: 0.8rem;
    color: var(--medium-gray);
  }
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  .current {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--primary-color);
  }
  
  .old {
    font-size: 0.9rem;
    color: var(--medium-gray);
    text-decoration: line-through;
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--light-gray);
  background-color: ${props => props.active ? 'var(--primary-color)' : 'var(--white)'};
  color: ${props => props.active ? 'var(--white)' : 'var(--text-color)'};
  margin: 0 0.25rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-color)' : 'var(--light-gray)'};
  }
  
  &.arrow {
    font-size: 1.2rem;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ProductsPage = () => {
  // Örnek ürün verileri
  const products = [
    {
      id: 1,
      name: 'Creality Ender 3 V2 3D Yazıcı',
      category: '3D Yazıcılar',
      description: 'Yüksek hassasiyetli, kullanımı kolay 3D yazıcı. Başlangıç seviyesi için ideal.',
      price: 4999.99,
      oldPrice: 5499.99,
      image: '/images/3d-printer-real.jpg',
      rating: 4.5,
      reviewCount: 128,
      isNew: true,
      onSale: true
    },
    {
      id: 2,
      name: 'PLA+ Filament 1.75mm 1kg - Beyaz',
      category: 'Filamentler',
      description: 'Yüksek kaliteli PLA+ filament, canlı renkler ve pürüzsüz baskı için.',
      price: 349.99,
      oldPrice: null,
      image: '/images/3d-printer-real.jpg',
      rating: 5,
      reviewCount: 86,
      isNew: false,
      onSale: false
    },
    {
      id: 3,
      name: 'Bugatti Veyron 3D Model',
      category: '3D Modeller',
      description: 'Yüksek detaylı Bugatti Veyron 3D modeli, baskıya hazır STL dosyası.',
      price: 129.99,
      oldPrice: 199.99,
      image: '/images/3d-model-car.png',
      rating: 4,
      reviewCount: 42,
      isNew: false,
      onSale: true
    },
    {
      id: 4,
      name: 'Özel Tasarım Dekoratif Vazo',
      category: '3D Baskı Ürünler',
      description: 'Özel tasarım, yüksek kaliteli PLA ile basılmış dekoratif vazo.',
      price: 249.99,
      oldPrice: null,
      image: '/images/3d-printer-with-product.jpg',
      rating: 4.5,
      reviewCount: 18,
      isNew: true,
      onSale: false
    },
    {
      id: 5,
      name: 'Anycubic Photon Mono X 3D Yazıcı',
      category: '3D Yazıcılar',
      description: 'Yüksek çözünürlüklü reçine 3D yazıcı, detaylı modeller için ideal.',
      price: 8999.99,
      oldPrice: 9999.99,
      image: '/images/3d-printer-real.jpg',
      rating: 5,
      reviewCount: 64,
      isNew: false,
      onSale: true
    },
    {
      id: 6,
      name: 'ABS Filament 1.75mm 1kg - Siyah',
      category: 'Filamentler',
      description: 'Dayanıklı ABS filament, fonksiyonel parçalar için ideal.',
      price: 399.99,
      oldPrice: null,
      image: '/images/3d-printer-real.jpg',
      rating: 4,
      reviewCount: 52,
      isNew: false,
      onSale: false
    }
  ];
  
  // Kategori verileri
  const categories = [
    { name: '3D Yazıcılar', count: 10 },
    { name: 'Filamentler', count: 25 },
    { name: '3D Baskı Ürünler', count: 15 },
    { name: '3D Modeller', count: 30 }
  ];
  
  // State'ler (gerçek uygulamada React useState ile yönetilecek)
  const viewMode = 'grid'; // 'grid' veya 'list'
  const currentPage = 1;
  const totalPages = 5;
  
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
        staggerChildren: 0.1
      }
    }
  };
  
  // Yıldız derecelendirmesi oluşturma
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };
  
  return (
    <>
      <Helmet>
        <title>Ürünler - 3D Print Shop</title>
        <meta name="description" content="3D yazıcılar, filamentler, 3D baskı ürünler ve 3D modeller. Yüksek kaliteli ürünler ve uygun fiyatlarla 3D baskı dünyasına adım atın." />
      </Helmet>
      
      <ProductsContainer>
        <PageHeader>
          <Breadcrumbs>
            <Link to="/">Ana Sayfa</Link>
            <span>/</span>
            <Link to="/products">Ürünler</Link>
          </Breadcrumbs>
          <PageTitle>Tüm Ürünler</PageTitle>
        </PageHeader>
        
        <ProductsLayout>
          <Sidebar>
            <FilterSection>
              <FilterTitle>Kategoriler</FilterTitle>
              <CategoryList>
                {categories.map((category, index) => (
                  <CategoryItem key={index}>
                    <CategoryLink className={index === 0 ? 'active' : ''}>
                      {category.name}
                      <span>({category.count})</span>
                    </CategoryLink>
                  </CategoryItem>
                ))}
              </CategoryList>
            </FilterSection>
            
            <FilterSection>
              <FilterTitle>Fiyat Aralığı</FilterTitle>
              <PriceRange>
                <PriceInputs>
                  <PriceInput type="number" placeholder="Min" min="0" />
                  <span>-</span>
                  <PriceInput type="number" placeholder="Max" min="0" />
                </PriceInputs>
                <FilterButton>Filtrele</FilterButton>
              </PriceRange>
            </FilterSection>
            
            <FilterSection>
              <FilterTitle>Özellikler</FilterTitle>
              <CheckboxGroup>
                <CheckboxItem>
                  <input type="checkbox" id="new" />
                  <label htmlFor="new">Yeni Ürünler</label>
                </CheckboxItem>
                <CheckboxItem>
                  <input type="checkbox" id="sale" />
                  <label htmlFor="sale">İndirimli Ürünler</label>
                </CheckboxItem>
                <CheckboxItem>
                  <input type="checkbox" id="instock" />
                  <label htmlFor="instock">Stokta Var</label>
                </CheckboxItem>
              </CheckboxGroup>
            </FilterSection>
          </Sidebar>
          
          <MainContent>
            <ProductsHeader>
              <ProductCount>{products.length} ürün bulundu</ProductCount>
              <div style={{ display: 'flex' }}>
                <SortContainer>
                  <label htmlFor="sort">Sırala:</label>
                  <select id="sort">
                    <option value="featured">Öne Çıkanlar</option>
                    <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
                    <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
                    <option value="name-asc">İsim (A-Z)</option>
                    <option value="name-desc">İsim (Z-A)</option>
                  </select>
                </SortContainer>
                <ViewToggle>
                  <button className={viewMode === 'grid' ? 'active' : ''}>
                    <i className="fas fa-th"></i>
                  </button>
                  <button className={viewMode === 'list' ? 'active' : ''}>
                    <i className="fas fa-list"></i>
                  </button>
                </ViewToggle>
              </div>
            </ProductsHeader>
            
            <ProductsGrid 
              className={viewMode === 'list' ? 'list-view' : ''}
              as={motion.div}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  className={viewMode === 'list' ? 'list-view' : ''}
                  as={motion.div}
                  variants={fadeInUp}
                >
                  <ProductImage className="product-image">
                    <LazyLoadImage
                      src={product.image}
                      alt={product.name}
                      effect="blur"
                      width="100%"
                      height="100%"
                    />
                    <ProductBadges>
                      {product.isNew && <Badge className="new">Yeni</Badge>}
                      {product.onSale && <Badge className="sale">İndirim</Badge>}
                    </ProductBadges>
                    <WishlistButton>
                      <i className="far fa-heart"></i>
                    </WishlistButton>
                  </ProductImage>
                  <ProductContent className="product-content">
                    <div>
                      <ProductCategory>{product.category}</ProductCategory>
                      <ProductName>
                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                      </ProductName>
                      <ProductDescription className="product-description">
                        {product.description}
                      </ProductDescription>
                      <ProductRating>
                        <div className="stars">{renderStars(product.rating)}</div>
                        <div className="count">({product.reviewCount})</div>
                      </ProductRating>
                    </div>
                    <div>
                      <ProductPrice>
                        <span className="current">{product.price.toLocaleString('tr-TR')} ₺</span>
                        {product.oldPrice && (
                          <span className="old">{product.oldPrice.toLocaleString('tr-TR')} ₺</span>
                        )}
                      </ProductPrice>
                      <AddToCartButton>Sepete Ekle</AddToCartButton>
                    </div>
                  </ProductContent>
                </ProductCard>
              ))}
            </ProductsGrid>
            
            <Pagination>
              <PageButton className="arrow" disabled={currentPage === 1}>
                <i className="fas fa-chevron-left"></i>
              </PageButton>
              
              {[...Array(totalPages)].map((_, index) => (
                <PageButton 
                  key={index + 1}
                  active={currentPage === index + 1}
                >
                  {index + 1}
                </PageButton>
              ))}
              
              <PageButton className="arrow" disabled={currentPage === totalPages}>
                <i className="fas fa-chevron-right"></i>
              </PageButton>
            </Pagination>
          </MainContent>
        </ProductsLayout>
      </ProductsContainer>
    </>
  );
};

export default ProductsPage;
