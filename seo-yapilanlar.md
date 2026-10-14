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

## Marka görünürlüğü iyileştirmesi — 14 Ekim 2026

### İnceleme bulguları

- Kullanıcının aktardığı güncel Search Console incelemesine göre ana sayfa
  dizinde; 13 Ekim'deki tarama başarılı. Canonical ve robots doğru, sitemap
  başarılı, manuel işlem veya güvenlik sorunu yok. Tırnaklı marka aramasında
  site bulunmuş, tırnaksız aramanın ilk sayfasında görülmemiş. Çekmeköy UPS
  sayfasının dizine ekleme isteği kabul edilmiş. Bu oturumda Search Console
  hesabına erişilmedi; bu bilgiler kullanıcının inceleme sonucudur.
- Yerel kaynakta marka adı, WebSite ve LocalBusiness JSON-LD zaten mevcut.
  Ancak ana sayfanın title değeri hizmetle başlıyor, ana H1 yalnızca hizmet
  anlatıyordu. Markanın ana sayfadaki en belirgin metinlerde öne çıkarılması
  için somut bir iyileştirme fırsatı bulundu.
- Mevcut SEO doğrulayıcısı düzenleme öncesinde de başarılıydı: 15 dizine açık
  sayfanın başlık, H1, canonical, JSON-LD, sitemap, iç bağlantı ve varlıkları
  geçerliydi. Yerel kaynakta yeni bir dizine ekleme engeli saptanmadı.
- Genel web aracı, kullanıcının Google'daki konumuna ve oturumuna ait sonuç
  sırasını doğrulamaz. Canlı domain bu araçla okunamadı; terminalde domain ve
  GitHub için DNS çözümlemesi başarısız oldu. Bu erişim hataları sitenin veya
  GitHub'un dışarıdan kapalı olduğunu kanıtlamaz.

### Uygulama ve kontroller

- Ana sayfa başlığı: `İST Kesintisiz Güç | İstanbul UPS Satışı ve Teknik Servis`.
  Başlık SEO üreticisinde `siteData.seo.name` kaynağından oluşturuluyor.
- Ana H1: `İST Kesintisiz Güç`. Hemen altındaki metin İstanbul/Çekmeköy hizmet
  alanını, UPS ve kesintisiz güç kaynağı satışını, kurulum, bakım ve 7/24
  teknik servis desteğini anlatmaya devam ediyor.
- Open Graph ve Twitter başlıkları ile WebPage JSON-LD adı aynı üreticiden
  güncellendi. Üretilmiş dosyalardan yalnızca `index.html` değişti.
- `python3 scripts/check-seo.py`: 15 sayfa için tüm kontroller başarılı.
  `git diff --check` başarılı. JavaScript kaynaklarının sözdizimi doğrulandı.
- Bu ortamda Node bulunmadığı için mevcut `scripts/build-seo.cjs` üreticisi
  sistemin JavaScriptCore motorunda geçici dosya/VM adaptörüyle çalıştırıldı;
  depoya ikinci bir üretim sistemi eklenmedi. Tekrar üretimin mevcut dosyalarla
  aynı sonuç vermesi kontrol edildi. Tarayıcıyla görsel kontrol yapılmadı.
- Çalışma başında kullanıcının izlenmeyen `.DS_Store` dosyası vardı; bu dosya
  değişikliğe ve commit'e dahil edilmedi.

### Beklenti ve takip

Bu düzenleme marka adının ana sayfanın başlık ve görünen içeriğinde tutarlı ve
belirgin olmasını sağlar. Önceki başlığın tırnaksız marka sorgusundaki düşük
görünürlüğün kesin nedeni olduğu kanıtlanmadı; ilk sayfa veya belirli sıra
garantisi yoktur. Google'ın değişiklikleri işlemesi yeniden tarama gerektirir.
Google, başlık kaynaklarının yeniden işlenmesinin birkaç gün ile birkaç hafta
alabileceğini belirtir; bu süre bir sıralama yükselişi taahhüdü değildir.

