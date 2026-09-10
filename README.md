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
{ image: "yeni-ups-gorseli.svg", title: "Ürün adı", description: "Kısa açıklama." }
```

SVG, PNG, JPG ve WebP dosyaları kullanılabilir. Görseller ürün kartlarında otomatik olarak responsive biçimde gösterilir.

Ana sayfa ürün görselleri `assets/images/products/`, referans logoları `assets/images/references/` klasörlerinden yüklenir.

## Google Maps

`siteData.map.embedUrl` değerini Google Maps'ten alınan embed URL ile değiştirin. URL'nin `output=embed` parametresi içermesi gerekir.
