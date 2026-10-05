# SEO çalışma kaydı — 5 Ekim 2026

Hedef: İST Kesintisiz Güç marka aramaları, İstanbul UPS / İstanbul kesintisiz güç
kaynağı / İstanbul güç kaynağı ve Çekmeköy UPS satış ve servis aramaları.

## Uygulanan düzenlemeler

- Ana sayfanın başlığı, H1'i ve görünen metinleri İstanbul UPS ve kesintisiz güç
  kaynağı ihtiyacına göre düzenlendi. Marka ve enerji sistemleri bilgileri eklendi.
- Çekmeköy UPS sayfası hazırlandı: ürün seçimi, bakım/arıza talebi, Kirazlıdere
  adresi, İstanbul hizmet alanı, çalışma saatleri, telefon ve pratik sorular.
- Kurumsal sayfanın örnek “Hakkımızda” metni gerçek işletme bilgileriyle değiştirildi.
- Tüm 15 dizine açık sayfaya ayrı title, meta description, HTTPS canonical,
  robots ve Open Graph / Twitter paylaşım etiketleri eklendi.
- Gerçek adres, telefon, e-posta, hafta içi çalışma saatleri ve İstanbul hizmet
  alanını içeren LocalBusiness verisi eklendi. WebSite, WebPage, BreadcrumbList,
  hizmet sayfalarına Service, ürün sayfalarına Product JSON-LD eklendi.
- 8 ürün için ayrı statik HTML adresi oluşturuldu. Ürün başlıkları, açıklamaları,
  doküman bağlantıları ve PDF önizlemeleri ilk HTML yanıtında bulunuyor.
- Ürün kartları, hizmet kartları, referanslar, iletişim ve footer bilgileri de
  JavaScript beklemeden HTML içinde mevcut. Etkileşimler JavaScript ile devam ediyor.
- Eski ürün sorgu adresleri yeni ürün sayfasına tarayıcıda yönleniyor; eski genel
  şablon noindex. Sitemap yalnızca 15 canonical adresi içeriyor.
- Çekmeköy sayfasına ana sayfadan ve tüm footer'lardan bağlantı verildi.
- Telefon ve e-posta bağlantıları kullanılabilir hâle getirildi. Ürün görsellerine
  boyut bilgisi eklendi. CSS ve JavaScript sürümleri önbellek için güncellendi.
- Üretim ve doğrulama komutları README'ye kaydedildi.

## Doğrulama

- `python scripts/check-seo.py`: 15 sayfanın başlık, H1, canonical, JSON-LD,
  site haritası, iç bağlantı, görsel ve doküman kontrolleri başarılı.
- `node --check app.js`, `node --check data.js`, `node --check scripts/build-seo.cjs` başarılı.
- Üretim komutu tekrar çalıştırıldığında dosyalar aynı kalıyor.
- Chrome'da masaüstü ve 390 px mobil ana sayfa kontrol edildi.
- Çekmeköy sayfasının metinleri, DOCX ürün görüntülemesi, PDF sayfaları ve eski
  ürün adresinin yeni sayfaya yönlenmesi kontrol edildi; tarayıcı hata kaydı yok.

## Google tarafında durum ve kalan adım

4 Ekim tarihli önceki kurulum kaydına göre Search Console sahipliği ve sitemap
gönderimi tamamlandı; ana sayfa Google dizininde mevcut. Gönderilmiş sitemap adresi
değişmedi; Google yeni içeriği tekrar taradığında yeni ürün ve Çekmeköy sayfasını alabilir.
Bu çalışma kaydı, tüm yeni sayfaların şimdiden Google dizininde olduğu anlamına gelmez.

Önceki kayıtta Google İşletme Profili oluşturulmuş, ancak video doğrulaması bekliyor.
İş yerinin konumu, ekipmanları ve işletmeyi yönetme yetkisini gösteren videonun iş
yerinde telefonla tamamlanması gerekiyor. SEO kodu bu doğrulamanın yerine geçmez.

Belirli bir sorguda görünme, sıra veya süre garantisi yoktur. Değişiklikler yayına
alındıktan sonra Search Console performans raporunda İstanbul ve Çekmeköy sorguları,
gösterimler ve dizine ekleme durumu takip edilmelidir.

Google resmi kaynakları:
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

## Yayın

Yerel kontroller tamamlandı. GitHub Pages yayını ve canlı domain doğrulaması
tamamlandığında sonuç bu bölüme kaydedilecektir.
