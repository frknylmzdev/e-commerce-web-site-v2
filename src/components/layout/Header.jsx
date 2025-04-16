import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const HeaderContainer = styled.header`
  background-color: var(--white);
  box-shadow: var(--box-shadow);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-wrap: wrap;
  }
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: var(--secondary-color);
  }

  &:hover {
    color: var(--primary-color);
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
    order: 3;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavItem = styled.li`
  a {
    color: var(--text-color);
    font-weight: 500;
    transition: var(--transition);
    padding: 0.5rem 0;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--primary-color);
      transition: var(--transition);
    }

    &:hover {
      color: var(--primary-color);

      &:after {
        width: 100%;
      }
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CartButton = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--light-gray);
  transition: var(--transition);

  &:hover {
    background-color: var(--primary-color);
    color: var(--white);
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--accent-color);
  color: var(--white);
  font-size: 0.75rem;
  font-weight: 600;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthButton = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: var(--transition);
  
  &.login {
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    
    &:hover {
      background-color: var(--primary-color);
      color: var(--white);
    }
  }
  
  &.register {
    background-color: var(--primary-color);
    color: var(--white);
    
    &:hover {
      background-color: var(--secondary-color);
    }
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--text-color);
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  
  &:hover {
    background-color: var(--light-gray);
  }
`;

const UserMenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  width: 200px;
  z-index: 10;
  overflow: hidden;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const UserMenuList = styled.ul`
  list-style: none;
`;

const UserMenuItem = styled.li`
  a, button {
    display: block;
    padding: 0.75rem 1rem;
    color: var(--text-color);
    text-decoration: none;
    transition: var(--transition);
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    
    &:hover {
      background-color: var(--light-gray);
      color: var(--primary-color);
    }
  }
`;

const Header = () => {
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { totalQuantity } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          3D <span>Baskı</span> Dünyası
        </Logo>
        
        <Nav>
          <NavList>
            <NavItem>
              <Link to="/">Ana Sayfa</Link>
            </NavItem>
            <NavItem>
              <Link to="/products/printers">3D Yazıcılar</Link>
            </NavItem>
            <NavItem>
              <Link to="/products/filaments">Filamentler</Link>
            </NavItem>
            <NavItem>
              <Link to="/products/models">3D Modeller</Link>
            </NavItem>
            <NavItem>
              <Link to="/products/prints">Baskılı Ürünler</Link>
            </NavItem>
          </NavList>
        </Nav>
        
        <HeaderActions>
          <CartButton to="/cart">
            <i className="fas fa-shopping-cart"></i>
            {totalQuantity > 0 && <CartCount>{totalQuantity}</CartCount>}
          </CartButton>
          
          {isAuthenticated ? (
            <UserMenu>
              <UserButton onClick={() => setUserMenuOpen(!userMenuOpen)}>
                {user?.name || 'Kullanıcı'}
                <i className={`fas fa-chevron-${userMenuOpen ? 'up' : 'down'}`}></i>
              </UserButton>
              
              <UserMenuDropdown isOpen={userMenuOpen}>
                <UserMenuList>
                  <UserMenuItem>
                    <Link to="/profile" onClick={() => setUserMenuOpen(false)}>
                      Profilim
                    </Link>
                  </UserMenuItem>
                  <UserMenuItem>
                    <Link to="/orders" onClick={() => setUserMenuOpen(false)}>
                      Siparişlerim
                    </Link>
                  </UserMenuItem>
                  {user?.isAdmin && (
                    <UserMenuItem>
                      <Link to="/admin" onClick={() => setUserMenuOpen(false)}>
                        Yönetim Paneli
                      </Link>
                    </UserMenuItem>
                  )}
                  <UserMenuItem>
                    <button onClick={handleLogout}>Çıkış Yap</button>
                  </UserMenuItem>
                </UserMenuList>
              </UserMenuDropdown>
            </UserMenu>
          ) : (
            <>
              <AuthButton to="/login" className="login">
                Giriş Yap
              </AuthButton>
              <AuthButton to="/register" className="register">
                Kayıt Ol
              </AuthButton>
            </>
          )}
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
