# İST Kesintisiz Güç marka görünürlüğü — 14 Ekim 2026

> Bu dosya yerel araştırma notudur. Aşağıdaki ilk bölümler, Chrome bağlantısı
> kullanılmadan yapılan araştırmayı kaydeder. Son bölümdeki doğrudan Search
> Console ve canlı site bulguları daha günceldir. Hesap verileri içeren bu dosya
> kamuya açık depo commit'ine dahil edilmemiştir.

## Doğrulanmış bilgi ve sınırlar

- Kullanıcı, Search Console tıklamalarının kendisine ait olduğunu belirtti.
  Bu tıklamalar müşteri trafiği veya başkalarının markayı bulduğuna dair kanıt
  olarak yorumlanmamalıdır. Raporun bu oturumda okunmuş bir dışa aktarımı yok.
- Kullanıcının önceki Search Console incelemesinde ana sayfa dizinde, 13 Ekim
  taraması başarılı, canonical/robots doğru, sitemap başarılı ve manuel
  işlem/güvenlik sorunu yoktu. Bunlar bu araştırmada yeniden hesabından okunmadı.
- `ist kesintisiz güç`, tırnaklı marka, tam şirket unvanı, Unicode/Punycode
  domain, telefon ve e-posta ile genel web aramalarında araştırma yapıldı.
  Yeni domain, araçların döndürdüğü sonuçlar arasında bulunamadı. Genel web
  araçları Google'ın gerçek Türkiye sonuç sırasını veya Search Console
  dizinini temsil etmez; bu gözlem sitenin Google'dan silindiğini kanıtlamaz.
- Google'ın Türkiye/dil parametreleriyle doğrudan tırnaklı ve tırnaksız sonuç
  sayfaları denenmiş, araç tarafından okunamamıştır. Canlı domain, www,
  robots, sitemap ve GitHub Pages adresi de web aracıyla okunamamıştır.
  Terminalde DNS çözümleme başarısızdır. Bu erişim sınırlarından sitenin
  kapalı olduğu veya DNS'inin bozuk olduğu sonucu çıkarılamaz.

## İnternette bulunan kayıtlar

1. FIND firma rehberinin listesinde şirketin tam unvanı var:
   **İST Kesintisiz Güç Kaynakları ve Enerji Sistemleri Sanayi Ticaret
   Limited Şirketi**. Tekil firma sayfası okunamadığından adres/telefon
   eşleşmesi, kaydın güncelliği ve yeni domaine bağlantı verip vermediği
   doğrulanamadı. Bu liste sayfası `sameAs` olarak kullanılamaz.
   Kaynak: https://www.find.com.tr/Search/KES%C4%B0NT%C4%B0S%C4%B0Z%20G%C3%9C%C3%87%20KAYNA%C4%9EI?ViewType=Grid
2. Yandex'te **İst Enerji Sanayi Ve Ticaret Limited Şirketi** adına, aynı
   Kirazlıdere / Fevzi Çakmak Cad. No:11A adresinde kayıt bulundu. Telefon
   `+90 531 722 23 22`, web sitesi `www.istenerji.com.tr` olarak görünüyor.
   Ayrı işletmenin kendi teknik servis kataloğu da bu domaini ve adresi
   içeriyor. Bunlar bizim sitenin `0542 256 80 03` telefonu ve yeni domainiyle
   aynı değil. Önceki kullanıcı doğrulamasına göre ayrı işletmelerdir.
   Kaynaklar:
   - https://yandex.com.tr/maps/org/ist_enerji_sanayi_ve_ticaret_limited_sirketi/93199157120/
   - https://www.istenerji.com.tr/Upload/Dosyalar/dosya-pdf/istpower-katalog-tr-ddcdf706-b99a-4e18-9ea0-a2d47a8abed8.pdf

Bu bulgular benzer isim/adres nedeniyle kimlik karışıklığı ihtimalini
araştırmaya değer kılar. Google'ın gerçekten iki işletmeyi karıştırdığı veya
bunun organik sıralamanın nedeni olduğu kanıtlanmış değildir. Diğer işletmenin
kayıtları bizim siteye bağlanmamalı; başka işletmeye ait profil değiştirilmemeli.

## Site ve yayın kontrolü

