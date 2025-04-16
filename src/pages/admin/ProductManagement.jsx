import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const ProductManagementContainer = styled.div`
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

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: var(--border-radius);
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  
  &.in-stock {
    background-color: #4CAF50;
    color: #fff;
  }
  
  &.low-stock {
    background-color: #FFC107;
    color: #000;
  }
  
  &.out-of-stock {
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

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;
  
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

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  
  // Örnek ürün verileri (gerçek uygulamada API'den gelecek)
  const sampleProducts = [
    {
      id: 1,
      name: 'Creality Ender 3 V2 3D Yazıcı',
      category: '3D Yazıcılar',
      price: 4999.99,
      oldPrice: 5499.99,
      image: '/images/3d-printer-real.jpg',
      countInStock: 15,
      isNew: true,
      onSale: true,
      featured: true
    },
    {
      id: 2,
      name: 'PLA+ Filament 1.75mm 1kg - Beyaz',
      category: 'Filamentler',
      price: 349.99,
      oldPrice: null,
      image: '/images/3d-printer-real.jpg',
      countInStock: 50,
      isNew: false,
      onSale: false,
      featured: true
    },
    {
      id: 3,
      name: 'Bugatti Veyron 3D Model',
      category: '3D Modeller',
      price: 129.99,
      oldPrice: 199.99,
      image: '/images/3d-model-car.png',
      countInStock: 999,
      isNew: false,
      onSale: true,
      featured: true
    },
    {
      id: 4,
      name: 'Özel Tasarım Dekoratif Vazo',
      category: '3D Baskı Ürünler',
      price: 249.99,
      oldPrice: null,
      image: '/images/3d-printer-with-product.jpg',
      countInStock: 18,
      isNew: true,
      onSale: false,
      featured: true
    },
    {
      id: 5,
      name: 'Anycubic Photon Mono X 3D Yazıcı',
      category: '3D Yazıcılar',
      price: 8999.99,
      oldPrice: 9999.99,
      image: '/images/3d-printer-real.jpg',
      countInStock: 8,
      isNew: false,
      onSale: true,
      featured: true
    },
    {
      id: 6,
      name: 'ABS Filament 1.75mm 1kg - Siyah',
      category: 'Filamentler',
      price: 399.99,
      oldPrice: null,
      image: '/images/3d-printer-real.jpg',
      countInStock: 35,
      isNew: false,
      onSale: false,
      featured: false
    },
    {
      id: 7,
      name: 'Anatomik Kalp 3D Model',
      category: '3D Modeller',
      price: 179.99,
      oldPrice: null,
      image: '/images/3d-model-car.png',
      countInStock: 999,
      isNew: true,
      onSale: false,
      featured: false
    },
    {
      id: 8,
      name: 'LED Lamba Tabanı',
      category: '3D Baskı Ürünler',
      price: 299.99,
      oldPrice: 349.99,
      image: '/images/3d-printer-with-product.jpg',
      countInStock: 12,
      isNew: false,
      onSale: true,
      featured: true
    }
  ];
  
  // Sayfalama
  const productsPerPage = 5;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  // Sayfa değiştirme
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Ürün filtreleme
  useEffect(() => {
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);
  
  useEffect(() => {
    let result = [...products];
    
    // Arama filtresi
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Kategori filtresi
    if (categoryFilter !== 'all') {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    setFilteredProducts(result);
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, products]);
  
  // Modal işlemleri
  const openAddModal = () => {
    setCurrentProduct(null);
    setShowModal(true);
  };
  
  const openEditModal = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };
  
  const handleSaveProduct = (e) => {
    e.preventDefault();
    // Burada API çağrısı yapılacak
    closeModal();
  };
  
  const handleDeleteProduct = (id) => {
    // Burada API çağrısı yapılacak
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };
  
  // Stok durumu belirleme
  const getStockStatus = (count) => {
    if (count > 10) return { status: 'in-stock', text: 'Stokta' };
    if (count > 0) return { status: 'low-stock', text: 'Az Stok' };
    return { status: 'out-of-stock', text: 'Tükendi' };
  };
  
  return (
    <ProductManagementContainer>
      <PageHeader>
        <PageTitle>Ürün Yönetimi</PageTitle>
        <AddButton onClick={openAddModal}>
          <i className="fas fa-plus"></i>
          Yeni Ürün Ekle
        </AddButton>
      </PageHeader>
      
      <FiltersContainer>
        <SearchInput>
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="Ürün ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        
        <FilterSelect 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">Tüm Kategoriler</option>
          <option value="3D Yazıcılar">3D Yazıcılar</option>
          <option value="Filamentler">Filamentler</option>
          <option value="3D Baskı Ürünler">3D Baskı Ürünler</option>
          <option value="3D Modeller">3D Modeller</option>
        </FilterSelect>
      </FiltersContainer>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Görsel</TableHeader>
              <TableHeader>Ürün Adı</TableHeader>
              <TableHeader>Kategori</TableHeader>
              <TableHeader>Fiyat</TableHeader>
              <TableHeader>Stok Durumu</TableHeader>
              <TableHeader>Özellikler</TableHeader>
              <TableHeader>İşlemler</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {currentProducts.map((product) => {
              const stockStatus = getStockStatus(product.countInStock);
              
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <ProductImage src={product.image} alt={product.name} />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {product.oldPrice ? (
                      <>
                        <div>{product.price.toLocaleString('tr-TR')} ₺</div>
                        <div style={{ textDecoration: 'line-through', color: 'var(--medium-gray)', fontSize: '0.8rem' }}>
                          {product.oldPrice.toLocaleString('tr-TR')} ₺
                        </div>
                      </>
                    ) : (
                      `${product.price.toLocaleString('tr-TR')} ₺`
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge className={stockStatus.status}>
                      {stockStatus.text}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    {product.featured && <span style={{ marginRight: '0.5rem' }}>Öne Çıkan</span>}
                    {product.isNew && <span style={{ marginRight: '0.5rem' }}>Yeni</span>}
                    {product.onSale && <span>İndirimli</span>}
                  </TableCell>
                  <TableCell>
                    <ActionButton onClick={() => openEditModal(product)}>
                      <i className="fas fa-edit"></i>
                    </ActionButton>
                    <ActionButton className="delete" onClick={() => handleDeleteProduct(product.id)}>
                      <i className="fas fa-trash-alt"></i>
                    </ActionButton>
                  </TableCell>
                </TableRow>
              );
            })}
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
      
      {/* Ürün Ekleme/Düzenleme Modal */}
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
                {currentProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
              </ModalTitle>
              <CloseButton onClick={closeModal}>
                <i className="fas fa-times"></i>
              </CloseButton>
            </ModalHeader>
            
            <form onSubmit={handleSaveProduct}>
              <FormGroup>
                <FormLabel>Ürün Adı</FormLabel>
                <FormInput 
                  type="text" 
                  defaultValue={currentProduct?.name || ''}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Kategori</FormLabel>
                <FormSelect defaultValue={currentProduct?.category || ''} required>
                  <option value="">Kategori Seçin</option>
                  <option value="3D Yazıcılar">3D Yazıcılar</option>
                  <option value="Filamentler">Filamentler</option>
                  <option value="3D Baskı Ürünler">3D Baskı Ürünler</option>
                  <option value="3D Modeller">3D Modeller</option>
                </FormSelect>
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Açıklama</FormLabel>
                <FormTextarea defaultValue={currentProduct?.description || ''} required />
              </FormGroup>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormGroup>
                  <FormLabel>Fiyat (₺)</FormLabel>
                  <FormInput 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    defaultValue={currentProduct?.price || ''}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Eski Fiyat (₺) (İsteğe bağlı)</FormLabel>
                  <FormInput 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    defaultValue={currentProduct?.oldPrice || ''}
                  />
                </FormGroup>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormGroup>
                  <FormLabel>Stok Miktarı</FormLabel>
                  <FormInput 
                    type="number" 
                    min="0" 
                    defaultValue={currentProduct?.countInStock || ''}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Görsel URL</FormLabel>
                  <FormInput 
                    type="text" 
                    defaultValue={currentProduct?.image || ''}
                    required
                  />
                </FormGroup>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <FormGroup style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FormInput 
                    type="checkbox" 
                    id="featured" 
                    defaultChecked={currentProduct?.featured || false}
                    style={{ width: 'auto' }}
                  />
                  <FormLabel htmlFor="featured" style={{ margin: 0 }}>Öne Çıkan</FormLabel>
                </FormGroup>
                
                <FormGroup style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FormInput 
                    type="checkbox" 
                    id="isNew" 
                    defaultChecked={currentProduct?.isNew || false}
                    style={{ width: 'auto' }}
                  />
                  <FormLabel htmlFor="isNew" style={{ margin: 0 }}>Yeni Ürün</FormLabel>
                </FormGroup>
                
                <FormGroup style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FormInput 
                    type="checkbox" 
                    id="onSale" 
                    defaultChecked={currentProduct?.onSale || false}
                    style={{ width: 'auto' }}
                  />
                  <FormLabel htmlFor="onSale" style={{ margin: 0 }}>İndirimli</FormLabel>
                </FormGroup>
              </div>
              
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
    </ProductManagementContainer>
  );
};

export default ProductManagement;
