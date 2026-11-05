// Bağımlılık gerektirmez: node scripts/build-seo.cjs
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), context);
const data = context.window.siteData;
const { origin, name, legalName } = data.seo;
const version = '20261106-teklif-1';
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, value) => fs.writeFileSync(path.join(root, file), value, 'utf8');
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const asset = file => `assets/images/${file}`;
const businessId = `${origin}/#business`;
const phone = `+90${data.contact.phone.replace(/\D/g, '').replace(/^0/, '')}`;
const business = {
  '@type': 'LocalBusiness', '@id': businessId, name, legalName,
  url: `${origin}/`, logo: `${origin}/assets/images/logo.png`, image: `${origin}/assets/images/logo.png`,
  description: data.footer.description, telephone: phone, email: data.contact.email,
  address: { '@type': 'PostalAddress', streetAddress: data.contact.address, addressLocality: 'Çekmeköy', addressRegion: 'İstanbul', addressCountry: 'TR' },
  areaServed: { '@type': 'City', name: 'İstanbul' },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' }]
};
const pages = {
  'index.html': [`İstanbul Kesintisiz Güç Kaynağı ve UPS | ${name}`, 'İstanbul kesintisiz güç kaynağı (UPS) satışı, kurulumu, bakımı ve 7/24 WhatsApp destek. 600 VA – 800 kVA UPS modelleri, Çekmeköy merkezli teknik servis.', 'Ana Sayfa'],
  'hizmetler.html': ['İstanbul UPS Servisi, Bakım ve Kurulum | İST Kesintisiz Güç', 'İstanbul UPS servisi: Çekmeköy merkezli teknik servis, arıza tespiti, periyodik bakım, akü kontrolü, UPS satışı ve kurulum hizmetlerimizi inceleyin.', 'Hizmetler'],
  'urunler.html': ['UPS Modelleri 600 VA – 800 kVA | İST Kesintisiz Güç', 'UPS modelleri: Line Interactive, asansör, rack, monofaze ve trifaze online UPS (600 VA – 800 kVA). Güç, faz ve kullanım alanı karşılaştırması, İstanbul teklif.', 'Ürünlerimiz'],
  'iletisim.html': ['Çekmeköy UPS İletişim ve Adres | İST Kesintisiz Güç', 'Çekmeköy, Kirazlıdere’de İST Kesintisiz Güç. İstanbul UPS satış ve servis talepleriniz için 0542 256 80 03: adres, harita ve çalışma saatleri.', 'İletişim'],
  'kurumsal.html': ['İST Kesintisiz Güç ve Enerji Sistemleri | Hakkımızda', 'Çekmeköy, İstanbul merkezli İST Kesintisiz Güç ve Enerji Sistemleri: UPS, regülatör ve endüstriyel akü sistemlerinde satış, bakım ve onarım.', 'Kurumsal'],
  'referanslar.html': ['UPS Referanslarımız | İST Kesintisiz Güç İstanbul', 'İST Kesintisiz Güç UPS ve enerji çözümlerinde birlikte çalıştığımız kurumları ve referanslarımızı inceleyin. İstanbul satış ve teknik servis desteği.', 'Referanslar'],
  'cekmekoy-ups.html': ['Çekmeköy UPS Satışı ve Teknik Servis | İST Kesintisiz Güç', 'Çekmeköy UPS satışı, kesintisiz güç kaynağı bakımı ve teknik servis. Kirazlıdere’deki İST Kesintisiz Güç merkezinden İstanbul geneline destek.', 'Çekmeköy UPS'],
  'istanbul-ups.html': ['UPS Seçimi ve Teklif Rehberi: kVA Hesabı | İST Kesintisiz Güç', 'UPS teklifi öncesi rehber: kVA nasıl hesaplanır, yedekleme süresi neye bağlıdır, hangi UPS türü hangi yüke uygundur? İstanbul satış ve kurulum desteği.', 'UPS Seçim Rehberi']
};
function slot(html, attr, content) {
  const start = `<!-- seo:${attr} -->`, end = `<!-- /seo:${attr} -->`;
  if (html.includes(start)) return html.replace(new RegExp(`${start}[\\s\\S]*?${end}`), `${start}${content}${end}`);
  const re = new RegExp(`(<([a-z][a-z0-9]*)\\b[^>]*\\b${attr}(?=[\\s=>])(?:="[^"]*")?[^>]*>)[\\s\\S]*?(</\\2>)`, 'i');
  return html.replace(re, (_, open, tag, close) => `${open}${start}${content}${end}${close}`);
}
const wa = message => `https://wa.me/${data.whatsapp.number}?text=${encodeURIComponent(message)}`;
const productMessage = p => data.whatsapp.productMessage.replace('{product}', p.heading || p.title);
const phaseOf = p => (p.description.match(/\d faz giriş, \d faz çıkış/i) || ['1 faz giriş, 1 faz çıkış'])[0];
const compare = `<div class="table-scroll"><table class="spec-table compare-table"><thead><tr><th scope="col">Ürün grubu</th><th scope="col">Faz yapısı</th><th scope="col">Uygun kullanım</th></tr></thead><tbody>${data.products.map(p => `<tr><th scope="row"><a href="${p.url}">${esc(p.heading || p.title)}</a></th><td>${esc(phaseOf(p))}</td><td>${esc((p.uses || []).slice(0, 2).join(', '))}</td></tr>`).join('')}</tbody></table></div>`;
const namedReferences = [...new Set(data.references.map(r => r.name).filter(n => !/^Referans \d+$/.test(n)))];
const referenceNames = `<h2>UPS ve enerji çözümlerinde birlikte çalıştığımız kurumlar</h2><p>Kamu kurumlarından üniversitelere, sağlık kuruluşlarından sanayi ve lojistik firmalarına kadar farklı sektörlerde kesintisiz güç kaynağı satış, kurulum ve bakım hizmeti verdik. Referanslarımızdan bazıları:</p><ul class="reference-names">${namedReferences.map(n => `<li>${esc(n)}</li>`).join('')}</ul><p>Projeniz için benzer bir çözüm arıyorsanız <a href="iletisim.html">teklif isteyin</a> veya <a href="urunler.html">UPS modellerini inceleyin</a>.</p>`;
const cards = data.products.map(p => `<article class="card product-card"><div class="product-image"><img src="${esc(asset(p.image))}" alt="${esc(p.title)}" width="640" height="405" loading="lazy"></div><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><a class="btn btn-outline" href="${p.url}" aria-label="${esc(p.title)} ürününü incele">İncele</a></article>`).join('\n');
const services = data.services.map(s => `<article class="card service-card"><h3>${esc(s.title)}</h3>${s.intro ? `<p><b>${esc(s.intro)}</b></p>` : ''}${s.description ? `<p>${esc(s.description)}</p>` : ''}${s.items ? `<ul>${s.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>` : ''}<a class="btn btn-outline" href="${s.link}">${esc(s.button)}</a></article>`).join('\n');
const references = data.references.map(r => `<div class="reference-item${r.theme ? ` reference-item--${r.theme}` : ''}"><img src="${esc(asset(r.image))}" alt="${esc(r.name)}" loading="lazy"></div>`).join('\n');
const footer = `<footer class="footer"><div class="container footer-main"><div><a class="brand" href="index.html"><img class="brand-logo" src="assets/images/logo.png" alt="${name}"></a><p style="margin-top:20px">${esc(data.footer.description)}</p></div><div><h3>Kurumsal</h3><a href="index.html">Ana Sayfa</a><a href="kurumsal.html">Kurumsal</a><a href="urunler.html">Ürünler</a><a href="hizmetler.html">Servis &amp; Bakım</a><a href="referanslar.html">Referanslar</a><a href="iletisim.html">İletişim</a></div><div><h3>Hizmetler</h3><a href="urunler.html">UPS Satışı</a><a href="hizmetler.html">Standart Bakım</a><a href="hizmetler.html">Premium Bakım</a><a href="hizmetler.html">Teknik Servis</a><a href="istanbul-ups.html">UPS Seçim ve Teklif Rehberi</a><a href="cekmekoy-ups.html">Çekmeköy UPS Satış ve Servis</a></div><div><h3>İletişim</h3><p>⌖ ${esc(data.contact.address)}<br>${esc(data.contact.city)}</p><p><a href="tel:${phone}">${esc(data.contact.phone)}</a></p><p><a href="mailto:${esc(data.contact.email)}">${esc(data.contact.email)}</a></p></div></div><div class="footer-bottom"><div class="container"><span>${esc(data.footer.copyright)}</span><span>Tüm hakları saklıdır</span></div></div></footer>`;
function fill(html) {
  const slots = { 'data-products-title': data.productsTitle, 'data-services-title': data.servicesTitle, 'data-services-description': data.servicesDescription, 'data-products': cards, 'data-home-products': cards, 'data-services': services, 'data-reference-gallery': references, 'data-references-track': references, 'data-contact-description': esc(data.contact.description), 'data-contact-address': `${esc(data.contact.address)}<br>${esc(data.contact.city)}`, 'data-contact-phone': esc(data.contact.phone), 'data-contact-email': esc(data.contact.email), 'data-contact-hours': esc(data.contact.hours), 'data-footer': footer, 'data-products-compare': compare, 'data-reference-names': referenceNames };
  for (const [attr, content] of Object.entries(slots)) html = slot(html, attr, content);
  return html.replace(/\?v=\d{8}-[a-z0-9-]+/g, `?v=${version}`);
}
function metadata(html, file, title, description, label, product) {
  const url = file === 'index.html' ? `${origin}/` : `${origin}/${file}`;
  const graph = [business, { '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name, inLanguage: 'tr-TR', publisher: { '@id': businessId } }, { '@type': file === 'iletisim.html' ? 'ContactPage' : file === 'kurumsal.html' ? 'AboutPage' : 'WebPage', '@id': `${url}#webpage`, url, name: title, description, inLanguage: 'tr-TR', isPartOf: { '@id': `${origin}/#website` }, about: { '@id': businessId } }];
  if (file !== 'index.html') {
    const crumbs = [{ name: 'Ana Sayfa', item: `${origin}/` }];
    if (product) crumbs.push({ name: 'Ürünlerimiz', item: `${origin}/urunler.html` });
    crumbs.push({ name: label, item: url });
    graph.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, ...c })) });
  }
  if (['hizmetler.html', 'cekmekoy-ups.html', 'istanbul-ups.html'].includes(file)) graph.push({ '@type': 'Service', name: file === 'istanbul-ups.html' ? 'İstanbul UPS Seçimi, Satış ve Kurulum' : label === 'Çekmeköy UPS' ? 'Çekmeköy UPS Satış ve Teknik Servis' : data.servicesTitle, description, url, provider: { '@id': businessId }, areaServed: { '@type': 'City', name: 'İstanbul' }, serviceType: ['UPS satışı ve kurulum', 'UPS teknik servis', 'Kesintisiz güç kaynağı bakımı'] });
  // Ürün grubu/broşür sayfalarında yayınlanmış fiyat veya ürün değerlendirmesi yok.
  // Google ürün snippet'i için offers, review veya aggregateRating gerekir.
  // Bu sayfalar WebPage, LocalBusiness ve BreadcrumbList verileriyle tanımlanır.
  const imageUrl = `${origin}/${product ? asset(product.image) : 'assets/images/logo.png'}`;
  const block = `<!-- seo:metadata -->
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:site_name" content="${name}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:alt" content="${esc(product ? product.title : name)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${imageUrl}">
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replace(/</g, '\\u003c')}</script>
  <!-- /seo:metadata -->`;
  html = html.replace(/<!-- seo:metadata -->[\s\S]*?<!-- \/seo:metadata -->\s*/g, '').replace(/<title>[\s\S]*?<\/title>\s*/, `<title>${esc(title)}</title>\n  ${block}\n  `);
  return html;
}
const header = read('urun-detay.html').match(/<header\b[\s\S]*?<\/header>/)[0];
const shell = (body, attrs = '') => `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title></title><link rel="icon" type="image/png" href="assets/images/favicon.png"><link rel="stylesheet" href="tasarım.css?v=${version}"></head><body${attrs}>
${header}
${body}
<div data-footer></div><script src="data.js?v=20261005-seo-1"></script><script src="app.js?v=20261005-seo-1"></script></body></html>\n`;
write('istanbul-ups.html', shell(`<div class="crumbs"><div class="container">⌂ <a href="index.html">Ana Sayfa</a><span>/</span>UPS Seçim Rehberi</div></div>
<main class="page"><div class="container local-seo"><h1 class="section-title">UPS Seçimi ve Teklif Rehberi: Doğru kVA ve Model</h1><p class="section-lead">UPS teklifi istemeden önce bilmeniz gerekenler: güç (kVA) hesabı, yedekleme süresi ve hangi UPS türünün hangi yüke uygun olduğu. <a href="index.html">İstanbul kesintisiz güç kaynağı</a> satış, kurulum ve servis taleplerinizi Çekmeköy merkezimizden karşılıyoruz.</p>
<section class="local-section"><h2>UPS gücü (kVA) nasıl hesaplanır?</h2><p>Önce UPS'e bağlanacak cihazların toplam tüketimini watt (W) olarak toplayın; değer cihaz etiketinde veya kullanım kılavuzunda yazar. UPS'in watt değeri, kVA değeri ile çıkış güç faktörünün çarpımıdır: örneğin 10 kVA ve 0,9 güç faktörlü bir UPS 9.000 W yük besler. Sık kullanılan yaklaşım, toplam yükün üzerine ileride eklenecek cihazlar ve kalkış akımları için %20–30 pay bırakmaktır.</p><ul><li><strong>Tek fazlı küçük yükler (bilgisayar, POS, modem):</strong> 600–2000 VA Line Interactive UPS</li><li><strong>Sunucu ve network kabini:</strong> 1–3 kVA rack mount veya 6–10 kVA rack tower online UPS</li><li><strong>Tek fazlı ofis, mağaza ve sistem odası:</strong> 6–10 kVA monofaze online UPS</li><li><strong>Trifaze girişli binada tek fazlı yükler:</strong> 10–20 kVA, 3 faz giriş / 1 faz çıkış UPS</li><li><strong>Fabrika, veri merkezi, hastane:</strong> 10–120 kVA veya 160–800 kVA trifaze online UPS</li></ul></section>
<section class="local-section"><h2>Yedekleme süresi neye bağlıdır?</h2><p>Elektrik kesildiğinde UPS'in kaç dakika çalışacağı, bağlı yükün gücüne ve akü kapasitesine bağlıdır; aynı kVA değerindeki iki UPS farklı akü düzeniyle çok farklı süreler verebilir. Jeneratörünüz varsa UPS'in yalnızca jeneratör devreye girene kadar beslemesi yeterli olabilir; jeneratör yoksa daha uzun süre için harici akü kabini planlanır. Bu nedenle teklifte süreyi dakika olarak belirtmeniz önemlidir.</p></section>
<section class="local-section"><h2>Hangi UPS ürün grubu ihtiyacınıza uygun?</h2><p>Kesintisiz güç kaynağı seçiminde yalnızca cihazın kVA değeri yeterli değildir. Bağlanacak yük, ihtiyaç duyulan aküden çalışma süresi, giriş ve çıkış fazları ile kurulum alanı birlikte değerlendirilmelidir. Aşağıdaki ürün grupları başlangıç karşılaştırması içindir; kesin model ve akü seçimi teklif sırasında netleştirilir.</p>
<div class="service-grid"><article class="card service-card"><h3>Bilgisayar ve POS sistemleri</h3><p>Masaüstü bilgisayarlar ve POS sistemleri için Line Interactive UPS grubunu inceleyebilirsiniz. Cihazların toplam tüketimini ve elektrik kesildiğinde ne kadar süre çalışması gerektiğini belirtin.</p><a class="btn btn-outline" href="ups-line-interactive-ups.html">Line Interactive UPS</a></article>
<article class="card service-card"><h3>Sunucu ve network altyapısı</h3><p>Rack kabinde kullanılacak sistemler için 1–2–3 kVA Rack Mount Online ve 6–10 kVA Rack Tower grupları bulunur. Kabin yerleşimi, bağlı ekipman ve yedekleme süresi seçimde birlikte ele alınır.</p><p><a href="ups-rack-mount-online-ups.html">Rack Mount Online UPS</a> · <a href="ups-rack-tower-6-10-kva.html">Rack Tower 6–10 kVA</a></p></article>
<article class="card service-card"><h3>Asansör sistemleri</h3><p>Asansör uygulamaları için ayrı UPS ürün grubumuz bulunur. Mevcut asansör sisteminin özelliklerini paylaşarak uygunluğu ve kurulum ihtiyacını teknik ekibimizle değerlendirin.</p><a class="btn btn-outline" href="ups-asansor-ups.html">Asansör UPS</a></article>
<article class="card service-card"><h3>İşletme ve endüstriyel yükler</h3><p>Güç ihtiyacına göre 6–10, 10–20, 10–120 ve 160–800 kVA grupları bulunur. Tek faz ve üç faz seçenekleri ürün grubuna göre değişir; mevcut elektrik altyapısı ve yük bilgileri teklif için gereklidir.</p><p><a href="ups-6-10-kva.html">6–10 kVA</a> · <a href="ups-10-20-kva.html">10–20 kVA</a> · <a href="ups-10-120-kva.html">10–120 kVA</a> · <a href="ups-160-800-kva.html">160–800 kVA</a></p></article></div></section>
<section class="local-section"><h2>İstanbul'da UPS satış ve kurulum süreci</h2><ol><li><strong>İhtiyacı paylaşın:</strong> Beslenecek cihazları, bilinen güç tüketimini, istenen yedekleme süresini ve İstanbul'daki kurulum adresini iletin.</li><li><strong>Ürün ve kapsamı değerlendirelim:</strong> Güç, akü ihtiyacı, faz yapısı ve kurulum koşullarına göre ürün seçimi ve hizmet kapsamını görüşelim.</li><li><strong>Kurulum ve devreye alma planı:</strong> Uygun ürün belirlendikten sonra kurulum ve devreye alma ihtiyaçları ile ziyaret planını birlikte netleştirelim.</li></ol><p>Ürün sayfalarındaki teknik dokümanlar modelleri karşılaştırmanıza yardımcı olur. Aynı güç sınıfındaki iki UPS'in çalışma süresi, akü düzeni ve bağlı yük nedeniyle farklı olabilir; tüm ürünler için tek bir süre veya fiyat yayımlamıyoruz.</p></section>
<section class="local-section"><h2>Mevcut kesintisiz güç kaynağına servis ve bakım</h2><p>UPS arızası veya bakım talebinde marka, model, güç değeri, görünen hata kodu ve belirtileri iletin. Akü kontrolü, arıza tespiti, onarım ve devreye alma ihtiyaçları bu bilgilerle değerlendirilir. Cihazı açmanız veya elektrik bağlantısına müdahale etmeniz gerekmez.</p><p>Standart bakım paketinde yılda iki koruyucu bakım ve bakım sonrası raporlama; Premium pakette ayrıca 7/24 acil müdahale desteği ve uzun süreli arızalarda geçici UPS temini bulunur. Sözleşme ve servis kapsamını talebinize göre görüşebilirsiniz.</p><a class="btn btn-outline" href="hizmetler.html">UPS servis ve bakım paketleri</a></section>
<section class="local-section"><h2>İST Kesintisiz Güç İstanbul iletişim</h2><p>Merkezimiz ${esc(data.contact.address)}, ${esc(data.contact.city)} adresindedir. İstanbul genelindeki satış ve yerinde servis taleplerini Çekmeköy merkezimizden planlıyoruz. Ziyaret öncesinde telefonla görüşerek ihtiyaç ve randevu bilgisini netleştirebilirsiniz.</p><p><a class="btn" href="tel:${phone}">${esc(data.contact.phone)}</a> <a class="btn btn-outline" href="iletisim.html">Teklif, adres ve harita</a></p><p><a class="btn btn-whatsapp" href="${wa('Merhaba, UPS için fiyat teklifi almak istiyorum.')}" target="_blank" rel="noopener">WhatsApp'tan teklif isteyin</a></p><p><a href="cekmekoy-ups.html">Çekmeköy UPS merkezimiz</a> · <a href="urunler.html">Tüm UPS ürünleri ve teknik dokümanlar</a></p></section></div></main>`));
write('cekmekoy-ups.html', shell(`<div class="crumbs"><div class="container">⌂ <a href="index.html">Ana Sayfa</a><span>/</span>Çekmeköy UPS</div></div>
<main class="page"><div class="container local-seo"><h1 class="section-title">Çekmeköy UPS Satışı ve Teknik Servis</h1><p class="section-lead">İST Kesintisiz Güç, Kirazlıdere'deki merkezinden Çekmeköy ve İstanbul genelinde <a href="index.html">kesintisiz güç kaynağı</a> satış, kurulum, bakım ve onarım desteği sunar.</p>
<div class="service-grid"><article class="card service-card"><h2>İhtiyacınıza Uygun Güç Kaynağı</h2><p>Bilgisayar ve POS sistemleri, sunucu ve network altyapısı, asansörler ve endüstriyel yükler için farklı UPS ürün gruplarımız bulunur. Cihazların toplam gücü, kurulum koşulları ve kesintide ihtiyaç duyulan çalışma süresi birlikte değerlendirilerek uygun çözüm belirlenir.</p><a class="btn btn-outline" href="urunler.html">UPS ürünlerini inceleyin</a></article>
<article class="card service-card"><h2>UPS Bakımı ve Arıza Desteği</h2><p>UPS'inizin marka ve modelini, gücünü, hata kodunu ve arıza belirtilerini paylaşarak teknik servis talebi oluşturabilirsiniz. Periyodik kontrol, akü durumu, onarım ve devreye alma ihtiyaçları değerlendirilir. Standart ve Premium bakım paketlerinin kapsamını hizmetler sayfamızda inceleyebilirsiniz.</p><a class="btn btn-outline" href="hizmetler.html">Bakım paketlerini inceleyin</a></article></div>
<section class="local-section"><h2>Çekmeköy Merkezimiz ve İstanbul Hizmet Alanı</h2><p>Adresimiz: ${esc(data.contact.address)}, ${esc(data.contact.city)}. İş yerimizi ziyaret edebilir veya İstanbul genelinde yerinde hizmet ihtiyacınız için bize ulaşabilirsiniz. Ziyaret ve servis planlamasını telefonla görüşebilirsiniz.</p><p>Çalışma saatleri: ${esc(data.contact.hours)}. Premium bakım paketinde 7/24 acil müdahale desteği bulunur.</p><p><a class="btn" href="tel:${phone}">${esc(data.contact.phone)}</a> <a class="btn btn-outline" href="iletisim.html">Adres ve harita</a></p></section>
<section class="local-section"><h2>UPS Seçimi ve Servis Hakkında</h2><h3>Kesintisiz güç kaynağı ne sağlar?</h3><p>UPS, elektrik kesildiğinde bağlı cihazları aküden besler. Çalışma süresi, yükün tüketimine ve akü kapasitesine bağlıdır. Ürün gruplarının teknik özelliklerini ilgili ürün sayfası ve dokümanından kontrol edebilirsiniz.</p><h3>Teklif için hangi bilgiler gerekir?</h3><p>Beslenecek cihazları, toplam güç ihtiyacını, istenen yedekleme süresini ve kurulum adresini paylaşın. Mevcut UPS'e servis gerekiyorsa marka, model ve hata bilgilerini de iletin.</p><h3>Çekmeköy dışında hizmet veriyor musunuz?</h3><p>Evet, Çekmeköy merkezimizden tüm İstanbul'a yerinde hizmet sunuyoruz. Talebinize göre servis kapsamını ve ziyaret planını birlikte belirliyoruz.</p></section></div></main>`));
for (const [file, [title, description, label]] of Object.entries(pages)) write(file, metadata(fill(read(file)), file, title, description, label));
for (const product of data.products) {
  const title = product.metaTitle;
  const description = product.metaDescription;
  const heading = product.heading;
  const details = `<section class="local-section"><h2>${esc(heading)} teknik özellikleri</h2><div class="table-scroll"><table class="spec-table"><tbody>${product.specs.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table></div><p>Tüm değerler ürün dokümanından alınmıştır; ayrıntılar için dokümanı indirebilirsiniz.</p></section>
<section class="local-section"><h2>Kullanım alanları</h2><ul>${product.uses.map(u => `<li>${esc(u)}</li>`).join('')}</ul><p>${esc(product.note)}</p></section>
<section class="local-section product-quote"><h2>${esc(heading)} için İstanbul teklif ve kurulum</h2><p>Teklif için şu bilgileri paylaşmanız yeterli: beslenecek cihazlar veya toplam güç, elektrik kesildiğinde istenen çalışma süresi, binadaki faz yapısı ve İstanbul'daki kurulum adresi. Çekmeköy merkezimizden İstanbul genelinde satış, kurulum, devreye alma ve bakım desteği veriyoruz.</p><p><a class="btn btn-whatsapp" href="${wa(productMessage(product))}" target="_blank" rel="noopener">WhatsApp'tan teklif isteyin</a> <a class="btn btn-outline" href="iletisim.html?urun=${product.id}">Teklif formu</a> <a class="btn btn-outline" href="tel:${phone}">${esc(data.contact.phone)}</a></p><p><a href="istanbul-ups.html">UPS seçim ve kVA hesaplama rehberi</a> · <a href="hizmetler.html">UPS bakım hizmetleri</a> · <a href="urunler.html">Diğer UPS modelleri</a></p></section>`;
  const documentUrl = esc(asset(product.document));
  const previews = product.documentPages ? `<div class="document-pdf-pages">${product.documentPages.map((p, i) => `<a class="document-pdf-page" href="${documentUrl}#page=${i + 1}" target="_blank" rel="noopener"><img src="${esc(asset(p))}" alt="${esc(product.title)} teknik dokümanı — sayfa ${i + 1}" loading="lazy"></a>`).join('')}</div>` : `<figure class="document-figure"><img src="${esc(asset(product.image))}" alt="${esc(product.title)}" width="640" height="405"></figure><p>Teknik özellikler için ürün dokümanını indirin.</p>`;
  let html = shell(`<div class="crumbs"><div class="container">⌂ <a href="index.html">Ana Sayfa</a><span>/</span><a href="urunler.html">Ürünlerimiz</a><span>/</span>${esc(product.title)}</div></div><main class="page"><div class="container document-page"><h1 class="section-title" data-document-title>${esc(heading)}</h1><p class="section-lead" data-document-description>${esc(product.lead)}</p><div class="document-actions"><a class="btn btn-outline" href="urunler.html">← Ürünlere dön</a><a class="btn" href="${documentUrl}" data-document-download download>${/\.pdf$/i.test(product.document) ? 'PDF' : 'DOCX'} indir</a></div>${details}<h2 class="document-heading">Ürün dokümanı</h2><article class="document-content" data-document-content aria-live="polite">${previews}</article></div></main>`, ` data-product-id="${product.id}"`);
  write(product.url, metadata(fill(html), product.url, title, description, heading, product));
}
let legacy = fill(read('urun-detay.html'));
if (!legacy.includes('name="robots"')) legacy = legacy.replace('</head>', '<meta name="robots" content="noindex, follow">\n</head>');
legacy = slot(legacy, 'data-document-content', `<p>Ürününüzün güncel sayfasını açmak için <a href="urunler.html">UPS ürünlerini inceleyin</a>.</p><ul>${data.products.map(p => `<li><a href="${p.url}">${esc(p.title)}</a></li>`).join('')}</ul>`);
write('urun-detay.html', legacy);
const urls = [...Object.keys(pages).map(f => f === 'index.html' ? `${origin}/` : `${origin}/${f}`), ...data.products.map(p => `${origin}/${p.url}`)];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`SEO üretimi tamamlandı: ${urls.length} canonical sayfa ve eski ürün bağlantısı uyumluluğu.`);