- Marka odaklı ana sayfa değişikliği `b6e2749` commit'inde mevcut.
- Git uzak dalının yerel reflog kaydı, 14 Ekim 16:17:34 (Europe/Berlin)
  tarihinde `caee072` commit'i için `update by push` gösteriyor. Bu commit,
  `b6e2749` değişikliğini içeriyor. Önceki çalışma kaydındaki bekleyen gönderim
  bilgisine göre yeni bir gelişmedir: yerel Git kaydı gönderimin yapıldığını
  gösterir. GitHub Actions/Pages sonucu ve canlı HTML henüz doğrulanmamıştır.
- Kullanıcının `.DS_Store` commit'i korunmuştur. Kaynak dosyalarda bu araştırma
  için ek değişiklik gerektiren yeni bir SEO hatası bulunmamıştır.
- `python3 scripts/check-seo.py`: 15 dizine açık sayfanın title, H1, canonical,
  JSON-LD, sitemap, iç bağlantı ve varlık kontrolleri başarılı.

## Öncelikli devam adımları

1. **Mevcut Google İşletme Profili'nin güncel doğrulama durumunu öğren.**
   `google-kurulum-durum.txt` dosyasındaki 4 Ekim kaydı, profilin oluşturulduğunu
   ancak "Herkese görünür değil" olduğunu ve iş yerinden video doğrulamasının
   beklendiğini söylüyor. Bu bilgi eski; bugünkü durumu bilinmiyor. Kullanıcıya
   güncel durum ve kayıtlı web sitesi adresi soruldu. Video doğrulaması hâlâ
   isteniyorsa işletmede, Google'ın kendi akışıyla tamamlanmalıdır. İkinci bir
   profil oluşturmak bu adımın yerine geçmez.
2. **Profilde yeni domain ve işletmeye ait iletişim bilgilerini doğrula.**
   Aşağıdaki bilgileri mevcut profille karşılaştır. İşletme adı tabela ve gerçek
   marka kullanımıyla aynı olmalı; eski depo kaydında profil adı
   `İST KESİNTİSİZ GÜÇ KAYNAKLARI` olarak geçiyor. Sırf anahtar kelime eklemek
   için ad değiştirilmemeli.
3. **FIND tekil kaydını doğrula.** Unvan ve iletişim bilgileri gerçekten bizim
   işletmeyle eşleşiyorsa, kayıt sahibinin yeni domaini ekleyip eklemediği
   kontrol edilmeli. Kanıtlanmış tekil profil URL'si elde edilirse siteye
   görünür bağlantı ve `LocalBusiness.sameAs` eklemek değerlendirilebilir.
4. **Canlı yayını kontrol et.** GitHub Actions'taki son Pages yayını başarılı
   olmalı; canlı ana sayfa başlığı
   `İST Kesintisiz Güç | İstanbul UPS Satışı ve Teknik Servis` olmalı. Daha sonra
   Search Console'da Google'ın gördüğü HTML ve son tarama tarihi karşılaştırılmalı.
5. **İzlemeyi sorgu bazında yap.** Kendi tıklamalarını müşteri kazanımı saymadan,
   marka sorgusunun gösterimleri, gösterilen URL ve ortalama konumu, aynı
   ülke/cihaz filtreleriyle izlenmeli. Örnek ekran veya dışa aktarım olmadan
   hangi sorgunun gösterim aldığı konusunda sayısal sonuç üretilemez.

## Profilde karşılaştırılacak bilgiler

| Alan | Sitenin mevcut işletme bilgisi |
| --- | --- |
| Marka | İST Kesintisiz Güç |
| Unvan | İST Kesintisiz Güç Kaynakları ve Enerji Sistemleri San. Tic. Ltd. Şti. |
| Web sitesi | https://xn--istkesintisizg-tjb94a.com/ |
| Telefon | 0542 256 80 03 |
| Adres | Kirazlıdere Mah. Fevzi Çakmak Cad. No: 11-A, Çekmeköy / İstanbul |
| E-posta | cigdem@istenerji.com |
| Çalışma saatleri | Hafta içi 09:00–18:00 |
| Hizmet alanı | İstanbul |

Gerekirse kullanılabilecek, mevcut site bilgilerine dayanan açıklama taslağı:

