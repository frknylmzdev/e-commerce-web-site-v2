import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { clearCart } from '../features/cart/cartSlice';

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CheckoutTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const CheckoutContent = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const CheckoutForm = styled.form`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--light-gray);
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const PaymentMethods = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PaymentMethod = styled.div`
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  padding: 1rem;
  cursor: pointer;
  transition: var(--transition);
  
  &.active {
    border-color: var(--primary-color);
    background-color: rgba(52, 152, 219, 0.05);
  }
  
  &:hover {
    border-color: var(--primary-color);
  }
`;

const PaymentMethodHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const PaymentMethodRadio = styled.input`
  margin-right: 0.5rem;
`;

const PaymentMethodTitle = styled.h3`
  font-weight: 600;
  font-size: 1rem;
`;

const PaymentMethodDescription = styled.p`
  font-size: 0.9rem;
  color: var(--dark-gray);
`;

const OrderSummary = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  height: fit-content;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--light-gray);
`;

const OrderItems = styled.div`
  margin-bottom: 1.5rem;
`;

const OrderItem = styled.div`
  display: flex;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--light-gray);
  
  &:last-child {
    border-bottom: none;
  }
`;

const OrderItemImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-right: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const OrderItemInfo = styled.div`
  flex: 1;
`;

const OrderItemTitle = styled.h4`
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const OrderItemPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  
  span:last-child {
    font-weight: 600;
  }
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

const PlaceOrderButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  background-color: var(--primary-color);
  color: var(--white);
  text-align: center;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  margin-top: 2rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--secondary-color);
  }
  
  &:disabled {
    background-color: var(--medium-gray);
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background-color: var(--secondary-color);
  color: var(--white);
  padding: 2rem;
  border-radius: var(--border-radius);
  text-align: center;
  margin-bottom: 2rem;
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const SuccessTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const SuccessText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const BackToHomeButton = styled.button`
  padding: 1rem 2rem;
  background-color: var(--white);
  color: var(--secondary-color);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const CheckoutPage = () => {
  const { items, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Türkiye',
    paymentMethod: 'creditCard',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
    notes: ''
  });
  
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handlePaymentMethodChange = (method) => {
    setFormData({
      ...formData,
      paymentMethod: method
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada gerçek bir uygulamada API çağrısı yapılır
    // Şimdilik sadece başarılı sipariş simülasyonu yapıyoruz
    setTimeout(() => {
      setOrderPlaced(true);
      dispatch(clearCart());
    }, 1000);
  };
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  if (orderPlaced) {
    return (
      <CheckoutContainer>
        <SuccessMessage>
          <SuccessIcon>
            <i className="fas fa-check-circle"></i>
          </SuccessIcon>
          <SuccessTitle>Siparişiniz Alındı!</SuccessTitle>
          <SuccessText>
            Siparişiniz başarıyla oluşturuldu. Sipariş detayları e-posta adresinize gönderildi.
          </SuccessText>
          <BackToHomeButton onClick={handleBackToHome}>
            Ana Sayfaya Dön
          </BackToHomeButton>
        </SuccessMessage>
      </CheckoutContainer>
    );
  }
  
  return (
    <CheckoutContainer>
      <CheckoutTitle>Ödeme</CheckoutTitle>
      <CheckoutContent>
        <CheckoutForm onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Kişisel Bilgiler</SectionTitle>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="firstName">Ad</FormLabel>
                <FormInput
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="lastName">Soyad</FormLabel>
                <FormInput
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="email">E-posta</FormLabel>
                <FormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="phone">Telefon</FormLabel>
                <FormInput
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </FormRow>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Teslimat Adresi</SectionTitle>
            <FormGroup>
              <FormLabel htmlFor="address">Adres</FormLabel>
              <FormInput
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="city">Şehir</FormLabel>
                <FormInput
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="postalCode">Posta Kodu</FormLabel>
                <FormInput
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </FormRow>
            <FormGroup>
              <FormLabel htmlFor="country">Ülke</FormLabel>
              <FormSelect
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="Türkiye">Türkiye</option>
                <option value="Almanya">Almanya</option>
                <option value="İngiltere">İngiltere</option>
                <option value="Fransa">Fransa</option>
                <option value="İtalya">İtalya</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="notes">Sipariş Notu (İsteğe Bağlı)</FormLabel>
              <FormTextarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </FormGroup>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Ödeme Yöntemi</SectionTitle>
            <PaymentMethods>
              <PaymentMethod 
                className={formData.paymentMethod === 'creditCard' ? 'active' : ''}
                onClick={() => handlePaymentMethodChange('creditCard')}
              >
                <PaymentMethodHeader>
                  <PaymentMethodRadio
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'creditCard'}
                    onChange={() => {}}
                  />
                  <PaymentMethodTitle>Kredi Kartı</PaymentMethodTitle>
                </PaymentMethodHeader>
                <PaymentMethodDescription>
                  Visa, Mastercard, American Express
                </PaymentMethodDescription>
              </PaymentMethod>
              
              <PaymentMethod 
                className={formData.paymentMethod === 'paypal' ? 'active' : ''}
                onClick={() => handlePaymentMethodChange('paypal')}
              >
                <PaymentMethodHeader>
                  <PaymentMethodRadio
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={() => {}}
                  />
                  <PaymentMethodTitle>PayPal</PaymentMethodTitle>
                </PaymentMethodHeader>
                <PaymentMethodDescription>
                  Güvenli online ödeme
                </PaymentMethodDescription>
              </PaymentMethod>
              
              <PaymentMethod 
                className={formData.paymentMethod === 'bankTransfer' ? 'active' : ''}
                onClick={() => handlePaymentMethodChange('bankTransfer')}
              >
                <PaymentMethodHeader>
                  <PaymentMethodRadio
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'bankTransfer'}
                    onChange={() => {}}
                  />
                  <PaymentMethodTitle>Havale/EFT</PaymentMethodTitle>
                </PaymentMethodHeader>
                <PaymentMethodDescription>
                  Banka havalesi ile ödeme
                </PaymentMethodDescription>
              </PaymentMethod>
            </PaymentMethods>
            
            {formData.paymentMethod === 'creditCard' && (
              <div style={{ marginTop: '1.5rem' }}>
                <FormGroup>
                  <FormLabel htmlFor="cardNumber">Kart Numarası</FormLabel>
                  <FormInput
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="cardName">Kart Üzerindeki İsim</FormLabel>
                  <FormInput
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="cardExpiry">Son Kullanma Tarihi</FormLabel>
                    <FormInput
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel htmlFor="cardCvc">CVC</FormLabel>
                    <FormInput
                      type="text"
                      id="cardCvc"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                    />
                  </FormGroup>
                </FormRow>
              </div>
            )}
          </FormSection>
          
          <PlaceOrderButton type="submit">
            Siparişi Tamamla
          </PlaceOrderButton>
        </CheckoutForm>
        
        <OrderSummary>
          <SummaryTitle>Sipariş Özeti</SummaryTitle>
          <OrderItems>
            {items.map(item => (
              <OrderItem key={item.id}>
                <OrderItemImage>
                  <img src={item.image} alt={item.name} />
                </OrderItemImage>
                <OrderItemInfo>
                  <OrderItemTitle>{item.name}</OrderItemTitle>
                  <OrderItemPrice>
                    <span>{item.quantity} x {item.price.toLocaleString('tr-TR')} ₺</span>
                    <span>{(item.price * item.quantity).toLocaleString('tr-TR')} ₺</span>
                  </OrderItemPrice>
                </OrderItemInfo>
              </OrderItem>
            ))}
          </OrderItems>
          
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
        </OrderSummary>
      </CheckoutContent>
    </CheckoutContainer>
  );
};

export default CheckoutPage;
