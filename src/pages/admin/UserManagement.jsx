import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const UserManagementContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  
  i {
    font-size: 0.9rem;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.div`
  flex: 1;
  min-width: 250px;
  position: relative;
  
  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid var(--light-gray);
    border-radius: var(--border-radius);
    font-size: 0.9rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
  
  i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--medium-gray);
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  background-color: var(--white);
  font-size: 0.9rem;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const TableContainer = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: var(--light-gray);
`;

const TableRow = styled.tr`
  border-bottom: 1px solid var(--light-gray);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: var(--background-color);
  }
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--dark-gray);
`;

const TableCell = styled.td`
  padding: 1rem;
  color: var(--text-color);
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  
  &.admin {
    background-color: #9C27B0;
    color: #fff;
  }
  
  &.user {
    background-color: #2196F3;
    color: #fff;
  }
  
  &.active {
    background-color: #4CAF50;
    color: #fff;
  }
  
  &.inactive {
    background-color: #F44336;
    color: #fff;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.25rem;
  transition: var(--transition);
  
  &:hover {
    color: var(--secondary-color);
  }
  
  &.delete {
    color: #F44336;
    
    &:hover {
      color: #D32F2F;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
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

// Modal components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--dark-gray);
  transition: var(--transition);
  
  &:hover {
    color: var(--text-color);
  }
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
  padding: 0.75rem 1rem;
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  background-color: var(--white);
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--light-gray);
  color: var(--text-color);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--medium-gray);
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

// User details modal components
const UserDetailsContainer = styled.div`
  margin-bottom: 2rem;
`;

const UserSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--light-gray);
`;

const UserInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  margin-bottom: 0.5rem;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.span`
  color: var(--dark-gray);
`;

const OrderHistoryList = styled.div`
  margin-top: 1rem;
`;

const OrderHistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--light-gray);
  
  &:last-child {
    border-bottom: none;
  }
`;

const OrderId = styled.div`
  font-weight: 600;
`;

const OrderDate = styled.div`
  color: var(--dark-gray);
  font-size: 0.9rem;
`;

const OrderTotal = styled.div`
  font-weight: 600;