> İST Kesintisiz Güç, Çekmeköy Kirazlıdere merkezinden İstanbul genelinde UPS
> ve kesintisiz güç kaynağı satışı, kurulum, devreye alma, bakım ve teknik
> servis hizmetleri sunar. Bilgisayar, sunucu, asansör ve endüstriyel sistemler
> için uygun ürün seçimi ve akü kontrolü konusunda destek verir. Premium bakım
> paketinde 7/24 acil müdahale desteği bulunur.

Bu taslak herhangi bir dış hesaba gönderilmedi.

## Beklenti ve resmi kaynaklar

İşletme profili doğrulaması ve doğru bilgiler, Google Haritalar ve yerel işletme
görünürlüğü için önemlidir. Profilin doğrulanmamış olması, organik web sonucunun
ilk sayfada çıkmamasının tek veya kanıtlanmış nedeni değildir. Kod düzenlemesi,
doğrulama veya `sameAs` eklenmesi belirli sıra ve süre garantisi vermez.

- İşletme doğrulaması: https://support.google.com/business/answer/7107242
- Yerel görünürlük ve doğru bilgiler: https://support.google.com/business/answer/7091
- Gerçek işletme adı ve profil bilgileri: https://support.google.com/business/answer/3038177
- Kuruluş kimliğini ayırt eden yapılandırılmış veriler: https://developers.google.com/search/docs/appearance/structured-data/organization

## Doğrudan Chrome incelemesi — güncel bulgular

Önceki erişim değerlendirmesi eksikti: mevcut Chrome bağlantısıyla kullanıcının
açık Search Console mülkü bu oturumda okunabildi. Eski "hesap okunamadı" ve
"canlı yayın doğrulanmadı" ifadeleri aşağıdaki kapsamda güncellendi.

- Canlı ana sayfa title: `İST Kesintisiz Güç | İstanbul UPS Satışı ve Teknik Servis`.
  Görünen H1: `İST Kesintisiz Güç`. Önceki marka düzeltmesi yayında.
- Search Console İletiler'de 8 ileti görüldü. 14 Ekim tarihli ürün snippet'i
  bildirimi, `offers`, `review` veya `aggregateRating` eksikliğini raporluyor.
  Etkilenen örnek `ups-line-interactive-ups.html`, öğe `Line Interactive UPS`;
  son tarama 13 Ekim. Bu zengin sonuç hatası ana sayfa sıralamasının açıklaması
  olarak kullanılamaz.
- Performans'ta Web / 3 ay seçili; görünen grafik dönemi 4–11 Ekim. Toplam
  1 tıklama, 4 gösterim, %25 CTR ve 2,8 ortalama konum var. Sorgu tablosu
  "Veri yok" diyor. Kullanıcı tıklamanın kendisine ait olduğunu belirtti.
  Bu küçük toplamdan marka sorgusunun 2,8 konumda olduğu sonucu çıkarılamaz.
- Sayfa tablosu: HTTPS ana sayfa 1 tıklama / 3 gösterim, HTTP ana sayfa
  0 tıklama / 1 gösterim. HTTPS canonical yerel kaynakta doğru olduğundan
  HTTP gösterimi tek başına yeni bir canonical hatası kanıtı değildir.
- Dizine ekleme raporu: 1 sayfa dizinde; 17 sayfa dizine eklenmemiş. Nedenler:
  3 yönlendirmeli sayfa ve 14 "Keşfedildi — şu anda dizine eklenmiş değil".
  Keşfedilmiş sayfalar için doğrulama başlangıcı 13 Ekim. Örnekler arasında
  Çekmeköy, hizmetler, iletişim, kurumsal, referanslar ve ürün sayfaları var;
  rapordaki son tarama alanları "Yok". Bu toplu rapor, 13 Ekim'de taranmış
  ürün örneğiyle tamamen eşzamanlı değil; gecikme dikkate alınmalı.
- Bağlantılar raporu henüz "Veri işleniyor, lütfen birkaç gün içinde tekrar
  kontrol edin" diyor. Backlink sayısı veya dış bağlantı eksikliği bu rapordan
  kesinleştirilemedi.
- Çekmeköy URL'sinin açık canlı test ekranında "URL, Google tarafından
  kullanılabilir" ve "Dizine eklenmesi istendi" var. Yeni istek gönderilmedi.
