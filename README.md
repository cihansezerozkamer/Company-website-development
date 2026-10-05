# Ürünlü web sitesi içerik yönetimi

## İçerik kaynağı

Site metinlerini, ürünleri, hizmetleri, iletişim bilgilerini ve harita konumunu `data.js` içinden değiştirin. HTML dosyalarında kart metni veya iletişim bilgisi aramanıza gerek yoktur.

- `siteData.products`: Ürün adı, açıklaması ve görsel dosyası.
- `siteData.references`: Ana sayfadaki referans carousel logoları.
- `siteData.catalog`: Ana sayfadaki katalog metinleri ve indirilecek PDF yolu.
- `siteData.productsTitle`: Ürünler sayfası başlığı.
- `siteData.services`: Hizmet başlığı, açıklaması, maddeleri ve buton bağlantısı.
- `siteData.servicesTitle` ve `siteData.servicesDescription`: Hizmetler sayfası başlığı ve üst açıklaması.
- `siteData.contact`: Adres, telefon, e-posta, çalışma saatleri ve iletişim açıklaması.
- `siteData.map.embedUrl`: Google Maps embed adresi.
- `siteData.footer`: Footer açıklaması ve telif metni.

## Ürün görselleri

Ürün görsellerini `assets/images/` klasörüne koyun. `data.js` içindeki ürünün `image` değerine dosya adını yazın:

```js
{ image: "products/thumbnails/yeni-ups.png", title: "Ürün adı", description: "On-Line 3-1 UPS." }
```

SVG, PNG, JPG ve WebP dosyaları kullanılabilir. Görseller ürün kartlarında otomatik olarak responsive biçimde gösterilir.

Ana sayfa ürün görselleri `assets/images/products/`, referans logoları `assets/images/references/` klasörlerinden yüklenir.

Kart sırası, `siteData.products` dizisinin sırasıdır; ana sayfa ve ürünler sayfası aynı diziyi kullanır.
Mevcut kart fotoğrafları `products/thumbnails/` klasöründedir. Line Interactive fotoğrafı
`line-int.jpeg` dosyasından, diğer fotoğraflar ilgili DOCX/PDF dokümanlarından alınır.
Line Interactive detay sayfasındaki ana ürün fotoğrafı da `documentImages` alanıyla
bu JPEG dosyasından gösterilir.

Line Interactive, Asansör, Rack Mount, Rack Tower ve 6–10 KVA kartları,
mevcut üç KVA görselinin kırmızı neon tonuna uyarlanmış `*-red.png` görsellerini
kullanır. Bu 640 × 405 piksel görseller ImageGen ile hazırlanmıştır;
üretim komutları `scripts/product-image-prompts.json` içindedir.
`build-product-images.py` kaynak thumbnail'leri yeniden üretir; kırmızı arka planlı
kart görsellerini değiştirmez.

## Ürün dokümanları

Ürünün `document` alanı DOCX veya PDF yolunu belirtir. PDF ürünlerinin `documentPages`
dizisi tüm broşür sayfalarının PNG önizlemelerini içerir. İncele sayfası bu sayfaları
responsive olarak gösterir; sayfaya tıklamak orijinal PDF'yi açar, indirme düğmesi
orijinal dokümanı indirir. Kaynak dokümanlar değiştirilmez; DOCX önizlemesindeki
On-Line yazımı gösterim sırasında düzenlenir.

Kaynak dokümanlar veya MYTEC görseli değişirse, Python ve PyMuPDF kurulu ortamda
repo kökünden `python scripts/build-product-images.py` komutunu çalıştırın.
Bu komut kart görsellerini ve PDF sayfa önizlemelerini yeniden üretir.

## Google Maps

`siteData.map.embedUrl` değerini Google Maps'ten alınan embed URL ile değiştirin. URL'nin `output=embed` parametresi içermesi gerekir.

## SEO ve statik sayfalar

İşletme bilgileri ve ürünlerin kaynağı yine `data.js` dosyasıdır. Ürün, hizmet veya
iletişim bilgilerini değiştirdikten sonra yayın öncesi aşağıdaki komutları çalıştırın:

```powershell
node scripts/build-seo.cjs
python scripts/check-seo.py
```

İlk komut statik sayfa içeriklerini, başlık/açıklamaları, canonical ve paylaşım
etiketlerini, JSON-LD işletme/ürün verilerini ve `sitemap.xml` dosyasını günceller.
HTML dosyaları GitHub Pages için depoya kaydedilir; sunucuda Node veya Python gerekmez.
Ürün sayfalarının `ups-*.html` dosyalarını elle değiştirmeyin; içerikleri tekrar üretilir.
Ana sayfa ve diğer mevcut HTML sayfalarında işaretli `seo:*` alanları üreticiye aittir.
Çekmeköy sayfasının metin kaynağı `scripts/build-seo.cjs` içindedir.

İkinci komut tüm sayfaların başlık, H1, canonical, JSON-LD, sitemap, iç bağlantı,
görsel ve doküman yollarını kontrol eder. Eski `urun-detay.html?urun=...` bağlantıları
JavaScript ile ilgili yeni ürün sayfasına yönlenir; eski şablon dizine kapalıdır.
GitHub Pages üzerinde sunucu tarafında 301 yönlendirme yapılandırılamadığı için bu
adresler sitemap'ten çıkarılmıştır.

Yapılan düzenlemeler ve Google tarafında kalan adım: `seo-yapilanlar.md`.
