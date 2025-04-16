import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { addToCart, removeFromCart, clearCart } from '../features/cart/cartSlice';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CartTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
`;

const CartItem = styled.div`
  display: flex;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--light-gray);
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CartItemImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-right: 1.5rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const CartItemInfo = styled.div`
  flex: 1;
`;

const CartItemTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  
  a {
    color: var(--text-color);
    transition: var(--transition);
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

const CartItemPrice = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CartItemCategory = styled.div`
  font-size: 0.9rem;
  color: var(--medium-gray);
  margin-bottom: 1rem;
`;

const CartItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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
  width: 30px;
  height: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--medium-gray);
    color: var(--white);
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 30px;
  border: none;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: var(--accent-color);
  cursor: pointer;
  font-size: 0.9rem;
  transition: var(--transition);
  
  &:hover {
    text-decoration: underline;
  }
`;

const CartSummary = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  height: fit-content;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--light-gray);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  &.total {
    font-weight: 700;
    font-size: 1.2rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--light-gray);
  }
`;

const CheckoutButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 1rem;
  background-color: var(--primary-color);
  color: var(--white);
  text-align: center;
  border-radius: var(--border-radius);
  font-weight: 600;
  margin-top: 2rem;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const ContinueShoppingButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 1rem;
  background-color: transparent;
  color: var(--primary-color);
  text-align: center;
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  font-weight: 600;
  margin-top: 1rem;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--primary-color);
    color: var(--white);
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  color: var(--medium-gray);
  margin-bottom: 1.5rem;
`;

const EmptyCartText = styled.p`
  font-size: 1.2rem;
  color: var(--dark-gray);
  margin-bottom: 1.5rem;
`;

const CartPage = () => {
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  
  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart(item));
  };
  
  const handleDecreaseQuantity = (id) => {
    dispatch(removeFromCart(id));
  };
  
  const handleRemoveItem = (id) => {
    // Burada ürünü tamamen kaldırmak için özel bir action eklenebilir
    // Şimdilik quantity kadar removeFromCart çağırıyoruz
    const item = items.find(item => item.id === id);
    for (let i = 0; i < item.quantity; i++) {
      dispatch(removeFromCart(id));
    }
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
  
  if (items.length === 0) {
    return (
      <CartContainer>
        <CartTitle>Alışveriş Sepeti</CartTitle>
        <EmptyCart>
          <EmptyCartIcon>
            <i className="fas fa-shopping-cart"></i>
          </EmptyCartIcon>
          <EmptyCartText>Sepetiniz boş.</EmptyCartText>
          <ContinueShoppingButton to="/products">
            Alışverişe Başla
          </ContinueShoppingButton>
        </EmptyCart>
      </CartContainer>
    );
  }
  
  return (
    <CartContainer>
      <CartTitle>Alışveriş Sepeti</CartTitle>
      <CartContent>
        <CartItems>
          {items.map(item => (
            <CartItem key={item.id}>
              <CartItemImage>
                <img src={item.image} alt={item.name} />
              </CartItemImage>
              <CartItemInfo>
                <CartItemTitle>
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                </CartItemTitle>
                <CartItemCategory>{getCategoryName(item.category)}</CartItemCategory>
                <CartItemPrice>{item.price.toLocaleString('tr-TR')} ₺</CartItemPrice>
                <CartItemActions>
                  <QuantitySelector>
                    <QuantityButton onClick={() => handleDecreaseQuantity(item.id)}>-</QuantityButton>
                    <QuantityInput type="text" value={item.quantity} readOnly />
                    <QuantityButton onClick={() => handleIncreaseQuantity(item)}>+</QuantityButton>
                  </QuantitySelector>
                  <RemoveButton onClick={() => handleRemoveItem(item.id)}>
                    Kaldır
                  </RemoveButton>
                </CartItemActions>
              </CartItemInfo>
            </CartItem>
          ))}
        </CartItems>
        
        <CartSummary>
          <SummaryTitle>Sipariş Özeti</SummaryTitle>
          <SummaryRow>
            <span>Ara Toplam</span>
            <span>{totalAmount.toLocaleString('tr-TR')} ₺</span>
          </SummaryRow>
          <SummaryRow>
            <span>Kargo</span>
            <span>Ücretsiz</span>
          </SummaryRow>
          <SummaryRow className="total">
            <span>Toplam</span>
            <span>{totalAmount.toLocaleString('tr-TR')} ₺</span>
          </SummaryRow>
          <CheckoutButton to="/checkout">
            Ödemeye Geç
          </CheckoutButton>
          <ContinueShoppingButton to="/products">
            Alışverişe Devam Et
          </ContinueShoppingButton>
        </CartSummary>
      </CartContent>
    </CartContainer>
  );
};

export default CartPage;