- Windsor.ai kurulum akışı, ChatGPT bağlamı/temel bağlantı bilgileri paylaşımı
  için "Windsor.ai ile devam et" onay ekranına ulaştı. Bu erişim adımı için
  kullanıcıya somut onay sorusu gönderildi. Henüz kurulmuş veya Google
  hesabına bağlanmış kabul edilmedi.

Kaynakta ürün verisi hatası sekiz katalog sayfası için düzeltildi. `Product`
işaretlemesi yayınlanmış fiyat/değerlendirme bulunmayan bu sayfalardan kaldırıldı;
işletme, sayfa ve breadcrumb verileri korundu. Önceki kontrolün eksik Google
ürün alanlarını kaçırması da kontrol script'inde düzeltildi. Yayın/doğrulama
sonucu aşağıda güncellendi.

## Yayın ve bağlantı sonucu

- `b1920d3` GitHub Desktop ile origin/main'e gönderildi. GitHub Pages build
  ve deploy işleri başarılı: https://github.com/cihansezerozkamer/Company-website-development/actions/runs/38593899886
- Canlı Line Interactive UPS sayfasında Product yok; LocalBusiness, WebSite,
  WebPage ve BreadcrumbList var. Başlık, H1 ve HTTPS canonical korunuyor.
- Search Console ürün hatası için doğrulama gönderildi; durum
  `Doğrulama Başladı`, başlangıç 14 Ekim 2026. Sonuç henüz tamamlanmadı.
- Windsor arayüzü `Connected to ChatGPT` gösterdi. Google Search Console
  kaynağı için son Google izin ekranına gelindi. İstenen ek izin doğrulanmış
  sitelerin Search Console verilerini görüntüleme; yalnızca İST mülkünü
  seçmek uygulama içindeki sonraki adım. Google izni kullanıcı onayını
  bekliyor; veri kaynağı bağlı kabul edilmedi.
- Windsor hesabında 30 günlük tam erişim denemesi görünüyor. Ödeme veya
  ücretli plan seçilmedi. Kalıcı ücretsiz plana ilişkin hesap durumu ayrıca
  doğrulanmalı.

### Windsor kurulumu tamamlandı

Kullanıcı hem ChatGPT bağlamı paylaşımını hem de Google Search Console okuma
erişimini açıkça onayladı. Google erişimi verildi, yalnızca
`sc-domain:xn--istkesintisizg-tjb94a.com` seçildi. Bir kaynak ve bir hesap bağlı.
İlk ChatGPT dönüş bağlantısı süre dolumu hatası verdi; yeni yetkilendirme
oturumu ile kurulum tamamlandı. Eklenti sayfasında artık `Yönet` ve
`Sohbette dene` düğmeleri var. `Write actions` seçeneği açılmadı.

Resmi fiyat sayfası 30 günlük tam denemeden sonra kalıcı ücretsiz planda
1 kullanıcı, 1 veri kaynağı, 1 hesap ve 30 günlük geçmiş sınırını bildiriyor:
https://windsor.ai/pricing/
Kurulan tek Search Console kaynağı ve tek mülk bu kapsamda.

Veri okuma testi de başarılı: Windsor önizlemesindeki Search Console tablosu
7–11 Ekim tarihleri için günlük satırlar getirdi; 9 Ekim satırında 1 tıklama,
diğer görünen satırlarda 0 var. Bu, bağlantı testi olarak kaydedildi; önceki
rapordaki küçük toplamdan yeni müşteri veya marka sıralaması sonucu çıkarılmadı.

Yayın/doğrulama kayıtları `11479c4` commit'iyle de GitHub'a gönderildi.
Pages'in 25 numaralı akışı başarılı:
https://github.com/cihansezerozkamer/Company-website-development/actions/runs/38597814610

## Yeni teşhis: marka araması ve işletme profili

14 Ekim'deki sonraki kontrolde Google'ın tırnaksız `ist kesintisiz güç`
araması (`hl=tr`, `gl=tr`, `pws=0`) doğrudan Chrome'da açıldı. Alt bilgide
`Sonuçlar kişiselleştirilmemiş` ve `Türkiye` var. Ana sayfa ilk normal web
sonucu; kurumsal sayfa ikinci, iletişim sayfası da aynı ilk sayfada görünüyor.
Üstte sektörle ilgili geniş AI Bakışı bulunuyor. Bu, o arama ve o an için
görünürlük kanıtıdır; her ülke, cihaz, arama terimi ve tarihte aynı sıra
garantisi değildir. Önceki görünmeme gözleminin nedenini tek başına açıklamaz.