Yayın sonrasında Search Console Performans raporunda `ist kesintisiz güç`
marka sorgusunun gösterim, tıklama, CTR ve ortalama konumu, aynı ülke/cihaz
filtreleriyle yayın öncesi ve sonrası dönemlerde karşılaştırılmalıdır. URL
Denetimi'nden son tarama tarihi de izlenebilir. Bu oturumda yeni bir dizine
ekleme isteği gönderilmedi.

Google resmi kaynakları:
- Başlık ve H1/og:title kaynakları:
  https://developers.google.com/search/docs/appearance/title-link
- Ana sayfada tutarlı marka adı ve WebSite verisi:
  https://developers.google.com/search/docs/appearance/site-names

### Yayın durumu

Mevcut yayın yolu `main` dalını GitHub'a gönderip GitHub Pages'in mevcut
yayınını tetiklemektir. İlk terminal denemesi DNS çözümleme hatasıyla başarısız
olmuştu. Sonraki Chrome kontrolünde ana sayfanın marka odaklı title ve H1
değişikliklerinin canlı sitede bulunduğu doğrulandı; bu yayın artık beklemiyor.

## Canlı Search Console ürün verisi düzeltmesi — 14 Ekim 2026

Chrome bağlantısı üzerinden kullanıcı tarafından yetkilendirilen Search Console
incelemesi yapıldı. İletiler bölümünde aynı tarihli ürün snippet'i uyarısı bulundu:
`"offers", "review" veya "aggregateRating" belirtilmelidir`.
Ürün raporundaki örnek, `ups-line-interactive-ups.html` üzerindeki
`Line Interactive UPS` öğesiydi. Bu hata ürün zengin sonucuna uygunluğu etkiler;
ana sayfanın normal marka sorgusundaki sıralamasının nedeni olduğu kanıtlanmadı.

Kaynakta aynı eksik `Product` verisi sekiz ürün grubu/broşür sayfasında
üretiliyordu. Sayfalarda yayınlanmış fiyat veya gerçek ürün değerlendirmesi
bulunmadığı için bu işaretleme kaldırıldı. Sayfalar `WebPage`, `LocalBusiness`
ve `BreadcrumbList` verilerini kullanmaya devam eder. Ürün metinleri, görseller,
doküman bağlantıları, adresler ve dizine açıklık değişmedi.

Önceki yerel kontrol JSON-LD sözdizimini doğruluyor, Google ürün snippet'inin
zorunlu alanlarını kapsamıyordu. `scripts/check-seo.py` bu alanlara yönelik
kontrolle genişletildi. Kontrol eski dosyalardaki sorunu yakaladı; üreticinin
yeniden çalıştırılmasından sonra 15 sayfanın kontrolleri başarılı oldu.

Canlı ana sayfada marka odaklı title ve H1 doğrulandı. Önceki marka düzeltmesi
yayında. Ürün verisi düzeltmesi `b1920d3` commit'iyle GitHub Desktop üzerinden
`main` dalına gönderildi. Mevcut GitHub Pages akışı başarılı tamamlandı:
https://github.com/cihansezerozkamer/Company-website-development/actions/runs/38593899886
Canlı Line Interactive UPS sayfasında `Product` kaldırılmış; `LocalBusiness`,
`WebSite`, `WebPage` ve `BreadcrumbList` korunmuş durumda.

Search Console'da düzeltme doğrulaması gönderildi ve `Doğrulama Başladı`
durumu, 14 Ekim 2026 başlangıç tarihiyle görüldü. Doğrulama henüz tamamlanmış
değil. Bu yayın belirli bir marka sorgusunda görünme süresi veya sıralama
garantisi vermez.

Resmi kaynak:
https://developers.google.com/search/docs/appearance/structured-data/product-snippet
