import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { registerSuccess } from '../features/auth/authSlice';

const RegisterContainer = styled.div`
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
`;

const RegisterCard = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
`;

const RegisterTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const TermsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const TermsCheckbox = styled.input`
  margin-right: 0.5rem;
  margin-top: 0.25rem;
`;

const TermsLabel = styled.label`
  font-size: 0.9rem;
  line-height: 1.4;
  
  a {
    color: var(--primary-color);
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1rem;
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

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  
  &:before, &:after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: var(--light-gray);
  }
  
  span {
    padding: 0 1rem;
    color: var(--medium-gray);
    font-size: 0.9rem;
  }
`;

const SocialRegisterButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SocialRegisterButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: ${props => props.bgColor || 'var(--white)'};
  color: ${props => props.textColor || 'var(--text-color)'};
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: ${props => props.hoverColor || 'var(--light-gray)'};
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-size: 0.9rem;
  
  a {
    color: var(--primary-color);
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basit doğrulama
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }
    
    if (!formData.agreeTerms) {
      setError('Devam etmek için kullanım koşullarını kabul etmelisiniz.');
      return;
    }
    
    // Demo için kayıt simülasyonu
    // Gerçek uygulamada API çağrısı yapılır
    dispatch(registerSuccess({
      id: '3',
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      isAdmin: false
    }));
    navigate('/');
  };
  
  const handleSocialRegister = (provider) => {
    // Demo için sosyal medya kaydı simülasyonu
    // Gerçek uygulamada OAuth entegrasyonu yapılır
    dispatch(registerSuccess({
      id: '4',
      name: `${provider} Kullanıcı`,
      email: `${provider.toLowerCase()}@example.com`,
      isAdmin: false
    }));
    navigate('/');
  };
  
  return (
    <RegisterContainer>
      <RegisterCard>
        <RegisterTitle>Kayıt Ol</RegisterTitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <RegisterForm onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <FormLabel htmlFor="firstName">Ad</FormLabel>
              <FormInput
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Adınızı girin"
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
                placeholder="Soyadınızı girin"
                required
              />
            </FormGroup>
          </FormRow>
          
          <FormGroup>
            <FormLabel htmlFor="email">E-posta</FormLabel>
            <FormInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="E-posta adresinizi girin"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="password">Şifre</FormLabel>
            <FormInput
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Şifrenizi girin"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="confirmPassword">Şifre Tekrar</FormLabel>
            <FormInput
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Şifrenizi tekrar girin"
              required
            />
          </FormGroup>
          
          <TermsContainer>
            <TermsCheckbox
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              required
            />
            <TermsLabel htmlFor="agreeTerms">
              <Link to="/terms">Kullanım Koşulları</Link> ve <Link to="/privacy">Gizlilik Politikası</Link>'nı okudum ve kabul ediyorum.
            </TermsLabel>
          </TermsContainer>
          
          <RegisterButton type="submit" disabled={!formData.agreeTerms}>
            Kayıt Ol
          </RegisterButton>
        </RegisterForm>
        
        <OrDivider>
          <span>veya</span>
        </OrDivider>
        
        <SocialRegisterButtons>
          <SocialRegisterButton
            bgColor="#3b5998"
            textColor="#ffffff"
            hoverColor="#2d4373"
            onClick={() => handleSocialRegister('Facebook')}
          >
            <i className="fab fa-facebook-f"></i>
            Facebook
          </SocialRegisterButton>
          
          <SocialRegisterButton
            bgColor="#db4437"
            textColor="#ffffff"
            hoverColor="#c1351e"
            onClick={() => handleSocialRegister('Google')}
          >
            <i className="fab fa-google"></i>
            Google
          </SocialRegisterButton>
        </SocialRegisterButtons>
        
        <LoginPrompt>
          Zaten bir hesabınız var mı? <Link to="/login">Giriş Yap</Link>
        </LoginPrompt>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default RegisterPage;