Ana sayfanın URL denetimi bu oturumda doğrudan okundu: `URL Google'da mevcut`,
son tarama 13 Ekim 2026 13:11:49, Googlebot akıllı telefon, getirme başarılı,
tarama ve dizine ekleme izinleri evet. Google'ın seçtiği canonical incelenen
HTTPS ana sayfa. Site haritası 13 Ekim'de okunmuş, başarılı ve 15 URL içeriyor.
Manuel işlemler ve güvenlik raporları `Hiçbir sorun algılanmadı` diyor.
7 Ekim'deki dizin uyarısı `Yönlendirmeli sayfa` nedenini bildiriyor; tek başına
HTTPS canonical ana sayfanın görünmemesi için kanıt değil. Eski toplu raporun
1 dizinde / 14 keşfedilmiş sayfa sayılarını güncel görünürlüğün değişmez
durumu olarak kullanmamak gerekir: canlı sonuçta en az üç farklı sayfa var.

**Google İşletme Profili için somut sorun bulundu:** İST profilinde
`Doğrulama başarısız. Doğrulanmak için başka bir kayıt gönderin` ve
`Herkese görünür değil` mesajları var. Site adresi doğru domaine, telefon
0542 256 80 03'e ayarlı. Başarısızlık, normal web sonuçlarından ayrı olarak
yerel işletme profilinin yayımlanmasına ilişkin.

Doğrulama akışı aynı adresteki ayrı İst Enerji işletmesini, 0531 722 23 22
telefonuyla eşleşme önerdi. Kullanıcının daha önce bunların ayrı işletmeler
olduğunu doğrulamasına dayanarak `Bu eşleşmiyor` seçildi; bu başka profil
sahiplenilmedi veya birleştirilmedi. Erişilebilir yöntem işletme videosu.
Yeni video adımında gerçek ret gerekçesi okundu: `Çevrenin görüntüsü yok`.
Google sokak tabelalarını, komşu işletmeleri veya bilinen önemli noktaları
göstermeyi istiyor. Yeni kayıt gerekiyor; yalnızca inceleme bekleme durumu yok.
Kayıt/gönderim yapılmadı. Gerçek işletme yerindeki yetkilinin bu adımı
telefonla tamamlaması gerekiyor; ret gerekçesi ekranı açık bırakıldı.

Yeni videoda işletmenin çevresi, adresi ve tabelası; UPS ürünleri/ekipmanı;
işletmeyi yönetmeye ilişkin kanıt tek kesintisiz canlı kayıtta gösterilmeli.
Resmi rehber: https://support.google.com/business/answer/14271705?hl=tr

Bir bilgi tutarsızlığı daha var: işletme profilinde 09:00–17:00, sitede
09:00–18:00 yazıyor. Doğru saat kullanıcıya soruldu; yanıt gelmeden herhangi
bir saat değişikliği yapılmadı.

Geçmişteki görünmemenin belirli bir algoritmik nedenini GSC'nin tarama/dizin
raporları göstermiyor. Sorgu tablosunun boşluğu da sıfır arama kanıtı değil;
Google düşük hacimli sorguların bir kısmını gizliyor ve Windsor aynı kaynak
verisini okuyor. Resmi açıklamalar:
https://support.google.com/webmasters/answer/9012289
https://support.google.com/webmasters/answer/17011259?hl=en

## Kullanıcının aramasıyla karşılaştırma — önceki sonucun kapsamı düzeltildi

Kullanıcı kendi aramasında sitenin görünmediğini bildirdi. Açık Chrome
sekmesi yeniden okundu: sorgu tam olarak `ist kesintisiz güç`; alt bilgide
Almanya/Darmstadt ve kişiselleştirilmiş sonuçlar yazıyor. İlk sayfada İST'nin
yeni sitesi yok; ayrı İst Enerji sitesi ilk sırada. Dolayısıyla önceki Türkiye
testini kullanıcının normal araması için genellemek doğru değildi.

