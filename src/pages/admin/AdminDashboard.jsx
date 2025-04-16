import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const DashboardHeader = styled.div`
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

const DashboardTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const StatTitle = styled.h3`
  font-size: 0.9rem;
  color: var(--medium-gray);
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  
  &.positive {
    color: #4CAF50;
  }
  
  &.negative {
    color: #F44336;
  }
  
  i {
    margin-right: 0.25rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const TableContainer = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  margin-bottom: 3rem;
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
  
  &.delete {
    color: #F44336;
    
    &:hover {
      color: #D32F2F;
    }
  }
`;

const ViewAllLink = styled(Link)`
  display: block;
  text-align: center;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  margin-top: 1rem;
  transition: var(--transition);
  
  &:hover {
    color: var(--secondary-color);
  }
`;

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
`;

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  background-color: var(--light-gray);
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--medium-gray);
`;

const AdminDashboard = () => {
  // Örnek veriler (gerçek uygulamada API'den gelecek)
  const stats = [
    {
      title: 'Toplam Satış',
      value: '₺24,532',
      change: '+12.5%',
      isPositive: true
    },
    {
      title: 'Siparişler',
      value: '78',
      change: '+8.2%',
      isPositive: true
    },
    {
      title: 'Müşteriler',
      value: '156',
      change: '+5.3%',
      isPositive: true
    },
    {
      title: 'Ortalama Sipariş',
      value: '₺314',
      change: '-2.8%',
      isPositive: false
    }
  ];
  
  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'Ahmet Yılmaz',
      date: '16 Nis 2025',
      amount: '₺549.99',
      status: 'delivered'
    },
    {
      id: 'ORD-002',
      customer: 'Mehmet Kaya',
      date: '15 Nis 2025',
      amount: '₺1,249.99',
      status: 'shipped'
    },
    {
      id: 'ORD-003',
      customer: 'Ayşe Demir',
      date: '15 Nis 2025',
      amount: '₺349.99',
      status: 'processing'
    },
    {
      id: 'ORD-004',
      customer: 'Fatma Şahin',
      date: '14 Nis 2025',
      amount: '₺4,999.99',
      status: 'pending'
    },
    {
      id: 'ORD-005',
      customer: 'Ali Yıldız',
      date: '13 Nis 2025',
      amount: '₺129.99',
      status: 'cancelled'
    }
  ];
  
  const topProducts = [
    {
      id: 1,
      name: 'Creality Ender 3 V2 3D Yazıcı',
      sold: 24,
      revenue: '₺119,999.76'
    },
    {
      id: 3,
      name: 'Bugatti Veyron 3D Model',
      sold: 42,
      revenue: '₺5,459.58'
    },
    {
      id: 5,
      name: 'Anycubic Photon Mono X 3D Yazıcı',
      sold: 12,
      revenue: '₺107,999.88'
    },
    {
      id: 8,
      name: 'LED Lamba Tabanı',
      sold: 18,
      revenue: '₺5,399.82'
    },
    {
      id: 6,
      name: 'ABS Filament 1.75mm 1kg - Siyah',
      sold: 35,
      revenue: '₺13,999.65'
    }
  ];
  
  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>Admin Paneli</DashboardTitle>
      </DashboardHeader>
      
      <StatsContainer>
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatTitle>{stat.title}</StatTitle>
            <StatValue>{stat.value}</StatValue>
            <StatChange className={stat.isPositive ? 'positive' : 'negative'}>
              <i className={`fas fa-arrow-${stat.isPositive ? 'up' : 'down'}`}></i>
              {stat.change} son 30 günde
            </StatChange>
          </StatCard>
        ))}
      </StatsContainer>
      
      <ChartContainer>
        <ChartCard>
          <ChartTitle>Satış İstatistikleri</ChartTitle>
          <ChartPlaceholder>
            Satış grafiği burada görüntülenecek
          </ChartPlaceholder>
        </ChartCard>
        
        <ChartCard>
          <ChartTitle>Kategori Dağılımı</ChartTitle>
          <ChartPlaceholder>
            Kategori pasta grafiği burada görüntülenecek
          </ChartPlaceholder>
        </ChartCard>
      </ChartContainer>
      
      <SectionTitle>Son Siparişler</SectionTitle>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Sipariş No</TableHeader>
              <TableHeader>Müşteri</TableHeader>
              <TableHeader>Tarih</TableHeader>
              <TableHeader>Tutar</TableHeader>
              <TableHeader>Durum</TableHeader>
              <TableHeader>İşlemler</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <StatusBadge className={order.status}>
                    {order.status === 'pending' && 'Beklemede'}
                    {order.status === 'processing' && 'İşleniyor'}
                    {order.status === 'shipped' && 'Kargoda'}
                    {order.status === 'delivered' && 'Teslim Edildi'}
                    {order.status === 'cancelled' && 'İptal Edildi'}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <ActionButton>
                    <i className="fas fa-eye"></i>
                  </ActionButton>
                  <ActionButton>
                    <i className="fas fa-edit"></i>
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      <ViewAllLink to="/admin/orders">Tüm Siparişleri Görüntüle</ViewAllLink>
      
      <SectionTitle>En Çok Satan Ürünler</SectionTitle>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Ürün</TableHeader>
              <TableHeader>Satış Adedi</TableHeader>
              <TableHeader>Gelir</TableHeader>
              <TableHeader>İşlemler</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {topProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sold}</TableCell>
                <TableCell>{product.revenue}</TableCell>
                <TableCell>
                  <ActionButton>
                    <i className="fas fa-eye"></i>
                  </ActionButton>
                  <ActionButton>
                    <i className="fas fa-edit"></i>
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      <ViewAllLink to="/admin/products">Tüm Ürünleri Görüntüle</ViewAllLink>
    </DashboardContainer>
  );
};

export default AdminDashboard;
