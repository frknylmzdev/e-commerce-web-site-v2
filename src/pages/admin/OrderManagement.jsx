import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const OrderManagementContainer = styled.div`
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

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  
  &.pending {
    background-color: #FFC107;
    color: #000;
  }
  
  &.processing {
    background-color: #2196F3;
    color: #fff;
  }
  
  &.shipped {
    background-color: #9C27B0;
    color: #fff;
  }
  
  &.delivered {
    background-color: #4CAF50;
    color: #fff;
  }
  
  &.cancelled {
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

const OrderDetails = styled.div`
  margin-bottom: 2rem;
`;

const OrderSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--light-gray);
`;

const OrderInfo = styled.div`
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

const OrderItemsList = styled.div`
  margin-bottom: 1.5rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--light-gray);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: var(--border-radius);
  margin-right: 1rem;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const ItemPrice = styled.div`
  color: var(--dark-gray);
  font-size: 0.9rem;
`;

const ItemQuantity = styled.div`
  width: 50px;
  text-align: center;
  font-weight: 600;
`;

const OrderSummary = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--light-gray);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  &.total {
    font-weight: 700;
    font-size: 1.1rem;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px dashed var(--light-gray);
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

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  
  // Örnek sipariş verileri (gerçek uygulamada API'den gelecek)
  const sampleOrders = [
    {
      id: 'ORD-001',
      user: {
        id: 1,
        name: 'Ahmet Yılmaz',
        email: 'ahmet@example.com'
      },
      orderItems: [
        {
          id: 1,
          name: 'Creality Ender 3 V2 3D Yazıcı',
          image: '/images/3d-printer-real.jpg',
          price: 4999.99,
          quantity: 1
        }
      ],
      shippingAddress: {
        addressName: 'Ev Adresi',
        address: 'Atatürk Cad. No:123',
        city: 'İstanbul',
        postalCode: '34000',
        country: 'Türkiye',
        phone: '05551234567'
      },
      paymentMethod: 'Kredi Kartı',
      taxPrice: 50,
      shippingPrice: 0,
      totalPrice: 5049.99,
      isPaid: true,
      paidAt: '2025-04-16T10:30:00Z',
      isDelivered: true,
      deliveredAt: '2025-04-18T14:20:00Z',
      status: 'delivered',
      createdAt: '2025-04-16T10:25:00Z'
    },
    {
      id: 'ORD-002',
      user: {
        id: 2,
        name: 'Mehmet Kaya',
        email: 'mehmet@example.com'
      },
      orderItems: [
        {
          id: 5,
          name: 'Anycubic Photon Mono X 3D Yazıcı',
          image: '/images/3d-printer-real.jpg',
          price: 8999.99,
          quantity: 1
        },
        {
          id: 6,
          name: 'ABS Filament 1.75mm 1kg - Siyah',
          image: '/images/3d-printer-real.jpg',
          price: 399.99,
          quantity: 2
        }
      ],
      shippingAddress: {
        addressName: 'İş Adresi',
        address: 'İnönü Cad. No:456',
        city: 'Ankara',
        postalCode: '06000',
        country: 'Türkiye',
        phone: '05559876543'
      },
      paymentMethod: 'Havale/EFT',
      taxPrice: 100,
      shippingPrice: 0,
      totalPrice: 9899.97,
      isPaid: true,
      paidAt: '2025-04-15T09:15:00Z',
      isDelivered: false,
      deliveredAt: null,
      status: 'shipped',
      trackingNumber: 'TR123456789',
      createdAt: '2025-04-15T09:10:00Z'
    },
    {
      id: 'ORD-003',
      user: {
        id: 3,
        name: 'Ayşe Demir',
        email: 'ayse@example.com'
      },
      orderItems: [
        {
          id: 2,
          name: 'PLA+ Filament 1.75mm 1kg - Beyaz',
          image: '/images/3d-printer-real.jpg',
          price: 349.99,
          quantity: 1
        }
      ],
      shippingAddress: {
        addressName: 'Ev Adresi',
        address: 'Cumhuriyet Mah. 123 Sok. No:7',
        city: 'İzmir',
        postalCode: '35000',
        country: 'Türkiye',
        phone: '05553456789'
      },
      paymentMethod: 'Kredi Kartı',
      taxPrice: 30,
      shippingPrice: 20,
      totalPrice: 399.99,
      isPaid: true,
      paidAt: '2025-04-15T14:45:00Z',
      isDelivered: false,
      deliveredAt: null,
      status: 'processing',
      createdAt: '2025-04-15T14:40:00Z'
    },
    {
      id: 'ORD-004',
      user: {
        id: 4,
        name: 'Fatma Şahin',
        email: 'fatma@example.com'
      },
      orderItems: [
        {
          id: 1,
          name: 'Creality Ender 3 V2 3D Yazıcı',
          image: '/images/3d-printer-real.jpg',
          price: 4999.99,
          quantity: 1
        }
      ],
      shippingAddress: {
        addressName: 'Ev Adresi',
        address: 'Gazi Cad. No:78',
        city: 'Bursa',
        postalCode: '16000',
        country: 'Türkiye',
        phone: '05557891234'
      },
      paymentMethod: 'Kapıda Ödeme',
      taxPrice: 50,
      shippingPrice: 0,
      totalPrice: 5049.99,
      isPaid: false,
      paidAt: null,
      isDelivered: false,
      deliveredAt: null,
      status: 'pending',
      createdAt: '2025-04-14T16:20:00Z'
    },
    {
      id: 'ORD-005',
      user: {
        id: 5,
        name: 'Ali Yıldız',
        email: 'ali@example.com'
      },
      orderItems: [
        {
          id: 3,
          name: 'Bugatti Veyron 3D Model',
          image: '/images/3d-model-car.png',
          price: 129.99,
          quantity: 1
        }
      ],
      shippingAddress: {
        addressName: 'İş Adresi',
        address: 'Bağdat Cad. No:42',
        city: 'İstanbul',
        postalCode: '34000',
        country: 'Türkiye',
        phone: '05552345678'
      },
      paymentMethod: 'Kredi Kartı',
      taxPrice: 10,
      shippingPrice: 0,
      totalPrice: 139.99,
      isPaid: true,
      paidAt: '2025-04-13T11:05:00Z',
      isDelivered: false,
      deliveredAt: null,
      status: 'cancelled',
      createdAt: '2025-04-13T11:00:00Z'
    }
  ];
  
  // Sayfalama
  const ordersPerPage = 5;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  
  // Sayfa değiştirme
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Sipariş filtreleme
  useEffect(() => {
    setOrders(sampleOrders);
    setFilteredOrders(sampleOrders);
  }, []);
  
  useEffect(() => {
    let result = [...orders];
    
    // Arama filtresi
    if (searchTerm) {
      result = result.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Durum filtresi
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    setFilteredOrders(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, orders]);
  
  // Modal işlemleri
  const openOrderModal = (order) => {
    setCurrentOrder(order);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setCurrentOrder(null);
  };
  
  const handleUpdateOrder = (e) => {
    e.preventDefault();
    // Burada API çağrısı yapılacak
    closeModal();
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
  
  // Tarih formatı
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <OrderManagementContainer>
      <PageHeader>
        <PageTitle>Sipariş Yönetimi</PageTitle>
      </PageHeader>
      
      <FiltersContainer>
        <SearchInput>
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="Sipariş no, müşteri adı veya e-posta ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        
        <FilterSelect 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Tüm Durumlar</option>
          <option value="pending">Beklemede</option>
          <option value="processing">İşleniyor</option>
          <option value="shipped">Kargoda</option>
          <option value="delivered">Teslim Edildi</option>
          <option value="cancelled">İptal Edildi</option>
        </FilterSelect>
      </FiltersContainer>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Sipariş No</TableHeader>
              <TableHeader>Tarih</TableHeader>
              <TableHeader>Müşteri</TableHeader>
              <TableHeader>Toplam</TableHeader>
              <TableHeader>Ödeme</TableHeader>
              <TableHeader>Durum</TableHeader>
              <TableHeader>İşlemler</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {currentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>{order.totalPrice.toLocaleString('tr-TR')} ₺</TableCell>
                <TableCell>
                  {order.isPaid ? (
                    <span style={{ color: '#4CAF50' }}>
                      <i className="fas fa-check-circle"></i> Ödendi
                    </span>
                  ) : (
                    <span style={{ color: '#F44336' }}>
                      <i className="fas fa-times-circle"></i> Ödenmedi
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <StatusBadge className={order.status}>
                    {getStatusText(order.status)}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <ActionButton onClick={() => openOrderModal(order)}>
                    <i className="fas fa-eye"></i>
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
      
      {/* Sipariş Detay Modal */}
      {showModal && currentOrder && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <ModalHeader>
              <ModalTitle>
                Sipariş Detayı - {currentOrder.id}
              </ModalTitle>
              <CloseButton onClick={closeModal}>
                <i className="fas fa-times"></i>
              </CloseButton>
            </ModalHeader>
            
            <OrderDetails>
              <OrderSection>
                <SectionTitle>Sipariş Bilgileri</SectionTitle>
                <OrderInfo>
                  <InfoItem>
                    <InfoLabel>Sipariş Tarihi</InfoLabel>
                    <InfoValue>{formatDate(currentOrder.createdAt)}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Durum</InfoLabel>
                    <InfoValue>
                      <StatusBadge className={currentOrder.status}>
                        {getStatusText(currentOrder.status)}
                      </StatusBadge>
                    </InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Müşteri</InfoLabel>
                    <InfoValue>{currentOrder.user.name}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>E-posta</InfoLabel>
                    <InfoValue>{currentOrder.user.email}</InfoValue>
                  </InfoItem>
                </OrderInfo>
              </OrderSection>
              
              <OrderSection>
                <SectionTitle>Teslimat Adresi</SectionTitle>
                <OrderInfo>
                  <InfoItem>
                    <InfoLabel>Adres Adı</InfoLabel>
                    <InfoValue>{currentOrder.shippingAddress.addressName}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Telefon</InfoLabel>
                    <InfoValue>{currentOrder.shippingAddress.phone}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Adres</InfoLabel>
                    <InfoValue>{currentOrder.shippingAddress.address}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Şehir</InfoLabel>
                    <InfoValue>{currentOrder.shippingAddress.city}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Posta Kodu</InfoLabel>
                    <InfoValue>{currentOrder.shippingAddress.postalCode}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Ülke</InfoLabel>
                    <InfoValue>{currentOrder.shippingAddress.country}</InfoValue>
                  </InfoItem>
                </OrderInfo>
              </OrderSection>
              
              <OrderSection>
                <SectionTitle>Ödeme Bilgileri</SectionTitle>
                <OrderInfo>
                  <InfoItem>
                    <InfoLabel>Ödeme Yöntemi</InfoLabel>
                    <InfoValue>{currentOrder.paymentMethod}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Ödeme Durumu</InfoLabel>
                    <InfoValue>
                      {currentOrder.isPaid ? (
                        <span style={{ color: '#4CAF50' }}>
                          <i className="fas fa-check-circle"></i> Ödendi
                        </span>
                      ) : (
                        <span style={{ color: '#F44336' }}>
                          <i className="fas fa-times-circle"></i> Ödenmedi
                        </span>
                      )}
                    </InfoValue>
                  </InfoItem>
                  {currentOrder.isPaid && (
                    <>
                      <InfoItem>
                        <InfoLabel>Ödeme Tarihi</InfoLabel>
                        <InfoValue>{formatDate(currentOrder.paidAt)}</InfoValue>
                      </InfoItem>
                    </>
                  )}
                </OrderInfo>
              </OrderSection>
              
              <OrderSection>
                <SectionTitle>Sipariş Öğeleri</SectionTitle>
                <OrderItemsList>
                  {currentOrder.orderItems.map((item, index) => (
                    <OrderItem key={index}>
                      <ItemImage src={item.image} alt={item.name} />
                      <ItemDetails>
                        <ItemName>{item.name}</ItemName>
                        <ItemPrice>{item.price.toLocaleString('tr-TR')} ₺</ItemPrice>
                      </ItemDetails>
                      <ItemQuantity>{item.quantity} adet</ItemQuantity>
                    </OrderItem>
                  ))}
                </OrderItemsList>
                
                <OrderSummary>
                  <SummaryRow>
                    <span>Ara Toplam:</span>
                    <span>
                      {(currentOrder.totalPrice - currentOrder.taxPrice - currentOrder.shippingPrice).toLocaleString('tr-TR')} ₺
                    </span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>Vergi:</span>
                    <span>{currentOrder.taxPrice.toLocaleString('tr-TR')} ₺</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>Kargo:</span>
                    <span>{currentOrder.shippingPrice.toLocaleString('tr-TR')} ₺</span>
                  </SummaryRow>
                  <SummaryRow className="total">
                    <span>Toplam:</span>
                    <span>{currentOrder.totalPrice.toLocaleString('tr-TR')} ₺</span>
                  </SummaryRow>
                </OrderSummary>
              </OrderSection>
              
              <form onSubmit={handleUpdateOrder}>
                <FormGroup>
                  <FormLabel>Sipariş Durumu</FormLabel>
                  <FormSelect defaultValue={currentOrder.status} required>
                    <option value="pending">Beklemede</option>
                    <option value="processing">İşleniyor</option>
                    <option value="shipped">Kargoda</option>
                    <option value="delivered">Teslim Edildi</option>
                    <option value="cancelled">İptal Edildi</option>
                  </FormSelect>
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Takip Numarası</FormLabel>
                  <FormInput 
                    type="text" 
                    defaultValue={currentOrder.trackingNumber || ''}
                    placeholder="Kargo takip numarası"
                  />
                </FormGroup>
                
                <ButtonGroup>
                  <CancelButton type="button" onClick={closeModal}>
                    İptal
                  </CancelButton>
                  <SaveButton type="submit">
                    Güncelle
                  </SaveButton>
                </ButtonGroup>
              </form>
            </OrderDetails>
          </ModalContent>
        </ModalOverlay>
      )}
    </OrderManagementContainer>
  );
};

export default OrderManagement;
