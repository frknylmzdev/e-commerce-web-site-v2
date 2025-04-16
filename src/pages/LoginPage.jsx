import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { loginSuccess } from '../features/auth/authSlice';

const LoginContainer = styled.div`
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
`;

const LoginCard = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
`;

const LoginTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
`;

const LoginForm = styled.form`
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

const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const RememberMeCheckbox = styled.input`
  margin-right: 0.5rem;
`;

const RememberMeLabel = styled.label`
  font-size: 0.9rem;
`;

const ForgotPassword = styled(Link)`
  font-size: 0.9rem;
  color: var(--primary-color);
  text-align: right;
  margin-bottom: 1.5rem;
  display: block;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
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

const SocialLoginButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SocialLoginButton = styled.button`
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

const RegisterPrompt = styled.div`
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

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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
    
    // Demo için basit doğrulama
    if (!formData.email || !formData.password) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    
    // Demo için giriş simülasyonu
    // Gerçek uygulamada API çağrısı yapılır
    if (formData.email === 'demo@example.com' && formData.password === 'password') {
      dispatch(loginSuccess({
        id: '1',
        name: 'Demo Kullanıcı',
        email: formData.email,
        isAdmin: true
      }));
      navigate('/');
    } else {
      setError('Geçersiz e-posta veya şifre.');
    }
  };
  
  const handleSocialLogin = (provider) => {
    // Demo için sosyal medya girişi simülasyonu
    // Gerçek uygulamada OAuth entegrasyonu yapılır
    dispatch(loginSuccess({
      id: '2',
      name: `${provider} Kullanıcı`,
      email: `${provider.toLowerCase()}@example.com`,
      isAdmin: false
    }));
    navigate('/');
  };
  
  return (
    <LoginContainer>
      <LoginCard>
        <LoginTitle>Giriş Yap</LoginTitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <LoginForm onSubmit={handleSubmit}>
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
          
          <RememberMeContainer>
            <RememberMeCheckbox
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
            />
            <RememberMeLabel htmlFor="rememberMe">Beni hatırla</RememberMeLabel>
          </RememberMeContainer>
          
          <ForgotPassword to="/forgot-password">Şifremi unuttum</ForgotPassword>
          
          <LoginButton type="submit">Giriş Yap</LoginButton>
        </LoginForm>
        
        <OrDivider>
          <span>veya</span>
        </OrDivider>
        
        <SocialLoginButtons>
          <SocialLoginButton
            bgColor="#3b5998"
            textColor="#ffffff"
            hoverColor="#2d4373"
            onClick={() => handleSocialLogin('Facebook')}
          >
            <i className="fab fa-facebook-f"></i>
            Facebook
          </SocialLoginButton>
          
          <SocialLoginButton
            bgColor="#db4437"
            textColor="#ffffff"
            hoverColor="#c1351e"
            onClick={() => handleSocialLogin('Google')}
          >
            <i className="fab fa-google"></i>
            Google
          </SocialLoginButton>
        </SocialLoginButtons>
        
        <RegisterPrompt>
          Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link>
        </RegisterPrompt>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;
