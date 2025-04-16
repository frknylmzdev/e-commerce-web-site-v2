import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfileTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileSidebar = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  height: fit-content;
`;

const ProfileAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 auto 1.5rem;
`;

const ProfileName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const ProfileEmail = styled.p`
  color: var(--dark-gray);
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ProfileMenu = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProfileMenuItem = styled.li`
  margin-bottom: 0.5rem;
  
  a, button {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: var(--border-radius);
    color: var(--text-color);
    text-decoration: none;
    transition: var(--transition);
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    
    &:hover, &.active {
      background-color: var(--light-gray);
      color: var(--primary-color);
    }
    
    &.active {
      font-weight: 600;
    }
    
    i {
      margin-right: 0.5rem;
      width: 20px;
      text-align: center;
    }
  }
`;

const ProfileMain = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
`;

const ProfileSection = styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--light-gray);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
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

const SaveButton = styled.button`
  padding: 0.75rem 1.5rem;
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

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--light-gray);
  }
  
  th {
    font-weight: 600;
    background-color: var(--background-color);
  }
  
  tr:hover {
    background-color: var(--background-color);
  }
  
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const OrderStatus = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  
  &.pending {
    background-color: #fff3cd;
    color: #856404;
  }
  
  &.processing {
    background-color: #cce5ff;
    color: #004085;
  }
  
  &.shipped {
    background-color: #d4edda;
    color: #155724;
  }
  
  &.delivered {
    background-color: #d1e7dd;
    color: #0f5132;
  }
  
  &.cancelled {
    background-color: #f8d7da;
    color: #721c24;
  }
`;

const ViewButton = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: var(--white);
  border-radius: var(--border-radius);
  font-size: 0.85rem;
  font-weight: 600;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const AddressCard = styled.div`
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
`;

const AddressType = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: var(--light-gray);
  color: var(--dark-gray);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
`;

const AddressName = styled.h4`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const AddressText = styled.p`
  color: var(--dark-gray);
  margin-bottom: 1rem;
`;

const AddressActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const AddressButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const AddAddressButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.5rem;
  border: 2px dashed var(--light-gray);
  border-radius: var(--border-radius);
  background: none;
  color: var(--medium-gray);
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
  
  i {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
`;

const ProfilePage = () => {
  const { user } = useSelector(state => state.auth);
  const [activeSection, setActiveSection] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Burada gerçek bir uygulamada API çağrısı yapılır
    alert('Profil bilgileri güncellendi!');
  };
  
  const handleChangePassword = (e) => {
    e.preventDefault();
    // Burada gerçek bir uygulamada API çağrısı yapılır
    alert('Şifre başarıyla değiştirildi!');
    setProfileData({
      ...profileData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  // Demo için örnek siparişler
  const orders = [
    {
      id: '1001',
      date: '15.04.2025',
      total: 4349.98,
      status: 'delivered',
      items: 2
    },
    {
      id: '1002',
      date: '10.04.2025',
      total: 8999.99,
      status: 'shipped',
      items: 1
    },
    {
      id: '1003',
      date: '05.04.2025',
      total: 749.98,
      status: 'processing',
      items: 3
    }
  ];
  
  // Demo için örnek adresler
  const addresses = [
    {
      id: 1,
      type: 'Ev',
      name: 'Ev Adresi',
      address: 'Atatürk Caddesi No:123, Daire:5',
      city: 'İstanbul',
      postalCode: '34000',
      country: 'Türkiye',
      phone: '0212 345 67 89'
    },
    {
      id: 2,
      type: 'İş',
      name: 'İş Adresi',
      address: 'Teknoloji Parkı B Blok No:42',
      city: 'İstanbul',
      postalCode: '34000',
      country: 'Türkiye',
      phone: '0212 987 65 43'
    }
  ];
  
  const getStatusText = (status) => {
    switch(status) {
      case 'pending':
        return 'Beklemede';
      case 'processing':
        return 'İşleniyor';
      case 'shipped':
        return 'Kargoya Verildi';
      case 'delivered':
        return 'Teslim Edildi';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return status;
    }
  };
  
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  return (
    <ProfileContainer>
      <ProfileTitle>Hesabım</ProfileTitle>
      <ProfileContent>
        <ProfileSidebar>
          <ProfileAvatar>
            {getInitials(user?.name)}
          </ProfileAvatar>
          <ProfileName>{user?.name || 'Kullanıcı'}</ProfileName>
          <ProfileEmail>{user?.email || 'kullanici@example.com'}</ProfileEmail>
          
          <ProfileMenu>
            <ProfileMenuItem>
              <button 
                className={activeSection === 'profile' ? 'active' : ''}
                onClick={() => setActiveSection('profile')}
              >
                <i className="fas fa-user"></i> Profil Bilgileri
              </button>
            </ProfileMenuItem>
            <ProfileMenuItem>
              <button 
                className={activeSection === 'orders' ? 'active' : ''}
                onClick={() => setActiveSection('orders')}
              >
                <i className="fas fa-shopping-bag"></i> Siparişlerim
              </button>
            </ProfileMenuItem>
            <ProfileMenuItem>
              <button 
                className={activeSection === 'addresses' ? 'active' : ''}
                onClick={() => setActiveSection('addresses')}
              >
                <i className="fas fa-map-marker-alt"></i> Adreslerim
              </button>
            </ProfileMenuItem>
            <ProfileMenuItem>
              <button 
                className={activeSection === 'password' ? 'active' : ''}
                onClick={() => setActiveSection('password')}
              >
                <i className="fas fa-lock"></i> Şifre Değiştir
              </button>
            </ProfileMenuItem>
            <ProfileMenuItem>
              <Link to="/">
                <i className="fas fa-sign-out-alt"></i> Çıkış Yap
              </Link>
            </ProfileMenuItem>
          </ProfileMenu>
        </ProfileSidebar>
        
        <ProfileMain>
          <ProfileSection active={activeSection === 'profile'}>
            <SectionTitle>Profil Bilgileri</SectionTitle>
            <form onSubmit={handleSaveProfile}>
              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="firstName">Ad</FormLabel>
                  <FormInput
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="lastName">Soyad</FormLabel>
                  <FormInput
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
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
                    value={profileData.email}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="phone">Telefon</FormLabel>
                  <FormInput
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </FormRow>
              <SaveButton type="submit">Değişiklikleri Kaydet</SaveButton>
            </form>
          </ProfileSection>
          
          <ProfileSection active={activeSection === 'orders'}>
            <SectionTitle>Siparişlerim</SectionTitle>
            <OrdersTable>
              <thead>
                <tr>
                  <th>Sipariş No</th>
                  <th>Tarih</th>
                  <th>Ürün Sayısı</th>
                  <th>Toplam</th>
                  <th>Durum</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.items}</td>
                    <td>{order.total.toLocaleString('tr-TR')} ₺</td>
                    <td>
                      <OrderStatus className={order.status}>
                        {getStatusText(order.status)}
                      </OrderStatus>
                    </td>
                    <td>
                      <ViewButton to={`/orders/${order.id}`}>
                        Detaylar
                      </ViewButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </OrdersTable>
          </ProfileSection>
          
          <ProfileSection active={activeSection === 'addresses'}>
            <SectionTitle>Adreslerim</SectionTitle>
            {addresses.map(address => (
              <AddressCard key={address.id}>
                <AddressType>{address.type}</AddressType>
                <AddressName>{address.name}</AddressName>
                <AddressText>
                  {address.address}, {address.city}, {address.postalCode}, {address.country}
                  <br />
                  Tel: {address.phone}
                </AddressText>
                <AddressActions>
                  <AddressButton>Düzenle</AddressButton>
                  <AddressButton>Sil</AddressButton>
                </AddressActions>
              </AddressCard>
            ))}
            <AddAddressButton>
              <i className="fas fa-plus"></i> Yeni Adres Ekle
            </AddAddressButton>
          </ProfileSection>
          
          <ProfileSection active={activeSection === 'password'}>
            <SectionTitle>Şifre Değiştir</SectionTitle>
            <form onSubmit={handleChangePassword}>
              <FormGroup>
                <FormLabel htmlFor="currentPassword">Mevcut Şifre</FormLabel>
                <FormInput
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={profileData.currentPassword}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="newPassword">Yeni Şifre</FormLabel>
                <FormInput
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={profileData.newPassword}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="confirmPassword">Yeni Şifre Tekrar</FormLabel>
                <FormInput
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={profileData.confirmPassword}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <SaveButton type="submit">Şifreyi Değiştir</SaveButton>
            </form>
          </ProfileSection>
        </ProfileMain>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default ProfilePage;
