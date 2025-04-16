# 3D Baskı E-Ticaret Sitesi

Bu proje, 3D yazıcılar, filamentler, 3D baskı ürünler ve 3D modellerin satıldığı modern bir e-ticaret sitesidir. Kullanıcı dostu arayüz, güvenli ödeme sistemi ve yönetim paneli içermektedir.

![3D Print E-Commerce](./screenshots/homepage.png)

## 🚀 Özellikler

- **Modern Kullanıcı Arayüzü**: Responsive tasarım ile mobil, tablet ve masaüstü uyumlu
- **Kullanıcı Yönetimi**: Kayıt, giriş, profil yönetimi ve adres kaydetme
- **Ürün Kataloğu**: Kategorilere göre filtreleme, arama ve sıralama
- **Sepet ve Ödeme**: Sepet yönetimi ve güvenli ödeme işlemleri
- **Sipariş Takibi**: Kullanıcılar için sipariş geçmişi ve durum takibi
- **Admin Paneli**: Ürün, sipariş ve kullanıcı yönetimi için kapsamlı yönetim paneli
- **Güvenli Ödeme**: Stripe entegrasyonu ile güvenli ödeme işlemleri
- **SEO Optimizasyonu**: Her sayfa için meta etiketleri ve yapılandırılmış veri
- **Performans Optimizasyonu**: Kod bölme, lazy loading ve görsel optimizasyonu

## 🛠️ Kullanılan Teknolojiler

### Frontend
- **React**: Modern kullanıcı arayüzü geliştirme
- **Redux**: Durum yönetimi
- **React Router**: Sayfa yönlendirmeleri
- **Styled Components**: CSS-in-JS ile stil tanımlamaları
- **Framer Motion**: Akıcı animasyonlar
- **React Helmet Async**: SEO meta etiketleri
- **React Lazy Load Image**: Görsel lazy loading
- **Axios**: HTTP istekleri

### Backend
- **Node.js**: Sunucu tarafı JavaScript
- **Express**: Web framework
- **MongoDB**: NoSQL veritabanı
- **Mongoose**: MongoDB ODM
- **JWT**: JSON Web Token ile kimlik doğrulama
- **Bcrypt**: Şifre hashleme
- **Stripe**: Ödeme işlemleri
- **Compression**: Yanıt sıkıştırma
- **Helmet**: Güvenlik başlıkları
- **Express Rate Limit**: İstek sınırlama

## 📋 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- MongoDB (yerel veya Atlas)
- NPM veya Yarn

### Adımlar

1. Projeyi klonlayın
```bash
git clone https://github.com/kullaniciadi/3d-print-ecommerce.git
cd 3d-print-ecommerce
```

2. Bağımlılıkları yükleyin
```bash
# Root dizininde
npm install

# Backend için
cd server
npm install
```

3. Çevre değişkenlerini ayarlayın
```bash
# server dizininde .env dosyası oluşturun
MONGO_URI=mongodb://localhost:27017/3d-print-ecommerce
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NODE_ENV=development
PORT=5000
```

4. Veritabanını başlatın
```bash
# server dizininde
npm run data:import
```

5. Uygulamayı çalıştırın
```bash
# Root dizininde (frontend ve backend aynı anda)
npm run dev

# Sadece frontend
npm run client

# Sadece backend
npm run server
```

## 📁 Proje Yapısı

```
3d-print-ecommerce/
├── public/                 # Statik dosyalar
│   └── images/             # Ürün görselleri
├── src/                    # Frontend kaynak kodları
│   ├── components/         # React bileşenleri
│   │   ├── layout/         # Header, Footer gibi düzen bileşenleri
│   │   └── products/       # Ürün ile ilgili bileşenler
│   ├── context/            # Context API
│   ├── features/           # Redux slices
│   │   ├── auth/           # Kimlik doğrulama
│   │   ├── cart/           # Sepet
│   │   └── products/       # Ürünler
│   ├── hooks/              # Özel React hooks
│   ├── pages/              # Sayfa bileşenleri
│   │   └── admin/          # Admin sayfaları
│   ├── styles/             # Global stiller
│   └── utils/              # Yardımcı fonksiyonlar
├── server/                 # Backend kaynak kodları
│   ├── config/             # Yapılandırma dosyaları
│   ├── controllers/        # Route kontrolcüleri
│   ├── data/               # Seed verileri
│   ├── middleware/         # Middleware fonksiyonları
│   ├── models/             # Mongoose modelleri
│   └── routes/             # API rotaları
└── package.json            # Proje bağımlılıkları
```

## 🖥️ Ekran Görüntüleri

### Ana Sayfa
![Ana Sayfa](./screenshots/homepage.png)

### Ürünler Sayfası
![Ürünler Sayfası](./screenshots/products.png)

### Ürün Detay Sayfası
![Ürün Detay Sayfası](./screenshots/product-detail.png)

### Sepet Sayfası
![Sepet Sayfası](./screenshots/cart.png)

### Admin Paneli
![Admin Paneli](./screenshots/admin-dashboard.png)

## 🔧 API Endpoint'leri

### Ürünler
- `GET /api/products` - Tüm ürünleri getir
- `GET /api/products/:id` - Belirli bir ürünü getir
- `POST /api/products` - Yeni ürün ekle (admin)
- `PUT /api/products/:id` - Ürün güncelle (admin)
- `DELETE /api/products/:id` - Ürün sil (admin)

### Kullanıcılar
- `POST /api/users` - Kullanıcı kaydı
- `POST /api/users/login` - Kullanıcı girişi
- `GET /api/users/profile` - Kullanıcı profilini getir
- `PUT /api/users/profile` - Kullanıcı profilini güncelle

### Siparişler
- `POST /api/orders` - Yeni sipariş oluştur
- `GET /api/orders/myorders` - Kullanıcının siparişlerini getir
- `GET /api/orders/:id` - Belirli bir siparişi getir
- `PUT /api/orders/:id/pay` - Siparişi ödenmiş olarak işaretle

### Ödeme
- `POST /api/payment/create-payment-intent` - Ödeme niyeti oluştur
- `POST /api/payment/webhook` - Stripe webhook

## 🔐 Güvenlik Özellikleri

- JWT ile güvenli kimlik doğrulama
- Şifrelerin bcrypt ile hashlenmiş olarak saklanması
- Helmet ile güvenli HTTP başlıkları
- Rate limiting ile brute force saldırılarına karşı koruma
- CORS yapılandırması ile güvenli cross-origin istekleri

## 🚀 Performans Optimizasyonları

- Kod bölme (Code Splitting) ile sayfa bazlı lazy loading
- Görsel lazy loading ile daha hızlı sayfa yüklemeleri
- Compression ile sunucu yanıtlarının sıkıştırılması
- React 18 createRoot API kullanımı
- Framer Motion ile performans odaklı animasyonlar

## 📱 Responsive Tasarım

Tüm sayfalar aşağıdaki ekran boyutları için optimize edilmiştir:
- Mobil: 320px - 576px
- Tablet: 577px - 992px
- Masaüstü: 993px ve üzeri

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

## 👨‍💻 Geliştirici

Bu proje portfolyo amaçlı olarak geliştirilmiştir.

GitHub: [github.com/kullaniciadi](https://github.com/kullaniciadi)