Google'ın görünür `Kişiselleştirme olmadan deneyin` bağlantısı ayrı bir sekmede
açıldı. Alt bilgide kişiselleştirilmemiş sonuçlar ve Almanya/Darmstadt
(IP adresinden) var. Yeni site bu ilk sayfada da yok. Kişiselleştirme tek
başına açıklama değil.

Aynı sorgunun `hl=tr&gl=tr&pws=0` Türkiye karşılaştırması aynı oturumda yeniden
açıldı. Alt bilgide Türkiye ve kişiselleştirilmemiş sonuçlar var. Yeni sitenin
ana sayfası ilk, kurumsal ikinci, iletişim üçüncü normal web sonucu.
Bu deney arama bölgesi/bağlamına göre görünürlük farkını doğrudan gösteriyor.
Google'ın neden bu URL'ye Almanya bağlamında daha düşük tercih verdiğinin
algoritmik ağırlıkları bu verilerden belirlenemez. Genel "marka görünürlüğü
düzeldi" sonucu yerine "Türkiye testinde görünür, kullanıcının Almanya
aramasında ilk sayfada görünür değil" sonucu kullanılmalı.

Google'ın resmi açıklaması, kişiselleştirme kapalı olsa da konum, dil ve
cihaz bağlamının sonuçlarda kullanılabildiğini doğruluyor:
https://support.google.com/websearch/answer/12410098
Hesabın kalıcı kişiselleştirme/bölge ayarları değiştirilmedi; sitenin kodunda
bu karşılaştırmaya dayanarak rastgele değişiklik yapılmadı.


## Son İstanbul içerik yayını — 14 Ekim 2026

`c696361`: İstanbul UPS rehberi, ana sayfa ve hizmet açıklamaları, statik/JS alt
bilgi bağlantıları, 16 URL sitemap ve ana sayfadan bağlantı erişim kontrolü.
GitHub'a gönderildi, Pages #26 çalışıyor:
https://github.com/cihansezerozkamer/Company-website-development/actions/runs/38631554747

Yeni kişiselleştirmesiz kontrol (`hl=tr&pws=0`, ülke zorlaması yok) marka
sorgusunda alan adını ilk sayfada göstermedi. Alt bilgi hâlâ Almanya,
Bessungen/Darmstadt, IP adresinizden. Bu test Türkiye/İstanbul ölçümü değil.
Bazı genel UPS sonuçlarında “Eksik: ist” etiketi var; Google'ın sorguyu genel
ürün araması olarak genişlettiği görülüyor. Marka eşlemesinin zayıf olması
olası açıklama, kesin sıralama nedeni raporlanmıyor. Kullanıcının Türkiye VPN
ve telefonda görünmeme gözlemi bu testle çürütülmez.


Pages #26 başarıyla tamamlandı (1 dakika 14 saniye). Canlı ana sayfadaki yeni
bölüm ve İstanbul rehberi doğrulandı. Rehberin title, canonical ve JSON-LD
LocalBusiness/WebSite/WebPage/BreadcrumbList/Service grafiği doğru. 390px
mobilde document scrollWidth=clientWidth=390, kartlar 360px; masaüstünde
1440px yatay taşma yok. Canlı sitemap 16 URL ve yeni sayfayı içeriyor.

Yeni URL Google tarafından henüz bilinmiyor. Dizine ekleme isteği başlatıldı,
canlı test aşamasından sonra reCAPTCHA devreye girdi. Başarı/kabul mesajı
henüz görülmedi. CAPTCHA için kullanıcıdan eylem anında onay istendi;
bu adım tamamlanmadan kabul edilmiş istek olarak raporlanmayacak.

Sonuç: Search Console “Hata! Bir sorun oluştu — Dizine ekleme isteğiniz
gönderilirken sorun oldu” gösterdi. Ek mesaj: “reCAPTCHA hizmetiyle bağlantı
kurulamadı”. İstek gönderilmedi; otomatik bağlantı hatasıyla sonlandı. Sayfa
sitemap'te ve gerçek HTML bağlantılarıyla erişilebilir olduğundan manuel
isteğin başarısızlığı Google'ın normal taramasını engelleyen bir site ayarı
değildir. CAPTCHA için kullanıcı onayı henüz gelmedi; yeniden denenmedi.
