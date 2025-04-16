# BlogSite Projesi

Bu proje, React ve Bootstrap kullanılarak geliştirilmiş bir blog ve haber uygulamasıdır. Kullanıcılar haberleri görüntüleyebilir ve kendi blog yazılarını oluşturabilir, düzenleyebilir ve silebilirler.

## Özellikler

- Kullanıcı kayıt ve giriş sistemi
- CollectAPI üzerinden güncel haberlerin görüntülenmesi
- Kişisel blog yazıları oluşturma, düzenleme ve silme
- Responsive tasarım

## Kullanılan Teknolojiler

- React: Kullanıcı arayüzü geliştirme
- React Router: Sayfa yönlendirmeleri
- Bootstrap: Responsive tasarım ve UI bileşenleri
- Axios: API istekleri
- LocalStorage: Kullanıcı bilgileri ve blog içeriklerinin depolanması

## Proje Yapısı

```
src/
  ├── components/   # Tekrar kullanılabilir bileşenler (Navbar, PrivateRoute)
  ├── pages/        # Sayfa bileşenleri (Login, Register, BlogList, NewsPage vb.)
  ├── services/     # API istekleri ve veri yönetimi
  ├── App.js        # Ana uygulama bileşeni
  └── index.js      # Uygulama giriş noktası
```

## Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. Repoyu bilgisayarınıza klonlayın

git clone (repo-url)
cd blogsite


2. Gerekli paketleri yükleyin

npm install


3. Uygulamayı başlatın

npm start


4. Tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı kullanmaya başlayabilirsiniz

## Notlar

- Projede kullanılan API anahtarı, gerçek bir uygulamada güvenlik nedeniyle environment variable olarak saklanmalıdır.
- Kullanıcı verilerinin localStorage yerine gerçek bir veritabanında saklanması, gerçek dünya uygulamaları için daha güvenli olacaktır.
- Bootstrap ile birlikte uygulamanın responsive tasarımı, farklı cihazlarda sorunsuz çalışmasını sağlar.

## API Kullanımı

Projede collectapi servisi üzerinden Türkiye haberleri çekilmektedir. API anahtarı `services/api.js` dosyasında bulunmaktadır.
