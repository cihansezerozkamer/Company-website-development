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
5 Ekim'de profilin canlı durumunu kontrol etmek için hesabı açma girişimi otomatik
onay denetimince engellendi: ayrı özel hesap içeriğine erişim için bu görevde açık
yetki bulunmadığı belirtildi. Kullanıcıdan yalnızca bu kontrol için ayrı onay istendi.
Dolayısıyla profil durumu bu oturumda yeniden doğrulanmadı; yukarıdaki bilgi 4 Ekim
kurulum kaydına dayanır. Site yayını bu kısıttan etkilenmedi.

Belirli bir sorguda görünme, sıra veya süre garantisi yoktur. Değişiklikler yayına
alındıktan sonra Search Console performans raporunda İstanbul ve Çekmeköy sorguları,
gösterimler ve dizine ekleme durumu takip edilmelidir.

Google resmi kaynakları:
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

## Yayın

- SEO commit'i: `b4641f5b176be904c3abc492602cdf3fdb38397f`, `main` dalına gönderildi.
- GitHub Pages yayını başarıyla tamamlandı:
  https://github.com/cihansezerozkamer/Company-website-development/actions/runs/37276955591
- Canlı domain üzerinde 15 sayfanın tamamı HTTP 200 ile açıldı. Canlı title,
  description, H1, canonical ve JSON-LD yerel dosyalarla birebir eşleşti.
- Canlı `sitemap.xml` ve `robots.txt` yerel sürümlerle eşleşti.
- Site: https://xn--istkesintisizg-tjb94a.com/
- Çekmeköy sayfası: https://xn--istkesintisizg-tjb94a.com/cekmekoy-ups.html

## Marka araması kontrolü — 5 Ekim 2026

Kullanıcının “ist kesintisiz güç” Google aramasının görünen ilk sonuç sayfasında
yeni alan adı yer almıyordu. Aynı oturumda `site:xn--istkesintisizg-tjb94a.com`
aramasında ana sayfa bulundu. Gösterilen başlık hâlâ “ist kesintisiz güç |
Kesintisiz Enerji Çözümleri”, açıklama da önceki ana sayfa metniydi.

Sonuç: alan adı Google sonuçlarında mevcut; marka sorgusunda görünürlük henüz
yetersiz. Güncel yayın ile Google'ın gösterdiği sonuç metni farklı. Bu gözlem son
tarama tarihini belirlemez; kesin tarih için Search Console URL Denetimi gerekir.
Bu oturumda özel Google hesaplarına erişilmedi ve tekrar indeksleme isteği gönderilmedi.
Yeni bir teknik engel saptanmadığı için SEO kodu yeniden değiştirilmedi.