`;

const OrderStatus = styled.div``;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Örnek kullanıcı verileri (gerçek uygulamada API'den gelecek)
  const sampleUsers = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      isAdmin: false,
      isActive: true,
      createdAt: '2025-01-15T10:30:00Z',
      orders: [
        {
          id: 'ORD-001',
          date: '2025-04-16T10:25:00Z',
          total: 5049.99,
          status: 'delivered'
        }
      ],
      addresses: [
        {
          id: 1,
          addressName: 'Ev Adresi',
          address: 'Atatürk Cad. No:123',
          city: 'İstanbul',
          postalCode: '34000',
          country: 'Türkiye',
          phone: '05551234567'
        }
      ]
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      isAdmin: false,
      isActive: true,
      createdAt: '2025-02-20T14:45:00Z',
      orders: [
        {
          id: 'ORD-002',
          date: '2025-04-15T09:10:00Z',
          total: 9899.97,
          status: 'shipped'
        }
      ],
      addresses: [
        {
          id: 2,
          addressName: 'İş Adresi',
          address: 'İnönü Cad. No:456',
          city: 'Ankara',
          postalCode: '06000',
          country: 'Türkiye',
          phone: '05559876543'
        }
      ]
    },
    {
      id: 3,
      name: 'Ayşe Demir',
      email: 'ayse@example.com',
      isAdmin: false,
      isActive: true,
      createdAt: '2025-03-05T09:15:00Z',
      orders: [
        {
          id: 'ORD-003',
          date: '2025-04-15T14:40:00Z',
          total: 399.99,
          status: 'processing'
        }
      ],
      addresses: [
        {
          id: 3,
          addressName: 'Ev Adresi',
          address: 'Cumhuriyet Mah. 123 Sok. No:7',
          city: 'İzmir',
          postalCode: '35000',
          country: 'Türkiye',
          phone: '05553456789'
        }
      ]
    },
    {
      id: 4,
      name: 'Fatma Şahin',
      email: 'fatma@example.com',
      isAdmin: false,
      isActive: true,
      createdAt: '2025-03-10T16:20:00Z',
      orders: [
        {
          id: 'ORD-004',
          date: '2025-04-14T16:20:00Z',
          total: 5049.99,
          status: 'pending'
        }
      ],
      addresses: [
        {
          id: 4,
          addressName: 'Ev Adresi',
          address: 'Gazi Cad. No:78',
          city: 'Bursa',
          postalCode: '16000',
          country: 'Türkiye',
          phone: '05557891234'
        }
      ]
    },
    {
      id: 5,
      name: 'Ali Yıldız',
      email: 'ali@example.com',
      isAdmin: false,
      isActive: false,
      createdAt: '2025-01-05T11:30:00Z',
      orders: [
        {
          id: 'ORD-005',
          date: '2025-04-13T11:00:00Z',
          total: 139.99,
          status: 'cancelled'
        }
      ],
      addresses: [
        {
          id: 5,
          addressName: 'İş Adresi',
          address: 'Bağdat Cad. No:42',
          city: 'İstanbul',
          postalCode: '34000',
          country: 'Türkiye',
          phone: '05552345678'
        }
      ]
    },
    {
      id: 6,
      name: 'Admin User',
      email: 'admin@3dprintshop.com',
      isAdmin: true,
      isActive: true,
      createdAt: '2025-01-01T00:00:00Z',
      orders: [],
      addresses: []
    }
  ];
  
  // Sayfalama
  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  
  // Sayfa değiştirme
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Kullanıcı filtreleme
  useEffect(() => {
    setUsers(sampleUsers);
    setFilteredUsers(sampleUsers);
  }, []);
  
  useEffect(() => {
    let result = [...users];
    
    // Arama filtresi
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Rol filtresi
    if (roleFilter === 'admin') {
      result = result.filter(user => user.isAdmin);
    } else if (roleFilter === 'user') {
      result = result.filter(user => !user.isAdmin);
    } else if (roleFilter === 'active') {
      result = result.filter(user => user.isActive);
    } else if (roleFilter === 'inactive') {
      result = result.filter(user => !user.isActive);
    }
    
    setFilteredUsers(result);
    setCurrentPage(1);
  }, [searchTerm, roleFilter, users]);
  
  // Modal işlemleri
  const openAddModal = () => {
    setCurrentUser(null);
    setShowModal(true);
    setShowDetailsModal(false);
  };
  
  const openEditModal = (user) => {
    setCurrentUser(user);
    setShowModal(true);
    setShowDetailsModal(false);
  };
  
  const openDetailsModal = (user) => {
    setCurrentUser(user);
    setShowDetailsModal(true);
    setShowModal(false);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setShowDetailsModal(false);
    setCurrentUser(null);
  };
  
  const handleSaveUser = (e) => {
    e.preventDefault();
    // Burada API çağrısı yapılacak
    closeModal();
  };
  
  const handleDeleteUser = (id) => {
    // Burada API çağrısı yapılacak
    if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };
  
  // Kullanıcı avatarı için baş harfler
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Tarih formatı
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Sipariş durumu metni
  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Beklemede';
      case 'processing': return 'İşleniyor';
      case 'shipped': return 'Kargoda';
      case 'delivered': return 'Teslim Edildi';
      case 'cancelled': return 'İptal Edildi';
      default: return status;
    }
  };
  
  return (
    <UserManagementContainer>
      <PageHeader>
        <PageTitle>Kullanıcı Yönetimi</PageTitle>
        <AddButton onClick={openAddModal}>
          <i className="fas fa-plus"></i>
          Yeni Kullanıcı Ekle
        </AddButton>
      </PageHeader>
      
      <FiltersContainer>
        <SearchInput>
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="İsim veya e-posta ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        
        <FilterSelect 
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">Tüm Kullanıcılar</option>
          <option value="admin">Sadece Adminler</option>
          <option value="user">Sadece Kullanıcılar</option>
          <option value="active">Aktif Kullanıcılar</option>
          <option value="inactive">Pasif Kullanıcılar</option>
        </FilterSelect>
      </FiltersContainer>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Kullanıcı</TableHeader>
              <TableHeader>E-posta</TableHeader>
              <TableHeader>Kayıt Tarihi</TableHeader>
              <TableHeader>Rol</TableHeader>
              <TableHeader>Durum</TableHeader>
              <TableHeader>Sipariş Sayısı</TableHeader>
              <TableHeader>İşlemler</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <UserAvatar>{getInitials(user.name)}</UserAvatar>
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell>
                  <StatusBadge className={user.isAdmin ? 'admin' : 'user'}>
                    {user.isAdmin ? 'Admin' : 'Kullanıcı'}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <StatusBadge className={user.isActive ? 'active' : 'inactive'}>
                    {user.isActive ? 'Aktif' : 'Pasif'}
                  </StatusBadge>
                </TableCell>
                <TableCell>{user.orders.length}</TableCell>
                <TableCell>
                  <ActionButton onClick={() => openDetailsModal(user)}>
                    <i className="fas fa-eye"></i>
                  </ActionButton>
                  <ActionButton onClick={() => openEditModal(user)}>
                    <i className="fas fa-edit"></i>
                  </ActionButton>
                  <ActionButton 
                    className="delete" 
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={user.isAdmin}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      
      {totalPages > 1 && (
        <Pagination>
          <PageButton 
            className="arrow" 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left"></i>
          </PageButton>
          
          {[...Array(totalPages)].map((_, index) => (
            <PageButton 
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
          
          <PageButton 
            className="arrow" 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="fas fa-chevron-right"></i>
          </PageButton>
        </Pagination>
      )}
      
      {/* Kullanıcı Ekleme/Düzenleme Modal */}
      {showModal && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <ModalHeader>
              <ModalTitle>
                {currentUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
              </ModalTitle>
              <CloseButton onClick={closeModal}>
                <i className="fas fa-times"></i>
              </CloseButton>
            </ModalHeader>
            
            <form onSubmit={handleSaveUser}>
              <FormGroup>
                <FormLabel>Ad Soyad</FormLabel>
                <FormInput 
                  type="text" 
                  defaultValue={currentUser?.name || ''}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>E-posta</FormLabel>
                <FormInput 
                  type="email" 
                  defaultValue={currentUser?.email || ''}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Şifre {currentUser ? '(Boş bırakırsanız değişmez)' : ''}</FormLabel>
                <FormInput 
                  type="password" 
                  required={!currentUser}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Rol</FormLabel>
                <FormSelect defaultValue={currentUser?.isAdmin ? 'admin' : 'user'}>
                  <option value="user">Kullanıcı</option>
                  <option value="admin">Admin</option>
                </FormSelect>
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Durum</FormLabel>
                <FormSelect defaultValue={currentUser?.isActive ? 'active' : 'inactive'}>
                  <option value="active">Aktif</option>
                  <option value="inactive">Pasif</option>
                </FormSelect>
              </FormGroup>
              
              <ButtonGroup>
                <CancelButton type="button" onClick={closeModal}>
                  İptal
                </CancelButton>
                <SaveButton type="submit">
                  Kaydet
                </SaveButton>
              </ButtonGroup>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
      
      {/* Kullanıcı Detay Modal */}
      {showDetailsModal && currentUser && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <ModalHeader>
              <ModalTitle>
                Kullanıcı Detayları
              </ModalTitle>
              <CloseButton onClick={closeModal}>
                <i className="fas fa-times"></i>
              </CloseButton>
            </ModalHeader>
            
            <UserDetailsContainer>
              <UserSection>
                <SectionTitle>Kullanıcı Bilgileri</SectionTitle>
                <UserInfo>
                  <InfoItem>
                    <InfoLabel>Ad Soyad</InfoLabel>
                    <InfoValue>{currentUser.name}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>E-posta</InfoLabel>
                    <InfoValue>{currentUser.email}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Kayıt Tarihi</InfoLabel>
                    <InfoValue>{formatDate(currentUser.createdAt)}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Rol</InfoLabel>
                    <InfoValue>
                      <StatusBadge className={currentUser.isAdmin ? 'admin' : 'user'}>
                        {currentUser.isAdmin ? 'Admin' : 'Kullanıcı'}
                      </StatusBadge>
                    </InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Durum</InfoLabel>
                    <InfoValue>
                      <StatusBadge className={currentUser.isActive ? 'active' : 'inactive'}>
                        {currentUser.isActive ? 'Aktif' : 'Pasif'}
                      </StatusBadge>
                    </InfoValue>
                  </InfoItem>
                </UserInfo>
              </UserSection>
              
              {currentUser.addresses.length > 0 && (
                <UserSection>
                  <SectionTitle>Adresler</SectionTitle>
                  {currentUser.addresses.map((address, index) => (
                    <div key={address.id} style={{ marginBottom: '1rem' }}>
                      <h4 style={{ marginBottom: '0.5rem' }}>{address.addressName}</h4>
                      <p>{address.address}</p>
                      <p>{address.city}, {address.postalCode}</p>
                      <p>{address.country}</p>
                      <p>Tel: {address.phone}</p>
                    </div>
                  ))}
                </UserSection>
              )}
              
              <UserSection>
                <SectionTitle>Sipariş Geçmişi</SectionTitle>
                {currentUser.orders.length > 0 ? (
                  <OrderHistoryList>
                    {currentUser.orders.map((order, index) => (
                      <OrderHistoryItem key={order.id}>
                        <OrderId>{order.id}</OrderId>
                        <OrderDate>{formatDate(order.date)}</OrderDate>
                        <OrderTotal>{order.total.toLocaleString('tr-TR')} ₺</OrderTotal>
                        <OrderStatus>
                          <StatusBadge className={order.status}>
                            {getStatusText(order.status)}
                          </StatusBadge>
                        </OrderStatus>
                      </OrderHistoryItem>
                    ))}
                  </OrderHistoryList>
                ) : (
                  <p>Henüz sipariş bulunmuyor.</p>
                )}
              </UserSection>
              
              <ButtonGroup>
                <CancelButton type="button" onClick={closeModal}>
                  Kapat
                </CancelButton>
                <SaveButton type="button" onClick={() => {
                  setShowDetailsModal(false);
                  openEditModal(currentUser);
                }}>
                  Düzenle
                </SaveButton>
              </ButtonGroup>
            </UserDetailsContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </UserManagementContainer>
  );
};

export default UserManagement;
