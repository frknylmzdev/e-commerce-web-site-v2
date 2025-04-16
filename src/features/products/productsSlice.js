import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (category, { rejectWithValue }) => {
    try {
      // Bu demo için yerel veri kullanıyoruz, gerçek uygulamada API çağrısı yapılacak
      // const response = await axios.get(`/api/products?category=${category}`);
      // return response.data;
      
      // Demo için yerel veri
      return mockProducts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      // Bu demo için yerel veri kullanıyoruz, gerçek uygulamada API çağrısı yapılacak
      // const response = await axios.get(`/api/products/${id}`);
      // return response.data;
      
      // Demo için yerel veri
      return mockProducts.find(product => product.id === id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  filters: {
    category: 'all',
    priceRange: [0, 10000],
    sortBy: 'newest',
  },
};

// Mock ürün verileri
const mockProducts = [
  {
    id: '1',
    name: 'Ender 3 V2 3D Yazıcı',
    description: 'Yeni başlayanlar için ideal, yüksek kaliteli 3D yazıcı. Kolay kurulum ve kullanım.',
    price: 3999.99,
    category: 'printers',
    image: '/images/ender3-v2.jpg',
    rating: 4.5,
    stock: 15,
    features: [
      '220x220x250mm baskı alanı',
      'Sessiz anakart',
      'Renkli ekran',
      'Cam baskı tablası'
    ]
  },
  {
    id: '2',
    name: 'PLA+ Filament 1.75mm',
    description: 'Yüksek kaliteli PLA+ filament, canlı renkler ve pürüzsüz baskı için idealdir.',
    price: 349.99,
    category: 'filaments',
    image: '/images/pla-filament.jpg',
    rating: 4.8,
    stock: 50,
    features: [
      '1.75mm çap',
      '1kg ağırlık',
      'Yüksek darbe dayanımı',
      'Minimum çarpılma'
    ]
  },
  {
    id: '3',
    name: 'PETG Filament 1.75mm',
    description: 'Dayanıklı ve esnek PETG filament, fonksiyonel parçalar için mükemmel.',
    price: 399.99,
    category: 'filaments',
    image: '/images/petg-filament.jpg',
    rating: 4.6,
    stock: 30,
    features: [
      '1.75mm çap',
      '1kg ağırlık',
      'Yüksek sıcaklık dayanımı',
      'Kimyasal direnci'
    ]
  },
  {
    id: '4',
    name: 'Anycubic Photon Mono X 3D Yazıcı',
    description: 'Yüksek çözünürlüklü reçine 3D yazıcı, detaylı modeller için idealdir.',
    price: 7999.99,
    category: 'printers',
    image: '/images/photon-mono.jpg',
    rating: 4.7,
    stock: 8,
    features: [
      '192x120x245mm baskı alanı',
      '4K monokrom LCD',
      'Hızlı baskı',
      'WiFi bağlantısı'
    ]
  },
  {
    id: '5',
    name: 'Ejderha Heykeli 3D Model',
    description: 'Detaylı ejderha heykeli 3D modeli, fantastik koleksiyonunuz için mükemmel.',
    price: 149.99,
    category: 'models',
    image: '/images/dragon-model.jpg',
    rating: 4.9,
    stock: 100,
    features: [
      'STL ve OBJ formatları',
      'Yüksek detay',
      'Baskıya hazır',
      'Destekler dahil'
    ]
  },
  {
    id: '6',
    name: 'Minyatür Şato 3D Model',
    description: 'Detaylı minyatür şato 3D modeli, masa oyunları veya dekorasyon için.',
    price: 199.99,
    category: 'models',
    image: '/images/castle-model.jpg',
    rating: 4.4,
    stock: 100,
    features: [
      'STL ve OBJ formatları',
      'Modüler tasarım',
      'Baskıya hazır',
      'Destekler dahil'
    ]
  },
  {
    id: '7',
    name: '3D Baskılı Vazo',
    description: 'Şık tasarımlı 3D baskılı vazo, eviniz için modern bir dokunuş.',
    price: 299.99,
    category: 'prints',
    image: '/images/printed-vase.jpg',
    rating: 4.3,
    stock: 20,
    features: [
      'PLA malzeme',
      '20cm yükseklik',
      'Su geçirmez kaplama',
      'Modern tasarım'
    ]
  },
  {
    id: '8',
    name: '3D Baskılı Masa Lambası',
    description: 'Benzersiz tasarımlı 3D baskılı masa lambası, özel aydınlatma için.',
    price: 449.99,
    category: 'prints',
    image: '/images/printed-lamp.jpg',
    rating: 4.7,
    stock: 15,
    features: [
      'LED ışık dahil',
      'USB şarj',
      'Ayarlanabilir parlaklık',
      'Özel tasarım'
    ]
  }
];

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilter, clearFilters } = productsSlice.actions;

export default productsSlice.reducer;
